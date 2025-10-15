
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
      {title && <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
