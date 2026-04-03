import React from "react";

export default function Card({ children, hover = true, className = "", ...props }) {
  return (
    <div
      className={`
        rounded-xl border shadow-lg p-6
        transition-transform duration-300 ease-out
        ${hover ? "hover:shadow-2xl hover:border-blue-500 hover:scale-105" : ""}
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}