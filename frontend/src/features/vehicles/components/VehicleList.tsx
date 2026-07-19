import { useState } from 'react';

import { deleteVehicle, type Vehicle } from '../api/vehicle.api';

import { purchaseVehicle } from '../../inventory/api/inventory.api';

import VehicleCard from './VehicleCard';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';

interface VehicleListProps {
    vehicles: Vehicle[];
    loading: boolean;
    onPurchaseSuccess(id: string): void;
    onDeleteSuccess(id: string): void;
    isAdmin: boolean;
}

export default function VehicleList({
    vehicles,
    loading,
    onPurchaseSuccess,
    onDeleteSuccess,
    isAdmin,
}: VehicleListProps) {
    const [purchasingId, setPurchasingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);


    const [vehicleToDelete, setVehicleToDelete] =
        useState<Vehicle | null>(null);
    const [success, setSuccess] = useState('');

    const [error, setError] = useState('');

    function handleDelete(vehicle: Vehicle) {
        setVehicleToDelete(vehicle);
    }

    async function confirmDelete() {
        if (!vehicleToDelete) {
            return;
        }

        try {
            setDeletingId(vehicleToDelete.id);

            await deleteVehicle(vehicleToDelete.id);

            onDeleteSuccess(vehicleToDelete.id);

            setSuccess('Vehicle deleted successfully.');

            setTimeout(() => {
                setSuccess('');
            }, 2500);
        } catch (error: any) {
            setError(
                error?.response?.data?.message ??
                'Unable to delete vehicle.',
            );

            setTimeout(() => {
                setError('');
            }, 2500);
        } finally {
            setDeletingId(null);
            setVehicleToDelete(null);
        }
    }
    async function handlePurchase(id: string) {
        setPurchasingId(id);

        try {
            await purchaseVehicle(id);

            onPurchaseSuccess(id);
        } catch (error) {
            console.error('Purchase failed', error);
        } finally {
            setPurchasingId(null);
        }
    }

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading vehicles...</div>;
    }

    if (vehicles.length === 0) {
        return (
            <div
                className="
                rounded-2xl
                border
                border-dashed
                bg-white
                p-16
                text-center
                shadow-sm
            "
            >
                <h2
                    className="
                    text-2xl
                    font-semibold
                    text-gray-900
                "
                >
                    No Vehicles Found
                </h2>

                <p
                    className="
                    mt-3
                    text-gray-500
                "
                >
                    No vehicles match your search. Try changing your filters.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    {success && (
                        <div
                            className="
            rounded-lg
            bg-green-100
            p-4
            text-green-700
        "
                        >
                            {success}
                        </div>
                    )}

                    {error && (
                        <div
                            className="
            rounded-lg
            bg-red-100
            p-4
            text-red-700
        "
                        >
                            {error}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold">Available Vehicles</h2>

                    <p className="text-gray-500">
                        {vehicles.length} vehicle
                        {vehicles.length > 1 ? 's' : ''} available
                    </p>
                </div>
            </div>

            <div
                className="
        grid
        gap-6
        sm:grid-cols-1
        lg:grid-cols-2
        2xl:grid-cols-3
    "
            >
                {vehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onDelete={() => handleDelete(vehicle)}
                        onPurchase={handlePurchase}
                        isPurchasing={purchasingId === vehicle.id}
                        isDeleting={deletingId === vehicle.id}
                        isAdmin={isAdmin}
                    />
                ))}
                <ConfirmDialog
                    open={vehicleToDelete !== null}
                    title="Delete Vehicle"
                    message={`Are you sure you want to delete "${vehicleToDelete?.make} ${vehicleToDelete?.model}"? This action cannot be undone.`}
                    confirmText="Delete Vehicle"
                    cancelText="Cancel"
                    loading={deletingId !== null}
                    onCancel={() => setVehicleToDelete(null)}
                    onConfirm={confirmDelete}
                />
            </div>

        </section>
    );
}
