import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { addInquiry } = useCMS();
  const location = useLocation();
  const { packageTitle, service, agent } = location.state || {};
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (packageTitle) {
      setFormData(prev => ({ 
        ...prev, 
        message: `I am interested in booking the "${packageTitle}" package. Please send me more details.` 
      }));
    } else if (service) {
      setFormData(prev => ({ 
        ...prev, 
        message: `I would like to inquire about your "${service}" service.` 
      }));
    } else if (agent) {
      setFormData(prev => ({ 
        ...prev, 
        message: `I would like to get in touch with ${agent}.` 
      }));
    }
  }, [packageTitle, service, agent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-10">
            Have a question or ready to book your next trip? Our team is here to help you plan the perfect itinerary.
          </p>
          
          <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3 rounded-full text-primary">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Visit Us</h3>
                 <p className="text-gray-600">123 Travel Lane, Suite 100<br/>New York, NY 10001</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3 rounded-full text-primary">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Call Us</h3>
                 <p className="text-gray-600">+1 (555) 123-4567</p>
                 <p className="text-sm text-gray-400">Mon-Fri 9am-6pm EST</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-primary/10 p-3 rounded-full text-primary">
                 <Mail size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Email Us</h3>
                 <p className="text-gray-600">hello@worldclass.com</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                 <Send size={32} />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
               <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
               <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Tell us about your dream trip..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;