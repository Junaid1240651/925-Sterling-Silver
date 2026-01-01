import { memo } from "react";
import { motion } from "framer-motion";
import { Award, Gem, Leaf, Shield } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

const features = [
  {
    icon: Gem,
    title: "925 Sterling Silver",
    description: "Pure 92.5% silver content for lasting quality",
  },
  {
    icon: Award,
    title: "BIS Hallmarked",
    description: "Government certified purity on every piece",
  },
  {
    icon: Shield,
    title: "2 Year Warranty",
    description: "Comprehensive warranty on all products",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Ethically sourced & eco-friendly packaging",
  },
];

function AboutComponent() {
  return (
    <section
      className="py-10 sm:py-14 md:py-16 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {/* Background decorative element */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5"
        style={{
          background: `radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)`,
        }}
      />

      <Container>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left - Image collage */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              {/* Main large image */}
              <motion.div
                className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=500&fit=crop"
                  alt="Silver jewelry crafting"
                  className="w-full h-40 sm:h-52 md:h-64 object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Two smaller images */}
              <motion.div
                className="rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop"
                  alt="Silver bracelet detail"
                  className="w-full h-28 sm:h-32 md:h-40 object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                className="rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"
                  alt="Ring collection"
                  className="w-full h-28 sm:h-32 md:h-40 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 right-0 sm:-bottom-6 sm:right-4 md:right-8 p-3 sm:p-4 md:p-6 rounded-lg shadow-xl cursor-pointer"
              style={{ backgroundColor: "var(--color-bg-white)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-accent)",
                }}
              >
                50K+
              </div>
              <div
                className="text-xs sm:text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Happy Customers
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Our Story
            </motion.span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 md:mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Crafting Timeless
              <br />
              <span style={{ color: "var(--color-accent)" }}>Elegance</span>
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Founded with a passion for exceptional craftsmanship, 925sterlingvibes
              brings you BIS hallmarked jewelry that transcends trends. Every piece tells a story of dedication and timeless beauty.
            </p>
            <p
              className="text-xs sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Trusted by over 50,000 customers across India, we deliver authentic
              925 sterling silver with a promise of excellence.
            </p>

            <Button variant="primary" size="lg">
              Discover Our Heritage
            </Button>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-14 md:mt-16 lg:mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-bg-white)" }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <feature.icon
                  size={20}
                  className="sm:w-6 sm:h-6 md:w-7 md:h-7"
                  style={{ color: "var(--color-accent)" }}
                />
              </motion.div>
              <h3
                className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-1 sm:mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[10px] sm:text-xs md:text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const About = memo(AboutComponent);
