import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-iron-900 border-2 border-blood-600/50 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)] animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-6 border-b border-iron-800 bg-iron-800/20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">{title}</h2>
          <button onClick={onClose} className="text-iron-500 hover:text-blood-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
