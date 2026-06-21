"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const BRAND = "#2B7AB5";

const NAV_LINKS = [
  { id: "services",     label: "Services",    href: "#services"     },
  { id: "why-us",       label: "Why Us",      href: "#why-us"       },
  { id: "testimonials", label: "Reviews",     href: "#testimonials" },
  { id: "contact",      label: "Contact",     href: "#contact"      },
];

const navItems = NAV_LINKS.map(({ id, label, href }) => ({
  id,
  label,
  icon: <span className="whitespace-nowrap">{label}</span>,
  onClick: () => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
}));

const menuVariants = {
  closed: { opacity: 0, y: -16 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const itemVariants = {
  closed: { opacity: 0, x: -24 },
  open: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.08 },
  }),
};

export default function MovingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={
          scrolled
            ? { backgroundColor: "rgba(7,14,24,0.95)", backdropFilter: "blur(20px)" }
            : { backgroundColor: "rgba(7,14,24,0.85)", backdropFilter: "blur(8px)" }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ borderColor: "#1A2E3E" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10" style={{ height: 68 }}>

          {/* Brand */}
          <a href="/moving" className="flex items-center gap-3 shrink-0">
            <div className="relative shrink-0 overflow-hidden" style={{ width: 42, height: 42, borderRadius: "50%" }}>
              <Image
                src="/images/moving-logo.jpg"
                alt="The Moving Company"
                fill
                className="object-cover object-center"
                sizes="42px"
              />
            </div>
            <span
              className="text-white font-bold tracking-[0.1em] hover:text-[#2B7AB5] transition-colors hidden sm:block"
              style={{ fontSize: 14 }}
            >
              THE MOVING COMPANY
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <LimelightNav
              items={navItems}
              className="!bg-transparent !border-transparent !rounded-none !px-0"
              iconContainerClassName="px-7"
              iconClassName="!w-auto !h-auto text-white text-[14px] font-[400]"
              limelightClassName="!bg-[#2B7AB5]"
            />
          </div>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="tel:4706587092"
              className="text-white font-bold hover:text-[#2B7AB5] transition-colors"
              style={{ fontSize: 17, letterSpacing: "0.01em" }}
            >
              (470) 658-7092
            </a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={scrollToCTA}
              className="text-white font-semibold text-[14px]"
              style={{ padding: "12px 24px", borderRadius: 0, background: BRAND }}
            >
              Get a Free Quote
            </motion.button>
          </div>

          {/* Mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="moving-menu"
            initial="closed" animate="open" exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
            style={{ background: "rgba(7,14,24,0.97)", backdropFilter: "blur(24px)" }}
          >
            {NAV_LINKS.map(({ id, label, href }, i) => (
              <motion.a
                key={id} custom={i} variants={itemVariants}
                href={href}
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-white font-semibold tracking-wide transition-colors"
                style={{ fontSize: 30 }}
                whileHover={{ color: BRAND }}
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              custom={NAV_LINKS.length} variants={itemVariants}
              onClick={scrollToCTA}
              className="mt-4 text-white font-semibold text-[16px]"
              style={{ padding: "16px 40px", borderRadius: 0, background: BRAND }}
            >
              Get a Free Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
