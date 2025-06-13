
import React from 'react';
import { MapPin } from 'lucide-react';

interface ProductModalItineraryProps {
  itinerary: string[];
}

const ProductModalItinerary: React.FC<ProductModalItineraryProps> = ({ itinerary }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-primary-500" />
        Tour Itinerary
      </h3>
      <div className="space-y-3">
        {itinerary.map((stop, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
              {index + 1}
            </div>
            <span className="text-gray-700">{stop}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductModalItinerary;
