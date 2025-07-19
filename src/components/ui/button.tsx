import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "purple" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "bg-secondary text-secondary-foreground hover:bg-secondary/90": variant === "secondary",
            "bg-success text-success-foreground hover:bg-success/90": variant === "success",
            "bg-warning text-warning-foreground hover:bg-warning/90": variant === "warning",
            "bg-error text-error-foreground hover:bg-error/90": variant === "error",
            "bg-purple text-purple-foreground hover:bg-purple/90": variant === "purple",
            "border border-border bg-background hover:bg-muted": variant === "outline",
            "hover:bg-muted": variant === "ghost",
          },
          
          // Sizes
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
