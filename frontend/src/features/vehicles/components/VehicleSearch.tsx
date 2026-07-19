import { useState } from 'react';

interface VehicleSearchProps {
  onSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<void>;
}

export default function VehicleSearch({ onSearch }: VehicleSearchProps) {
  const [make, setMake] = useState('');

  const [searching, setSearching] = useState(false);
  const [model, setModel] = useState('');

  const [category, setCategory] = useState('');

  const [minPrice, setMinPrice] = useState('');

  const [maxPrice, setMaxPrice] = useState('');

  const [error, setError] = useState('');

  async function handleSearch() {
    setError('');
    setSearching(true);

    try {
      await onSearch({
        make: make || undefined,

        model: model || undefined,

        category: category || undefined,

        minPrice: minPrice ? Number(minPrice) : undefined,

        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
    } catch {
      setError('Unable to search vehicles.');
    } finally {
      setSearching(false);
    }
  }

  function clearFilters() {
    setMake('');
    setModel('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setError('');

    onSearch({});
  }

  return (
    <section
      className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                border
            "
    >
      <h2 className="text-xl font-bold">Search Vehicles</h2>

      <div
        className="
        mt-5
        grid
        gap-4
        md:grid-cols-2
    "
      >
        <input
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="input"
        />

        <input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="input"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />

        <div
          className="
        grid
        grid-cols-2
        gap-3
    "
        >
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div
        className="
        mt-5
        flex
        flex-col
        gap-3
        sm:flex-row
    "
      >
        <button
          type="button"
          disabled={searching}
          onClick={handleSearch}
          className="
            flex-1
            rounded-xl
            bg-blue-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:bg-gray-400
        "
        >
          {searching ? 'Searching...' : 'Search Vehicles'}
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3
            font-semibold
            text-gray-700
            transition
            hover:bg-gray-100
        "
        >
          Clear Filters
        </button>
      </div>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </section>
  );
}
