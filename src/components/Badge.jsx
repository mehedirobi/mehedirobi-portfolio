import React from "react";

export default function Badge({
  children,
  variant = "gray",
  size = "sm",
  className = "",
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center rounded-full font-medium
    transition-all duration-300 ease-in-out
    select-none
  `;

  const variants = {
    gray: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    green: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    pink: "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200",
    outline: "border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant] || variants.gray} ${sizes[size] || sizes.sm} ${className} hover:scale-105`}
      {...props}
    >
      {children}
    </span>
  );
}