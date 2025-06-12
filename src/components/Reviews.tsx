
import React from 'react';
import ReviewCard from './ReviewCard';

const Reviews: React.FC = () => {
  const reviews = [
    {
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?auto=format&fit=crop&w=150&q=80',
      name: 'Sarah Johnson',
      date: 'November 2024',
      rating: 5,
      excerpt: 'Amazing experience! The guided safari tour was incredible. Our guide knew all the hidden spots on Vir Island. The quad was well-maintained and the whole team was very professional. Highly recommended!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      name: 'Marco Rossi',
      date: 'October 2024',
      rating: 5,
      excerpt: 'Perfect family adventure! We rented the buggy for the whole family and had a blast exploring the island. The staff was helpful and the vehicle was in excellent condition. Great value for money!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      name: 'Emma Weber',
      date: 'September 2024',
      rating: 5,
      excerpt: 'The e-scooter rental was perfect for quick trips around town. Easy booking via WhatsApp, fair prices, and great service. The scooter was clean and worked perfectly. Will definitely use again!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      name: 'Thomas Klein',
      date: 'August 2024',
      rating: 5,
      excerpt: 'Outstanding service from Alpha Quads! The safari tour exceeded our expectations. Beautiful locations, great guide, and well-organized. The happy hour prices were an added bonus. Definitely coming back!'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about their adventures with Alpha Quads.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl p-8 max-w-2xl mx-auto text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Happy Customers</h3>
            <p className="mb-6 opacity-90">
              Book your adventure today and create unforgettable memories on Vir Island.
            </p>
            <a
              href="https://wa.me/385915555555?text=Hi! I'd like to book an adventure with Alpha Quads."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-2xl hover:bg-gray-100 transition-colors inline-block"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
