import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { Star, Clock, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';

const PackageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { packages } = useCMS();
  const pkg = packages.find(p => p.id === id);

  if (!pkg) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Package Not Found</h2>
        <p className="text-gray-600 mb-8">The travel package you are looking for does not exist.</p>
        <Link to="/destinations" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto text-white">
          <Link to="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Destinations
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-wider mb-4 text-secondary">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
              <MapPin size={16} /> {pkg.location}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight drop-shadow-sm">{pkg.title}</h1>
          <div className="flex items-center gap-6 text-sm md:text-base">
            <span className="flex items-center gap-2">
              <Clock size={20} className="text-gray-300" /> {pkg.duration}
            </span>
            <span className="flex items-center gap-2">
              <Star size={20} className="text-yellow-400 fill-current" /> {pkg.rating} / 5.0
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Experience the Journey</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">
              {pkg.description}
            </p>
            
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Luxury Accommodation', 'Expert Local Guide', 'Daily Breakfast', 'Airport Transfers', 'City Tours', 'Welcome Dinner'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-500 font-medium">Starting from</span>
              </div>
              <div className="text-4xl font-serif font-bold text-primary mb-6">
                ${pkg.price.toLocaleString()}
                <span className="text-lg text-gray-400 font-sans font-normal ml-2">/ person</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-gray-900">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Location</span>
                  <span className="font-bold text-gray-900">{pkg.location}</span>
                </div>
                 <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    {pkg.rating} <Star size={14} className="text-yellow-400 fill-current" />
                  </span>
                </div>
              </div>

              <Link 
                to="/contact" 
                state={{ packageTitle: pkg.title }}
                className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Book This Trip
              </Link>
              <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                *Prices may vary based on season and availability. Free cancellation up to 7 days before departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;