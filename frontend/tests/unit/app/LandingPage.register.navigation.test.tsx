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


describe('LandingPage Register Navigation', () => {

    it('should navigate to the register page', async () => {

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
                    name: 'Register',
                },
            ),

        );

        expect(

            screen.getByRole(
                'heading',
                {
                    name: 'Register',
                },
            ),

        ).toBeInTheDocument();

    });

});