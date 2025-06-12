
import React from 'react';

interface HeroProps {
  mode: 'tour' | 'rent';
}

const Hero: React.FC<HeroProps> = ({ mode }) => {
  const tourContent = {
    background: '../src/components/images/polaris_buggy.jpg',
    headline: 'Guided Safari Tours',
    subheadline: "Discover Vir's hidden gems in 1 hour",
    description: 'Join our experienced guides for an unforgettable adventure through the most beautiful and secret spots of Vir Island.',
    whatsappMessage: 'Hi! I\'d like to book a Safari Tour.'
  };

  const rentContent = {
    background: '../src/components/images/buggy_red_stones.jpg',
    headline: 'Rent & Ride Free',
    subheadline: 'Quads, buggies, scooters & more',
    description: 'Explore Vir Island at your own pace with our premium fleet of vehicles. Perfect for adventure seekers and families.',
    whatsappMessage: 'Hi! I\'d like to rent a vehicle.'
  };

  const content = mode === 'tour' ? tourContent : rentContent;

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out">
        <img
          src={content.background}
          alt={content.headline}
          className="w-full h-full object-cover"
        />
        <div className="gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {content.headline}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-4 font-light">
          {content.subheadline}
        </p>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {content.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`https://wa.me/385915555555?text=${encodeURIComponent(content.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4 hover:scale-110"
          >
            Book on WhatsApp
          </a>
          <button
            onClick={scrollToProducts}
            className="btn-secondary text-lg px-8 py-4 hover:scale-105"
          >
            View Options
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
