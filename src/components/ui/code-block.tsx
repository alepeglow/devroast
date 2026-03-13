import "server-only";

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  cache,
  type JSX,
} from "react";
import type { BundledLanguage } from "shiki";
import { codeToHast } from "shiki";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

const codeBlockVariants = tv({
  base: "overflow-hidden border border-border-default bg-surface-code text-text-inverse",
});

interface HastTextNode {
  type: "text";
  value: string;
}

interface HastElementNode {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

interface HastRootNode {
  type: "root";
  children?: HastNode[];
}

type HastNode = HastElementNode | HastRootNode | HastTextNode;

interface CodeBlockLine {
  key: string;
  node: HastElementNode;
}

const getHighlightedTree = cache(
  async (code: string, lang: BundledLanguage) => {
    return (await codeToHast(code, {
      lang,
      theme: "vesper",
    })) as HastRootNode;
  },
);

export interface CodeBlockRootProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {}

export function CodeBlockRoot({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={codeBlockVariants({ className })} {...props}>
      {children}
    </div>
  );
}

export function CodeBlockHeader({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex h-10 items-center gap-3 border-b border-border-default px-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CodeBlockDots() {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full bg-accent-red"
      />
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full bg-accent-amber"
      />
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full bg-accent-green"
      />
    </div>
  );
}

export function CodeBlockFilename({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("ml-auto font-mono text-xs text-text-tertiary", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export interface CodeBlockBodyProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  code: string;
  lang: BundledLanguage;
  showLineNumbers?: boolean;
}

export async function CodeBlockBody({
  className,
  code,
  lang,
  showLineNumbers = true,
  ...props
}: CodeBlockBodyProps) {
  const tree = await getHighlightedTree(code, lang);
  const lines = getLineNodes(tree);

  return (
    <div className={cn("flex", className)} {...props}>
      {showLineNumbers ? <CodeBlockLineNumbers lines={lines} /> : null}
      <pre className="min-w-0 flex-1 overflow-x-auto px-3 py-3">
        <code className="grid min-w-full gap-1 font-mono text-[13px] leading-6">
          {lines.map((line) => (
            <span key={line.key} className="block whitespace-pre">
              {line.node.children?.length ? (
                line.node.children.map((token, tokenIndex) =>
                  renderNode(token, `${line.key}-token-${tokenIndex}`),
                )
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function CodeBlockLineNumbers({ lines }: { lines: CodeBlockLine[] }) {
  return (
    <div className="flex shrink-0 flex-col gap-1 border-r border-border-default bg-surface-code-gutter px-[10] py-3 text-right font-mono text-[13px] leading-6 text-text-tertiary">
      {lines.map((line, index) => (
        <span key={`${line.key}-line-number`}>{index + 1}</span>
      ))}
    </div>
  );
}

function getLineNodes(tree: HastRootNode): CodeBlockLine[] {
  const pre = tree.children?.find(isElementNode);
  const code = pre?.children?.find(isElementNode);
  const seenKeys = new Map<string, number>();

  return (
    code?.children?.filter(isElementNode).map((node) => {
      const text = getNodeText(node) || "empty-line";
      const occurrences = seenKeys.get(text) ?? 0;

      seenKeys.set(text, occurrences + 1);

      return {
        key: `${text}-${occurrences + 1}`,
        node,
      };
    }) ?? []
  );
}

function isElementNode(node: HastNode | undefined): node is HastElementNode {
  return node?.type === "element";
}

function renderNode(node: HastNode, key: string): JSX.Element | string {
  if (node.type === "text") {
    return node.value;
  }

  if (!isElementNode(node)) {
    return "";
  }

  const style = parseStyle(node.properties?.style);

  return (
    <span key={key} style={style}>
      {node.children?.map((child, index) =>
        renderNode(child, `${key}-${index}`),
      )}
    </span>
  );
}

function getNodeText(node: HastNode): string {
  if (node.type === "text") {
    return node.value;
  }

  return node.children?.map(getNodeText).join("") ?? "";
}

function parseStyle(styleValue: unknown): CSSProperties | undefined {
  if (typeof styleValue !== "string") {
    return undefined;
  }

  const declarations = styleValue
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean);

  if (!declarations.length) {
    return undefined;
  }

  const style: CSSProperties = {};

  for (const declaration of declarations) {
    const [property, value] = declaration.split(":");

    if (!property || !value) {
      continue;
    }

    const reactProperty = property
      .trim()
      .replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

    (style as Record<string, string>)[reactProperty] = value.trim();
  }

  return style;
}

export { codeBlockVariants };
