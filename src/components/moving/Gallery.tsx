"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const IMAGES = [
  "/images/moving-gallery1.jpg",
  "/images/moving-gallery3.jpg",
  "/images/moving-gallery4.jpg",
  "/images/moving-gallery5.jpg",
  "/images/moving-gallery6.jpg",
  "/images/moving-gallery7.jpg",
  "/images/moving-gallery8.jpg",
  "/images/moving-gallery9.jpg",
  "/images/moving-gallery10.jpg",
  "/images/moving-gallery11.jpg",
  "/images/moving-gallery12.jpg",
];

export default function MovingGallery() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headIn  = useInView(headRef, { once: true, margin: "-80px" });
  const gridIn  = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="w-full" style={{ padding: "100px 0", background: "#070E18", borderTop: "1px solid rgba(43,122,181,0.1)" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-center mb-14"
        >
          <p className="font-semibold tracking-[0.25em] mb-4" style={{ fontSize: 11, color: "#3D9AB0" }}>
            OUR WORK
          </p>
          <h2 className="text-white font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Moves We&apos;re Proud Of.
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              animate={gridIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.05 }}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/3", background: "#0C1822", border: "1px solid rgba(43,122,181,0.12)" }}
            >
              <Image
                src={src}
                alt={`Moving job photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
