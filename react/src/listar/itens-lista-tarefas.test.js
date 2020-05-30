import React from 'react';
import ReactDOM from 'react-dom';
import ItensListaTarefas from './itens-lista-tarefas';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente que exibe um item da listagem de tarefas', () => {

    const nomeTarefa = 'Tarefa';
    const tarefa = new Tarefa(1, nomeTarefa, false);
    const tarefaConcluida = new Tarefa(1, nomeTarefa, true);

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItensListaTarefas tarefas={[]} recarregarTarefas={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div)
    })

    it('Deve exibir a tarefa', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                        tarefas={[tarefa]}
                        recarregarTarefas={() => false}>
                    </ItensListaTarefas>
                </tbody>
            </table>
        );
        expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
    })

    it('deve exibir uma tarefa concluída', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas
                        tarefas={[tarefaConcluida]}
                        recarregarTarefas={() => false}>
                    </ItensListaTarefas>
                </tbody>
            </table>
        );

        expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through')
    })
})