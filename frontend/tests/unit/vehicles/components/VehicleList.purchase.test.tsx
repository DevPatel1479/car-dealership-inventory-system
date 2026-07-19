import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehicleList from '../../../../src/features/vehicles/components/VehicleList';

describe('Vehicle Purchase Button', () => {
  it('should disable purchase button when vehicle quantity is zero', () => {
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
              quantity: 0,
            },
          ]}
          loading={false}
          onPurchaseSuccess={vi.fn()}
          onDeleteSuccess={vi.fn()}
          isAdmin={false}
        />
      </MemoryRouter>,
    );

    const purchaseButton = screen.getByRole('button', {
      name: 'Out of Stock',
    });

    expect(purchaseButton).toBeDisabled();
  });
});