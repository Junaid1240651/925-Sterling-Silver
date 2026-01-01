import { memo } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

function LoadingSpinnerComponent({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`relative ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: "var(--color-primary)",
          borderRightColor: "var(--color-primary-light)",
        }}
      />
      {/* Inner dot */}
      <div
        className="absolute inset-2 rounded-full animate-pulse"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export const LoadingSpinner = memo(LoadingSpinnerComponent);
