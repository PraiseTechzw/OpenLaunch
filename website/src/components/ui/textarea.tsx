import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-discord border-0 bg-discord-background-elevated px-3 py-2 text-sm text-discord-text-primary placeholder:text-discord-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-discord-background-elevated",
        filled: "bg-discord-background-secondary",
        ghost: "bg-transparent border border-discord-interactive-normal hover:border-discord-interactive-hover",
      },
      textareaSize: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        default: "min-h-[80px] px-3 py-2",
        lg: "min-h-[120px] px-4 py-3 text-base",
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
      textareaSize: "default",
      state: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  success?: string
  warning?: string
  helperText?: string
  maxLength?: number
  showCharCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant, 
    textareaSize, 
    state, 
    label, 
    error, 
    success, 
    warning, 
    helperText, 
    maxLength,
    showCharCount = false,
    value,
    ...props 
  }, ref) => {
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : warning ? 'warning' : state || 'default'
    const currentLength = typeof value === 'string' ? value.length : 0
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-discord-text-primary">
            {label}
          </label>
        )}
        <textarea
          className={cn(textareaVariants({ variant, textareaSize, state: currentState, className }))}
          ref={ref}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <div className="flex justify-between items-start">
          <div className="flex-1">
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
          {(showCharCount || maxLength) && (
            <div className="text-xs text-discord-text-muted ml-2">
              {maxLength ? `${currentLength}/${maxLength}` : currentLength}
            </div>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }