import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { BlogPost } from '../../types';
import { generateBlogPost } from '../../services/geminiService';
import { Sparkles, Trash, Edit, Plus, Loader, Save, X } from 'lucide-react';

const AdminPosts: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  
  // Empty state for new post
  const emptyPost: BlogPost = {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
    image: 'https://picsum.photos/800/600',
    tags: []
  };

  const [formState, setFormState] = useState<BlogPost>(emptyPost);

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormState(post);
  };

  const startNew = () => {
    setEditingId('new');
    setFormState({ ...emptyPost, id: Date.now().toString() });
  };

  const savePost = () => {
    if (editingId === 'new') {
      addPost(formState);
    } else if (editingId) {
      updatePost(editingId, formState);
    }
    setEditingId(null);
  };

  const handleGenerate = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    const result = await generateBlogPost(aiTopic);
    setFormState(prev => ({
      ...prev,
      title: result.title,
      content: result.content,
      excerpt: result.excerpt
    }));
    setIsGenerating(false);
  };

  if (editingId) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{editingId === 'new' ? 'Create Post' : 'Edit Post'}</h2>
            <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700"><X /></button>
         </div>

         {/* AI Generator */}
         <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-100 flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-bold text-purple-900 mb-1">Generate with AI</label>
              <input 
                type="text" 
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Enter a topic (e.g. 'Best food in Italy')..."
                className="w-full px-3 py-2 border border-purple-200 rounded-md focus:ring-purple-500"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !aiTopic}
              className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? <Loader size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Generate
            </button>
         </div>

         <div className="space-y-4">
           <div>
             <label className="block text-sm font-medium mb-1">Title</label>
             <input type="text" value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full border p-2 rounded" />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Image URL</label>
             <input type="text" value={formState.image} onChange={e => setFormState({...formState, image: e.target.value})} className="w-full border p-2 rounded" />
           </div>
            <div>
             <label className="block text-sm font-medium mb-1">Excerpt</label>
             <textarea rows={2} value={formState.excerpt} onChange={e => setFormState({...formState, excerpt: e.target.value})} className="w-full border p-2 rounded" />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Content</label>
             <textarea rows={10} value={formState.content} onChange={e => setFormState({...formState, content: e.target.value})} className="w-full border p-2 rounded" />
           </div>
           <button onClick={savePost} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
             <Save size={18} /> Save Post
           </button>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button onClick={startNew} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center gap-2">
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100">
             <div className="flex items-center gap-4">
                <img src={post.image} alt="" className="w-16 h-16 rounded object-cover" />
                <div>
                   <h3 className="font-bold text-gray-900">{post.title}</h3>
                   <p className="text-sm text-gray-500">{post.date} • {post.author}</p>
                </div>
             </div>
             <div className="flex gap-2">
               <button onClick={() => startEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
               <button onClick={() => deletePost(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash size={18} /></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPosts;
