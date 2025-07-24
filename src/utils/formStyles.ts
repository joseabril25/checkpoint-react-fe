// Shared form component state styles
export const getFormStateStyles = (options: {
  includeHoverShadow?: boolean;
  includeFocusShadow?: boolean;
} = {}) => {
  const { includeHoverShadow = false, includeFocusShadow = false } = options;
  
  const hoverShadow = includeHoverShadow ? 'hover:shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2),2px_2px_2px_0px_rgba(0,0,0,0.16)]' : '';
  const focusShadow = includeFocusShadow ? 'focus:shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2),2px_2px_2px_0px_rgba(0,0,0,0.16)]' : '';
  
  return {
    default: `placeholder-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))] ${hoverShadow} ${focusShadow}`.trim(),
    error: `border-[rgb(var(--color-error))] bg-white hover:border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-primary))] ${hoverShadow} ${focusShadow}`.trim(),
    disabled: 'border-none bg-[rgb(var(--color-bg-disabled))] cursor-not-allowed focus:none'
  };
};

// Common state resolver
export const getFormState = (disabled?: boolean, error?: boolean): 'default' | 'error' | 'disabled' => {
  return disabled ? 'disabled' : error ? 'error' : 'default';
};