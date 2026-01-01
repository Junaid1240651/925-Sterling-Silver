import { memo } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useComingSoon } from "../../context/ComingSoonContext";
import type { Product } from "../../types";

// Placeholder products with Unsplash images - INR pricing
const products: Product[] = [
  {
    id: "1",
    name: "Luna Crescent Ring",
    price: 2499,
    originalPrice: 3299,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    category: "Rings",
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Celestial Pendant",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    category: "Necklaces",
    isNew: true,
  },
  {
    id: "3",
    name: "Infinity Hoops",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
    category: "Earrings",
  },
  {
    id: "4",
    name: "Twisted Silver Bangle",
    price: 4599,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    category: "Bracelets",
  },
  {
    id: "5",
    name: "Minimalist Bar Necklace",
    price: 2799,
    originalPrice: 3499,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    category: "Necklaces",
    isSale: true,
  },
  {
    id: "6",
    name: "Stacking Ring Set",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
    category: "Rings",
    isNew: true,
  },
];

// Format price to INR
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = memo(function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { openModal } = useComingSoon();

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-lg mb-2 sm:mb-3 md:mb-4 cursor-pointer"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        onClick={openModal}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
          {product.isNew && (
            <span
              className="px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded"
              style={{
                backgroundColor: "var(--color-bg-dark)",
                color: "var(--color-text-light)",
              }}
            >
              NEW
            </span>
          )}
          {product.isSale && (
            <span
              className="px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-light)",
              }}
            >
              SALE
            </span>
          )}
        </div>

        {/* Quick actions - VISIBLE on all screens */}
        <motion.div
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 flex flex-col gap-1 sm:gap-1.5 md:gap-2"
        >
          <motion.button
            className="p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--color-bg-white)",
              color: "var(--color-text-secondary)",
            }}
            whileHover={{
              scale: 1.1,
              color: "var(--color-accent)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
            aria-label="Add to wishlist"
          >
            <Heart size={12} className="sm:w-3.5 sm:h-3.5 md:w-[18px] md:h-[18px]" />
          </motion.button>
        </motion.div>

        {/* Add to cart button - VISIBLE on all screens, always shown at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 md:p-3 lg:p-4"
        >
          <motion.button
            className="w-full py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-sm font-medium text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 transition-all cursor-pointer"
            style={{
              backgroundColor: "var(--color-btn-primary-bg)",
              color: "var(--color-btn-primary-text)",
            }}
            whileHover={{
              backgroundColor: "var(--color-btn-primary-hover)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            <ShoppingBag size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="text-center">
        <p
          className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-0.5"
          style={{ color: "var(--color-text-muted)" }}
        >
          {product.category}
        </p>
        <h3
          className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mb-0.5 sm:mb-1 md:mb-2 cursor-pointer hover:underline line-clamp-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
          }}
          onClick={openModal}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
          <span
            className="text-xs sm:text-sm md:text-base font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              className="text-[10px] sm:text-xs md:text-sm line-through"
              style={{ color: "var(--color-text-muted)" }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

function FeaturedProductsComponent() {
  return (
    <section
      className="py-8 sm:py-10 md:py-14 lg:py-20"
      style={{ backgroundColor: "var(--color-bg-white)" }}
    >
      <Container>
        {/* Section header */}
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1.5 sm:mb-2 md:mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Curated Selection
          </motion.span>
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1.5 sm:mb-2 md:mb-3 lg:mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Pieces
          </h2>
          <p
            className="text-[10px] sm:text-xs md:text-sm lg:text-base max-w-2xl mx-auto px-2 sm:px-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Handpicked favorites from our latest collection. Each piece is
            crafted with BIS hallmarked 925 sterling silver.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={14} />}>
            View All Products
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export const FeaturedProducts = memo(FeaturedProductsComponent);
