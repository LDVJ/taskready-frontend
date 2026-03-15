import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      children,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Base styles that apply to all buttons
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Style variants
    const variants = {
    primary:
      "bg-white text-[hsl(32,100%,60%)] border-2 border-[hsl(32,100%,60%)] hover:bg-[hsl(32,100%,60%)] hover:text-white active:scale-[0.98] shadow-sm",
    outline:
      "border-2 border-[hsl(32,100%,60%)] text-[hsl(32,100%,60%)] bg-white hover:bg-[hsl(32,100%,60%)] hover:text-white",
    ghost:
      "text-brand-navy hover:bg-brand-navy/10 border-2 border-transparent",
    danger:
      "bg-red-500 text-white border-2 border-red-500 hover:bg-white hover:text-red-500",
    };


    // Size variants
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;