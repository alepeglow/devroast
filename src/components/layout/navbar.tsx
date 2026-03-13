import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b border-border-default bg-surface-inverse">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          className="inline-flex items-center gap-2 font-mono text-sm text-text-inverse"
          href="/"
        >
          <span className="text-lg font-bold text-accent-green">&gt;</span>
          <span className="font-medium">devroast</span>
        </Link>

        <Link
          className="font-mono text-[13px] text-text-secondary transition-colors hover:text-text-inverse"
          href="/"
        >
          leaderboard
        </Link>
      </div>
    </header>
  );
}
