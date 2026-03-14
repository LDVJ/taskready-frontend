import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, leftIcon, className, id, ...rest }, ref) => {
    // Generate a unique ID for the label/input connection if one isn't provided
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-brand-navy"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-brand-navy placeholder:text-gray-400",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent",
              error 
                ? "border-red-400 focus:ring-red-400" 
                : "border-gray-200 hover:border-gray-300",
              leftIcon && "pl-10",
              className
            )}
            {...rest}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span role="img" aria-label="warning">⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;