import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", withArrow, children, className = "", ...rest },
  ref
) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
      {withArrow && <span className="btn-arrow">→</span>}
    </button>
  );
});
