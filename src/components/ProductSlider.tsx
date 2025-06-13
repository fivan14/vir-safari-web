
import React, { useState } from 'react';
import ProductModal from './ProductModal';
import SafariTourSection from './SafariTourSection';
import VehicleRentalSection from './VehicleRentalSection';
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

  const handleProductNavigation = (direction: 'prev' | 'next') => {
    if (!selectedProduct || selectedProduct.type === 'tour') return;
    
    const currentIndex = rentalProducts.findIndex(p => p.id === selectedProduct.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : rentalProducts.length - 1;
    } else {
      newIndex = currentIndex < rentalProducts.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedProduct(rentalProducts[newIndex]);
  };

  const getNavigationState = () => {
    if (!selectedProduct || selectedProduct.type === 'tour') {
      return { canNavigatePrev: false, canNavigateNext: false };
    }
    
    return {
      canNavigatePrev: rentalProducts.length > 1,
      canNavigateNext: rentalProducts.length > 1
    };
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
        <SafariTourSection
          products={safariProducts}
          onProductSelect={setSelectedProduct}
          getPrice={getPrice}
        />

        {/* Vehicle Rentals Section */}
        <VehicleRentalSection
          products={rentalProducts}
          onProductSelect={setSelectedProduct}
          getPrice={getPrice}
          isHappyHour={isHappyHour}
        />
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={handleProductNavigation}
          {...getNavigationState()}
        />
      )}
    </section>
  );
};

export default ProductSlider;
