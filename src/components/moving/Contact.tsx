"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

const BRAND = "#2B7AB5";
const TEAL  = "#3D9AB0";

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(43,122,181,0.06)",
  border: "1px solid #1A2E3E",
  borderRadius: 2,
  padding: "14px 16px",
  fontSize: 15,
  color: "#FFFFFF",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

function Field({
  label, name, type = "text", value, onChange, placeholder, required = false,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" style={{ fontSize: 13, color: "#7A9BB5", letterSpacing: "0.04em" }}>
        {label}{required && <span style={{ color: BRAND }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, borderColor: focused ? BRAND : "#1A2E3E" }}
      />
    </div>
  );
}

export default function MovingContact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", moveDate: "",
    origin: "", destination: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const [msgFocused, setMsgFocused] = useState(false);

  return (
    <section id="contact" className="w-full" style={{ padding: "120px 0", background: "#0C1822" }}>
      <div className="mx-auto max-w-3xl px-6 md:px-10">

        <motion.div
          ref={ref}
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="font-semibold tracking-[0.25em] mb-4" style={{ fontSize: 11, color: TEAL }}>
            GET IN TOUCH
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-white font-bold tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
            Get a Free Quote.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-light" style={{ fontSize: 17, color: "#7A9BB5" }}>
            Fill out the form below and we&apos;ll get back to you fast — or call us directly at{" "}
            <a href="tel:4706587092" className="font-semibold hover:underline" style={{ color: BRAND }}>470-658-7092</a>.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="flex flex-col items-center justify-center text-center py-20 gap-6"
                style={{ border: "1px solid #1A2E3E", background: "rgba(43,122,181,0.05)" }}
              >
                <CheckCircle size={52} color={BRAND} strokeWidth={1.5} />
                <h3 className="text-white font-bold" style={{ fontSize: 26 }}>Request Received!</h3>
                <p className="font-light max-w-sm" style={{ fontSize: 16, color: "#7A9BB5" }}>
                  We&apos;ll be in touch shortly. For urgent moves, call us directly at{" "}
                  <a href="tel:4706587092" className="font-semibold hover:underline" style={{ color: BRAND }}>470-658-7092</a>.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                  <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(470) 000-0000" required />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@email.com" required />
                  <Field label="Move Date" name="moveDate" type="date" value={form.moveDate} onChange={handleChange} required />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Moving From" name="origin" value={form.origin} onChange={handleChange} placeholder="City, State or ZIP" required />
                  <Field label="Moving To" name="destination" value={form.destination} onChange={handleChange} placeholder="City, State or ZIP" required />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium" style={{ fontSize: 13, color: "#7A9BB5", letterSpacing: "0.04em" }}>
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your move — home size, special items, any details that help us prepare..."
                    rows={4}
                    onFocus={() => setMsgFocused(true)}
                    onBlur={() => setMsgFocused(false)}
                    style={{
                      ...inputBase,
                      borderColor: msgFocused ? BRAND : "#1A2E3E",
                      resize: "vertical",
                    } as React.CSSProperties}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex items-center justify-center gap-3 text-white font-semibold text-[16px] mt-2"
                  style={{ padding: "18px", borderRadius: 0, background: BRAND }}
                >
                  <Send size={16} />
                  Send My Request
                </motion.button>

                <p className="text-center font-light" style={{ fontSize: 12, color: "#4A6A7A" }}>
                  No spam. We only use your info to follow up on your move request.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Google Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 pt-12"
          style={{ borderTop: "1px solid rgba(43,122,181,0.15)" }}
        >
          <p className="font-light text-center" style={{ fontSize: 16, color: "#7A9BB5" }}>
            Happy with your move? Let others know.
          </p>
          <motion.a
            href="https://www.google.com/maps/place/The+Moving+Company/@33.9605647,-84.2029071,11z/data=!4m18!1m9!3m8!1s0xadbf9397e283e693:0xa149df7ff17cb0dd!2sThe+Moving+Company!8m2!3d33.9606745!4d-84.0380985!9m1!1b1!16s%2Fg%2F11y4yl9zkw!3m7!1s0xadbf9397e283e693:0xa149df7ff17cb0dd!8m2!3d33.9606745!4d-84.0380985!9m1!1b1!16s%2Fg%2F11y4yl9zkw?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(245,197,24,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 font-bold text-white shrink-0"
            style={{ padding: "14px 28px", background: BRAND, fontSize: 15, borderRadius: 0, border: "2px solid rgba(245,197,24,0.35)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Leave Us a Google Review
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
