import { memo, useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronDown,
  Package,
  UserCircle,
  MapPin,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { useComingSoon } from "../../context/ComingSoonContext";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { id: "new", label: "New Arrivals" },
  { id: "rings", label: "Rings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "earrings", label: "Earrings" },
  { id: "bracelets", label: "Bracelets" },
  { id: "collections", label: "Collections" },
];

function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const w = parts[0] || "?";
  return w.slice(0, 2).toUpperCase();
}

function HeaderComponent() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { openModal } = useComingSoon();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!profileOpen) return;
    function onDoc(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [profileOpen]);

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
              <Link to="/" className="inline-block cursor-pointer">
                <Logo size="sm" variant="full" />
              </Link>
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
              {/* Profile or Log in */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((o) => !o)}
                    className="p-0.5 sm:p-1 rounded-full transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      outlineColor: "var(--color-accent)",
                    }}
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    aria-label={`Account menu, signed in as ${user.name}`}
                  >
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border shrink-0"
                        style={{ borderColor: "var(--color-border-light)" }}
                      />
                    ) : (
                      <span
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold shrink-0"
                        style={{
                          backgroundColor: "var(--color-bg-secondary)",
                          color: "var(--color-text-primary)",
                          border: "1px solid var(--color-border-light)",
                        }}
                      >
                        {profileInitials(user.name)}
                      </span>
                    )}
                    <span className="hidden md:inline text-xs font-medium truncate max-w-[100px] text-left" style={{ color: "var(--color-text-secondary)" }}>
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      className="hidden md:block shrink-0 opacity-60"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-60 sm:w-64 max-h-[min(70vh,28rem)] overflow-y-auto rounded-md border shadow-lg py-2 z-50"
                        style={{
                          backgroundColor: "var(--color-bg-white)",
                          borderColor: "var(--color-border-light)",
                          boxShadow: "var(--shadow-lg)",
                        }}
                      >
                        <div
                          className="px-3 pb-2 mb-1 border-b"
                          style={{
                            borderColor: "var(--color-border-light)",
                          }}
                        >
                          <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                            {user.name}
                          </p>
                          <p
                            className="text-xs truncate mt-0.5"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {user.email}
                          </p>
                        </div>
                        <p
                          className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wider uppercase"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Account
                        </p>
                        <Link
                          to="/account/orders"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <Package size={16} className="shrink-0 opacity-80" aria-hidden />
                          My orders
                        </Link>
                        <Link
                          to="/account/profile"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <UserCircle size={16} className="shrink-0 opacity-80" aria-hidden />
                          Profile information
                        </Link>
                        <Link
                          to="/account/addresses"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <MapPin size={16} className="shrink-0 opacity-80" aria-hidden />
                          Manage addresses
                        </Link>
                        <p
                          className="px-3 pt-2 pb-1 mt-1 border-t text-[10px] font-semibold tracking-wider uppercase"
                          style={{
                            color: "var(--color-text-muted)",
                            borderColor: "var(--color-border-light)",
                          }}
                        >
                          Payments
                        </p>
                        <Link
                          to="/account/payments/upi"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <Smartphone size={16} className="shrink-0 opacity-80" aria-hidden />
                          Saved UPI
                        </Link>
                        <Link
                          to="/account/payments/cards"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <CreditCard size={16} className="shrink-0 opacity-80" aria-hidden />
                          Saved cards
                        </Link>
                        <div
                          className="my-2 border-t"
                          style={{ borderColor: "var(--color-border-light)" }}
                          aria-hidden
                        />
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            logout();
                            setProfileOpen(false);
                            navigate("/");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left cursor-pointer transition-colors"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <LogOut size={16} className="shrink-0" aria-hidden />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer border"
                  style={{
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border-dark)",
                    backgroundColor: "transparent",
                  }}
                  aria-label="Log in"
                >
                  <User size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
                  <span>Log in</span>
                </Link>
              )}
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
                {user ? (
                  <>
                    <div
                      className="pt-2 mt-2 border-t px-2 text-[10px] font-semibold tracking-wider uppercase"
                      style={{
                        borderColor: "var(--color-border-light)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      My account
                    </div>
                    <Link
                      to="/account/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md transition-colors"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <Package size={14} aria-hidden />
                      My orders
                    </Link>
                    <Link
                      to="/account/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md transition-colors"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <UserCircle size={14} aria-hidden />
                      Profile information
                    </Link>
                    <Link
                      to="/account/addresses"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md transition-colors"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <MapPin size={14} aria-hidden />
                      Manage addresses
                    </Link>
                    <Link
                      to="/account/payments/upi"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md transition-colors"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <Smartphone size={14} aria-hidden />
                      Saved UPI
                    </Link>
                    <Link
                      to="/account/payments/cards"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md transition-colors"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <CreditCard size={14} aria-hidden />
                      Saved cards
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center gap-2 w-full py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-medium rounded-md text-left cursor-pointer"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <LogOut size={14} aria-hidden />
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 w-full py-2 sm:py-2.5 md:py-3 px-2 text-xs sm:text-sm md:text-base font-medium rounded-md transition-colors"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <User size={14} />
                    Log in
                  </Link>
                )}
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export const Header = memo(HeaderComponent);
