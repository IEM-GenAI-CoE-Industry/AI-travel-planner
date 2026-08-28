import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  icon: Icon = null,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-container shadow-md hover:shadow-lg active:scale-[0.98]",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md active:scale-[0.98]",
    turquoise: "bg-secondary-fixed-dim text-primary font-semibold hover:bg-secondary-container shadow-md active:scale-[0.98]",
    outline: "border-2 border-primary text-primary hover:bg-primary/5 active:scale-[0.98]",
    ghost: "text-on-surface-variant hover:bg-surface-container hover:text-primary"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
