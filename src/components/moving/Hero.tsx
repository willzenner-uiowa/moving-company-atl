"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BRAND   = "#2B7AB5";
const TEAL    = "#3D9AB0";

const HERO_STYLES = `
  .mv-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 3; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="nf"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23nf)"/></svg>');
  }
  .mv-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(43,122,181,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(43,122,181,0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%);
  }
  @keyframes mvScroll {
    0%   { transform: scaleY(0); opacity: 0;   transform-origin: top; }
    40%  { transform: scaleY(1); opacity: 1;   transform-origin: top; }
    80%  { transform: scaleY(1); opacity: 0.3; transform-origin: bottom; }
    100% { transform: scaleY(0); opacity: 0;   transform-origin: bottom; }
  }
  .mv-scroll-line { animation: mvScroll 2.2s ease-in-out infinite; }
`;

type D = {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number; transition: { duration: number; ease: [number,number,number,number]; delay: number } };
};

const d = (delay: number): D => ({
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay } },
});

export default function MovingHero() {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#070E18" }}
    >
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />

      {/* Background — moving job photo */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/moving-job2.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(7,14,24,0.92) 0%, rgba(7,14,24,0.75) 100%)" }}
        aria-hidden
      />

      {/* Brand glow */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(43,122,181,0.08) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="mv-grain" aria-hidden />
      <div className="mv-grid absolute inset-0 z-2 pointer-events-none" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Phone — first prominent element */}
        <motion.a
          href="tel:4706587092"
          initial="hidden" animate="visible" variants={d(0)}
          whileHover={{ scale: 1.03 }}
          className="text-white font-black tracking-tight mb-5 inline-block"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.01em" }}
        >
          (470) 658-7092
        </motion.a>

        {/* Overline */}
        <motion.p
          initial="hidden" animate="visible" variants={d(0.1)}
          className="font-semibold tracking-[0.25em] mb-6"
          style={{ fontSize: 11, color: TEAL }}
        >
          ATLANTA&apos;S PREMIER MOVING COMPANY — OPEN 24 HOURS
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial="hidden" animate="visible" variants={d(0.2)}
          className="text-white font-extrabold leading-[0.95] tracking-[-0.03em] block"
          style={{ fontSize: "clamp(36px, 7vw, 80px)" }}
        >
          Where Moving Meets
        </motion.h1>
        <motion.h1
          initial="hidden" animate="visible" variants={d(0.35)}
          className="font-extrabold leading-[0.95] tracking-[-0.03em] block mb-7"
          style={{ fontSize: "clamp(36px, 7vw, 80px)", color: BRAND }}
        >
          Peace of Mind.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial="hidden" animate="visible" variants={d(0.5)}
          className="font-light leading-[1.7] max-w-[540px] mb-10"
          style={{ fontSize: 18, color: "#A0B8CC" }}
        >
          Fast &bull; Reliable &bull; Affordable — Atlanta&apos;s trusted moving team for local, long-distance, and same-day moves.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial="hidden" animate="visible" variants={d(0.65)}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center justify-center text-white font-semibold text-[15px]"
            style={{ padding: "16px 36px", borderRadius: 0, background: BRAND }}
          >
            Get a Free Quote
          </motion.a>
          <motion.a
            href="tel:4706587092"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center justify-center text-white font-semibold text-[15px]"
            style={{ padding: "16px 36px", borderRadius: 0, border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Call 470-658-7092
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial="hidden" animate="visible" variants={d(0.8)}
          className="tracking-[0.05em]"
          style={{ fontSize: 13, color: "#7A9BB5" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={BRAND} className="inline-block relative -top-px mr-1" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          5-Star Rated · 24 Hour Service · Free Quotes · Atlanta, GA
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="tracking-[0.2em]" style={{ fontSize: 10, color: "#7A9BB5" }}>SCROLL</span>
        <div className="w-px mv-scroll-line" style={{ height: 48, background: BRAND, opacity: 0.7 }} />
      </div>
    </section>
  );
}
