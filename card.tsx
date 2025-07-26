import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;