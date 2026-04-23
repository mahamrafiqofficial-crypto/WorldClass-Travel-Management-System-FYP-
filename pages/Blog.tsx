import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const { posts } = useCMS();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Travel Journal</h1>
        <p className="text-xl text-gray-600">Stories, tips, and inspiration from around the globe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="block group">
            <article className="flex flex-col bg-white rounded-lg shadow-sm group-hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              <div className="h-56 relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 gap-4 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;