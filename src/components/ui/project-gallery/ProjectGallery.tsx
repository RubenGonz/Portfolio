"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  images: { src: string; alt: string }[];
}

export const ProjectGallery = ({ images }: Props) => {
  const t = useTranslations("gallery");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mainLoaded, setMainLoaded] = useState(false);
  const [thumbsLoaded, setThumbsLoaded] = useState<boolean[]>(() => images.map(() => false));

  useEffect(() => {
    setMainLoaded(false);
  }, [active]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image — clickable */}
        <button
          onClick={() => setLightbox(true)}
          className="relative w-full aspect-video overflow-hidden border border-line/8 cursor-zoom-in group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          style={{ boxShadow: "var(--img-glow)" }}
          aria-label={t("expandImage")}
        >
          <div className={`img-skeleton${mainLoaded ? " loaded" : ""}`} aria-hidden="true" />
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            className="object-cover object-top transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onLoad={() => setMainLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <span className="font-inputmono text-[10px] tracking-widest uppercase text-white/0 group-hover:text-white/70 transition-colors duration-200">
              {t("expand")}
            </span>
          </div>
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-1 aspect-video overflow-hidden border transition-all duration-200 cursor-pointer
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50
                  ${i === active
                    ? "border-brand/60 opacity-100"
                    : "border-line/8 opacity-40 hover:opacity-70"
                  }`}
              >
                <div className={`img-skeleton${thumbsLoaded[i] ? " loaded" : ""}`} aria-hidden="true" />
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-top"
                  sizes="15vw"
                  onLoad={() => setThumbsLoaded((prev) => { const n = [...prev]; n[i] = true; return n; })}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={1280}
              height={720}
              className="object-contain w-full h-full max-h-[85vh]"
              priority
            />

            {/* Close */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-10 right-0 font-inputmono text-xs text-white/50 hover:text-white transition-colors tracking-widest uppercase cursor-pointer"
            >
              {t("close")}
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                  aria-label={t("previous")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 font-inputmono text-xs text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((i) => (i + 1) % images.length)}
                  aria-label={t("next")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 font-inputmono text-xs text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-inputmono text-[11px] text-white/40 tracking-widest">
              {active + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};
