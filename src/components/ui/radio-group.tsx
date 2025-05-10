
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "peer relative aspect-square h-4 w-4 rounded-full border-2 border-gold/50 text-gold ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
        "data-[state=checked]:border-gold data-[state=checked]:bg-transparent data-[state=checked]:shadow-[0_0_15px_rgba(255,215,0,0.5)]",
        // Glass effect when checked
        "after:content-[''] after:absolute after:inset-0 after:rounded-full after:scale-0 after:opacity-0 after:transition-all after:duration-300 data-[state=checked]:after:scale-100 data-[state=checked]:after:opacity-100 after:backdrop-blur-sm after:bg-gold/30",
        // Inner dot
        "before:content-[''] before:absolute before:inset-0 before:m-auto before:rounded-full before:w-1.5 before:h-1.5 before:bg-gold before:scale-0 before:opacity-0 before:transition-all before:duration-300 data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100",
        className
      )}
      {...props}
    >
      {/* Empty RadioGroupIndicator - using CSS for the indicator instead */}
      <RadioGroupPrimitive.Indicator className="hidden" />
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
