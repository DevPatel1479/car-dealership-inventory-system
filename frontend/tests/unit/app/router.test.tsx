import {
    describe,
    expect,
    it,
} from 'vitest';

import {
    render,
    screen,
} from '@testing-library/react';

import {
    MemoryRouter,
} from 'react-router-dom';

import AppRouter from '../../../src/app/router';


describe('Application Router', () => {

    it('should render the landing page for the root route', () => {

        render(

            <MemoryRouter
                initialEntries={[
                    '/',
                ]}
            >

                <AppRouter />

            </MemoryRouter>,

        );


        expect(
            screen.getByRole(
                'heading',
                {
                    name: 'Car Dealership Inventory System',
                },
            ),
        )
            .toBeInTheDocument();

    });

});