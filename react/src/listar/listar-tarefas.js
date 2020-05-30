import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';

function ListarTaferas() {

   const ITENS_POR_PAG = 3;
   const GET_TAREFAS = 'http://localhost:3001/tarefas';

   const [tarefas, setTarefas] = useState([]);
   const [carregarTarefas, setCarregarTarefas] = useState(true);
   const [totalItems, setTotalItems] = useState(0);
   const [paginaAtual, setPaginaAtual] = useState(1);
   const [ordenarAsc, setOrdenarAsc] = useState(false);
   const [ordenarDesc, setOrdenarDesc] = useState(false);
   const [filtroTarefa, setFiltroTarefa] = useState('');


   useEffect(() => {
      async function obterTarefas() {
         // ordenar
         let ordem = '';

         if (ordenarAsc) {
            ordem = 'ASC'
         } else if (ordenarDesc) {
            ordem = 'DESC'
         }

         try {
            const params = `?page=${paginaAtual}&order=${ordem}&filter=${filtroTarefa}`;
            let { data } = await axios.get(GET_TAREFAS + params);
            setTotalItems(data.totalItens)
            setTarefas(data.tarefas)
         } catch (err) {
            setTarefas([])
         }
      }

      if (carregarTarefas) {
         obterTarefas();
         setCarregarTarefas(false);
      }

   }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa])

   function handleMudarPagina(pagina) {
      setPaginaAtual(pagina)
      setCarregarTarefas(true);
   }

   function handleOrdenar(event) {
      event.preventDefault();
      if (!ordenarAsc && !ordenarDesc) {
         setOrdenarAsc(true);
         setOrdenarDesc(false);
      } else if (ordenarAsc) {
         setOrdenarAsc(false);
         setOrdenarDesc(true);
      } else {
         setOrdenarAsc(false);
         setOrdenarDesc(false);
      }
      setCarregarTarefas(true)
   }

   function handleFiltrar(event) {
      setFiltroTarefa(event.target.value);
      setCarregarTarefas(true);
   }


   return (
      <React.Fragment>
         <h2 className="text-center mb-5">Tarefas a Fazer</h2>
         <Table striped bordered hover responsive data-testid="table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th className="text-center">
                     <a href="/" onClick={handleOrdenar}>
                        Tarefa <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
                     </a>
                  </th>
                  <th className="text-center">
                     <A href="/cadastrar"
                        className="btn btn-success btn-sm"
                        data-testid="btn-nova-tarefa"
                        title="Nova tarefa">
                        <FontAwesomeIcon className="mr-1" icon={faPlus} />
                       Nova tarefa
                     </A>
                  </th>
               </tr>
               <tr>
                  <th>&nbsp;</th>
                  <th><Form.Control
                     type="text"
                     value={filtroTarefa}
                     onChange={handleFiltrar}
                     data-testid="txt-tarefa"
                     placeholder="Pesquisar"
                  />
                  </th>
                  <th>&nbsp;</th>
               </tr>
            </thead>
            <tbody>
               <ItensListaTarefas
                  tarefas={tarefas}
                  recarregarTarefas={setCarregarTarefas}
               />
            </tbody>
         </Table>

         <div className={tarefas.length === 0 ? 'd-none' : null}>
            <Paginacao
               totalItens={totalItems}
               itemsPorPagina={ITENS_POR_PAG}
               paginaAtual={paginaAtual}
               mudarPagina={handleMudarPagina}
            />
         </div>

         <div className={tarefas.length === 0 ? null : 'd-none'}>
            <Card>
               <Card.Body>
                  <Card.Title className="text-center mb-0">Tarefas não encontradas</Card.Title>
               </Card.Body>
            </Card>
         </div>

      </React.Fragment>
   )
}

export default ListarTaferas;