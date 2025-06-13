
import React from 'react';

interface ProductModalFeaturesProps {
  features: string[];
  isSafariTour: boolean;
}

const ProductModalFeatures: React.FC<ProductModalFeaturesProps> = ({ 
  features, 
  isSafariTour 
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
      <div className={`grid gap-3 ${isSafariTour ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductModalFeatures;
