import type { InputHTMLAttributes } from 'react';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input = ({ label, error, errorMessage, className = '', ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
    const stateStyles = getFormStateStyles();
    const currentState = getFormState(props.disabled, error);
    
    return (
      <div className="w-full">
        <label>{label}</label>
        <input
          ref={ref}
          className={`w-full ${stateStyles[currentState]} ${className}`}
          {...props}
        />
        {error && errorMessage && (
          <div className="mt-1 text-sm text-red-600">{errorMessage}</div>
        )}
      </div>
    );
};
