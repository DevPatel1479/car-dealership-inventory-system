import { describe, expect, it, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import VehicleForm from '../../../../src/features/vehicles/components/VehicleForm';

import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';

describe('VehicleForm Component', () => {
  it('should submit vehicle creation form', async () => {
    const createSpy = vi.spyOn(vehicleApi, 'createVehicle').mockResolvedValue({
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    render(<VehicleForm />);

    fireEvent.change(screen.getByLabelText('Make'), {
      target: {
        value: 'Toyota',
      },
    });

    fireEvent.change(screen.getByLabelText('Model'), {
      target: {
        value: 'Camry',
      },
    });

    fireEvent.change(screen.getByLabelText('Category'), {
      target: {
        value: 'Sedan',
      },
    });

    fireEvent.change(screen.getByLabelText('Price'), {
      target: {
        value: '25000',
      },
    });

    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: {
        value: '5',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Create Vehicle',
      }),
    );

    expect(createSpy).toHaveBeenCalledWith({
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });
  });
});
