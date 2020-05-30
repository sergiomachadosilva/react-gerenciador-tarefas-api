import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import ConcluirTarefa from './concluir-tarefa';
import RemoverTarefa from './remover-tarefa';


function ItensListaTarefas(props) {

    function marcarConcluida(tarefa) {
        return tarefa.concluida ? 'line-through' : 'none'
    }

    return (
        props.tarefas.map((tarefa, index) =>
            <tr key={tarefa.id}
                data-testid="tarefa">
                    <td>{tarefa.id}</td>
                <td data-testid="nome-tarefa" style={{ textDecoration: marcarConcluida(tarefa) }}>
                    {tarefa.nome}
                </td>

                <td className="text-right">
                    <ConcluirTarefa
                        tarefa={tarefa}
                        recarregarTarefas={props.recarregarTarefas}
                        className={tarefa.concluida ? 'd-none' : null} >
                    </ConcluirTarefa>
                 
                    <A href={"/atualizar/" + tarefa.id}
                        className={tarefa.concluida ? 'd-none' : 'btn btn-warning btn-sm mr-1 text-white'} >
                        <FontAwesomeIcon icon={faEdit} title="Atualizar tarefa" />
                    </A>

                    <RemoverTarefa tarefa={tarefa} recarregarTarefas={props.recarregarTarefas} />
                </td>
            </tr>
        )
    )
}

ItensListaTarefas.propTypes = {
    tarefas: PropTypes.array.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default ItensListaTarefas;