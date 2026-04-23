import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurStory: React.FC = () => {
  const { pages } = useCMS();
  const page = pages['ourStory'];

  if (!page) return <div>Loading...</div>;

  const hero = page.sections.find(s => s.type === 'hero');
  const textSections = page.sections.filter(s => s.type === 'text');

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero */}
      {hero && (
        <div className="relative h-[50vh] flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img src={hero.image} alt={hero.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center px-4">
             <Link to="/about" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition">
                <ArrowLeft size={18} className="mr-2" /> Back to About Us
             </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{hero.title}</h1>
            <p className="text-xl text-gray-200 font-light">{hero.subtitle}</p>
          </div>
        </div>
      )}

      {/* Content Stream / Timeline style */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
         <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {textSections.map((section, index) => (
               <div key={section.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  
                  {/* Timeline Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-300 group-hover:bg-secondary transition shadow absolute left-0 md:static md:mx-auto shrink-0 z-10"></div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[45%] bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow ml-auto md:mx-0">
                     <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{section.title}</h3>
                     <p className="text-gray-600 leading-relaxed">
                        {section.content}
                     </p>
                  </div>
               </div>
            ))}
         </div>
         
         <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to be part of our next chapter?</h3>
            <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition">
               Plan Your Trip With Us
            </Link>
         </div>
      </div>
    </div>
  );
};

export default OurStory;