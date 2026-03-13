"use client";

import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

const SCORE_RING_SIZES = ["sm", "md", "lg"] as const;
const SCORE_RING_TONES = ["auto", "critical", "warning", "good"] as const;

const scoreRingVariants = tv({
  base: "relative inline-flex shrink-0 items-center justify-center rounded-full bg-surface-inverse font-mono text-text-inverse",
  variants: {
    size: {
      sm: "size-28",
      md: "size-36",
      lg: "size-44",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const scoreValueVariants = tv({
  base: "font-mono font-bold leading-none text-text-inverse",
  variants: {
    size: {
      sm: "text-4xl",
      md: "text-5xl",
      lg: "text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const scoreMaxVariants = tv({
  base: "font-mono leading-none text-text-tertiary",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const scoreLabelVariants = tv({
  base: "font-sans uppercase tracking-[0.18em] text-text-tertiary",
  variants: {
    size: {
      sm: "text-[9px]",
      md: "text-[10px]",
      lg: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ScoreRingContextValue {
  max: number;
  score: number;
  size: NonNullable<ScoreRingVariants["size"]>;
}

const ScoreRingContext = createContext<ScoreRingContextValue | null>(null);

export type ScoreRingVariants = VariantProps<typeof scoreRingVariants>;

export interface ScoreRingRootProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    ScoreRingVariants {
  children: ReactNode;
  max?: number;
  score: number;
  thickness?: number;
  tone?: (typeof SCORE_RING_TONES)[number];
}

export const ScoreRingRoot = forwardRef<HTMLDivElement, ScoreRingRootProps>(
  (
    {
      children,
      className,
      max = 10,
      score,
      size = "md",
      thickness = 4,
      tone = "auto",
      ...props
    },
    ref,
  ) => {
    const clampedScore = clamp(score, 0, max);
    const progress = max === 0 ? 0 : clampedScore / max;
    const radius = 50 - thickness / 2;
    const circumference = 2 * Math.PI * radius;
    const progressLength = circumference * progress;
    const segmentRatio =
      progress < 0.2 ? 0 : clamp(0.1 + progress * 0.08, 0.12, 0.18);
    const secondaryLength = progressLength * segmentRatio;
    const primaryLength = Math.max(progressLength - secondaryLength, 0);
    const resolvedTone = resolveTone(progress, tone);
    const primaryStrokeClassName =
      resolvedTone === "critical"
        ? "stroke-accent-red"
        : resolvedTone === "warning"
          ? "stroke-accent-amber"
          : "stroke-accent-green";
    const secondaryStrokeClassName =
      resolvedTone === "critical"
        ? "stroke-accent-red-hover"
        : "stroke-accent-amber";

    return (
      <ScoreRingContext.Provider value={{ max, score: clampedScore, size }}>
        <div
          ref={ref}
          className={scoreRingVariants({ className, size })}
          {...props}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="stroke-border-default"
              cx="50"
              cy="50"
              fill="none"
              r={radius}
              strokeWidth={thickness}
            />
            <circle
              className={primaryStrokeClassName}
              cx="50"
              cy="50"
              fill="none"
              r={radius}
              strokeDasharray={`${primaryLength} ${circumference - primaryLength}`}
              strokeLinecap="round"
              strokeWidth={thickness}
            />
            <circle
              className={secondaryStrokeClassName}
              cx="50"
              cy="50"
              fill="none"
              r={radius}
              strokeDasharray={`${secondaryLength} ${circumference - secondaryLength}`}
              strokeDashoffset={-primaryLength}
              strokeLinecap="round"
              strokeWidth={thickness}
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
            {children}
          </div>
        </div>
      </ScoreRingContext.Provider>
    );
  },
);

ScoreRingRoot.displayName = "ScoreRingRoot";

export function ScoreRingValue({ children }: ComponentPropsWithoutRef<"span">) {
  const { score, size } = useScoreRingContext();

  return (
    <span className={scoreValueVariants({ size })}>
      {children ?? formatScore(score)}
    </span>
  );
}

export function ScoreRingMax({ children }: ComponentPropsWithoutRef<"span">) {
  const { max, size } = useScoreRingContext();

  return (
    <span className={scoreMaxVariants({ size })}>
      {children ?? `/${formatScore(max)}`}
    </span>
  );
}

export function ScoreRingLabel({ children }: ComponentPropsWithoutRef<"span">) {
  const { size } = useScoreRingContext();

  return <span className={scoreLabelVariants({ size })}>{children}</span>;
}

function useScoreRingContext() {
  const context = useContext(ScoreRingContext);

  if (!context) {
    throw new Error("ScoreRing components must be used within ScoreRingRoot.");
  }

  return context;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatScore(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function resolveTone(
  progress: number,
  tone: (typeof SCORE_RING_TONES)[number],
) {
  if (tone !== "auto") {
    return tone;
  }

  if (progress < 0.4) {
    return "critical";
  }

  if (progress < 0.75) {
    return "warning";
  }

  return "good";
}

export { SCORE_RING_SIZES, SCORE_RING_TONES, scoreRingVariants };
