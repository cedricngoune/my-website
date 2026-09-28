import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Action principale : le violet de la marque. */
        default:
          "brand-gradient text-white shadow-card hover:-translate-y-0.5 hover:shadow-high",
        /** Sur une surface neutre. */
        outline:
          "border border-border-strong bg-surface text-foreground hover:-translate-y-0.5 hover:border-brand hover:text-brand",
        /** Sur un fond violet, par exemple dans le héros. */
        onBrand:
          "bg-white text-[#4D2FB2] hover:-translate-y-0.5 hover:bg-white/90",
        onBrandOutline:
          "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/20",
        ghost: "text-foreground-muted hover:bg-surface-2 hover:text-foreground",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
