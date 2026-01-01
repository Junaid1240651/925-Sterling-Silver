import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Award, Truck, RefreshCw, CheckCircle, Lock } from "lucide-react";

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: <Shield size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Authentic",
    description: "925 Silver",
  },
  {
    icon: <Award size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Hallmarked",
    description: "BIS Cert.",
  },
  {
    icon: <Truck size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Free Ship",
    description: "₹2,000+",
  },
  {
    icon: <RefreshCw size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Returns",
    description: "7 Days",
  },
  {
    icon: <Lock size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Secure",
    description: "SSL",
  },
  {
    icon: <CheckCircle size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    title: "Warranty",
    description: "2 Years",
  },
];

function TrustBadgesComponent() {
  return (
    <section
      className="py-4 sm:py-5 md:py-6 lg:py-8 border-y"
      style={{
        backgroundColor: "var(--color-bg-white)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-1"
            style={{ color: "var(--color-accent)" }}
          >
            Why Choose Us
          </span>
          <h2
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Trusted by Thousands
          </h2>
        </motion.div>

        {/* Badges Grid - Clean minimal cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              className="flex flex-col items-center justify-center text-center py-3 px-2 sm:py-4 sm:px-3 md:py-5 md:px-4 rounded-md cursor-pointer hover:shadow-sm transition-shadow duration-300"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div
                className="mb-1.5 sm:mb-2 p-1.5 sm:p-2 md:p-2.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  color: "var(--color-accent)",
                }}
              >
                {badge.icon}
              </div>
              <h3
                className="text-[11px] sm:text-xs md:text-sm font-medium sm:font-semibold leading-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                {badge.title}
              </h3>
              <p
                className="text-[9px] sm:text-[10px] md:text-xs leading-tight mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Full Trust Info Row - Keep as is */}
        <motion.div
          className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {/* Free Shipping */}
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
            <Truck
              size={14}
              className="sm:w-4 sm:h-4 md:w-5 md:h-5"
              style={{ color: "var(--color-accent)" }}
            />
            <div className="text-left">
              <div
                className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                Free Shipping
              </div>
              <div
                className="text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ color: "var(--color-text-muted)" }}
              >
                Above ₹2,000
              </div>
            </div>
          </div>

          <div className="w-px h-6 sm:h-7 md:h-8" style={{ backgroundColor: "var(--color-border-light)" }} />

          {/* 2 Year Warranty */}
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
            <Shield
              size={14}
              className="sm:w-4 sm:h-4 md:w-5 md:h-5"
              style={{ color: "var(--color-accent)" }}
            />
            <div className="text-left">
              <div
                className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                2 Year Warranty
              </div>
              <div
                className="text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ color: "var(--color-text-muted)" }}
              >
                Quality Assured
              </div>
            </div>
          </div>

          <div className="w-px h-6 sm:h-7 md:h-8" style={{ backgroundColor: "var(--color-border-light)" }} />

          {/* BIS Hallmark */}
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
            <Award
              size={14}
              className="sm:w-4 sm:h-4 md:w-5 md:h-5"
              style={{ color: "var(--color-accent)" }}
            />
            <div className="text-left">
              <div
                className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                BIS Hallmark
              </div>
              <div
                className="text-[8px] sm:text-[10px] md:text-xs leading-tight"
                style={{ color: "var(--color-text-muted)" }}
              >
                925 Pure Silver
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const TrustBadges = memo(TrustBadgesComponent);
