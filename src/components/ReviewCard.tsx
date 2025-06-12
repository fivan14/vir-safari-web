
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  avatar: string;
  name: string;
  date: string;
  rating: number;
  excerpt: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ avatar, name, date, rating, excerpt }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6 line-clamp-4 leading-relaxed">
        "{excerpt}"
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
