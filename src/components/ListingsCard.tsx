export type Listing = {
  id: number;
  name: string;
  img?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  priceRange: { min: number; max: number };
};

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type Props = {
  listing: Listing;
};

export default function ListingCard({ listing }: Props) {
  const imgSrc = listing.img
    ? listing.img.replace(".../public", "")
    : undefined;

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row">
      <div className="h-44 w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 sm:h-auto sm:w-56">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={listing.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {listing.name}
            </h3>
            <div className="text-sm font-semibold text-gray-900">
              {formatMoney(listing.priceRange.min)} –{" "}
              {formatMoney(listing.priceRange.max)}
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-600">{listing.location}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bed text-gray-500" aria-hidden="true" />
            <span className="font-medium">{listing.bedrooms}</span>
            <span className="text-gray-500">Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bath text-gray-500" aria-hidden="true" />
            <span className="font-medium">{listing.bathrooms}</span>
            <span className="text-gray-500">Baths</span>
          </div>
        </div>
      </div>
    </article>
  );
}
