
import React from 'react';
import { X, Users, Euro, Clock, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const formatDuration = (key: string) => {
    if (key.includes('24h')) return '24 hours';
    if (key.includes('h')) return key;
    return `${key} hour${parseInt(key) > 1 ? 's' : ''}`;
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
        )}

        {/* Header */}
        <div className="relative">
          <img
            src={product.img}
            alt={product.name}
            className={`w-full object-cover rounded-t-3xl ${
              isSafariTour ? 'h-80 lg:h-96' : 'h-64 lg:h-80'
            }`}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white btn-circle shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          {product.happyHour1h && isHappyHour() && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              🎉 Happy Hour Active!
            </div>
          )}
        </div>

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
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <div className={`grid gap-3 ${isSafariTour ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safari Tour Itinerary */}
              {product.itinerary && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                    Tour Itinerary
                  </h3>
                  <div className="space-y-3">
                    {product.itinerary.map((stop, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-500" />
                Pricing
              </h3>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="space-y-4">
                  {Object.entries(product.prices).map(([duration, price]) => (
                    <div key={duration} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        {formatDuration(duration)}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        €{price}
                        {isSafariTour && <span className="text-sm text-gray-600 ml-1">/person</span>}
                      </span>
                    </div>
                  ))}
                  
                  {/* Happy Hour Pricing */}
                  {product.happyHour1h && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-primary-600 font-semibold">
                          Happy Hour (9-12h)
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary-600">
                            €{product.happyHour1h}
                          </span>
                          <div className="text-sm text-gray-500 line-through">
                            €{product.prices['1h']}
                          </div>
                        </div>
                      </div>
                      {isHappyHour() && (
                        <div className="text-center mt-2">
                          <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Active Now!
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {product.deposit > 0 && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="text-sm text-gray-600">
                      <strong>Security deposit:</strong> €{product.deposit}
                      <br />
                      <span className="text-xs">Refunded after safe return</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/385915555555?text=${encodeURIComponent(`Hi! I'd like to book ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Book on WhatsApp
                </a>
                <a
                  href="tel:+385915555555"
                  className="btn-secondary w-full text-center block"
                >
                  Call Us
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p>• Free cancellation up to 2 hours before</p>
                <p>• Valid driving license required</p>
                <p>• Helmets and safety gear included</p>
                <p>• Fuel included in price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
