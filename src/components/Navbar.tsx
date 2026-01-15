import { useEffect, useState } from "react";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#listings", label: "Listings" },
  { href: "#move", label: "Let’s Move" },
  { href: "#about", label: "About Us" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-10">
          <a href="#" className="flex items-center">
            <img src="/logo.webp" alt="Logo" className="h-12 w-auto sm:h-14" />
          </a>

          <div className="hidden items-center gap-8 text-base font-medium text-gray-900 md:flex">
            {navLinks.map((links) => (
              <a
                key={links.href}
                className="hover:text-gray-600"
                href={links.href}
              >
                {links.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            className="hidden text-lg font-semibold text-gray-900 hover:text-gray-600 md:inline-flex"
            href="tel:+12069166886"
          >
            (206) 916-6886
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-50 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={
          isOpen ? "border-t border-gray-100 bg-white md:hidden" : "hidden"
        }
      >
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2 text-base font-medium text-gray-900">
            {navLinks.map((links) => (
              <a
                key={links.href}
                className="rounded-md px-2 py-2 hover:bg-gray-50 hover:text-gray-600"
                href={links.href}
                onClick={() => setIsOpen(false)}
              >
                {links.label}
              </a>
            ))}
            <a
              className="mt-2 rounded-md px-2 py-2 text-lg font-semibold hover:bg-gray-50 hover:text-gray-600"
              href="tel:+12069166886"
              onClick={() => setIsOpen(false)}
            >
              (206) 916-6886
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
