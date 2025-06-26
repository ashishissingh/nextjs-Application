import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  loadingText,
  children,
  className,
  type = 'button',
  variant = 'default',
  disabled,
  onClick
}) => (
  <Button 
    type={type} 
    variant={variant}
    className={className}
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    {isLoading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </>
    ) : (
      children
    )}
  </Button>
);