import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="about" className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Call or Visit
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Send Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Send
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-500">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div>

            <a
              href="https://wa.me/14259412560"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Message us on WhatsApp
            </a>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Marci Metzger - THE RIDGE REALTY GROUP
              </h3>

              <div className="mb-6 space-y-3 text-gray-700">
                <p>
                  3190 HW-160, Suite F, Pahrump, Nevada 89048, United States
                </p>
                <a
                  href="tel:2069196886"
                  className="block text-lg font-semibold text-gray-900 hover:text-gray-700"
                >
                  (206) 919-6886
                </a>
              </div>

              <div className="mb-6">
                <h4 className="mb-2 font-bold text-gray-900">Office Hours</h4>
                <div className="space-y-1 text-gray-700">
                  <p>Open daily</p>
                  <p className="font-semibold">8:00 am – 7:00 pm</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Appointments outside office hours available upon request. Just
                  call!
                </p>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3190+HW-160+Suite+F+Pahrump+Nevada+89048"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Get Directions
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d51494.14504216054!2d-116.05699552287673!3d36.2301632237022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s3190%20HW%20160%20Suite%20F%20Pahrump%20Nevada%2089048%20United%20States!5e0!3m2!1sen!2sph!4v1768408236523!5m2!1sen!2sph"
                width="100%"
                height="100%"
                className="h-[300px] w-full lg:h-[350px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
