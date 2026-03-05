import React from 'react';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asChild = false,
  ...props
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      className: combinedClasses,
      ...props,
    });
  }

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
