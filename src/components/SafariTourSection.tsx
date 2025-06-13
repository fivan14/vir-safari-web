
import React from 'react';
import { Users, Clock } from 'lucide-react';

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

interface SafariTourSectionProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  getPrice: (product: Product) => number;
}

const SafariTourSection: React.FC<SafariTourSectionProps> = ({
  products,
  onProductSelect,
  getPrice
}) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safari Adventures</h3>
      <div className="max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden w-full">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h4>
                
                {product.features && (
                  <div className="grid grid-cols-1 gap-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{product.seats} people</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>1 hour</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary-600">
                      €{getPrice(product)}
                    </span>
                    <span className="text-gray-600 ml-2">/person</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onProductSelect(product)}
                    className="btn-secondary flex-1"
                  >
                    View Details
                  </button>
                  <a
                    href={`https://wa.me/385915555555?text=${encodeURIComponent(`Hi! I'd like to book ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 text-center"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafariTourSection;
