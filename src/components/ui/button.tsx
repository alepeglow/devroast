import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const BUTTON_VARIANTS = [
  "success",
  "neutral",
  "outline",
  "ghost",
  "danger",
] as const;
const BUTTON_SIZES = ["sm", "md", "lg", "icon"] as const;
const BUTTON_SHAPES = ["square", "soft", "pill"] as const;

const buttonVariants = tv({
  base: "inline-flex shrink-0 items-center justify-center gap-2 border border-transparent font-mono font-medium whitespace-nowrap text-[13px] leading-none text-text-primary transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent-green/30 enabled:active:scale-[0.99]",
  variants: {
    variant: {
      success:
        "bg-accent-green text-text-primary enabled:hover:bg-accent-green-hover",
      neutral:
        "bg-surface-neutral text-text-inverse enabled:hover:bg-surface-neutral-hover",
      outline:
        "border-border-subtle bg-transparent text-text-primary enabled:hover:border-border-strong enabled:hover:bg-surface-subtle",
      ghost: "bg-transparent text-text-primary enabled:hover:bg-surface-subtle",
      danger:
        "bg-accent-red text-text-inverse enabled:hover:bg-accent-red-hover",
    },
    size: {
      sm: "min-h-8 px-4 py-2 text-xs",
      md: "min-h-[37px] px-6 py-2.5",
      lg: "min-h-12 px-7 py-3 text-sm",
      icon: "size-[37px] p-0",
    },
    shape: {
      square: "rounded-none",
      soft: "rounded-md",
      pill: "rounded-full",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      shape: "square",
      size: "icon",
      class: "rounded-none",
    },
    {
      shape: "soft",
      size: "icon",
      class: "rounded-md",
    },
    {
      shape: "pill",
      size: "icon",
      class: "rounded-full",
    },
  ],
  defaultVariants: {
    variant: "success",
    size: "md",
    shape: "square",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, fullWidth, shape, size, type = "button", variant, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonVariants({
          className,
          fullWidth,
          shape,
          size,
          variant,
        })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { BUTTON_SHAPES, BUTTON_SIZES, BUTTON_VARIANTS, buttonVariants };
