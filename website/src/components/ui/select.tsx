import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex h-10 w-full rounded-discord border-0 bg-discord-background-elevated px-3 py-2 text-sm text-discord-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-discord-background-elevated",
        filled: "bg-discord-background-secondary",
        ghost: "bg-transparent border border-discord-interactive-normal hover:border-discord-interactive-hover",
      },
      selectSize: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "",
        error: "ring-2 ring-discord-status-error focus-visible:ring-discord-status-error",
        success: "ring-2 ring-discord-status-success focus-visible:ring-discord-status-success",
        warning: "ring-2 ring-discord-status-warning focus-visible:ring-discord-status-warning",
      }
    },
    defaultVariants: {
      variant: "default",
      selectSize: "default",
      state: "default",
    },
  }
)

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  label?: string
  error?: string
  success?: string
  warning?: string
  helperText?: string
  placeholder?: string
  options?: Array<{ value: string; label: string; disabled?: boolean }>
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant, 
    selectSize, 
    state, 
    label, 
    error, 
    success, 
    warning, 
    helperText, 
    placeholder,
    options = [],
    children,
    ...props 
  }, ref) => {
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : warning ? 'warning' : state || 'default'
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-discord-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(selectVariants({ variant, selectSize, state: currentState, className }), "appearance-none pr-8")}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
                className="bg-discord-background-elevated text-discord-text-primary"
              >
                {option.label}
              </option>
            ))}
            {children}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-discord-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {(error || success || warning || helperText) && (
          <div className="text-xs">
            {error && (
              <span className="text-discord-status-error flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </span>
            )}
            {success && (
              <span className="text-discord-status-success flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </span>
            )}
            {warning && (
              <span className="text-discord-status-warning flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {warning}
              </span>
            )}
            {helperText && !error && !success && !warning && (
              <span className="text-discord-text-muted">{helperText}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select, selectVariants }