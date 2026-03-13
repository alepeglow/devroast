import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

export const LeaderboardRoot = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"section">
>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("flex flex-col gap-6 pb-10", className)}
      {...props}
    />
  );
});

LeaderboardRoot.displayName = "LeaderboardRoot";

export const LeaderboardHeader = forwardRef<
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

LeaderboardHeader.displayName = "LeaderboardHeader";

export const LeaderboardTitleRow = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    />
  );
});

LeaderboardTitleRow.displayName = "LeaderboardTitleRow";

export const LeaderboardTitle = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 font-mono text-sm font-bold text-text-inverse",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardTitle.displayName = "LeaderboardTitle";

export const LeaderboardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("font-mono text-[13px] text-text-tertiary", className)}
      {...props}
    />
  );
});

LeaderboardDescription.displayName = "LeaderboardDescription";

export const LeaderboardTable = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden border border-border-default bg-surface-code",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardTable.displayName = "LeaderboardTable";

export const LeaderboardTableHeader = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid h-10 grid-cols-[50px_70px_minmax(0,1fr)_100px] items-center gap-4 border-b border-border-default bg-surface-code-gutter px-5 font-mono text-xs font-medium text-text-tertiary",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardTableHeader.displayName = "LeaderboardTableHeader";

export const LeaderboardRow = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"article">
>(({ className, ...props }, ref) => {
  return (
    <article
      ref={ref}
      className={cn(
        "grid grid-cols-[50px_70px_minmax(0,1fr)_100px] gap-4 border-b border-border-default px-5 py-4 last:border-b-0",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardRow.displayName = "LeaderboardRow";

export const LeaderboardRank = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("font-mono text-xs text-accent-amber", className)}
      {...props}
    />
  );
});

LeaderboardRank.displayName = "LeaderboardRank";

export const LeaderboardScore = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("font-mono text-xs font-bold text-accent-red", className)}
      {...props}
    />
  );
});

LeaderboardScore.displayName = "LeaderboardScore";

export const LeaderboardCode = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-1 font-mono text-xs text-text-inverse",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardCode.displayName = "LeaderboardCode";

export const LeaderboardLanguage = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex justify-start lg:justify-end", className)}
      {...props}
    />
  );
});

LeaderboardLanguage.displayName = "LeaderboardLanguage";

export const LeaderboardFooter = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-center font-mono text-xs text-text-tertiary",
        className,
      )}
      {...props}
    />
  );
});

LeaderboardFooter.displayName = "LeaderboardFooter";
