
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock, Euro } from 'lucide-react';
import ProductModal from './ProductModal';
import productsData from '../data/products.json';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on mode
  const products = productsData.filter(product => 
    mode === 'tour' ? product.type === 'tour' : product.type !== 'tour'
  ) as Product[];

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) return null;

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {mode === 'tour' ? 'Safari Adventures' : 'Our Fleet'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {mode === 'tour' 
              ? 'Professional guided tours to discover the hidden beauty of Vir Island'
              : 'Choose from our premium selection of vehicles for your perfect adventure'
            }
          </p>
          {isHappyHour() && mode === 'rent' && (
            <div className="mt-4 inline-block bg-gradient-to-r from-primary-500 to-primary-400 text-white px-6 py-2 rounded-full font-semibold animate-pulse">
              🎉 Happy Hour: Special prices until 12:00!
            </div>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden mx-4">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/2 relative">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                        {product.happyHour1h && isHappyHour() && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Happy Hour!
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {product.name}
                        </h3>
                        
                        {/* Features */}
                        {product.features && (
                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {product.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-gray-600">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center gap-6 mb-6 text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{product.seats} seats</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            <span>From 1h</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-primary-600">
                              €{getPrice(product)}
                            </span>
                            <span className="text-gray-600 ml-2">/hour</span>
                            {product.happyHour1h && isHappyHour() && (
                              <span className="text-gray-400 line-through ml-2">
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

                        {/* Actions */}
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
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white btn-circle shadow-lg z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white btn-circle shadow-lg z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {products.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
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
