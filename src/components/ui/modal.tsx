'use client';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose = () => {}, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Box */}
      <div
        className="z-50 w-full max-w-md rounded-2xl shadow-xl p-6 relative"
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors"
          style={{
            color: 'hsl(var(--muted-foreground))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'hsl(var(--foreground))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
          }}
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Slot for dynamic content */}
        <div className="mt-2">{children}</div>
      </div>
    </Dialog>
  );
}