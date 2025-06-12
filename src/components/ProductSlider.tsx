
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock, Euro } from 'lucide-react';
import ProductModal from './ProductModal';
import productsData from '../data/products.json';
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

interface ProductSliderProps {
  mode: 'tour' | 'rent';
}

const ProductSlider: React.FC<ProductSliderProps> = ({ mode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Show all products with safari tours first
  const safariProducts = productsData.filter(product => product.type === 'tour') as Product[];
  const rentalProducts = productsData.filter(product => product.type !== 'tour') as Product[];

  const isHappyHour = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 12;
  };

  const getPrice = (product: Product) => {
    const basePrice = Object.values(product.prices)[0];
    if (product.happyHour1h && isHappyHour()) {
      return product.happyHour1h;
    }
    return basePrice;
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safari Tours & Vehicle Rentals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover Vir Island with our guided safari tours or explore at your own pace with our premium vehicle fleet
          </p>
          {isHappyHour() && (
            <div className="mt-4 inline-block bg-gradient-to-r from-primary-500 to-primary-400 text-white px-6 py-2 rounded-full font-semibold animate-pulse">
              🎉 Happy Hour: Special prices until 12:00!
            </div>
          )}
        </div>

        {/* Safari Tours Section */}
        {safariProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safari Adventures</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {safariProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
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
                          onClick={() => setSelectedProduct(product)}
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
        )}

        {/* Vehicle Rentals Section - Now with Carousel */}
        {rentalProducts.length > 0 && (
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
                  {rentalProducts.map((product) => (
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
                              onClick={() => setSelectedProduct(product)}
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
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductSlider;
