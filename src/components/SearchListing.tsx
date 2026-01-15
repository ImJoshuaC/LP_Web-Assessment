export type SortBy =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "beds_desc"
  | "baths_desc";

export type ListingType = "any" | "residential" | "commercial" | "land";

export type SearchFilters = {
  location: string;
  listingType: ListingType;
  sortBy: SortBy;
  minBeds: number;
  minBaths: number;
  minPrice?: number;
  maxPrice?: number;
};

type Props = {
  locations: string[];
  value: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onSearch: () => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
      {children}
    </div>
  );
}

export default function SearchListingCard({
  locations,
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Search Listings</h3>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-600">
          Filters
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <FieldLabel>Location</FieldLabel>
          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
            value={value.location}
            onChange={(e) => onChange({ ...value, location: e.target.value })}
          >
            <option value="">Any</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <FieldLabel>Type of Listing</FieldLabel>
          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
            value={value.listingType}
            onChange={(e) =>
              onChange({ ...value, listingType: e.target.value as ListingType })
            }
          >
            <option value="any">Any</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="space-y-2">
          <FieldLabel>Sort By</FieldLabel>
          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
            value={value.sortBy}
            onChange={(e) =>
              onChange({ ...value, sortBy: e.target.value as SortBy })
            }
          >
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="beds_desc">Bedrooms: Most</option>
            <option value="baths_desc">Bathrooms: Most</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <FieldLabel>Bedrooms</FieldLabel>
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
              value={value.minBeds}
              onChange={(e) =>
                onChange({ ...value, minBeds: Number(e.target.value) })
              }
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <FieldLabel>Bathrooms</FieldLabel>
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
              value={value.minBaths}
              onChange={(e) =>
                onChange({ ...value, minBaths: Number(e.target.value) })
              }
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel>Price Range</FieldLabel>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
              placeholder="Min"
              inputMode="numeric"
              value={value.minPrice ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  minPrice:
                    e.target.value.trim() === ""
                      ? undefined
                      : Number(e.target.value),
                })
              }
            />
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none"
              placeholder="Max"
              inputMode="numeric"
              value={value.maxPrice ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  maxPrice:
                    e.target.value.trim() === ""
                      ? undefined
                      : Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}
