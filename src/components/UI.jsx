// Reusable UI Components for the portfolio

import React from 'react';
import { motion } from 'framer-motion';

// Section wrapper component for consistent spacing and animation
export const Section = ({
  id,
  children,
  className = '',
  background = 'bg-white dark:bg-slate-950',
  padding = 'py-20'
}) => {
  return (
    <section
      id={id}
      className={`${background} ${padding} px-6 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
};

// Animated section wrapper
export const AnimatedSection = ({
  id,
  children,
  className = '',
  background = 'bg-white dark:bg-slate-950',
  padding = 'py-20',
  delay = 0
}) => {
  return (
    <Section id={id} className={className} background={background} padding={padding}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </Section>
  );
};

// Button component with consistent styling
export const Button = React.forwardRef(({
  as: Component = 'button',
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-sky-500 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      onClick={onClick}
      disabled={Component === 'button' ? disabled : undefined}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

// Card component for consistent card styling
export const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-200 dark:bg-slate-900 dark:border-slate-800 ${
        hover ? 'hover:shadow-md hover:-translate-y-1' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Badge component for tags and status indicators
export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-lg ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Optimized image component with lazy loading
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
};

// Heading components for consistent typography
export const SectionHeading = ({ children, className = '', ...props }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 ${className}`} {...props}>
    {children}
  </h2>
);

export const SectionSubheading = ({ children, className = '', ...props }) => (
  <p className={`text-sm uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300 mb-4 ${className}`} {...props}>
    {children}
  </p>
);

export const SectionDescription = ({ children, className = '', ...props }) => (
  <p className={`text-base md:text-lg leading-7 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto ${className}`} {...props}>
    {children}
  </p>
);