import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface FormFieldProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  children: React.ReactNode
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, error, helperText, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <Label required={required}>
            {label}
          </Label>
        )}
        {children}
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
