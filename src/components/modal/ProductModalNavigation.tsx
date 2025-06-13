
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalNavigationProps {
  onNavigate: (direction: 'prev' | 'next') => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

const ProductModalNavigation: React.FC<ProductModalNavigationProps> = ({
  onNavigate,
  canNavigatePrev,
  canNavigateNext
}) => {
  return (
    <>
      {canNavigatePrev && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary-500 hover:bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {canNavigateNext && (
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary-500 hover:bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ProductModalNavigation;
