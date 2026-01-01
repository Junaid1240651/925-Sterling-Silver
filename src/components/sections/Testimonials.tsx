import { memo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../ui/Container";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  product: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Absolutely stunning quality! I ordered the Luna Crescent Ring for my engagement, and it exceeded all expectations. The silver shine is perfect, and the BIS hallmark gives me confidence in its authenticity.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    product: "Luna Crescent Ring",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Ananya Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    text: "The Celestial Pendant is my new favorite piece! The craftsmanship is impeccable, and it arrived beautifully packaged. Customer service was exceptional too. Will definitely order again!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    product: "Celestial Pendant",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "I've been searching for authentic 925 silver jewelry, and 925sterlingvibes delivered beyond my expectations. The Infinity Hoops are lightweight yet sturdy, perfect for daily wear.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    product: "Infinity Hoops",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Kavitha Nair",
    location: "Kochi, Kerala",
    rating: 5,
    text: "The quality is unmatched at this price point. My Twisted Silver Bangle has become my signature piece. The 2-year warranty shows how confident they are in their products!",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
    product: "Twisted Silver Bangle",
    date: "1 week ago",
  },
  {
    id: "5",
    name: "Sneha Gupta",
    location: "Delhi, NCR",
    rating: 5,
    text: "Bought the Minimalist Bar Necklace as a gift for my sister. She absolutely loved it! The design is elegant and versatile. Fast shipping and secure packaging. Highly recommend!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    product: "Minimalist Bar Necklace",
    date: "2 months ago",
  },
];

// Star Rating Component
const StarRating = memo(function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={12}
          className="sm:w-4 sm:h-4"
          fill={index < rating ? "var(--color-accent)" : "transparent"}
          stroke={index < rating ? "var(--color-accent)" : "var(--color-text-muted)"}
        />
      ))}
    </div>
  );
});

// Individual Testimonial Card
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
      style={{
        backgroundColor: isActive ? "var(--color-bg-white)" : "var(--color-bg-secondary)",
        boxShadow: isActive ? "var(--shadow-xl)" : "var(--shadow-sm)",
      }}
    >
      {/* Quote Icon */}
      <div
        className="absolute -top-2 -left-1 sm:-top-4 sm:-left-2 p-2 sm:p-3 rounded-full"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <Quote size={14} className="sm:w-5 sm:h-5" style={{ color: "var(--color-text-light)" }} />
      </div>

      {/* Rating */}
      <div className="mb-3 sm:mb-4 pt-2">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial Text */}
      <p
        className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6 italic"
        style={{ color: "var(--color-text-secondary)" }}
      >
        "{testimonial.text}"
      </p>

      {/* Product Badge */}
      <div
        className="inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium mb-3 sm:mb-4"
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          color: "var(--color-accent)",
        }}
      >
        Purchased: {testimonial.product}
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2"
          style={{ borderColor: "var(--color-accent)" }}
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h4
            className="font-semibold text-xs sm:text-sm md:text-base truncate"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
            }}
          >
            {testimonial.name}
          </h4>
          <p
            className="text-[10px] sm:text-xs md:text-sm truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {testimonial.location}
          </p>
        </div>
        <span
          className="text-[10px] sm:text-xs whitespace-nowrap"
          style={{ color: "var(--color-text-muted)" }}
        >
          {testimonial.date}
        </span>
      </div>
    </motion.div>
  );
});

function TestimonialsComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Customer Love
          </motion.span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Join over 50,000 happy customers who trust 925sterlingvibes for their
            precious silver jewelry needs.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-16 mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-accent)",
              }}
            >
              50,000+
            </div>
            <div
              className="text-[10px] sm:text-xs md:text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Happy Customers
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-center gap-0.5 sm:gap-1"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-accent)",
              }}
            >
              4.9
              <Star size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" fill="var(--color-accent)" stroke="var(--color-accent)" />
            </div>
            <div
              className="text-[10px] sm:text-xs md:text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-accent)",
              }}
            >
              98%
            </div>
            <div
              className="text-[10px] sm:text-xs md:text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Satisfaction Rate
            </div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative max-w-4xl mx-auto px-8 sm:px-10 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 md:p-3 rounded-full transition-all cursor-pointer hover:scale-110"
            style={{
              backgroundColor: "var(--color-bg-white)",
              boxShadow: "var(--shadow-md)",
              color: "var(--color-text-primary)",
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 md:p-3 rounded-full transition-all cursor-pointer hover:scale-110"
            style={{
              backgroundColor: "var(--color-bg-white)",
              boxShadow: "var(--shadow-md)",
              color: "var(--color-text-primary)",
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Testimonial Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 sm:h-3 rounded-full transition-all cursor-pointer ${
                  index === currentIndex ? "w-5 sm:w-8" : "w-2 sm:w-3"
                }`}
                style={{
                  backgroundColor:
                    index === currentIndex
                      ? "var(--color-accent)"
                      : "var(--color-primary)",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <motion.div
          className="text-center mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-[10px] sm:text-xs md:text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            ⭐ Verified reviews from real customers across India
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export const Testimonials = memo(TestimonialsComponent);
