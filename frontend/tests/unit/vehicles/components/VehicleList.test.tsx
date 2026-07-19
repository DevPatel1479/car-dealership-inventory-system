import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehicleList from '../../../../src/features/vehicles/components/VehicleList';

describe('VehicleList', () => {
  it('should display available vehicles', () => {
    render(
      <MemoryRouter>
        <VehicleList
          vehicles={[
            {
              id: '1',
              make: 'Toyota',
              model: 'Camry',
              category: 'Sedan',
              price: 25000,
              quantity: 5,
            },
          ]}
          loading={false}
          onPurchaseSuccess={vi.fn()}
          onDeleteSuccess={vi.fn()}
          isAdmin={false}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Toyota Camry'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/₹25,000/),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Sedan'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Purchase',
      }),
    ).toBeInTheDocument();
  });
});