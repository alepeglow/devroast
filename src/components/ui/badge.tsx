"use client";

import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

const BADGE_VARIANTS = ["critical", "warning", "good", "neutral"] as const;
const BADGE_SIZES = ["sm", "md"] as const;

const badgeVariants = tv({
  base: "inline-flex w-fit items-center gap-2 font-mono whitespace-nowrap",
  variants: {
    variant: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
      neutral: "text-text-secondary",
    },
    size: {
      sm: "text-xs",
      md: "text-[13px]",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "sm",
  },
});

const badgeDotVariants = tv({
  base: "shrink-0 rounded-full",
  variants: {
    variant: {
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-accent-green",
      neutral: "bg-text-secondary",
    },
    size: {
      sm: "size-2",
      md: "size-2",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "sm",
  },
});

interface BadgeContextValue {
  size: NonNullable<BadgeVariants["size"]>;
  variant: NonNullable<BadgeVariants["variant"]>;
}

const BadgeContext = createContext<BadgeContextValue | null>(null);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export interface BadgeRootProps
  extends ComponentPropsWithoutRef<"span">,
    BadgeVariants {}

export const BadgeRoot = forwardRef<HTMLSpanElement, BadgeRootProps>(
  (
    { children, className, size = "sm", variant = "neutral", ...props },
    ref,
  ) => {
    return (
      <BadgeContext.Provider value={{ size, variant }}>
        <span
          ref={ref}
          className={badgeVariants({ className, size, variant })}
          {...props}
        >
          {children}
        </span>
      </BadgeContext.Provider>
    );
  },
);

BadgeRoot.displayName = "BadgeRoot";

export function BadgeDot() {
  const context = useBadgeContext();

  return <span aria-hidden="true" className={badgeDotVariants(context)} />;
}

export function BadgeText({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function useBadgeContext() {
  const context = useContext(BadgeContext);

  if (!context) {
    throw new Error("Badge components must be used within BadgeRoot.");
  }

  return context;
}

export { BADGE_SIZES, BADGE_VARIANTS, badgeDotVariants, badgeVariants };
