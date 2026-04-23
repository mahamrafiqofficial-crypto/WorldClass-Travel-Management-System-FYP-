import React from 'react';
import { useCMS } from '../../context/CMSContext';

const AdminSettings: React.FC = () => {
  const { theme, updateTheme } = useCMS();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Site Appearance</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
         <h2 className="text-xl font-bold mb-6">Colors</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex gap-2 items-center">
                 <input 
                   type="color" 
                   value={theme.primaryColor} 
                   onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                   className="h-10 w-10 border rounded cursor-pointer"
                 />
                 <span className="text-sm text-gray-500 uppercase">{theme.primaryColor}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Used for buttons, headings, and branding.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
              <div className="flex gap-2 items-center">
                 <input 
                   type="color" 
                   value={theme.secondaryColor} 
                   onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                   className="h-10 w-10 border rounded cursor-pointer"
                 />
                 <span className="text-sm text-gray-500 uppercase">{theme.secondaryColor}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Used for links, highlights, and icons.</p>
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <div className="flex gap-2 items-center">
                 <input 
                   type="color" 
                   value={theme.accentColor} 
                   onChange={(e) => updateTheme({ accentColor: e.target.value })}
                   className="h-10 w-10 border rounded cursor-pointer"
                 />
                 <span className="text-sm text-gray-500 uppercase">{theme.accentColor}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Used for Call-to-actions.</p>
            </div>
         </div>

         <div className="border-t pt-6">
           <h2 className="text-xl font-bold mb-6">Typography</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Sans-Serif Font (Body)</label>
               <select 
                  value={theme.fontFamilySans}
                  onChange={(e) => updateTheme({ fontFamilySans: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
               >
                 <option value="Inter">Inter</option>
                 <option value="Roboto">Roboto</option>
                 <option value="Open Sans">Open Sans</option>
                 <option value="Lato">Lato</option>
               </select>
             </div>
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Serif Font (Headings)</label>
               <select 
                  value={theme.fontFamilySerif}
                  onChange={(e) => updateTheme({ fontFamilySerif: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
               >
                 <option value="Playfair Display">Playfair Display</option>
                 <option value="Merriweather">Merriweather</option>
                 <option value="Lora">Lora</option>
               </select>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default AdminSettings;
