import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './concluir-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Renderiza o componente de concluir uma tarefa', () => {

    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(1, nomeTarefa, false)

    it('Deve exibir o modal', () => {
        const { getByTestId } = render(
            <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
        );

        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa)
    })

    it('Deve concluir uma tarefa', async() => {
    
        const { getByTestId, findByTestId } = render(
            <ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => false} />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-concluir'));
        await findByTestId('modal')
        expect(axiosMock.put).toHaveBeenCalledTimes(1);
    })
})