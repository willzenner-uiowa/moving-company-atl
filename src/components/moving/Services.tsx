"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, MapPin, Zap, Box, Wrench, Trash2, Warehouse, Heart, Building2, type LucideIcon } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";

const BRAND = "#2B7AB5";
const TEAL  = "#3D9AB0";

const SERVICES: { icon: LucideIcon; name: string; desc: string }[] = [
  {
    icon: Truck,
    name: "Local Moving",
    desc: "Stress-free local moves anywhere in Atlanta and surrounding areas. We handle everything from start to finish.",
  },
  {
    icon: MapPin,
    name: "Long Distance Moving",
    desc: "Moving across state lines? Our long-distance team ensures your belongings arrive safely, on time, every time.",
  },
  {
    icon: Zap,
    name: "Same Day & Last Minute Moves",
    desc: "Need to move today? We offer same-day and last-minute moving services when life doesn't wait.",
  },
  {
    icon: Box,
    name: "Packing & Unpacking",
    desc: "Professional packing with quality materials. We protect every item — fragile or large — with expert care.",
  },
  {
    icon: Wrench,
    name: "Furniture Assembly",
    desc: "We disassemble and reassemble all furniture at origin and destination so nothing slows your move down.",
  },
  {
    icon: Trash2,
    name: "Junk Removal",
    desc: "Don't want to take it with you? We'll haul away unwanted items before or after your move, hassle-free.",
  },
  {
    icon: Warehouse,
    name: "Storage Solutions",
    desc: "Short or long-term storage options available for when your new place isn't quite ready yet.",
  },
  {
    icon: Heart,
    name: "Senior Moving",
    desc: "Patient, respectful, and gentle moving services tailored to seniors and their unique needs.",
  },
  {
    icon: Building2,
    name: "Commercial Moving",
    desc: "Office relocations handled with minimal downtime. We move businesses efficiently and professionally.",
  },
];

export default function MovingServices() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headIn  = useInView(headRef, { once: true, margin: "-80px" });
  const gridIn  = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="w-full" style={{ padding: "120px 0", background: "#070E18" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        <motion.div
          ref={headRef}
          initial="hidden" animate={headIn ? "visible" : "hidden"} variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="font-semibold tracking-[0.25em] mb-4" style={{ fontSize: 11, color: TEAL }}>
            WHAT WE OFFER
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-white font-bold tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            Every Move. Handled.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-light max-w-xl mx-auto" style={{ fontSize: 17, color: "#7A9BB5" }}>
            From a single room to a full office — we have the service you need.
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial="hidden" animate={gridIn ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map(({ icon: Icon, name, desc }) => (
            <motion.div key={name} variants={scaleIn}>
              <GlowCard glowColor="blue" customSize className="w-full min-h-[220px]">
                <div className="flex flex-col gap-3 pt-1">
                  <motion.div whileHover={{ scale: 1.12 }} transition={{ duration: 0.25 }} className="inline-block">
                    <Icon size={26} color={BRAND} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-white font-semibold leading-tight" style={{ fontSize: 17 }}>{name}</h3>
                  <p className="font-light leading-[1.7]" style={{ fontSize: 14, color: "#7A9BB5" }}>{desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
