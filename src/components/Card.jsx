import React from 'react';

export default function Card({
  children,
  hover = true,
  className = '',
  ...props
}) {
  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 shadow-lg ${
        hover ? 'hover:shadow-2xl hover:border-blue-500 transition-all duration-300 hover:scale-105' : ''
      } p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
