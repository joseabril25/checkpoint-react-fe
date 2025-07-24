interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, alt, initials, size = 'md', className = '' }: AvatarProps) => {
  const sizeStyles = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const baseStyles = `inline-flex items-center justify-center rounded-full bg-neutral-200 text-neutral-700 font-medium overflow-hidden ${sizeStyles[size]} ${className}`;

  if (src) {
    return (
      <div className={baseStyles}>
        <img src={src} alt={alt || ''} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={baseStyles}>
      {initials || alt?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
};