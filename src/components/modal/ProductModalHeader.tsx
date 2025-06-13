
import React from 'react';
import { X } from 'lucide-react';

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

interface ProductModalHeaderProps {
  product: Product;
  onClose: () => void;
  isHappyHour: boolean;
}

const ProductModalHeader: React.FC<ProductModalHeaderProps> = ({ 
  product, 
  onClose, 
  isHappyHour 
}) => {
  const isSafariTour = product.type === 'tour';

  return (
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
      {product.happyHour1h && isHappyHour && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
          🎉 Happy Hour Active!
        </div>
      )}
    </div>
  );
};

export default ProductModalHeader;
