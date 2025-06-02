
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  hover?: boolean;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = "",
  variant = 'glass',
  hover = true
}) => {
  const baseClasses = "transition-all duration-350 ease-out";
  const variantClasses = {
    glass: "premium-card-glass",
    solid: "bg-gray-800/90 border border-yellow-400/20 rounded-2xl shadow-lg",
    gradient: "bg-gradient-to-br from-yellow-400/10 to-blue-600/10 border border-yellow-400/30 rounded-2xl shadow-lg backdrop-blur-lg"
  };
  const hoverClasses = hover ? "hover:scale-[1.02] hover:shadow-xl" : "";

  return (
    <Card className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {children}
    </Card>
  );
};

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = "",
  onClick,
  disabled = false
}) => {
  const baseClasses = "font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-3 focus:ring-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "premium-button-primary",
    secondary: "premium-button-secondary", 
    ghost: "bg-transparent text-yellow-400 hover:bg-yellow-400/10 border border-transparent hover:border-yellow-400/20 rounded-xl"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  return (
    <Button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

interface PremiumBadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'blue' | 'green' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  icon: Icon
}) => {
  const variantClasses = {
    gold: "bg-yellow-400/15 border-yellow-400/30 text-yellow-400",
    blue: "bg-blue-600/15 border-blue-600/30 text-blue-400",
    green: "bg-green-600/15 border-green-600/30 text-green-400",
    gray: "bg-gray-700/50 border-gray-600/30 text-gray-300"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <div className={`inline-flex items-center gap-2 border rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </div>
  );
};

interface PremiumMetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  highlight?: boolean;
  description?: string;
}

export const PremiumMetricCard: React.FC<PremiumMetricCardProps> = ({
  icon: Icon,
  value,
  label,
  highlight = false,
  description
}) => {
  return (
    <PremiumCard 
      variant={highlight ? 'gradient' : 'glass'}
      className={`p-6 text-center ${highlight ? 'ring-1 ring-yellow-400/40' : ''}`}
    >
      <Icon className={`w-10 h-10 mx-auto mb-4 ${highlight ? 'text-yellow-400' : 'text-blue-400'}`} />
      <div className={`text-3xl md:text-4xl font-bold mb-2 executive-display-medium ${highlight ? 'text-yellow-400' : 'text-white'}`}>
        {value}
      </div>
      <div className="executive-body-small text-white/80 mb-2">
        {label}
      </div>
      {description && (
        <div className="text-xs text-white/60 mt-2">
          {description}
        </div>
      )}
    </PremiumCard>
  );
};

interface PremiumInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`premium-input w-full ${className}`}
    />
  );
};

interface PremiumSectionProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  background?: 'default' | 'gradient' | 'pattern';
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  children,
  className = "",
  compact = false,
  background = 'default'
}) => {
  const backgroundClasses = {
    default: "",
    gradient: "bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent",
    pattern: "relative"
  };

  return (
    <section className={`${compact ? 'py-16' : 'py-24'} ${backgroundClasses[background]} ${className}`}>
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      )}
      <div className="premium-container relative z-10">
        {children}
      </div>
    </section>
  );
};

export const PremiumDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent ${className}`} />
  );
};
