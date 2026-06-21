"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { TestimonialStack, type Testimonial } from "@/components/ui/glass-testimonial-swiper";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";

const BRAND = "#2B7AB5";
const TEAL  = "#3D9AB0";

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    initials: "HM",
    name: "Hamza Mohamed",
    role: "Google Review",
    quote: "Thank you for your dedication, work ethic, and focus on client satisfaction in navigating the winter storm on short notice. Your efforts were instrumental in helping us meet our deadlines.",
    avatarGradient: "linear-gradient(135deg, #1A5A8A 0%, #0D2A4A 100%)",
    tags: [{ text: "Short Notice", type: "featured" }, { text: "Reliable", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 2,
    initials: "LT",
    name: "Latasha Thomas",
    role: "Google Review",
    quote: "This company exceeded my expectations! The owner and his crew handled my daughter's move with professionalism, efficiency, and care. There were no delays or issues—just honest, dependable service. A true blessing, and I highly recommend them!",
    avatarGradient: `linear-gradient(135deg, ${TEAL} 0%, #1A5A6A 100%)`,
    tags: [{ text: "Professional", type: "featured" }, { text: "Family Move", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 3,
    initials: "KA",
    name: "Kiara Alexander",
    role: "Google Review",
    quote: "The moving company helped me tremendously! They were able to book me in less than 24 hours after I reached out and even arrived early. The team was polite, professional, and worked quickly.",
    avatarGradient: `linear-gradient(135deg, ${BRAND} 0%, #1A3A6A 100%)`,
    tags: [{ text: "Same Day", type: "featured" }, { text: "Early Arrival", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 4,
    initials: "VT",
    name: "Victoria Tesema",
    role: "Google Review",
    quote: "Amazing service!! Eli took care of my sister and I on a big move!! They helped us move a big load of furniture and appliances! Not a scratch or complaint! A very pleasant experience!!! We will definitely recommend to friends and family for future moves!!",
    avatarGradient: "linear-gradient(135deg, #2A6A8A 0%, #0D3A5A 100%)",
    tags: [{ text: "No Damage", type: "featured" }, { text: "Heavy Items", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 5,
    initials: "LW",
    name: "LaTonya Wright",
    role: "Google Review",
    quote: "Saved the day!! This moving company showed up within a few hours after another moving company cancelled last minute! Quality work and efficient. Eli and his crew are definitely worth doing business with!!",
    avatarGradient: `linear-gradient(135deg, #1A4A7A 0%, #0D2040 100%)`,
    tags: [{ text: "Last Minute", type: "featured" }, { text: "Saved the Day", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 6,
    initials: "CG",
    name: "Cat Girl",
    role: "Google Review",
    quote: "I called them 2 days before I needed to move, they were able to schedule me right away. They showed up exactly at the scheduled time and worked so fast! Highly recommend them to anyone needing to move.",
    avatarGradient: `linear-gradient(135deg, ${BRAND} 0%, #1A4A7A 100%)`,
    tags: [{ text: "On Time", type: "featured" }, { text: "Fast Service", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 7,
    initials: "CG",
    name: "Cheryl Gannaway",
    role: "Google Review",
    quote: "I would highly recommend this Company. I called them at the last minute and when everyone else told me no they said yes. They showed up right on time and were very professional and helpful. Thank you Eli.",
    avatarGradient: "linear-gradient(135deg, #2A5A7A 0%, #0D2A40 100%)",
    tags: [{ text: "Last Minute", type: "featured" }, { text: "Professional", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 8,
    initials: "TS",
    name: "Thomas Scott",
    role: "Google Review",
    quote: "Eli and his crew came through for me when I needed them the most. I was referred by a good friend and I understand why. Reliable is exactly what you get!",
    avatarGradient: `linear-gradient(135deg, ${TEAL} 0%, #0D3A4A 100%)`,
    tags: [{ text: "Referred", type: "featured" }, { text: "Reliable", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 9,
    initials: "DW",
    name: "Devion Williams",
    role: "Google Review",
    quote: "Personable. Punctual. Professional. Took great care of the items and were wonderful to my grandmother. If I could give 6 stars I would.",
    avatarGradient: "linear-gradient(135deg, #1A6A8A 0%, #0D3050 100%)",
    tags: [{ text: "6-Star Service", type: "featured" }, { text: "Careful", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 10,
    initials: "NP",
    name: "Nashena Parris",
    role: "Google Review",
    quote: "On moving day, the crew arrived on time, fully prepared and ready to work. They handled all of my belongings with care, making sure that nothing was damaged in transit. The movers were professional, efficient and courteous throughout.",
    avatarGradient: `linear-gradient(135deg, ${BRAND} 0%, #0D2A5A 100%)`,
    tags: [{ text: "On Time", type: "featured" }, { text: "No Damage", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 11,
    initials: "LS",
    name: "Ludmilla Samson",
    role: "Google Review",
    quote: "These guys are awesome! They gave us the final price upfront, without hidden fees, just a flat rate for a specific job. The fee was very reasonable. They even showed up early!",
    avatarGradient: "linear-gradient(135deg, #2A4A7A 0%, #0D1A40 100%)",
    tags: [{ text: "Flat Rate", type: "featured" }, { text: "No Hidden Fees", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 12,
    initials: "JN",
    name: "Jessica Nicole",
    role: "Google Review",
    quote: "This team was amazing! I basically had to pack my entire house and workshop by myself and these folks went the extra mile to help me and were a huge stress relief. I cannot imagine any other moving service being as considerate and accommodating. Forever grateful!",
    avatarGradient: `linear-gradient(135deg, ${TEAL} 0%, #0D2A3A 100%)`,
    tags: [{ text: "Above & Beyond", type: "featured" }, { text: "Stress Relief", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 13,
    initials: "DT",
    name: "Demi Tomlin",
    role: "Google Review",
    quote: "Amazing responsiveness! Respectful, fast and reliable. They literally made my day and were extremely accommodating! Book them now.",
    avatarGradient: "linear-gradient(135deg, #1A4A8A 0%, #0D2050 100%)",
    tags: [{ text: "Fast Response", type: "featured" }, { text: "Accommodating", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 14,
    initials: "KL",
    name: "Kristin L.",
    role: "Google Review",
    quote: "Fantastic. I moved from New York to Georgia and they were already in the area. I was happy I found them at the last minute.",
    avatarGradient: `linear-gradient(135deg, ${BRAND} 0%, #0D2A4A 100%)`,
    tags: [{ text: "Long Distance", type: "featured" }, { text: "NY to GA", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
  {
    id: 15,
    initials: "KW",
    name: "Kaye Whitaker",
    role: "Google Review",
    quote: "The Moving Company LLC did an absolutely amazing job! From beginning to end, the team was professional, courteous, and efficient. Mr. Eli and his crew arrived on time, handled every item with care, and made the entire process seamless.",
    avatarGradient: "linear-gradient(135deg, #2A6A7A 0%, #0D3040 100%)",
    tags: [{ text: "Seamless", type: "featured" }, { text: "Professional", type: "default" }],
    stats: [{ icon: StarIcon, text: "5.0 Stars" }, { icon: MapPin, text: "Google Review" }],
  },
];

const STATS = [
  { value: "5.0",     label: "Google Rating",     highlight: true  },
  { value: "24/7",    label: "Service Available",  highlight: false },
  { value: "ATL",     label: "Proud to Serve",     highlight: false },
];

export default function MovingTestimonials() {
  const headRef   = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  const headIn   = useInView(headRef,   { once: true, margin: "-80px" });
  const statsIn  = useInView(statsRef,  { once: true, margin: "-80px" });
  const swiperIn = useInView(swiperRef, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden moving-reviews"
      style={{ padding: "120px 0", background: "#070E18" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(43,122,181,0.05) 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">

        <motion.div
          ref={headRef}
          initial="hidden" animate={headIn ? "visible" : "hidden"} variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="font-semibold tracking-[0.25em] mb-4" style={{ fontSize: 11, color: TEAL }}>
            REAL REVIEWS
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-white font-bold tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
            What Our Customers Say.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-light" style={{ fontSize: 17, color: "#7A9BB5" }}>
            Trusted by hundreds of Atlanta families and businesses.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial="hidden" animate={statsIn ? "visible" : "hidden"} variants={stagger}
          className="grid grid-cols-3 gap-8 mb-20 text-center"
        >
          {STATS.map(({ value, label, highlight }) => (
            <motion.div key={label} variants={scaleIn} className="flex flex-col items-center">
              <span
                className="font-extrabold leading-none mb-2"
                style={{ fontSize: "clamp(28px, 5vw, 64px)", color: highlight ? BRAND : "#FFFFFF" }}
              >
                {value}
              </span>
              <span style={{ fontSize: 13, color: "#7A9BB5" }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ borderTop: "1px solid #1A2E3E", marginBottom: 48 }} />

        <motion.div
          ref={swiperRef}
          initial={{ opacity: 0, y: 40 }}
          animate={swiperIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.2 }}
        >
          <TestimonialStack testimonials={TESTIMONIALS} visibleBehind={2} />
        </motion.div>
      </div>

      {/* Override pagination dot color for this section */}
      <style>{`.moving-reviews .pagination-dot.active { background: #2B7AB5; }`}</style>
    </section>
  );
}
