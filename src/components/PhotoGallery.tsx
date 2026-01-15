import Slider from "react-slick";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PhotoGallery() {
  const images: string[] = [
    "/gallery1.webp",
    "/gallery2.webp",
    "/gallery3.webp",
    "/gallery4.webp",
    "/gallery5.webp",
    "/gallery6.webp",
  ];

  const mainSlider = useRef<Slider>(null);
  const thumbSlider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    beforeChange: (_: number, newIndex: number) => setCurrentSlide(newIndex),
    asNavFor: thumbSlider.current ? thumbSlider.current : undefined,
  };

  const thumbSettings = {
    slidesToShow: Math.min(images.length, 6),
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    centerMode: images.length > 3,
    infinite: true,
    swipeToSlide: true,
    dots: false,
    asNavFor: mainSlider.current ? mainSlider.current : undefined,
  };

  return (
    <section className="w-full bg-gray-900 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Explore Our Work
          </h2>
        </div>

        {/* Main Slider */}
        <Slider
          {...mainSettings}
          ref={mainSlider}
          className="overflow-hidden rounded-2xl shadow-2xl"
        >
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail Slider */}
        <div className="mt-6 -mx-1">
          <Slider {...thumbSettings} ref={thumbSlider}>
            {images.map((src, index) => (
              <div key={index} className="px-1">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-20 w-full cursor-pointer object-cover border-2 transition ${
                    index === currentSlide ? "border-white" : "border-gray-600"
                  }`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
