import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export default function InputField({ label, error, icon, ...rest }: Props) {
  return (
    <label className="flex flex-col text-sm">
      {label && <span className="mb-2 text-textPrimary font-medium">{label}</span>}
      <div className="flex items-center bg-surface border border-neutralLighter rounded-md px-3 py-2 gap-2">
        {icon && <span className="text-textSecondary">{icon}</span>}
        <input className="flex-1 bg-transparent outline-none text-textPrimary" {...rest} />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </label>
  );
}
