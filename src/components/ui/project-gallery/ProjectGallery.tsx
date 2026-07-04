"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: { src: string; alt: string }[];
}

export const ProjectGallery = ({ images }: Props) => {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative w-full aspect-video overflow-hidden border border-line/8"
        style={{ boxShadow: "0 0 40px rgba(183,153,255,0.12), 0 0 80px rgba(201,101,234,0.06)" }}
      >
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          className="object-cover object-top transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 aspect-video overflow-hidden border transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50
                ${i === active
                  ? "border-brand/60 opacity-100"
                  : "border-line/8 opacity-40 hover:opacity-70"
                }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="15vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
