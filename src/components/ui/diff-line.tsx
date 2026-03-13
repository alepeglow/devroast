"use client";

import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

const DIFF_LINE_VARIANTS = ["removed", "added", "context"] as const;

const diffLineVariants = tv({
  base: "flex w-full items-start gap-2 px-4 py-2 font-mono text-[13px] leading-6",
  variants: {
    variant: {
      removed: "bg-surface-diff-removed text-text-secondary",
      added: "bg-surface-diff-added text-text-inverse",
      context: "bg-surface-code text-text-secondary",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

const diffPrefixVariants = tv({
  base: "shrink-0 font-mono text-[13px] leading-6",
  variants: {
    variant: {
      removed: "text-accent-red",
      added: "text-accent-green",
      context: "text-text-tertiary",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

const diffContentVariants = tv({
  base: "min-w-0 flex-1 font-mono text-[13px] leading-6 whitespace-pre-wrap break-words",
  variants: {
    variant: {
      removed: "text-text-secondary",
      added: "text-text-inverse",
      context: "text-text-secondary",
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

interface DiffLineContextValue {
  variant: NonNullable<DiffLineVariants["variant"]>;
}

const DiffLineContext = createContext<DiffLineContextValue | null>(null);

export type DiffLineVariants = VariantProps<typeof diffLineVariants>;

export interface DiffLineRootProps
  extends ComponentPropsWithoutRef<"div">,
    DiffLineVariants {}

export const DiffLineRoot = forwardRef<HTMLDivElement, DiffLineRootProps>(
  ({ children, className, variant = "context", ...props }, ref) => {
    return (
      <DiffLineContext.Provider value={{ variant }}>
        <div
          ref={ref}
          className={diffLineVariants({ className, variant })}
          {...props}
        >
          {children}
        </div>
      </DiffLineContext.Provider>
    );
  },
);

DiffLineRoot.displayName = "DiffLineRoot";

export function DiffLinePrefix({ children }: ComponentPropsWithoutRef<"span">) {
  const { variant } = useDiffLineContext();

  return <span className={diffPrefixVariants({ variant })}>{children}</span>;
}

export function DiffLineContent({
  children,
}: ComponentPropsWithoutRef<"span">) {
  const { variant } = useDiffLineContext();

  return <span className={diffContentVariants({ variant })}>{children}</span>;
}

function useDiffLineContext() {
  const context = useContext(DiffLineContext);

  if (!context) {
    throw new Error("DiffLine components must be used within DiffLineRoot.");
  }

  return context;
}

export { DIFF_LINE_VARIANTS, diffContentVariants, diffLineVariants };
