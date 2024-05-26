// src/components/common/Button/Button.tsx
import React from 'react';

{/* How to use 
<Button variant="primary" onClick={() => console.log('Primary Button Clicked')}>
Primary Button
</Button>
<Button variant="secondary" onClick={() => console.log('Secondary Button Clicked')}>
Secondary Button
</Button> */}

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  const baseStyles = 'px-4 py-2 rounded font-bold focus:outline-none focus:ring-2';
  const primaryStyles = 'bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-500';
  const secondaryStyles = 'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500';

  const classNames = `${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles}`;

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
