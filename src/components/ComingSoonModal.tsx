import { memo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Sparkles } from "lucide-react";
import { useComingSoon } from "../context/ComingSoonContext";

function ComingSoonModalComponent() {
  const { isOpen, closeModal } = useComingSoon();

  // Close on escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "var(--color-overlay)" }}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-lg shadow-2xl"
              style={{ backgroundColor: "var(--color-modal-bg)" }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Silver shimmer border effect */}
              <div
                className="absolute inset-0 rounded-lg animate-silver-shimmer"
                style={{
                  background: "var(--gradient-silver)",
                  backgroundSize: "200% 100%",
                  padding: "2px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 z-10"
                aria-label="Close modal"
              >
                <X size={20} style={{ color: "var(--color-text-secondary)" }} />
              </button>

              {/* Content */}
              <div className="relative p-8 pt-12 text-center">
                {/* Animated icon container */}
                <motion.div
                  className="relative w-24 h-24 mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.1,
                    damping: 15,
                  }}
                >
                  {/* Sparkle decorations */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: [0, 15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles
                      size={20}
                      style={{ color: "var(--color-accent)" }}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-2"
                    animate={{
                      rotate: [0, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Sparkles
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </motion.div>

                  {/* Main rocket icon */}
                  <motion.div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-white) 100%)",
                      boxShadow: "var(--shadow-lg)",
                    }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Rocket
                      size={40}
                      style={{ color: "var(--color-primary-dark)" }}
                      className="-rotate-45"
                    />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-2xl md:text-3xl mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-text-primary)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Coming Soon
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  className="text-base mb-6"
                  style={{ color: "var(--color-text-secondary)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  We're crafting something special for you.
                  <br />
                  Stay tuned for our exclusive collection!
                </motion.p>

                {/* Decorative silver line */}
                <motion.div
                  className="h-0.5 w-16 mx-auto mb-6 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />

                {/* Email signup teaser */}
                <motion.div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Want to be the first to know?
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Subscribe to our newsletter below!
                  </p>
                </motion.div>

                {/* Close button at bottom */}
                <motion.button
                  className="mt-6 px-8 py-3 rounded-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-btn-primary-bg)",
                    color: "var(--color-btn-primary-text)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "var(--color-btn-primary-hover)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const ComingSoonModal = memo(ComingSoonModalComponent);
