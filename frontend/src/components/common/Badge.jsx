import React from 'react';

export const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    info: "bg-surface-container-high text-primary border border-surface-tint/20",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    turquoise: "bg-secondary-container text-on-secondary-container font-semibold",
    primary: "bg-primary text-white font-medium",
    outline: "border border-outline-variant text-on-surface-variant"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${variants[variant] || variants.info} ${className}`}>
      {children}
    </span>
  );
};
