import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, type = "button", ...props }: ButtonProps) {
  return (
    <button className={`cdi-button cdi-button--${variant} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  );
}

export function TextAction(props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <Button variant="text" {...props} />;
}

export function ActionLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return <a className={`cdi-button cdi-button--${variant} ${className}`.trim()} href={href}>{children}</a>;
}

export function IconButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <Button variant="icon" aria-label={label} {...props}>
      <span aria-hidden="true">{children}</span>
    </Button>
  );
}
