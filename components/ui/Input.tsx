import React from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
}

interface StandardInputProps extends BaseInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
  icon?: React.ReactElement<{ className?: string }>;
}

interface TextAreaProps extends BaseInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
  icon?: never; // Icons not typically used with textareas in this design
}

type InputProps = StandardInputProps | TextAreaProps;

const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => {
  const isTextarea = props.as === 'textarea';
  
  // Conditionally extract icon for standard inputs
  const icon = !isTextarea && 'icon' in props ? props.icon : undefined;

  const commonClasses = `block w-full px-4 py-3 rounded-2xl border ${
    error ? 'border-red-500' : 'border-slate-300'
  } shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 transition-colors ${className || ''}`;
  
  const inputSpecificClasses = !isTextarea && icon ? 'pl-10' : '';
  const textareaSpecificClasses = isTextarea ? 'min-h-[100px]' : '';


  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {!isTextarea && icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, { className: "h-5 w-5 text-slate-400"})}
          </div>
        )}
        {isTextarea ? (
          <textarea
            id={id}
            className={`${commonClasses} ${textareaSpecificClasses}`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} // Cast props for textarea
          />
        ) : (
          <input
            id={id}
            className={`${commonClasses} ${inputSpecificClasses}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)} // Cast props for input
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
