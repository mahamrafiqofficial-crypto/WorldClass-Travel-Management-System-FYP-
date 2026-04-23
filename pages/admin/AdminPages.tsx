import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { generateText } from '../../services/geminiService';
import { Sparkles, Save, Loader } from 'lucide-react';

const AdminPages: React.FC = () => {
  const { pages, updatePage } = useCMS();
  const [selectedSlug, setSelectedSlug] = useState('home');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const currentPage = pages[selectedSlug];

  const handleSectionUpdate = (sectionId: string, field: string, value: string) => {
    const updatedSections = currentPage.sections.map(s => 
      s.id === sectionId ? { ...s, [field]: value } : s
    );
    updatePage(selectedSlug, { sections: updatedSections });
  };

  const handleAIMagic = async (sectionId: string, field: string, currentContent: string) => {
    setIsGenerating(`${sectionId}-${field}`);
    const prompt = `Rewrite this for a travel agency website section. Make it engaging, professional, and SEO-friendly. Content: "${currentContent || field}"`;
    const newText = await generateText(prompt);
    handleSectionUpdate(sectionId, field, newText);
    setIsGenerating(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Pages</h1>
        <select 
          value={selectedSlug} 
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 bg-white"
        >
          {Object.values(pages).map(p => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {/* SEO Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">SEO Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <input 
                type="text" 
                value={currentPage.seoTitle} 
                onChange={(e) => updatePage(selectedSlug, { seoTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea 
                value={currentPage.seoDescription} 
                onChange={(e) => updatePage(selectedSlug, { seoDescription: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Sections Editor */}
        {currentPage.sections.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800 capitalize">{section.type} Section ({section.id})</h3>
              <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                {section.type}
              </span>
            </div>
            
            <div className="space-y-4">
              {section.title !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-gray-700">Title</label>
                     <button 
                       onClick={() => handleAIMagic(section.id, 'title', section.title)}
                       disabled={!!isGenerating}
                       className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700"
                     >
                        {isGenerating === `${section.id}-title` ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        AI Improve
                     </button>
                  </div>
                  <input 
                    type="text" 
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(section.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}

              {section.subtitle !== undefined && (
                <div>
                   <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                     <button 
                        onClick={() => handleAIMagic(section.id, 'subtitle', section.subtitle || '')}
                        disabled={!!isGenerating}
                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700"
                     >
                       {isGenerating === `${section.id}-subtitle` ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
                       AI Improve
                     </button>
                   </div>
                  <input 
                    type="text" 
                    value={section.subtitle}
                    onChange={(e) => handleSectionUpdate(section.id, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}

              {section.content !== undefined && (
                <div>
                   <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-gray-700">Content</label>
                     <button 
                        onClick={() => handleAIMagic(section.id, 'content', section.content || '')}
                        disabled={!!isGenerating}
                        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700"
                     >
                        {isGenerating === `${section.id}-content` ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        AI Improve
                     </button>
                   </div>
                  <textarea 
                    rows={4}
                    value={section.content}
                    onChange={(e) => handleSectionUpdate(section.id, 'content', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
               {section.image !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="flex gap-4 items-start">
                    <input 
                      type="text" 
                      value={section.image}
                      onChange={(e) => handleSectionUpdate(section.id, 'image', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <img src={section.image} alt="Preview" className="w-16 h-10 object-cover rounded bg-gray-200" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPages;
