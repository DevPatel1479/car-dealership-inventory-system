import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


import { MemoryRouter } from 'react-router-dom';
import VehicleList from '../../../../src/features/vehicles/components/VehicleList';

import * as inventoryApi from '../../../../src/features/inventory/api/inventory.api';

describe('Vehicle Purchase Action', () => {
  it('should purchase a vehicle when purchase button is clicked', async () => {
    const purchaseSpy = vi
      .spyOn(inventoryApi, 'purchaseVehicle')
      .mockResolvedValue({
        id: '1',
        quantity: 4,
      });

    const onPurchaseSuccess = vi.fn();

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
          onPurchaseSuccess={onPurchaseSuccess}
          onDeleteSuccess={vi.fn()}
          isAdmin={false}
        />
      </MemoryRouter>,
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /purchase/i,
      }),
    );

    await waitFor(() => {
      expect(purchaseSpy).toHaveBeenCalledWith('1');
    });

    expect(onPurchaseSuccess).toHaveBeenCalledWith('1');
  });
});