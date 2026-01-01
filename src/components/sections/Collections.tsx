import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { useComingSoon } from "../../context/ComingSoonContext";
import type { Collection } from "../../types";

const collections: Collection[] = [
  {
    id: "rings",
    name: "Rings",
    description: "From delicate bands to statement pieces",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop",
    itemCount: 45,
  },
  {
    id: "necklaces",
    name: "Necklaces",
    description: "Elegant chains and pendants",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    itemCount: 38,
  },
  {
    id: "earrings",
    name: "Earrings",
    description: "Studs, hoops, and drops",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=800&fit=crop",
    itemCount: 52,
  },
  {
    id: "bracelets",
    name: "Bracelets",
    description: "Bangles, cuffs, and chains",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop",
    itemCount: 29,
  },
];

const CollectionCard = memo(function CollectionCard({
  collection,
}: {
  collection: Collection;
  index: number;
}) {
  const { openModal } = useComingSoon();

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={openModal}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
        <span
          className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider opacity-80"
          style={{ color: "var(--color-text-light)" }}
        >
          {collection.itemCount} Items
        </span>
        <h3
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-0.5 sm:mt-1 mb-1 sm:mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-light)",
          }}
        >
          {collection.name}
        </h3>
        <p
          className="text-[10px] sm:text-xs md:text-sm opacity-80 mb-2 sm:mb-3 md:mb-4 line-clamp-1"
          style={{ color: "var(--color-text-light)" }}
        >
          {collection.description}
        </p>

        {/* Explore button */}
        <div
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-transform duration-300 group-hover:translate-x-2"
          style={{ color: "var(--color-text-light)" }}
        >
          <span>Explore</span>
          <ArrowRight size={12} className="sm:w-4 sm:h-4" />
        </div>
      </div>

      {/* Hover border effect */}
      <div
        className="absolute inset-0 border-2 rounded-lg pointer-events-none transition-colors duration-300 border-transparent group-hover:border-amber-600"
      />
    </div>
  );
});

function CollectionsComponent() {
  return (
    <section
      className="py-10 sm:py-14 md:py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-bg-white)" }}
    >
      <Container>
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span
            className="inline-block text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Browse By Category
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Shop Collections
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Explore our carefully curated collections, each designed to
            complement your unique style and celebrate life's special moments.
          </p>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export const Collections = memo(CollectionsComponent);
