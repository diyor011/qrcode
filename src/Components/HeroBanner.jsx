import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';

const HeroBanner = () => {
  const { t } = useTranslation();

  const slides = [
    '/medina4.webp',
    '/Base-img-1.jpg',
    '/umrah2.webp',
  ];

  const [activeBackground, setActiveBackground] = useState(slides[0]);

  const handleHover = (index) => {
    setActiveBackground(slides[index]);
  };

  const handleSlideChange = (swiper) => {
    setActiveBackground(slides[swiper.realIndex]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${activeBackground})` }}
      ></div>

      {/* Swiper */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        onSlideChange={handleSlideChange}
        className="absolute w-full h-full opacity-0 pointer-events-none z-0"
      >
        {slides.map((_, index) => (
          <SwiperSlide key={index}></SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 z-10"></div>

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-6 gap-6">
        {/* LEFT — City Selector */}
        <div className="flex-1 flex flex-col items-start justify-center text-white">
          <div className="flex gap-6 flex-wrap text-2xl font-semibold">
            {[t("madina"), t("makkah"), t("umrah")].map((city, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="group relative cursor-pointer"
                  onMouseEnter={() => handleHover(idx)}
                >
                  <p className="text-[28px] sm:text-[30px] font-bold hover:text-green-500 transition-all duration-300">
                    {city}
                  </p>
                  <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
                {idx !== 2 && <span className="text-[30px] hidden sm:inline">|</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-6 text-white text-sm md:text-base max-w-[400px]">
            {t("hajj_description")}
          </p>
        </div>

        {/* RIGHT — Ads Block */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px]">
          {/* Box 1 — Survey */}
          <div
            className="rounded-xl p-5 text-white text-center shadow-lg w-full"
            style={{
              backgroundImage: "url('/bg-banner.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0,0,0,0.6)"
            }}
          >
            <p className="text-lg font-bold mb-2">{t("survey_title")}</p>
            <p className="text-sm mb-4">
              {t("survey_description")}
            </p>
            <a
              href="https://nusuk.sa/survey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
            >
              {t("survey_button")}
            </a>
          </div>

          {/* Box 2 — Application Info */}
          <div className="bg-black/80 rounded-xl p-6 text-white text-center shadow-lg backdrop-blur-md w-full">
            <p className="text-sm text-gray-300 leading-relaxed max-w-[400px] mx-auto">
              {t("application_description")}
            </p>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <a
                href="https://nusuk.sa"
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {t("electronic_link")}
              </a>
              <a
                href="https://apps.apple.com/sa/app/nusuk/id6443589435"
                target="_blank"
                className="bg-white text-green-700 border border-green-700 px-4 py-2 rounded-md"
              >
                {t("nusuk_app")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
