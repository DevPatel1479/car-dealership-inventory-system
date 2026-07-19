import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import VehicleSearch from '../../../../src/features/vehicles/components/VehicleSearch';

describe('VehicleSearch', () => {
  it('should submit the make filter', () => {
    const onSearch = vi.fn();

    render(<VehicleSearch onSearch={onSearch} />);

    fireEvent.change(
      screen.getByPlaceholderText('Make'),
      {
        target: {
          value: 'Toyota',
        },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /search vehicles/i,
      }),
    );

    expect(onSearch).toHaveBeenCalledWith({
      make: 'Toyota',
    });
  });
});