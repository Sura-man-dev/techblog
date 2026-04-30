"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { heroSlides } from "@/data/content";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 shadow-[0_25px_80px_-40px_rgba(99,102,241,0.55)]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[520px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="hero-slide-image object-cover transition-transform duration-[7000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/35" />

              <div className="relative z-10 flex min-h-[380px] items-center px-6 py-12 sm:min-h-[480px] sm:px-10 lg:min-h-[520px] lg:px-14">
                <div className="hero-slide-content max-w-3xl">
                  <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.17em] text-indigo-100 sm:text-sm">
                    Premium Tech Stories
                  </p>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.ctaHref}
                      className="inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:bg-indigo-400"
                    >
                      {slide.ctaLabel}
                    </Link>
                    <Link
                      href="/videos"
                      className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Watch Video
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
