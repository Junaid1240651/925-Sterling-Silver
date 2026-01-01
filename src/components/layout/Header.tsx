import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, ShoppingBag, Heart } from "lucide-react";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { useComingSoon } from "../../context/ComingSoonContext";

const navLinks = [
  { id: "new", label: "New Arrivals" },
  { id: "rings", label: "Rings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "earrings", label: "Earrings" },
  { id: "bracelets", label: "Bracelets" },
  { id: "collections", label: "Collections" },
];

function HeaderComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useComingSoon();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    openModal();
    setIsMobileMenuOpen(false);
  }, [openModal]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{ backgroundColor: "var(--color-bg-white)" }}
    >
      {/* Top announcement bar */}
      <div
        className="py-1.5 sm:py-2 text-center text-[9px] sm:text-xs md:text-sm px-2"
        style={{
          backgroundColor: "var(--color-bg-dark)",
          color: "var(--color-text-light)",
        }}
      >
        <span className="tracking-wide">
          Free Shipping on Orders Over ₹2,000 ✨ | BIS Hallmarked Silver
        </span>
      </div>

      {/* Main header */}
      <div
        className="border-b"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <Container>
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1 sm:p-1.5 md:p-2 -ml-1 cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              ) : (
                <Menu size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              )}
            </button>

            {/* Logo - FULL brand name on all screens */}
            <motion.div
              className="flex-1 lg:flex-none text-center lg:text-left"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a
                href="/"
                className="inline-block cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Logo size="sm" variant="full" />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mx-4 xl:mx-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  className="relative text-xs xl:text-sm tracking-wide font-medium transition-colors duration-200 group cursor-pointer whitespace-nowrap"
                  style={{ color: "var(--color-text-secondary)" }}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ color: "var(--color-text-primary)" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Right icons - Search & Heart hidden on mobile */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3">
              {/* Search - hidden on mobile */}
              <motion.button
                className="p-1.5 sm:p-2 rounded-full transition-colors duration-200 hidden sm:block cursor-pointer"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={openModal}
                whileHover={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                }}
                aria-label="Search"
              >
                <Search size={18} className="md:w-5 md:h-5" />
              </motion.button>
              {/* Heart - hidden on mobile */}
              <motion.button
                className="p-1.5 sm:p-2 rounded-full transition-colors duration-200 hidden sm:block cursor-pointer"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={openModal}
                whileHover={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} className="md:w-5 md:h-5" />
              </motion.button>
              {/* User - always visible */}
              <motion.button
                className="p-1 sm:p-1.5 md:p-2 rounded-full transition-colors duration-200 cursor-pointer"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={openModal}
                whileHover={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                }}
                aria-label="Account"
              >
                <User size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              {/* Cart - always visible */}
              <motion.button
                className="p-1 sm:p-1.5 md:p-2 rounded-full transition-colors duration-200 relative cursor-pointer"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={openModal}
                whileHover={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-bg-secondary)",
                }}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                {/* Cart badge */}
                <span
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-text-light)",
                  }}
                >
                  0
                </span>
              </motion.button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="lg:hidden absolute top-full left-0 right-0 border-b shadow-lg"
            style={{
              backgroundColor: "var(--color-bg-white)",
              borderColor: "var(--color-border-light)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container>
              <div className="py-2 sm:py-3 md:py-4 space-y-0.5">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    className="block w-full text-left py-2 sm:py-2.5 md:py-3 px-2 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer rounded-md"
                    style={{ color: "var(--color-text-secondary)" }}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      color: "var(--color-text-primary)",
                      backgroundColor: "var(--color-bg-secondary)",
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                {/* Mobile search option */}
                <motion.button
                  className="flex items-center gap-2 w-full py-2 sm:py-2.5 md:py-3 px-2 text-xs sm:text-sm md:text-base font-medium cursor-pointer rounded-md"
                  style={{ color: "var(--color-text-secondary)" }}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  whileHover={{
                    color: "var(--color-text-primary)",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <Search size={14} />
                  Search
                </motion.button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export const Header = memo(HeaderComponent);
