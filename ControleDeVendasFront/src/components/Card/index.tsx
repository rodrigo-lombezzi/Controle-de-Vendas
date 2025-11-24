import React from 'react';

type CardProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
};

export default function Card({ title, children, className = '', compact = false }: CardProps) {
  const padding = compact ? 'p-4' : 'p-6';
  return (
    <div className={`bg-surface rounded-2xl shadow-sm border border-neutralLighter ${padding} ${className}`}>
      {title && <div className="mb-3"><h3 className="text-sm font-semibold text-textPrimary">{title}</h3></div>}
      <div className="text-textSecondary">{children}</div>
    </div>
  );
}
