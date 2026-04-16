import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Shield, Award } from "lucide-react";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { useComingSoon } from "../../context/ComingSoonContext";
import { PUBLIC_SUPPORT_EMAIL } from "../../lib/contactApi";

const footerLinks = {
  shop: [
    { label: "New Arrivals", id: "new" },
    { label: "Rings", id: "rings" },
    { label: "Necklaces", id: "necklaces" },
    { label: "Earrings", id: "earrings" },
    { label: "Bracelets", id: "bracelets" },
    { label: "Gift Sets", id: "gifts" },
  ],
  about: [
    { label: "Our Story", id: "story" },
    { label: "Craftsmanship", id: "craft" },
    { label: "Sustainability", id: "sustain" },
    { label: "Careers", id: "careers" },
    { label: "Press", id: "press" },
  ],
  help: [
    { label: "Contact Us", id: "contact" },
    { label: "FAQs", id: "faq" },
    { label: "Shipping", id: "shipping" },
    { label: "Returns", id: "returns" },
    { label: "Size Guide", id: "size" },
  ],
};

const socialLinks = [
  { Icon: Instagram, label: "Instagram", id: "instagram" },
  { Icon: Facebook, label: "Facebook", id: "facebook" },
  { Icon: Twitter, label: "Twitter", id: "twitter" },
];

function scrollToContactTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function FooterComponent() {
  const { openModal } = useComingSoon();

  return (
    <footer
      className="pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-4 sm:pb-6 md:pb-8"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      <Container>
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 border-b border-gray-700">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div
              className="mb-2 sm:mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Full brand name on all screens */}
              <Logo size="sm" variant="full" color="light" />
            </motion.div>
            <p
              className="text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 md:mb-6 max-w-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              India's trusted destination for authentic 925 sterling silver jewelry. 
              BIS hallmarked, crafted with love.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
              <div
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Shield size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: "var(--color-accent)" }} />
                <span
                  className="text-[8px] sm:text-[10px] md:text-xs font-medium"
                  style={{ color: "var(--color-text-light)" }}
                >
                  BIS Hallmark
                </span>
              </div>
              <div
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Award size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: "var(--color-accent)" }} />
                <span
                  className="text-[8px] sm:text-[10px] md:text-xs font-medium"
                  style={{ color: "var(--color-text-light)" }}
                >
                  925 Certified
                </span>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <a
                href={`mailto:${PUBLIC_SUPPORT_EMAIL}`}
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm transition-colors duration-200 cursor-pointer hover:text-white"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Mail size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                {PUBLIC_SUPPORT_EMAIL}
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm transition-colors duration-200 cursor-pointer hover:text-white"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Phone size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                +91 98765 43210
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm transition-colors duration-200 cursor-pointer hover:text-white"
                style={{ color: "var(--color-text-muted)" }}
              >
                <MapPin size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                Mumbai, Maharashtra
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
              {socialLinks.map(({ Icon, label, id }) => (
                <motion.button
                  key={id}
                  className="p-1 sm:p-1.5 md:p-2 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "var(--color-text-light)",
                  }}
                  onClick={openModal}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--color-accent)",
                  }}
                  aria-label={label}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 md:mb-4"
              style={{ color: "var(--color-text-light)" }}
            >
              Shop
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={openModal}
                    className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200 hover:text-white cursor-pointer"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div>
            <h3
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 md:mb-4"
              style={{ color: "var(--color-text-light)" }}
            >
              About
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={openModal}
                    className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200 hover:text-white cursor-pointer"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links - HIDDEN on mobile, visible on md+ */}
          <div className="hidden md:block">
            <h3
              className="text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 md:mb-4"
              style={{ color: "var(--color-text-light)" }}
            >
              Help
            </h3>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.id}>
                  {link.id === "contact" ? (
                    <Link
                      to="/contact"
                      onClick={scrollToContactTop}
                      className="text-xs md:text-sm transition-colors duration-200 hover:text-white cursor-pointer inline-block"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={openModal}
                      className="text-xs md:text-sm transition-colors duration-200 hover:text-white cursor-pointer"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:hidden pb-4 border-b border-gray-700">
          <Link
            to="/contact"
            onClick={scrollToContactTop}
            className="text-xs font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "var(--color-accent)" }}
          >
            Contact us & support →
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 sm:pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <p
            className="text-[8px] sm:text-[10px] md:text-xs text-center md:text-left"
            style={{ color: "var(--color-text-muted)" }}
          >
            © 2024 925sterlingvibes. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <button
              onClick={openModal}
              className="text-[8px] sm:text-[10px] md:text-xs transition-colors duration-200 hover:text-white cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
            >
              Privacy Policy
            </button>
            <button
              onClick={openModal}
              className="text-[8px] sm:text-[10px] md:text-xs transition-colors duration-200 hover:text-white cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
            >
              Terms of Service
            </button>
            <button
              onClick={openModal}
              className="text-[8px] sm:text-[10px] md:text-xs transition-colors duration-200 hover:text-white cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
            >
              Refund Policy
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
