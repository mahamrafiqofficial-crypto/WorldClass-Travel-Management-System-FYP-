import React from 'react';
import { useCMS } from '../context/CMSContext';
import PackageCard from '../components/PackageCard';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { pages, packages } = useCMS();
  const navigate = useNavigate();
  const page = pages['home'];
  
  if (!page) return <div>Loading...</div>;

  const hero = page.sections.find(s => s.type === 'hero');
  const intro = page.sections.find(s => s.id === 'intro');
  const cta = page.sections.find(s => s.type === 'cta');

  const featuredPackages = packages.slice(0, 3);

  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    if (!link) return;

    // Handle hash links (smooth scroll on same page)
    if (link.startsWith('#')) {
      e.preventDefault();
      const elementId = link.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Handle internal routes
    if (link.startsWith('/') && !link.startsWith('//')) {
      e.preventDefault();
      navigate(link);
      return;
    }
    
    // External links default behavior (open in current tab or typically _blank if handled elsewhere, but here standard href)
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Hero Section */}
      {hero && (
        <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img 
              src={hero.image} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-100 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
            {hero.buttonText && (
              <a 
                href={hero.buttonLink} 
                onClick={(e) => handleLinkClick(e, hero.buttonLink)}
                className="inline-block bg-accent hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg cursor-pointer"
              >
                {hero.buttonText}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Intro Section */}
      {intro && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              {intro.title}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {intro.content}
            </p>
          </div>
        </section>
      )}

      {/* Featured Packages */}
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Popular Destinations</h2>
              <p className="text-gray-600">Curated packages just for you.</p>
            </div>
            <Link to="/destinations" className="hidden md:flex items-center text-secondary font-medium hover:text-primary transition">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/destinations" className="inline-flex items-center text-secondary font-medium hover:text-primary transition">
              View all destinations <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us (Hardcoded Structure with configurable text could be added, keeping simple for now) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/800/800" alt="Traveler" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Experience the WorldClass Difference</h2>
              <ul className="space-y-4">
                {[
                  'Personalized Itineraries tailored to your preferences',
                  '24/7 Global Support wherever you are',
                  'Exclusive access to premium hotels and flights',
                  'Expert local guides at every destination'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {cta && (
        <section className="py-20 bg-primary text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{cta.title}</h2>
            <p className="text-gray-300 text-lg mb-8">{cta.subtitle}</p>
            <a 
              href={cta.buttonLink} 
              onClick={(e) => handleLinkClick(e, cta.buttonLink)}
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg cursor-pointer"
            >
              {cta.buttonText}
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;