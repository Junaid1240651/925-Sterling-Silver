import { memo, forwardRef } from "react";
import { useComingSoon } from "../../context/ComingSoonContext";
import { LoadingSpinner } from "./LoadingSpinner";
import type { ButtonProps } from "../../types";

const variantStyles = {
  primary: `
    bg-[var(--color-btn-primary-bg)] 
    text-[var(--color-btn-primary-text)] 
    hover:bg-[var(--color-btn-primary-hover)]
    border-transparent
  `,
  secondary: `
    bg-transparent 
    text-[var(--color-btn-secondary-text)] 
    border-[var(--color-btn-secondary-border)]
    hover:bg-[var(--color-btn-secondary-hover-bg)]
    hover:text-[var(--color-btn-secondary-hover-text)]
  `,
  accent: `
    bg-[var(--color-btn-accent-bg)] 
    text-[var(--color-btn-accent-text)] 
    hover:bg-[var(--color-btn-accent-hover)]
    border-transparent
  `,
  ghost: `
    bg-transparent 
    text-[var(--color-text-primary)] 
    hover:bg-[var(--color-bg-secondary)]
    border-transparent
  `,
};

// Responsive size styles
const sizeStyles = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
  md: "px-4 py-2 text-sm sm:px-5 sm:py-2.5 md:px-6 md:py-3 md:text-base",
  lg: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3.5 lg:text-lg",
};

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = "",
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const { openModal } = useComingSoon();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // If there's a custom onClick, call it
      // Otherwise, show the Coming Soon modal
      if (onClick) {
        onClick(e);
      } else {
        openModal();
      }
    };

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center gap-1.5 sm:gap-2
          font-medium tracking-wide
          border-2 rounded-sm
          transition-all duration-300 ease-out
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-[0.98]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        onClick={handleClick}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-sm">
            <LoadingSpinner size="sm" />
          </div>
        )}
        <span
          className={`inline-flex items-center gap-1.5 sm:gap-2 ${isLoading ? "invisible" : ""}`}
        >
          {leftIcon && <span className="flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
