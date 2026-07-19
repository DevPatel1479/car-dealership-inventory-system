import {
    describe,
    expect,
    it,
} from 'vitest';

import {
    render,
    screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
    MemoryRouter,
} from 'react-router-dom';

import AppRouter from '../../../src/app/router';


describe('LandingPage Navigation', () => {

    it('should navigate to the login page', async () => {

        const user =
            userEvent.setup();

        render(

            <MemoryRouter
                initialEntries={[
                    '/',
                ]}
            >

                <AppRouter />

            </MemoryRouter>,

        );

        await user.click(

            screen.getByRole(
                'button',
                {
                    name: 'Login',
                },
            ),

        );

        expect(

            screen.getByRole(
                'heading',
                {
                    name: 'Login',
                },
            ),

        ).toBeInTheDocument();

    });

});