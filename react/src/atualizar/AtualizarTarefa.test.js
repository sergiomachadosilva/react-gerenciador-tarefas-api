import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent, findByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste do componente de atualizar tarefa', () => {

    const tarefaId = "1";

    it('deve exibir o modal de sucesso ao autalizar uma tarefa', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: { nome: 'Estudar React' } });
        const { findByTestId } = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(await findByTestId('btn-atualizar'));
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso');

    })

})