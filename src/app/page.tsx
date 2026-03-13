import Link from "next/link";

import {
  LeaderboardCode,
  LeaderboardDescription,
  LeaderboardFooter,
  LeaderboardHeader,
  LeaderboardLanguage,
  LeaderboardRank,
  LeaderboardRoot,
  LeaderboardRow,
  LeaderboardScore,
  LeaderboardTable,
  LeaderboardTableHeader,
  LeaderboardTitle,
  LeaderboardTitleRow,
} from "@/components/leaderboard/leaderboard";
import { BadgeRoot, BadgeText } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CodeBlockBody,
  CodeBlockDots,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/ui/code-block";
import {
  ToggleControl,
  ToggleLabel,
  ToggleRoot,
  ToggleThumb,
} from "@/components/ui/toggle";

const editorCode = [
  "function calculateTotal(items) {",
  "  var total = 0;",
  "  for (var i = 0; i < items.length; i++) {",
  "    total = total + items[i].price;",
  "  }",
  "",
  "  if (total > 100) {",
  '    console.log("discount applied");',
  "    total = total * 0.9;",
  "  }",
  "",
  "  // TODO: handle tax calculation",
  "  // TODO: handle currency conversion",
  "",
  "  return total;",
  "}",
].join("\n");

const leaderboardEntries = [
  {
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
    lang: "javascript",
    rank: "1",
    score: "1.2",
  },
  {
    code: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
    lang: "typescript",
    rank: "2",
    score: "1.8",
  },
  {
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
    rank: "3",
    score: "2.1",
  },
] as const;

export default function Home() {
  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-10 lg:pt-20">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-8 lg:gap-16">
        <section className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 font-mono text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl">
              <span className="text-accent-green">$</span>
              <h1>paste your code. get roasted.</h1>
            </div>
            <p className="max-w-2xl font-mono text-sm text-text-secondary">
              {
                "// drop your code below and we'll rate it - brutally honest or full roast mode"
              }
            </p>
          </div>

          <CodeBlockRoot className="w-full max-w-[780px]">
            <CodeBlockHeader>
              <CodeBlockDots />
              <CodeBlockFilename>input.js</CodeBlockFilename>
            </CodeBlockHeader>
            <CodeBlockBody code={editorCode} lang="js" />
          </CodeBlockRoot>

          <div className="flex w-full max-w-[780px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-4">
              <div className="flex items-center gap-4">
                <ToggleRoot>
                  <ToggleControl defaultChecked>
                    <ToggleThumb />
                  </ToggleControl>
                  <ToggleLabel>roast mode</ToggleLabel>
                </ToggleRoot>
                <span className="font-mono text-xs text-text-tertiary">
                  {"// maximum sarcasm enabled"}
                </span>
              </div>
            </div>

            <Button className="min-w-44" size="md" variant="success">
              $ roast_my_code
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-text-tertiary sm:gap-6">
            <span>2,847 codes roasted</span>
            <span className="text-text-tertiary">.</span>
            <span>avg score: 4.2/10</span>
          </div>
        </section>

        <LeaderboardRoot>
          <LeaderboardHeader>
            <LeaderboardTitleRow>
              <LeaderboardTitle>
                <span className="text-accent-green">{"//"}</span>
                <h2>shame_leaderboard</h2>
              </LeaderboardTitle>

              <Button className="px-3" size="sm" variant="outline">
                $ view_all &gt;&gt;
              </Button>
            </LeaderboardTitleRow>

            <LeaderboardDescription>
              {"// the worst code on the internet, ranked by shame"}
            </LeaderboardDescription>
          </LeaderboardHeader>

          <LeaderboardTable>
            <LeaderboardTableHeader>
              <span>#</span>
              <span>score</span>
              <span>code</span>
              <span>lang</span>
            </LeaderboardTableHeader>

            {leaderboardEntries.map((entry, index) => (
              <LeaderboardRow key={`${entry.rank}-${entry.lang}`}>
                <LeaderboardRank>
                  {index === 0 ? (
                    entry.rank
                  ) : (
                    <span className="text-text-secondary">{entry.rank}</span>
                  )}
                </LeaderboardRank>
                <LeaderboardScore>{entry.score}</LeaderboardScore>
                <LeaderboardCode>
                  {entry.code.map((line) => (
                    <p
                      key={`${entry.rank}-${line}`}
                      className={
                        line.startsWith("//") || line.startsWith("--")
                          ? "text-text-tertiary"
                          : "text-text-inverse"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </LeaderboardCode>
                <LeaderboardLanguage>
                  <BadgeRoot variant="neutral">
                    <BadgeText>{entry.lang}</BadgeText>
                  </BadgeRoot>
                </LeaderboardLanguage>
              </LeaderboardRow>
            ))}
          </LeaderboardTable>

          <LeaderboardFooter>
            <span>showing top 3 of 2,847 - </span>
            <Link
              className="text-text-secondary transition-colors hover:text-text-inverse"
              href="/"
            >
              view full leaderboard &gt;&gt;
            </Link>
          </LeaderboardFooter>
        </LeaderboardRoot>
      </div>
    </main>
  );
}
