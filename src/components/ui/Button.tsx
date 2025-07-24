import type { ButtonHTMLAttributes } from 'react';
import { Icons } from '../Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
}

export const Button = ({ variant = 'primary', size = 'md', showArrow = false, className = '', children, ref, ...props }: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    const baseStyles = 'text-base font-semibold weight-600 transition-all duration-200 outline-none flex items-center justify-center gap-2 cursor-pointer';

    const sizeStyles = {
      sm: 'px-4 py-2 h-8 min-w-[71px] text-sm',
      md: 'px-5 py-2.5 h-10 min-w-[87px] text-base',
      lg: 'px-8 py-3 h-12 min-w-[120px] text-base'
    };

    const variantStyles = {
      primary: {
        default: 'text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))] hover:shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2)] active:bg-[rgb(var(--color-primary-dark))] active:shadow-none disabled:bg-[#E8E9ED] disabled:text-[rgb(var(--color-border))] disabled:shadow-none disabled:cursor-not-allowed',
      },
      tertiary: {
        default: 'text-[rgb(var(--color-neutral))] bg-transparent hover:text-[rgb(var(--color-primary))] active:text-[rgb(var(--color-primary-dark))]',
      }
    };

    const getArrowColor = () => {
      if (props.disabled) {
        return 'rgb(var(--color-border))';
      }
      return variant === 'primary' ? '#ffffff' : 'rgb(var(--color-neutral))';
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant].default} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
        {showArrow && (
          <Icons 
            name="arrow-right" 
            color={getArrowColor()}
            width={20} 
            height={20} 
          />
        )}
      </button>
    );
};