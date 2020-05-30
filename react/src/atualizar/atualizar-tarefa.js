import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Jumbotron } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import axios from 'axios';
import Tarefa from '../models/tarefa.model';

function AtualizarTarefa(props) {

    const GET_TASK_ID = 'http://localhost:3001/tarefas/';

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);
    const [exibirModalErro, setExibirModalErro] = useState(false)

    useEffect(() => {
        async function obterTarefa() {
            try {
                let { data } = await axios.get(GET_TASK_ID + props.id);
                setTarefa(data.nome)
            } catch (err) {
                navigate('/');
            }

        }

        if (carregarTarefa) {
            obterTarefa();
            setCarregarTarefa(false);
        }
    }, [carregarTarefa, props]);


    function handleFecharModal(event) {
        setExibirModal(false)
        navigate('/')
    }

    function handleFecharModalErro() {
        setExibirModalErro(false)
    }

    async function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            try {
                const tarefAtualizar = new Tarefa(null, tarefa, false);
                await axios.put(GET_TASK_ID + props.id, tarefAtualizar);
                setExibirModal(true)
            } catch (err) {
                setExibirModalErro(true);
            }
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value)
    }

    return (
        <React.Fragment>
            <h2 className="text-center mb-5">Editar tarefa</h2>
            <Jumbotron>

                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group className="text-right">
                        <A href="/" className="btn btn-info btn-sm" title="Voltar">
                            Voltar
                        </A>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa" />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="success" type="submit" title="Salvar" data-testid="btn-atualizar">
                            Salvar
                        </Button>
                    </Form.Group>
                </Form>
            </Jumbotron>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tarefa atualizada com sucesso
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success'
                        onClick={handleFecharModal}
                        data-testid="btn-concluir">
                        Continuar
                     </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao atualizar tarefa, tente novamente em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='warning'
                        onClick={handleFecharModalErro}>
                        Fechar
                     </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

AtualizarTarefa.propTypes = {
    id: PropTypes.string.isRequired
}

export default AtualizarTarefa;