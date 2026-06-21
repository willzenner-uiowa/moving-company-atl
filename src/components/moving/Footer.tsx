"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/motion-footer";
import Image from "next/image";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const BRAND = "#2B7AB5";
const TEAL  = "#3D9AB0";

const FOOTER_STYLES = `
@keyframes mv-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.7; }
}
@keyframes mv-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.mv-footer { font-family: var(--font-inter), Inter, system-ui, sans-serif; }
.mv-breathe { animation: mv-breathe 9s ease-in-out infinite alternate; }
.mv-marquee { animation: mv-marquee 38s linear infinite; }
.mv-glass-pill {
  background: rgba(43,122,181,0.06);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(43,122,181,0.1);
  border: 1px solid rgba(43,122,181,0.14);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mv-glass-pill:hover {
  background: rgba(43,122,181,0.14);
  border-color: rgba(43,122,181,0.35);
  color: #2B7AB5;
}
.mv-giant-text {
  font-size: 18vw; line-height: 0.75; font-weight: 900; letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(43,122,181,0.06);
  background: linear-gradient(180deg, rgba(43,122,181,0.08) 0%, transparent 60%);
  -webkit-background-clip: text; background-clip: text;
}
.mv-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(43,122,181,0.6) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 20px rgba(43,122,181,0.2));
}
.mv-footer-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(43,122,181,0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(43,122,181,0.025) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
`;

const MarqueeContent = () => (
  <div className="flex items-center space-x-10 px-6 text-xs font-bold tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: "#3A5A7A" }}>
    <span>Local Moving</span>          <span style={{ color: BRAND }}>&#9670;</span>
    <span>Long Distance</span>         <span style={{ color: BRAND }}>&#9670;</span>
    <span>Same Day Moves</span>        <span style={{ color: BRAND }}>&#9670;</span>
    <span>Packing Services</span>      <span style={{ color: BRAND }}>&#9670;</span>
    <span>Senior Moving</span>         <span style={{ color: BRAND }}>&#9670;</span>
    <span>Commercial Moves</span>      <span style={{ color: BRAND }}>&#9670;</span>
    <span>Open 24 Hours</span>         <span style={{ color: BRAND }}>&#9670;</span>
    <span>Atlanta, GA</span>           <span style={{ color: BRAND }}>&#9670;</span>
  </div>
);

const SERVICES = ["Local Moving", "Long Distance", "Same Day Moves", "Packing & Unpacking", "Furniture Assembly", "Junk Removal", "Storage Solutions", "Senior Moving", "Commercial Moving"];

export default function MovingFooter() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const linksRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo([headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />
      <div ref={wrapperRef} className="relative h-screen w-full mv-footer" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden" style={{ background: "#040A14", color: "#FFFFFF" }}>

          {/* Ambient glow */}
          <div className="mv-breathe absolute left-1/2 top-1/2 h-[50vh] w-[70vw] rounded-[50%] pointer-events-none z-0"
            style={{ background: "radial-gradient(circle, rgba(43,122,181,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
            aria-hidden />
          <div className="mv-footer-grid absolute inset-0 z-0 pointer-events-none" aria-hidden />

          {/* Giant BG text */}
          <div ref={giantTextRef} className="mv-giant-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none" aria-hidden>
            MOVING
          </div>

          {/* Marquee */}
          <div className="absolute top-12 left-0 w-full overflow-hidden py-4 z-10 -rotate-2 scale-110"
            style={{ borderTop: "1px solid #1A2E3E", borderBottom: "1px solid #1A2E3E", background: "rgba(4,10,20,0.8)", backdropFilter: "blur(12px)" }}>
            <div className="flex w-max mv-marquee">
              <MarqueeContent /><MarqueeContent />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-24 w-full max-w-5xl mx-auto">

            <div ref={headingRef} className="flex flex-col items-center mb-8">
              <div className="relative overflow-hidden mb-4" style={{ width: 60, height: 60, borderRadius: "50%" }}>
                <Image src="/images/moving-logo.jpg" alt="The Moving Company" fill className="object-cover object-center" sizes="60px" />
              </div>
              <h2 className="mv-text-glow font-black tracking-[0.08em] text-center mb-2" style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
                THE MOVING COMPANY
              </h2>
              <p className="text-center font-light italic" style={{ fontSize: 14, color: "#3A5A7A" }}>
                &ldquo;Where Moving Meets Peace of Mind&rdquo;
              </p>
            </div>

            <div ref={linksRef} className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6" style={{ borderTop: "1px solid #1A2E3E", paddingTop: 32 }}>

              {/* Services */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <span className="text-white font-semibold tracking-widest uppercase mb-1" style={{ fontSize: 11 }}>Services</span>
                {SERVICES.map((s) => (
                  <span key={s} className="font-light" style={{ fontSize: 13, color: "#3A5A7A" }}>{s}</span>
                ))}
              </div>

              {/* Contact */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-white font-semibold tracking-widest uppercase mb-1" style={{ fontSize: 11 }}>Contact</span>
                <a href="tel:4706587092" className="font-bold hover:underline" style={{ fontSize: 17, color: BRAND }}>470-658-7092</a>
                <span className="font-light" style={{ fontSize: 14, color: "#3A5A7A" }}>Open 24 Hours — 7 Days a Week</span>
                <span className="font-light" style={{ fontSize: 14, color: "#3A5A7A" }}>Free Quotes Available</span>
                <span className="font-light text-center" style={{ fontSize: 13, color: "#3A5A7A" }}>Atlanta · Marietta · Decatur · Sandy Springs</span>
              </div>

              {/* Area */}
              <div className="flex flex-col items-center sm:items-end gap-2">
                <span className="text-white font-semibold tracking-widest uppercase mb-1" style={{ fontSize: 11 }}>Service Area</span>
                {["Atlanta, GA", "Greater Metro Area", "Local & Long Distance", "Residential & Commercial"].map((a) => (
                  <span key={a} className="font-light" style={{ fontSize: 13, color: "#3A5A7A" }}>{a}</span>
                ))}
                <MagneticButton
                  as="a"
                  href="#contact"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="mv-glass-pill mt-3 flex items-center gap-2 px-5 py-2.5 rounded-full"
                  style={{ fontSize: 13, color: TEAL }}
                >
                  Get a Free Quote
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full px-6 md:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid #1A2E3E", paddingTop: 20 }}>
            <span className="font-semibold tracking-widest uppercase text-center" style={{ fontSize: 10, color: "#3A5A7A" }}>
              &copy; 2025 The Moving Company &middot; Atlanta, GA &middot; Open 24 Hours &middot; 470-658-7092
            </span>
            <MagneticButton
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mv-glass-pill w-10 h-10 rounded-full flex items-center justify-center group"
              style={{ color: "#3A5A7A" }}
              aria-label="Back to top"
            >
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
