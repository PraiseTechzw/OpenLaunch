import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105",
        outline:
          "border-2 border-gray-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary-300 hover:bg-primary-50 transform hover:scale-105",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-lg hover:shadow-xl hover:from-gray-200 hover:to-gray-300 transform hover:scale-105",
        ghost: "hover:bg-gradient-to-r hover:from-gray-100 hover:to-primary-50 hover:text-gray-900 transform hover:scale-105",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700",
        glow: "bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white shadow-2xl hover:shadow-3xl btn-glow transform hover:scale-110",
        glass: "bg-white/20 backdrop-blur-lg border border-white/30 text-gray-900 shadow-xl hover:shadow-2xl hover:bg-white/30 transform hover:scale-105",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (asChild) {
      // When using asChild, we can't add extra elements, so just return the child
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
        {...props}
      >
        {/* Shimmer effect for enhanced buttons */}
        {(variant === 'default' || variant === 'glow') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        )}
        
        {/* Content wrapper */}
        <span className="relative z-10 flex items-center">
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }