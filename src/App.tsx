import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import listingsData from "./data/listings.json";
import ListingCard, { type Listing } from "./components/ListingsCard";
import SearchListingCard, {
  type SearchFilters,
} from "./components/SearchListing";
import PhotoGallery from "./components/PhotoGallery";
import ContactSection from "./components/ContactSection";

function App() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const listings = listingsData as Listing[];
  const locations = useMemo(
    () => Array.from(new Set(listings.map((l) => l.location))).sort(),
    [listings]
  );

  const [draftFilters, setDraftFilters] = useState<SearchFilters>({
    location: "",
    listingType: "any",
    sortBy: "recommended",
    minBeds: 0,
    minBaths: 0,
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [filters, setFilters] = useState<SearchFilters>(draftFilters);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredListings = useMemo(() => {
    const minP = filters.minPrice;
    const maxP = filters.maxPrice;

    const result = listings.filter((l) => {
      if (filters.location && l.location !== filters.location) return false;
      if (l.bedrooms < filters.minBeds) return false;
      if (l.bathrooms < filters.minBaths) return false;

      const listingMin = l.priceRange.min;
      const listingMax = l.priceRange.max;
      if (minP !== undefined && listingMax < minP) return false;
      if (maxP !== undefined && listingMin > maxP) return false;

      return true;
    });

    switch (filters.sortBy) {
      case "price_asc":
        return result.sort((a, b) => a.priceRange.min - b.priceRange.min);
      case "price_desc":
        return result.sort((a, b) => b.priceRange.max - a.priceRange.max);
      case "beds_desc":
        return result.sort((a, b) => b.bedrooms - a.bedrooms);
      case "baths_desc":
        return result.sort((a, b) => b.bathrooms - a.bathrooms);
      case "recommended":
      default:
        return result;
    }
  }, [filters, listings]);

  return (
    <>
      {/* STARTING PAGE OF THE WEB PAGE  */}
      <section
        id="home"
        className="relative min-h-screen w-full bg-[url('/main_image.webp')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 text-center sm:px-6">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold tracking-widest uppercase opacity-90">
              The Ridge Realty Group
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl upper">
              Your Pahrump
              <br />
              Real Estate Expert
            </h1>
            <p className="mt-4 text-base sm:text-lg">
              Refined listings, local expertise, and a smooth moving experience.
            </p>
            <a
              href="#move"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-gray-400"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-16 text-white">
        <div
          ref={statsRef}
          className={`mx-auto flex min-h-[260px] max-w-6xl items-center justify-center px-4 sm:px-6 transition-all duration-700 ease-out ${
            statsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid w-full max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-2">
            <div className="space-y-1 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-semibold sm:text-5xl">30</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 sm:text-sm">
                Years Experience
              </p>
            </div>
            <div className="space-y-1 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-semibold sm:text-5xl">90+</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 sm:text-sm">
                Clients in 2021
              </p>
            </div>
            <div className="space-y-1 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-semibold sm:text-5xl">$28.5M</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 sm:text-sm">
                Closed in Sales
              </p>
            </div>
            <div className="space-y-1 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-4xl font-semibold sm:text-5xl">5 Years</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 sm:text-sm">
                Top Residential Sales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      {/* SECTION 1 — GET IT SOLD */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Proven Results
            </p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Get It Sold
            </h2>
            <p className="text-base font-semibold text-gray-700 sm:text-lg">
              Top Residential Sales — Last 5 Years
            </p>
            <p className="text-sm text-gray-600 leading-relaxed sm:text-base">
              We helped nearly 90 clients in 2021 and closed $28.5 million in
              sales. Our team works hard every day to grow and learn so we can
              continue to excel in our market and deliver better results every
              year.
            </p>
          </div>

          <div className="relative">
            <img
              src="/img1.webp"
              alt="Real estate success"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — DON'T JUST LIST IT */}
      <section className="w-full bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <img
              src="/img2.webp"
              alt="Marketing homes"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            />
          </div>

          <div className="order-1 space-y-4 md:order-2">
            <p className="inline-flex rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Strategic Marketing
            </p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Don’t Just List It.
              <br />
              Get It Sold.
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              We exhaust every avenue to ensure your listing is at the
              fingertips of every possible buyer. From strategic marketing to
              expert negotiations, our goal is simple — get you top dollar for
              your home.
            </p>
            <p className="text-sm font-semibold text-gray-800 sm:text-base">
              Maximum exposure. Maximum value.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — GUIDE TO BUYERS */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              For Buyers
            </p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Guide to Buyers
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Nobody knows the market like we do. From market analysis and
              upgrade recommendations to contractors on speed dial, you’ll have
              a professional guiding every decision from start to finish.
            </p>
          </div>

          <div className="relative">
            <img
              src="/img3.webp"
              alt="Helping buyers"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — CONTACT / REACH OUT */}
      <section className="w-full bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src="/marci.webp"
              alt="Marci Metzger"
              className="w-lg h-lg rounded-sm object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Get Started?
            </h2>

            <p className="mt-4 text-gray-300">
              Reach out directly and work with a trusted local expert.
            </p>

            <div className="mt-6">
              <p className="text-xl font-semibold">Marci Metzger</p>
              <p className="text-gray-400">Real Estate Professional</p>
            </div>

            <div className="mt-6">
              <a
                href="tel:12069166886"
                className="text-2xl font-semibold text-white hover:text-gray-300 transition"
              >
                (206) 916-6886
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-8 flex justify-center md:justify-start gap-6 text-2xl text-gray-300">
              <a
                href="https://www.facebook.com/MarciHomes/"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/marciandlauren_nvrealtors/"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/marci-metzger-30642496/"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a
                href="https://www.yelp.com/biz/marci-metzger-the-ridge-realty-pahrump"
                target="_blank"
                aria-label="Yelp"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-yelp"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            What We Offer
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Expert guidance, proven results, and personalized service—every step
            of your real estate journey.
          </p>
        </div>

        {/* SECTION 1 - Real Estate Done Right */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Full Service Real Estate
            </p>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Real Estate Done Right
            </h2>

            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Nervous about your property adventure? Don’t be. Whether you're
              getting ready to buy or sell your residence, looking at investment
              properties, or just curious about the markets, our team ensures
              you get the best experience possible!
            </p>
          </div>

          <div className="relative">
            <img
              src="/img4.webp"
              alt="Real estate success"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Commercial and Residential */}
      <section className="w-full bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="relative">
              <img
                src="/img5.webp"
                alt="Commercial and residential properties"
                className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="order-1 space-y-4 md:order-2">
            <p className="inline-flex rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Property Solutions
            </p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Commercial & Residential
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Large or small, condo or mansion, we can find it and get at the
              price that's right. Fixer-uppers? Luxury? We can help with all of
              it! We live, work, and play in this community. Happy to help you
              find where to put your hard-earned dollars.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — RELY ON EXPERTISE */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Trusted Guidance
            </p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Rely on Expertise
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              If you have questions about affordability, credit, and loan
              options, trust us to connect you with the right people to get the
              answers you need in a timely fashion. We make sure you feel
              confident and educated every step of the way.
            </p>
          </div>

          <div className="relative">
            <img
              src="/img6.webp"
              alt="Expert guidance"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <main className="w-full bg-gray-50">
        <section id="listings" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Listings</h2>
              <p className="mt-2 text-gray-600">
                Search by location, beds, baths, and price range.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredListings.length} result
              {filteredListings.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="relative h-[75vh] overflow-hidden">
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="sticky top-0">
                  <SearchListingCard
                    locations={locations}
                    value={draftFilters}
                    onChange={setDraftFilters}
                    onSearch={() => setFilters(draftFilters)}
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex max-h-[70vh] flex-col gap-5 overflow-y-auto pr-1">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <PhotoGallery />

        <ContactSection />
      </main>
    </>
  );
}

export default App;
