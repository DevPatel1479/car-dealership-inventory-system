import type { Vehicle } from '../api/vehicle.api';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase(id: string): Promise<void>;
  isPurchasing: boolean;
}

export default function VehicleCard({ vehicle, onPurchase, isPurchasing }: VehicleCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <article
      className="
                flex
                min-h-[260px]
                flex-col
                justify-between
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-xl
            "
    >
      {/* Header */}

      <div>
        <div
          className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
        >
          <div className="min-w-0">
            <h2
              className="
                                truncate
                                text-xl
                                font-bold
                                text-gray-900
                            "
            >
              {vehicle.make} {vehicle.model}
            </h2>

            <span
              className="
                                mt-3
                                inline-flex
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-sm
                                font-medium
                                text-blue-700
                            "
            >
              {vehicle.category}
            </span>
          </div>

          <div
            className="
                            shrink-0
                            rounded-xl
                            bg-green-100
                            px-3
                            py-2
                            text-sm
                            font-bold
                            text-green-700
                        "
          >
            {formattedPrice}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div
        className="
                    mt-8
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-t
                    pt-5
                "
      >
        <div>
          <p className="text-sm text-gray-500">Stock</p>

          <p
            className={`
                            text-lg
                            font-bold
                            ${vehicle.quantity === 0 ? 'text-red-600' : 'text-green-600'}
                        `}
          >
            {vehicle.quantity}
          </p>
        </div>

        <button
          type="button"
          disabled={vehicle.quantity === 0 || isPurchasing}
          onClick={() => onPurchase(vehicle.id)}
          className="
        rounded-xl
        bg-blue-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-gray-300
    "
        >
          {isPurchasing ? 'Purchasing...' : vehicle.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>
      </div>
    </article>
  );
}
