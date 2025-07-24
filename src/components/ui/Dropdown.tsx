import { useState, useRef, useEffect } from 'react';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const Dropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  error, 
  errorMessage,
  disabled,
  className = ''
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  const stateStyles = getFormStateStyles({ 
    includeHoverShadow: true, 
    includeFocusShadow: true 
  });
  
  const currentState = getFormState(disabled, error);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelect = (option: DropdownOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  };
  
  return (
    <div className="w-full" ref={dropdownRef}>
      <label>{label}</label>
      <div className="relative">
        <button
          type="button"
          className={
            `w-full h-10 px-3 pr-8 text-left text-sm border border-[rgb(var(--color-border))] transition-all duration-200 outline-none bg-white flex items-center justify-between 
            ${stateStyles[currentState]} ${!disabled ? 'cursor-pointer' : ''} ${className}`
          }
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedOption ? 'text-[rgb(var(--color-surface))]' : 'text-[rgb(var(--color-border))]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg 
            className={`absolute right-3 w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2),2px_2px_2px_0px_rgba(0,0,0,0.16)]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full h-10 px-3 text-left text-sm text-[rgb(var(--color-mono))] hover:bg-[rgba(205,227,255,1)] transition-colors cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <div className="mt-1 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};