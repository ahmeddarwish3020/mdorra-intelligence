'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';

interface DropdownMenuProps {
  children: ReactNode;
  trigger: ReactNode;
  align?: 'left' | 'right';
  offset?: number;
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function DropdownMenu({ children, trigger, align = 'right', offset = 8 }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="btn-ghost btn-sm gap-1"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {trigger}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className={cn(
            'dropdown animate-scale-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          style={{ marginTop: offset }}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, icon, destructive, disabled, onClick, ...props }: DropdownItemProps) {
  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  return (
    <button
      className={cn(
        'dropdown-item w-full text-left',
        destructive && 'text-status-error hover:bg-status-error/10',
        disabled && 'opacity-50 pointer-events-none'
      )}
      onClick={handleClick}
      disabled={disabled}
      role="menuitem"
      {...props}
    >
      {icon && <span className="h-4 w-4 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </button>
  );
}

export function DropdownDivider() {
  return <div className="divider my-1" role="separator" />;
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <p className="px-3 py-1.5 text-caption text-text-subtle uppercase tracking-wide">{children}</p>;
}