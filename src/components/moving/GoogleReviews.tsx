"use client";

import { motion } from "framer-motion";

const BRAND = "#2B7AB5";
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/place/The+Moving+Company/@33.9605647,-84.2029071,11z/data=!4m18!1m9!3m8!1s0xadbf9397e283e693:0xa149df7ff17cb0dd!2sThe+Moving+Company!8m2!3d33.9606745!4d-84.0380985!9m1!1b1!16s%2Fg%2F11y4yl9zkw!3m7!1s0xadbf9397e283e693:0xa149df7ff17cb0dd!8m2!3d33.9606745!4d-84.0380985!9m1!1b1!16s%2Fg%2F11y4yl9zkw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";

const GoogleLogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#F5C518" : "none"} stroke={filled ? "none" : "#F5C518"} strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function MovingGoogleReviews() {
  return (
    <section className="w-full" style={{ background: "#060C14", borderBottom: "1px solid rgba(43,122,181,0.12)" }}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5"
        >
          <div className="flex items-center justify-center w-12 h-12 shrink-0" style={{ background: "#fff", borderRadius: 4 }}>
            <GoogleLogoIcon />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              {[0,1,2,3,4].map(i => <StarIcon key={i} filled />)}
              <span className="font-black text-white ml-2" style={{ fontSize: 20 }}>5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold" style={{ fontSize: 14, color: "#A0B8CC" }}>84 Google Reviews</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>·</span>
              <span className="font-semibold" style={{ fontSize: 14, color: "#A0B8CC" }}>Google Verified</span>
            </div>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(245,197,24,0.25)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 font-bold text-white shrink-0"
          style={{ padding: "14px 28px", background: BRAND, fontSize: 15, borderRadius: 0, border: "2px solid rgba(245,197,24,0.4)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Leave Us a Google Review
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
