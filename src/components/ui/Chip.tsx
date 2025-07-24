

interface ChipProps {
  label: string;
  size?: 'sm' | 'lg';
  variant?: 'default' | 'selected' | 'warning' | 'disabled';
}

export const Chip = ({ label, size = 'sm', variant = 'default' }: ChipProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all text-[rgb(var(--color-mono))] cursor-pointer select-none whitespace-nowrap';
  
  const sizeStyles = {
    sm: 'h-5 min-w-11 text-xs px-2', // 20px height, min 44px width
    lg: 'h-7 min-w-[49px] text-sm px-2' // 28px height, min 49px width
  };
  
  const variantStyles = {
    default: 'border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary))]',
    selected: 'border border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-white',
    warning: 'border border-[rgb(var(--color-warning))] bg-[rgb(var(--color-warning))]',
    disabled: 'text-[rgba(var(--color-border))]' // no border, no background
  };
  
  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}>
      {label}
    </div>
  );
};
