import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import VehicleDeleteButton from '../../../../src/features/vehicles/components/VehicleDeleteButton';

import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';

describe('VehicleDeleteButton Component', () => {
  it('should delete a vehicle when admin clicks delete button', async () => {
    const deleteSpy = vi.spyOn(vehicleApi, 'deleteVehicle').mockResolvedValue({
      success: true,
    });

    render(<VehicleDeleteButton vehicleId="1" />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    );

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });
});
