import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSide?: 'left' | 'right';
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, labelSide = 'right', ...props }) => {
  const randomId = React.useMemo(() => id || `checkbox-${Math.random().toString(36).substr(2, 9)}`, [id]);

  return (
    <div className={`flex items-center ${className || ''}`}>
      {label && labelSide === 'left' && (
        <label htmlFor={randomId} className="mr-2 text-sm font-medium text-slate-700 cursor-pointer">
          {label}
        </label>
      )}
      <input
        id={randomId}
        type="checkbox"
        className="h-5 w-5 rounded-md border-slate-400 text-sky-600 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
        {...props}
      />
      {label && labelSide === 'right' && (
        <label htmlFor={randomId} className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
