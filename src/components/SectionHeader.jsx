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
      <h2 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
        {title} <span style={{ color: 'var(--accent-color)' }}>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  );
}
