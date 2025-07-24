import ReactDatePicker from 'react-datepicker';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface DatePickerProps {
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  dateFormat?: string;
  className?: string;
}

// Custom input component that matches our form style
const CustomInput = ({ value, onClick, placeholder, ref, disabled, error }: {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  error?: boolean;
}) => {
  const stateStyles = getFormStateStyles();
  const currentState = getFormState(disabled, error);
  
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        className={`w-full ${stateStyles[currentState]}`}
      />
      {/* Calendar icon */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-[rgb(var(--color-border))]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    </div>
  );
};

export const DatePicker = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Select a date",
  error, 
  errorMessage,
  disabled,
  dateFormat = "MM/dd/yyyy",
  className = ''
}: DatePickerProps) => {
  return (
    <div className={`w-full ${className}`}>
      <label>{label}</label>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        disabled={disabled}
        customInput={<CustomInput disabled={disabled} error={error} />}
        wrapperClassName="w-full"
        popperClassName="z-50"
        calendarClassName="shadow-lg border border-gray-200 rounded-md"
      />
      {error && errorMessage && (
        <div className="mt-1 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};