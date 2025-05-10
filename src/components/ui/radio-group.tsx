
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
        "peer relative aspect-square h-4 w-4 rounded-full border-2 border-gold/50 text-gold ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        "data-[state=checked]:border-gold data-[state=checked]:bg-transparent data-[state=checked]:shadow-[0_0_10px_rgba(255,215,0,0.5)] data-[state=checked]:after:absolute data-[state=checked]:after:content-[''] data-[state=checked]:after:inset-0 data-[state=checked]:after:m-auto data-[state=checked]:after:bg-gold data-[state=checked]:after:rounded-full data-[state=checked]:after:w-2 data-[state=checked]:after:h-2 data-[state=checked]:after:shadow-[0_0_6px_2px_rgba(255,215,0,0.5)]",
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
