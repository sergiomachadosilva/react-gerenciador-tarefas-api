import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GerenciadorTarefas from './gerenciador-tarefas';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
ReactDOM.render(
  <Container className="mt-5">
    <GerenciadorTarefas />
  </Container>,
  document.getElementById('root')
);

serviceWorker.unregister();
