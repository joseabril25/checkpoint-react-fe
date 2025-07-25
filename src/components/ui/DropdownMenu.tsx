import { useState, useRef, useEffect, type ReactNode } from 'react';

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

export const DropdownMenu = ({ trigger, children, align = 'start', className = '' }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClass = align === 'end' ? 'right-0' : 'left-0';

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`absolute top-full mt-1 ${alignmentClass} z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white shadow-lg ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownMenuItemProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const DropdownMenuItem = ({ onClick, children, className = '' }: DropdownMenuItemProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};