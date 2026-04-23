import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Plane, Hotel, Map, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { pages } = useCMS();
  const page = pages['services'];
  const hero = page?.sections.find(s => s.type === 'hero');

  const servicesList = [
    { icon: <Plane className="h-10 w-10 text-secondary" />, title: 'Flight Booking', desc: 'Best deals on first and business class flights worldwide.' },
    { icon: <Hotel className="h-10 w-10 text-secondary" />, title: 'Luxury Accommodation', desc: 'Stay in the world\'s finest hotels, villas, and resorts.' },
    { icon: <Map className="h-10 w-10 text-secondary" />, title: 'Tour Planning', desc: 'Custom itineraries crafted by local experts.' },
    { icon: <Shield className="h-10 w-10 text-secondary" />, title: 'Travel Insurance', desc: 'Comprehensive coverage for peace of mind.' },
  ];

  return (
    <div>
      {hero && (
        <div className="relative h-[400px] flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img src={hero.image} alt="Services" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{hero.title}</h1>
            <p className="text-xl text-gray-200">{hero.subtitle}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((s, i) => (
            <Link 
              key={i} 
              to="/contact" 
              state={{ service: s.title }}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col items-center"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{s.desc}</p>
              <div className="text-primary font-medium flex items-center gap-1 group-hover:text-secondary transition-colors text-sm">
                Inquire Now <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;