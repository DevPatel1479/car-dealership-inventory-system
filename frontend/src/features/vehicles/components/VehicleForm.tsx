import { useState } from 'react';

import { createVehicle, updateVehicle } from '../api/vehicle.api';

interface VehicleFormProps {
  vehicle?: {
    id: string;
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
  };

  onSuccess?: () => void;
}

export default function VehicleForm({ vehicle, onSuccess }: VehicleFormProps) {
  const [form, setForm] = useState({
    make: vehicle?.make ?? '',

    model: vehicle?.model ?? '',

    category: vehicle?.category ?? '',

    price: vehicle?.price?.toString() ?? '',

    quantity: vehicle?.quantity?.toString() ?? '',
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,

      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!form.make || !form.model || !form.category || !form.price || !form.quantity) {
      setError('All fields are required.');

      return;
    }

    const price = Number(form.price);

    const quantity = Number(form.quantity);

    if (price <= 0) {
      setError('Price must be greater than zero.');

      return;
    }

    if (quantity < 0) {
      setError('Quantity cannot be negative.');

      return;
    }

    const payload = {
      make: form.make,

      model: form.model,

      category: form.category,

      price,

      quantity,
    };

    try {
      setLoading(true);

      if (vehicle) {
        await updateVehicle(vehicle.id, payload);

        setSuccess('Vehicle updated successfully.');
      } else {
        await createVehicle(payload);

        setSuccess('Vehicle created successfully.');

        setForm({
          make: '',

          model: '',

          category: '',

          price: '',

          quantity: '',
        });
      }

      onSuccess?.();
    } catch (error) {
      setError('Unable to save vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
                rounded-2xl
                bg-white
                p-8
                shadow-lg
            "
    >
      <div className="mb-8">
        <h2
          className="
                        text-2xl
                        font-bold
                        text-gray-900
                    "
        >
          {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
        </h2>

        <p className="mt-2 text-gray-500">Add and manage dealership inventory.</p>
      </div>

      {error && (
        <div
          className="
                            mb-5
                            rounded-lg
                            bg-red-100
                            p-3
                            text-red-700
                        "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
                            mb-5
                            rounded-lg
                            bg-green-100
                            p-3
                            text-green-700
                        "
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="
                        grid
                        gap-6
                        md:grid-cols-2
                    "
        >
          {[
            {
              name: 'make',
              label: 'Make',
            },
            {
              name: 'model',
              label: 'Model',
            },
            {
              name: 'category',
              label: 'Category',
            },
            {
              name: 'price',
              label: 'Price',
            },
            {
              name: 'quantity',
              label: 'Quantity',
            },
          ].map((field) => (
            <label key={field.name} className="space-y-2">
              <span className="font-medium">{field.label}</span>

              <input
                name={field.name}

                value={form[field.name as keyof typeof form]}

                onChange={handleChange}

                type={field.name === 'price' || field.name === 'quantity' ? 'number' : 'text'}

                className="
                                        w-full
                                        rounded-lg
                                        border
                                        px-4
                                        py-3
                                        focus:border-blue-500
                                        focus:outline-none
                                    "
              />
            </label>
          ))}
        </div>

        <button
          disabled={loading}

          type="submit"

          className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        py-3
                        font-semibold
                        text-white
                        hover:bg-blue-700
                        disabled:bg-gray-400
                    "
        >
          {loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Create Vehicle'}
        </button>
      </form>
    </section>
  );
}
