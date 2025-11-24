import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'primary', className = '', type = 'button', ...rest }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200';
    const variants: Record<Variant, string> = {
      primary: 'bg-secondary text-white px-6 py-3 shadow hover:shadow-lg transform hover:-translate-y-1',
      secondary: 'bg-surface text-textPrimary px-5 py-2 border border-neutralLighter',
      ghost: 'bg-transparent text-textPrimary px-4 py-2',
      outline: 'bg-surface text-textPrimary px-6 py-3 border-2 border-neutral hover:border-secondary hover:text-secondary',
    };

    return (
      <button ref={ref} type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
