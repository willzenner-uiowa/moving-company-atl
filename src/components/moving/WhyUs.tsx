"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Star, Zap, DollarSign } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";

const BRAND = "#2B7AB5";
const TEAL  = "#3D9AB0";

const REASONS = [
  {
    icon: Clock,
    title: "24 Hour Service",
    subtitle: "Available Around the Clock",
    desc: "Whether it's 2 PM or 2 AM, we're ready to move you. Our team is available 24 hours a day, 7 days a week — because life doesn't always move on a schedule.",
  },
  {
    icon: Star,
    title: "5-Star Rated on Google",
    subtitle: "Trusted by Atlanta Families",
    desc: "Our reviews speak for themselves. Hundreds of satisfied customers across Atlanta trust us with their most important belongings.",
  },
  {
    icon: Zap,
    title: "Same Day Moves",
    subtitle: "When You Need It Now",
    desc: "Last-minute move? No problem. Call us today and we'll be there. We specialize in fast, efficient same-day service across Atlanta.",
  },
  {
    icon: DollarSign,
    title: "Free Quotes — Best Prices",
    subtitle: "No Hidden Fees. Ever.",
    desc: "Get a free, transparent quote with no surprises. We offer the best prices in Atlanta without compromising on quality or care.",
  },
];

export default function MovingWhyUs() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headIn  = useInView(headRef, { once: true, margin: "-80px" });
  const gridIn  = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="relative w-full overflow-hidden" style={{ padding: "120px 0", background: "#0C1822" }}>

      {/* Background — job photo 1 as subtle accent */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/moving-job1.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Brand glow overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(43,122,181,0.05) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">

        <motion.div
          ref={headRef}
          initial="hidden" animate={headIn ? "visible" : "hidden"} variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="font-semibold tracking-[0.25em] mb-4" style={{ fontSize: 11, color: TEAL }}>
            WHY CHOOSE US
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-white font-bold tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            The Atlanta Standard.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-light max-w-xl mx-auto" style={{ fontSize: 17, color: "#7A9BB5" }}>
            We don&apos;t just move boxes. We move lives — with care, speed, and professionalism every time.
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial="hidden" animate={gridIn ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {REASONS.map(({ icon: Icon, title, subtitle, desc }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex gap-5 p-7"
              style={{
                background: "rgba(43,122,181,0.06)",
                border: "1px solid rgba(43,122,181,0.15)",
                borderRadius: 2,
              }}
            >
              {/* Icon */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{ width: 52, height: 52, background: "rgba(43,122,181,0.12)", border: `1px solid rgba(43,122,181,0.25)` }}
              >
                <Icon size={24} color={BRAND} strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-bold mb-0.5" style={{ fontSize: 19 }}>{title}</h3>
                <p className="font-medium mb-2" style={{ fontSize: 12, color: TEAL, letterSpacing: "0.05em" }}>{subtitle}</p>
                <p className="font-light leading-[1.7]" style={{ fontSize: 14, color: "#7A9BB5" }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
