"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"

type ButtonVariant = "gradient" | "outline" | "ghost"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant
  children?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  gradient:
    "bg-gradient-to-r from-gold via-orange-400 to-secondary text-slate-950 shadow-glow-amber hover:brightness-110",
  outline:
    "border-2 border-white/15 text-foreground hover:bg-gold/10 hover:border-gold/50 hover:text-gold",
  ghost: "text-muted hover:text-gold hover:bg-white/5",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "gradient", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`relative overflow-hidden group h-12 px-6 rounded-2xl font-marquee text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {variant === "gradient" && (
          <span className="absolute inset-y-0 left-0 w-1/4 bg-white/50 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    )
  },
)
Button.displayName = "Button"
