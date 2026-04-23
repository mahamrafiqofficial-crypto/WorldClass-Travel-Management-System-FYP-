import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const { pages } = useCMS();
  const page = pages['about'];
  const hero = page?.sections.find(s => s.type === 'hero');
  const mission = page?.sections.find(s => s.id === 'mission');

  if (!page) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in">
       {hero && (
        <div className="relative h-[60vh] flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img src={hero.image} alt="About Us" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{hero.title}</h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{hero.subtitle}</p>
            {hero.buttonText && hero.buttonLink && (
              <Link 
                to={hero.buttonLink}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
              >
                {hero.buttonText} <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      )}

      {mission && (
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">{mission.title}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{mission.content}</p>
        </div>
      )}
      
      {/* Team Section */}
      <div className="bg-gray-50 py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Meet Our Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1, 2, 3, 4].map((i) => {
                 const agentName = `Agent Name ${i}`;
                 return (
                   <div key={i} className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                     <img src={`https://picsum.photos/300/300?random=${i}`} alt="Agent" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100 shadow-sm" />
                     <h3 className="text-lg font-bold text-gray-900">{agentName}</h3>
                     <p className="text-sm text-gray-500 mb-4">Senior Travel Consultant</p>
                     <Link 
                       to="/contact" 
                       state={{ agent: agentName }}
                       className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition"
                     >
                       <Mail size={16} /> Contact {agentName}
                     </Link>
                   </div>
                 );
               })}
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;