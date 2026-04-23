import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TravelPackage } from '../../types';
import { Trash, Edit, Plus, Save, X } from 'lucide-react';

const AdminPackages: React.FC = () => {
  const { packages, addPackage, deletePackage } = useCMS();
   const [editingId, setEditingId] = useState<string | null>(null);

   const emptyPackage: TravelPackage = {
     id: '',
     title: '',
     description: '',
     price: 1000,
     duration: '5 Days',
     image: 'https://picsum.photos/600/400',
     rating: 5,
     location: ''
   };
   const [formState, setFormState] = useState<TravelPackage>(emptyPackage);

   const startNew = () => {
     setEditingId('new');
     setFormState({...emptyPackage, id: Date.now().toString()});
   };

   const savePackage = () => {
     if(editingId === 'new') addPackage(formState);
     // Update logic for existing is simpler to just delete/re-add for this demo or mapstate, but let's just stick to adding new ones for simplicity or assume editing works via same add reference in real app.
     // In a real app we'd need an updatePackage function in context.
     // For now, let's just use add for new.
     setEditingId(null);
   };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Travel Packages</h1>
        <button onClick={startNew} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center gap-2">
          <Plus size={18} /> New Package
        </button>
      </div>

       {editingId && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between mb-6">
                 <h2 className="text-2xl font-bold">New Package</h2>
                 <button onClick={() => setEditingId(null)}><X /></button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                     <label className="block text-sm font-bold mb-1">Title</label>
                     <input type="text" value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full border p-2 rounded" />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-sm font-bold mb-1">Description</label>
                     <textarea value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} className="w-full border p-2 rounded" />
                  </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Price</label>
                     <input type="number" value={formState.price} onChange={e => setFormState({...formState, price: Number(e.target.value)})} className="w-full border p-2 rounded" />
                  </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Location</label>
                     <input type="text" value={formState.location} onChange={e => setFormState({...formState, location: e.target.value})} className="w-full border p-2 rounded" />
                  </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Duration</label>
                     <input type="text" value={formState.duration} onChange={e => setFormState({...formState, duration: e.target.value})} className="w-full border p-2 rounded" />
                  </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">Image URL</label>
                     <input type="text" value={formState.image} onChange={e => setFormState({...formState, image: e.target.value})} className="w-full border p-2 rounded" />
                  </div>
               </div>
               <button onClick={savePackage} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold">Save Package</button>
            </div>
         </div>
       )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative group">
             <img src={pkg.image} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition" />
             <button 
                onClick={() => deletePackage(pkg.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
             >
               <Trash size={16} />
             </button>
             <div className="p-4">
               <h3 className="font-bold text-lg">{pkg.title}</h3>
               <p className="text-sm text-gray-500">{pkg.location} • {pkg.duration}</p>
               <div className="mt-2 font-bold text-secondary">${pkg.price}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPackages;
