import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { useComingSoon } from "../../context/ComingSoonContext";

function NewsletterComponent() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { openModal } = useComingSoon();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Show coming soon modal after submission
      setTimeout(() => {
        openModal();
        // Reset form after modal
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 1000);
      }, 1000);
    },
    [email, openModal]
  );

  return (
    <section
      className="py-8 sm:py-10 md:py-14 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      {/* Background decorative elements - ALL VISIBLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 lg:-top-20 lg:-left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div
          className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 md:-bottom-16 md:-right-16 lg:-bottom-20 lg:-right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "var(--color-accent)" }}
        />

        {/* Floating sparkles - ALL VISIBLE, just smaller on mobile */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <Sparkles
              size={10 + i * 2}
              className="sm:w-4 sm:h-4 md:w-5 md:h-5"
              style={{ color: "var(--color-primary)" }}
            />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center px-1 sm:px-2">
          {/* Icon */}
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Mail size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: "var(--color-bg-dark)" }} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 md:mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-light)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join the Inner Circle
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[10px] sm:text-xs md:text-sm lg:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Subscribe for exclusive access to new collections, special offers,
            and styling tips. Be the first to know about our latest creations.
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3.5 lg:py-4 rounded-sm text-xs sm:text-sm md:text-base outline-none transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  color: "var(--color-text-primary)",
                  border: "2px solid transparent",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-accent)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "transparent";
                }}
                disabled={isSubmitting || isSubmitted}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 rounded-sm font-medium text-xs sm:text-sm md:text-base flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              style={{
                backgroundColor: isSubmitted
                  ? "#22c55e"
                  : "var(--color-accent)",
                color: "var(--color-text-light)",
              }}
              whileHover={
                !isSubmitting && !isSubmitted
                  ? {
                      scale: 1.02,
                      backgroundColor: "var(--color-accent-light)",
                    }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : isSubmitted ? (
                <>
                  <Check size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Privacy note */}
          <motion.p
            className="text-[8px] sm:text-[10px] md:text-xs mt-2 sm:mt-3 md:mt-4"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </motion.p>

          {/* Benefits - ALL VISIBLE */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-4 sm:mt-6 md:mt-8 lg:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {[
              "Early Access",
              "Exclusive Discounts",
              "Style Guides",
              "New Arrivals",
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <span
                  className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export const Newsletter = memo(NewsletterComponent);
