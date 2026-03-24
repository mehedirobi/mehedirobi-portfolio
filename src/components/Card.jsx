import React from 'react';

export default function Card({
  children,
  hover = true,
  className = '',
  ...props
}) {
  return (
    <div
      className={`rounded-lg border shadow-lg ${
        hover ? 'hover:shadow-2xl hover:border-blue-500 transition-all duration-300 hover:scale-105' : ''
      } p-6 ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: hover ? 'var(--shadow-color)' : 'none'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
