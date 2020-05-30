import React from 'react';
import ReactDOM from 'react-dom';
import Ordenacao from './ordenacao';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Testa o componente de ordenação', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Ordenacao ordenarAsc={false} ordenarDesc={false} />, div
        );
        ReactDOM.unmountComponentAtNode(div)
    })

    it('Deve exibir a ordenação padrão', () => {
        const { getByTestId } = render(
            <Ordenacao ordenarAsc={false} ordenarDesc={false} />
        );
        //não deve existir a class 'd-none'
        expect(getByTestId('faSort')).not.toHaveClass('d-none');
        expect(getByTestId('faSortUp')).toHaveClass('d-none');
        expect(getByTestId('faSortDown')).toHaveClass('d-none');
    })

    it('Deve exibir a ordenação ascendente', () => {
        const { getByTestId } = render(
            <Ordenacao ordenarAsc={true} ordenarDesc={false} />
        );
        expect(getByTestId('faSort')).toHaveClass('d-none');
        expect(getByTestId('faSortUp')).not.toHaveClass('d-none');
        expect(getByTestId('faSortDown')).toHaveClass('d-none');
    })

    it('Deve exibir a ordenação descendente', () => {
        const { getByTestId } = render(
            <Ordenacao ordenarAsc={false} ordenarDesc={true} />
        );
        expect(getByTestId('faSort')).toHaveClass('d-none');
        expect(getByTestId('faSortUp')).toHaveClass('d-none');
        expect(getByTestId('faSortDown')).not.toHaveClass('d-none');
    })

})