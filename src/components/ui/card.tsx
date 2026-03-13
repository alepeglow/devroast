import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const CARD_VARIANTS = ["default", "critical", "warning", "good"] as const;

const cardVariants = tv({
  base: "flex flex-col gap-4 border border-border-default bg-surface-inverse p-5 text-text-inverse",
  variants: {
    variant: {
      default: "",
      critical: "border-accent-red/40",
      warning: "border-accent-amber/40",
      good: "border-accent-green/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;

export interface CardRootProps
  extends ComponentPropsWithoutRef<"div">,
    CardVariants {}

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ className, variant })}
        {...props}
      />
    );
  },
);

CardRoot.displayName = "CardRoot";

export const CardHeader = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
});

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("font-mono text-[13px] text-text-inverse", className)}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "font-sans text-sm leading-6 text-text-secondary",
        className,
      )}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

export { CARD_VARIANTS, cardVariants };
