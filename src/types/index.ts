// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

// Navigation Types
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

// Button Types
export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg";
}

// Coming Soon Context Types
export interface ComingSoonContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Hero Section Types
export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

// Newsletter Types
export interface NewsletterFormData {
  email: string;
}
