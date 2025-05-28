
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleClassName?: string;
  footer?: React.ReactNode;
}

// Changed Card to a forwardRef component
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', title, titleClassName = '', footer }, ref) => {
    return (
      <div ref={ref} className={`bg-white rounded-2xl shadow-lg ${className}`}>
        {title && (
          <div className={`p-4 md:p-6 border-b border-slate-200 ${titleClassName}`}>
            <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          </div>
        )}
        <div className="p-4 md:p-6">
          {children}
        </div>
        {footer && (
          <div className="p-4 md:p-6 border-t border-slate-200">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card'; // Good practice for forwardRef components

export default Card;
