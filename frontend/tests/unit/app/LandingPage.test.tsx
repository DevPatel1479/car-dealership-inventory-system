import {
    describe,
    expect,
    it,
} from 'vitest';

import {
    render,
    screen,
} from '@testing-library/react';

import LandingPage from '../../../src/app/LandingPage';


describe('LandingPage', () => {

    it('should render the application title', () => {

        render(
            <LandingPage />,
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


    it('should render a login button', () => {

        render(
            <LandingPage />,
        );

        expect(
            screen.getByRole(
                'button',
                {
                    name: 'Login',
                },
            ),
        )
            .toBeInTheDocument();

    });


    it('should render a register button', () => {

        render(
            <LandingPage />,
        );

        expect(
            screen.getByRole(
                'button',
                {
                    name: 'Register',
                },
            ),
        )
            .toBeInTheDocument();

    });

});