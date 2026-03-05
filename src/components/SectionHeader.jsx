import React from 'react';

export default function SectionHeader({
  title,
  highlight,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
        {title} <span className="text-blue-400">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
