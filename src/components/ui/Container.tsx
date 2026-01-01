import { memo, type ReactNode, type ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

function ContainerComponent({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`
        w-full max-w-7xl mx-auto 
        px-4 sm:px-6 lg:px-8
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

export const Container = memo(ContainerComponent);
