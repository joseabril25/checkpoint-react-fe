import type { TextareaHTMLAttributes } from 'react';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const TextAarea = ({ label, error, errorMessage, className = '', ref, ...props }: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) => {
  const stateStyles = getFormStateStyles();
  const currentState = getFormState(props.disabled, error);
  
  return (
    <div className="w-full">
      <label>{label}</label>
      <textarea
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