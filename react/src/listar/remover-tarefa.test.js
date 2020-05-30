import React from 'react';
import ReactDOM from 'react-dom';
import RemoverTarefa from './remover-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';


describe('Renderiza o componente de excluir uma tarefa', () => {

    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(1, nomeTarefa, false)

    it('Deve exibir o modal', () => {
        const { getByTestId } = render(
            <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa)
    })

    it('Deve remover uma tarefa', async() => {

        const { getByTestId, findByTestId } = render(
            <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />
        );

        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-remover'));
        await findByTestId('modal');
        expect(axiosMock.delete).toHaveBeenCalledTimes(1);       
    });

});