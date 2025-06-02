
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "vr-btn-base inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "vr-btn-primary",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "vr-btn-outline",
        secondary: "vr-btn-secondary", 
        ghost: "vr-btn-ghost",
        link: "text-gold underline-offset-4 hover:underline bg-transparent p-0",
      },
      size: {
        default: "px-6 py-3",
        sm: "vr-btn-small",
        lg: "vr-btn-large",
        icon: "h-10 w-10 p-0",
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
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Determina a cor do texto baseado na variante
    const textColor = variant === "default" || variant === "destructive" 
      ? "#101418" // Texto escuro para fundos coloridos
      : "white";   // Texto branco para outros casos
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ 
          color: textColor,
          ...style 
        }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
