import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { TravelPackage } from '../types';

interface Props {
  pkg: TravelPackage;
}

const PackageCard: React.FC<Props> = ({ pkg }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 sm:h-56">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold text-gray-800 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-current" />
          {pkg.rating}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          <MapPin size={14} />
          {pkg.location}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{pkg.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock size={16} />
            <span>{pkg.duration}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">From</span>
            <span className="text-lg font-bold text-secondary">${pkg.price}</span>
          </div>
        </div>
        <Link 
          to={`/package/${pkg.id}`}
          className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;