"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useId,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const toggleRootVariants = tv({
  base: "peer inline-flex h-[22px] w-10 items-center rounded-full border border-transparent bg-border-default p-[3px] transition-[background-color,border-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent-green/30 disabled:pointer-events-none disabled:opacity-50 data-[checked]:bg-accent-green",
  variants: {
    variant: {
      success: "",
      neutral: "data-[checked]:bg-surface-subtle",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const toggleThumbVariants = tv({
  base: "size-4 rounded-full bg-text-secondary transition-transform duration-200 data-[checked]:translate-x-[18px]",
  variants: {
    variant: {
      success: "data-[checked]:bg-text-primary",
      neutral: "bg-border-strong data-[checked]:bg-surface-inverse",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const toggleLabelVariants = tv({
  base: "font-mono text-xs transition-colors duration-200 peer-disabled:opacity-50 peer-data-[checked]:text-accent-green peer-data-[unchecked]:text-text-secondary",
  variants: {
    variant: {
      success: "",
      neutral:
        "peer-data-[checked]:text-text-primary peer-data-[unchecked]:text-text-secondary",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

interface ToggleContextValue {
  id: string;
  variant: NonNullable<ToggleVariants["variant"]>;
}

const ToggleContext = createContext<ToggleContextValue | null>(null);

type SwitchRootProps = ComponentPropsWithoutRef<typeof BaseSwitch.Root>;

export type ToggleVariants = VariantProps<typeof toggleRootVariants>;

export interface ToggleRootProps
  extends ComponentPropsWithoutRef<"div">,
    ToggleVariants {
  children: ReactNode;
  id?: string;
}

export function ToggleRoot({
  children,
  className,
  id,
  variant = "success",
  ...props
}: ToggleRootProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  return (
    <ToggleContext.Provider value={{ id: toggleId, variant }}>
      <div
        className={cn("inline-flex w-fit items-center gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </ToggleContext.Provider>
  );
}

export interface ToggleControlProps
  extends Omit<SwitchRootProps, "children" | "className" | "id"> {
  children: ReactNode;
  className?: string;
}

export function ToggleControl({
  children,
  className,
  ...props
}: ToggleControlProps) {
  const { id, variant } = useToggleContext();

  return (
    <BaseSwitch.Root
      id={id}
      className={toggleRootVariants({ className, variant })}
      {...props}
    >
      {children}
    </BaseSwitch.Root>
  );
}

export interface ToggleThumbProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSwitch.Thumb>, "className"> {
  className?: string;
}

export function ToggleThumb({ className, ...props }: ToggleThumbProps) {
  const { variant } = useToggleContext();

  return (
    <BaseSwitch.Thumb
      className={toggleThumbVariants({ className, variant })}
      {...props}
    />
  );
}

export function ToggleLabel({
  children,
  className,
  htmlFor,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  const { id, variant } = useToggleContext();

  return (
    <label
      className={toggleLabelVariants({ className, variant })}
      htmlFor={htmlFor ?? id}
      {...props}
    >
      {children}
    </label>
  );
}

function useToggleContext() {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error("Toggle components must be used within ToggleRoot.");
  }

  return context;
}

export { toggleLabelVariants, toggleRootVariants };
