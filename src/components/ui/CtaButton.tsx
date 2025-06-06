import type { ReactNode } from 'react';

interface CtaButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
}

export default function CtaButton({ 
  href, 
  variant = 'primary', 
  children,
  className = ''
}: CtaButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
  };

  return (
    <a 
      href={href} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
} 