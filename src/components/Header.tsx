
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onModeChange: (mode: 'tour' | 'rent') => void;
  currentMode: 'tour' | 'rent';
}

const Header: React.FC<HeaderProps> = ({ onModeChange, currentMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">AQ</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Alpha Quads</h1>
            <p className="text-xs text-gray-600">Vir Island</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onModeChange('tour')}
            onMouseEnter={() => onModeChange('tour')}
            className={`font-medium transition-colors ${
              currentMode === 'tour' 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
            }`}
          >
            Safari Tours
          </button>
          <button
            onClick={() => onModeChange('rent')}
            onMouseEnter={() => onModeChange('rent')}
            className={`font-medium transition-colors ${
              currentMode === 'rent' 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
            }`}
          >
            Free Ride
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            Contact
          </button>
          <a
            href="https://wa.me/385915555555"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <button
              onClick={() => {
                onModeChange('tour');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left font-medium py-2 transition-colors ${
                currentMode === 'tour' 
                  ? 'text-primary-600' 
                  : 'text-gray-700'
              }`}
            >
              Safari Tours
            </button>
            <button
              onClick={() => {
                onModeChange('rent');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left font-medium py-2 transition-colors ${
                currentMode === 'rent' 
                  ? 'text-primary-600' 
                  : 'text-gray-700'
              }`}
            >
              Free Ride
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left font-medium py-2 text-gray-700"
            >
              Contact
            </button>
            <a
              href="https://wa.me/385915555555"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
