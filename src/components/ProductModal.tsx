
import React from 'react';
import { Users, Euro, Star } from 'lucide-react';
import ProductModalHeader from './modal/ProductModalHeader';
import ProductModalNavigation from './modal/ProductModalNavigation';
import ProductModalFeatures from './modal/ProductModalFeatures';
import ProductModalItinerary from './modal/ProductModalItinerary';
import ProductModalPricing from './modal/ProductModalPricing';

interface Product {
  id: string;
  name: string;
  type: string;
  seats: number;
  deposit: number;
  prices: Record<string, number>;
  happyHour1h?: number;
  img: string;
  features?: string[];
  itinerary?: string[];
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  canNavigatePrev?: boolean;
  canNavigateNext?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose, 
  onNavigate,
  canNavigatePrev = false,
  canNavigateNext = false
}) => {
  const isHappyHour = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 12;
  };

  const showNavigationButtons = product.type !== 'tour' && onNavigate;
  const isSafariTour = product.type === 'tour';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-3xl shadow-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative ${
        isSafariTour ? 'max-w-6xl' : 'max-w-4xl'
      }`}>
        {/* Navigation Buttons */}
        {showNavigationButtons && (
          <ProductModalNavigation
            onNavigate={onNavigate}
            canNavigatePrev={canNavigatePrev}
            canNavigateNext={canNavigateNext}
          />
        )}

        {/* Header */}
        <ProductModalHeader
          product={product}
          onClose={onClose}
          isHappyHour={isHappyHour()}
        />

        <div className="p-8">
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h2>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{product.seats} {product.seats === 1 ? 'seat' : 'seats'}</span>
              </div>
              {product.deposit > 0 && (
                <div className="flex items-center">
                  <Euro className="w-5 h-5 mr-2" />
                  <span>€{product.deposit} deposit</span>
                </div>
              )}
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                <span>Highly rated</span>
              </div>
            </div>
          </div>

          <div className={`grid gap-8 ${isSafariTour ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {/* Left Column - Features and Specs */}
            <div className={isSafariTour ? 'lg:col-span-2' : ''}>
              {/* Features */}
              {product.features && (
                <ProductModalFeatures
                  features={product.features}
                  isSafariTour={isSafariTour}
                />
              )}

              {/* Safari Tour Itinerary */}
              {product.itinerary && (
                <ProductModalItinerary itinerary={product.itinerary} />
              )}
            </div>

            {/* Right Column - Pricing */}
            <ProductModalPricing
              product={product}
              isHappyHour={isHappyHour()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
