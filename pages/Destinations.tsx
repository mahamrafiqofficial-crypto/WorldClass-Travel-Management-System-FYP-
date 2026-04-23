import React from 'react';
import { useCMS } from '../context/CMSContext';
import PackageCard from '../components/PackageCard';

const Destinations: React.FC = () => {
  const { packages } = useCMS();

  return (
    <div className="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 pt-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Destinations</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our handpicked collection of exclusive travel packages designed for the modern adventurer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
