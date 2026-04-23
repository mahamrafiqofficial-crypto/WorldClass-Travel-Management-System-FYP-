import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useCMS();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-2xl text-gray-800">WorldClass</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path ? 'text-primary font-bold' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-gray-400 hover:text-primary" title="Admin Login">
              <User size={18} />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-primary hover:bg-gray-50"
              >
                Admin Area
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
