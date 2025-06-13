
import React from 'react';
import { Users, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

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

interface VehicleRentalSectionProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  getPrice: (product: Product) => number;
  isHappyHour: () => boolean;
}

const VehicleRentalSection: React.FC<VehicleRentalSectionProps> = ({
  products,
  onProductSelect,
  getPrice,
  isHappyHour
}) => {
  if (products.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Vehicle Rentals</h3>
      <div className="max-w-6xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.happyHour1h && isHappyHour() && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Happy Hour!
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/5" />
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h4>
                    
                    {product.features && (
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{product.seats} seats</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>From 1h</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-primary-600">
                          €{getPrice(product)}
                        </span>
                        <span className="text-gray-600 ml-2">/hour</span>
                        {product.happyHour1h && isHappyHour() && (
                          <span className="text-gray-400 line-through ml-2 text-sm">
                            €{Object.values(product.prices)[0]}
                          </span>
                        )}
                      </div>
                      {product.deposit > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          Deposit: €{product.deposit}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onProductSelect(product)}
                        className="btn-secondary w-full text-sm py-2"
                      >
                        View Details
                      </button>
                      <a
                        href={`https://wa.me/385915555555?text=${encodeURIComponent(`Hi! I'd like to rent ${product.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center text-sm py-2"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation buttons - hidden on mobile */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default VehicleRentalSection;
