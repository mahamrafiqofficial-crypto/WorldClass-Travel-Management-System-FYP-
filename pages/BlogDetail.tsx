import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useCMS();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Post Not Found</h2>
        <Link to="/blog" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="w-full h-[50vh] relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative -mt-32 z-10">
        <div className="bg-white rounded-t-2xl shadow-xl p-8 md:p-12">
            
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition">
            <ArrowLeft size={16} className="mr-2" /> Back to Journal
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full"><User size={14} /> {post.author}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
             {/* Using dangerouslySetInnerHTML assuming sanitized content from CMS/Admin */}
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                   <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;