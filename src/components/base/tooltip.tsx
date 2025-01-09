'use client';

import React, { useState, useRef, useEffect, ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: ReactNode;
}

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: ReactNode;
}

type TooltipContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const TooltipContext = React.createContext<TooltipContextType>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: React.createRef<HTMLElement | null>(),
});

export const Tooltip = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      triggerRef,
    }),
    [isOpen],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
};

export const TooltipTrigger = ({ children, asChild = false }: TooltipTriggerProps) => {
  const { setIsOpen, triggerRef } = React.useContext(TooltipContext);

  const content = asChild ? children : <div>{children}</div>;
  const element = React.isValidElement(content) ? content : <div>{content}</div>;

  return React.cloneElement(element, {
    ref: triggerRef,
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  });
};

export const TooltipContent = ({ children }: TooltipContentProps) => {
  const { isOpen, triggerRef } = React.useContext(TooltipContext);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      setPosition({
        top: triggerRect.top - contentRect.height - 8,
        left: triggerRect.left + (triggerRect.width - contentRect.width) / 2,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className="tw-fixed tw-z-50 tw-bg-gray-900 tw-text-white tw-px-3 tw-py-2 tw-rounded-md tw-text-sm tw-shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export const TooltipProvider = ({ children }: { children: ReactNode }) => children;
