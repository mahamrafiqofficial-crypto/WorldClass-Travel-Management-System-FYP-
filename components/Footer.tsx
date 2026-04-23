import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-4">WorldClass</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premium partner for international travel. We create memories that last a lifetime.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/" className="hover:text-white">Home</a></li>
              <li><a href="#/about" className="hover:text-white">About Us</a></li>
              <li><a href="#/services" className="hover:text-white">Services</a></li>
              <li><a href="#/blog" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/destinations" className="hover:text-white">Europe</a></li>
              <li><a href="#/destinations" className="hover:text-white">Asia</a></li>
              <li><a href="#/destinations" className="hover:text-white">Africa</a></li>
              <li><a href="#/destinations" className="hover:text-white">South America</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" />
                <span>123 Travel Lane, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span>hello@worldclass.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} WorldClass Travel. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
