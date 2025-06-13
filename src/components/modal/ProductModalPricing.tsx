
import React from 'react';
import { Clock } from 'lucide-react';

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

interface ProductModalPricingProps {
  product: Product;
  isHappyHour: boolean;
}

const ProductModalPricing: React.FC<ProductModalPricingProps> = ({ 
  product, 
  isHappyHour 
}) => {
  const isSafariTour = product.type === 'tour';

  const formatDuration = (key: string) => {
    if (key.includes('24h')) return '24 hours';
    if (key.includes('h')) return key;
    return `${key} hour${parseInt(key) > 1 ? 's' : ''}`;
  };

  return (
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
              {isHappyHour && (
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
  );
};

export default ProductModalPricing;
