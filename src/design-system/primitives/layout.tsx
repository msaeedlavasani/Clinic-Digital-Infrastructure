import type { HTMLAttributes, ReactNode } from "react";

type BoxProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

function withClass(base: string, className?: string) {
  return [base, className].filter(Boolean).join(" ");
}

export function Viewport({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-viewport", props.className)}>{children}</div>;
}

export function SafeArea({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-safe-area", props.className)}>{children}</div>;
}

export function Stage({ children, ...props }: BoxProps) {
  return <section {...props} className={withClass("cdi-stage", props.className)}>{children}</section>;
}

export function GlobalRail({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-global-rail", props.className)}>{children}</div>;
}

export function ContentRail({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-content-rail", props.className)}>{children}</div>;
}

export function MediaRail({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-media-rail", props.className)}>{children}</div>;
}

export function ActionZone({ children, ...props }: BoxProps) {
  return <div {...props} className={withClass("cdi-action-zone", props.className)}>{children}</div>;
}

export function NavigationZone({ children, ...props }: BoxProps) {
  return <nav {...props} className={withClass("cdi-navigation-zone", props.className)}>{children}</nav>;
}

export function ContentSection({ children, ...props }: BoxProps) {
  return <section {...props} className={withClass("cdi-content-section", props.className)}>{children}</section>;
}
