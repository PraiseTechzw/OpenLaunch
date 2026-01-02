import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-discord text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-discord-background-primary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary:
          "bg-discord-brand-primary text-discord-text-primary hover:bg-discord-brand-primary/90 active:bg-discord-brand-primary/80 shadow-discord-elevation-low hover:shadow-discord-elevation-medium",
        secondary:
          "bg-discord-interactive-normal text-discord-text-primary hover:bg-discord-interactive-hover active:bg-discord-interactive-active shadow-discord-elevation-low",
        success:
          "bg-discord-status-success text-discord-text-primary hover:bg-discord-status-success/90 active:bg-discord-status-success/80 shadow-discord-elevation-low",
        danger:
          "bg-discord-status-error text-discord-text-primary hover:bg-discord-status-error/90 active:bg-discord-status-error/80 shadow-discord-elevation-low",
        ghost: 
          "bg-transparent text-discord-text-secondary hover:bg-discord-background-modifier-hover hover:text-discord-text-primary active:bg-discord-background-modifier-active",
        link: 
          "bg-transparent text-discord-text-link underline-offset-4 hover:underline hover:text-discord-text-link/80 p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-discord",
        default: "h-10 px-4 py-2 rounded-discord",
        lg: "h-12 px-6 text-base rounded-discord-lg",
        icon: "h-10 w-10 rounded-discord",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Content wrapper - hidden when loading */}
        <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }