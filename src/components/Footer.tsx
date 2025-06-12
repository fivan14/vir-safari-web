
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">AQ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Alpha Quads Vir</h3>
                <p className="text-gray-400 text-sm">Adventure Awaits</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover the hidden beauty of Vir Island with our guided safari tours and premium vehicle rentals. 
              Your adventure starts here.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/385915555555"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="tel:+385915555555"
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Safari Tours</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Quad Rentals</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Buggy Rentals</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Scooter Rentals</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">E-Scooters</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                <span className="text-sm">Vir Island, Croatia</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary-400" />
                <span className="text-sm">+385 91 555 5555</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary-400" />
                <span className="text-sm">info@alphaquads.hr</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-primary-400 mb-2">Opening Hours</h5>
              <div className="text-sm text-gray-300">
                <p>Mon - Sun: 8:00 - 20:00</p>
                <p className="text-primary-400">Happy Hour: 9:00 - 12:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Alpha Quads Vir. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
