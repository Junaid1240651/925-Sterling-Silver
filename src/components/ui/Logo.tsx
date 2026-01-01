import { memo } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  color?: "dark" | "light";
}

const sizes = {
  sm: { icon: 40, text: "text-base", tagline: "text-[0.5rem]" },
  md: { icon: 48, text: "text-lg", tagline: "text-[0.55rem]" },
  lg: { icon: 56, text: "text-xl", tagline: "text-xs" },
  xl: { icon: 72, text: "text-2xl", tagline: "text-sm" },
};

// Separate LogoIcon component to avoid recreation during render
const LogoIcon = memo(function LogoIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <defs>
        {/* Premium silver gradient */}
        <linearGradient id="silverMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="20%" stopColor="#e0e0e0" />
          <stop offset="40%" stopColor="#c0c0c0" />
          <stop offset="60%" stopColor="#d4d4d4" />
          <stop offset="80%" stopColor="#b8b8b8" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </linearGradient>
        
        {/* Darker silver for depth */}
        <linearGradient id="silverDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a8a8a8" />
          <stop offset="50%" stopColor="#888888" />
          <stop offset="100%" stopColor="#707070" />
        </linearGradient>
        
        {/* Gold accent gradient */}
        <linearGradient id="goldLuxury" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d03f" />
          <stop offset="25%" stopColor="#d4a84b" />
          <stop offset="50%" stopColor="#b8860b" />
          <stop offset="75%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        
        {/* Shine effect */}
        <linearGradient id="shineEffect" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        
        {/* Drop shadow filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Main diamond shape - outer */}
      <path
        d="M32 4L58 32L32 60L6 32L32 4Z"
        fill="url(#silverMain)"
        filter="url(#dropShadow)"
      />
      
      {/* Diamond facet - top left */}
      <path
        d="M32 4L6 32L32 28L32 4Z"
        fill="url(#silverDark)"
        opacity="0.4"
      />
      
      {/* Diamond facet - bottom right */}
      <path
        d="M32 60L58 32L32 36L32 60Z"
        fill="url(#silverDark)"
        opacity="0.3"
      />
      
      {/* Inner diamond border */}
      <path
        d="M32 12L50 32L32 52L14 32L32 12Z"
        fill="none"
        stroke="url(#goldLuxury)"
        strokeWidth="1.5"
      />
      
      {/* Stylized "S" for Sterling - elegant script form */}
      <path
        d="M26 24C26 24 28 20 32 20C36 20 38 23 38 26C38 29 35 30 32 31C29 32 26 33 26 36C26 40 29 42 32 42C36 42 38 40 38 40"
        fill="none"
        stroke="url(#goldLuxury)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* "925" text - small, elegant placement at bottom */}
      <text
        x="32"
        y="56"
        textAnchor="middle"
        fontSize="7"
        fontWeight="600"
        fill="url(#goldLuxury)"
        letterSpacing="0.5"
        style={{ fontFamily: "serif" }}
      >
        925
      </text>
      
      {/* Shine highlight on diamond */}
      <path
        d="M20 20L32 12L44 20"
        fill="none"
        stroke="url(#shineEffect)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Small sparkle accents */}
      <circle cx="46" cy="18" r="1.5" fill="white" opacity="0.9" />
      <circle cx="18" cy="46" r="1" fill="#d4a84b" opacity="0.7" />
      <circle cx="44" cy="44" r="0.8" fill="white" opacity="0.6" />
    </svg>
  );
});

function LogoComponent({
  className = "",
  size = "md",
  variant = "full",
  color = "dark",
}: LogoProps) {
  const { icon: iconSize, text: textSize, tagline: taglineSize } = sizes[size];
  const textColor = color === "dark" ? "var(--color-text-primary)" : "var(--color-text-light)";
  const accentColor = "var(--color-accent)";

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center cursor-pointer ${className}`}>
        <LogoIcon size={iconSize} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
      <LogoIcon size={iconSize} />
      <div className="flex flex-col leading-none">
        <span
          className={`${textSize} font-semibold tracking-wide`}
          style={{
            fontFamily: "var(--font-heading)",
            color: textColor,
          }}
        >
          925sterlingvibes
        </span>
        <span
          className={`${taglineSize} tracking-[0.15em] uppercase mt-1 font-medium`}
          style={{ color: accentColor }}
        >
          Pure Silver • Trusted Quality
        </span>
      </div>
    </div>
  );
}

export const Logo = memo(LogoComponent);

// Compact logo for mobile or small spaces
export const LogoCompact = memo(function LogoCompact({
  className = "",
  color = "dark",
}: {
  className?: string;
  color?: "dark" | "light";
}) {
  const textColor = color === "dark" ? "var(--color-text-primary)" : "var(--color-text-light)";

  return (
    <div className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="silverCompact" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#c0c0c0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="goldCompact" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a84b" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        
        <path
          d="M32 4L58 32L32 60L6 32L32 4Z"
          fill="url(#silverCompact)"
        />
        <path
          d="M32 12L50 32L32 52L14 32L32 12Z"
          fill="none"
          stroke="url(#goldCompact)"
          strokeWidth="1.5"
        />
        <path
          d="M26 24C26 24 28 20 32 20C36 20 38 23 38 26C38 29 35 30 32 31C29 32 26 33 26 36C26 40 29 42 32 42C36 42 38 40 38 40"
          fill="none"
          stroke="url(#goldCompact)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="text-sm font-semibold tracking-wide"
        style={{
          fontFamily: "var(--font-heading)",
          color: textColor,
        }}
      >
        925SV
      </span>
    </div>
  );
});

// Simple text-only logo for minimalist contexts
export const LogoText = memo(function LogoText({
  className = "",
  color = "dark",
}: {
  className?: string;
  color?: "dark" | "light";
}) {
  const textColor = color === "dark" ? "var(--color-text-primary)" : "var(--color-text-light)";

  return (
    <div className={`inline-flex flex-col items-center leading-none cursor-pointer ${className}`}>
      <span
        className="text-lg md:text-xl font-semibold tracking-wide"
        style={{
          fontFamily: "var(--font-heading)",
          color: textColor,
        }}
      >
        925sterlingvibes
      </span>
    </div>
  );
});
