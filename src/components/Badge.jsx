import React from 'react';

export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
}) {
  const baseClasses = 'rounded-full font-semibold inline-block transition-all duration-300';

  const variants = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    purple: 'bg-purple-600 text-white',
    red: 'bg-red-600 text-white',
    gray: 'bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
    outline: 'border-2 border-blue-400 text-blue-600 dark:text-blue-400',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
