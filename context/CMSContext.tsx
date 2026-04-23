import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSState, SiteTheme, PageData, BlogPost, TravelPackage, ContactSubmission } from '../types';
import { DEFAULT_THEME, INITIAL_PAGES, INITIAL_POSTS, INITIAL_PACKAGES } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CMSContext = createContext<CMSState | undefined>(undefined);

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<SiteTheme>(DEFAULT_THEME);
  const [pages, setPages] = useState<Record<string, PageData>>(INITIAL_PAGES);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('wc_token'));

  useEffect(() => {
    if (token) localStorage.setItem('wc_token', token);
    else localStorage.removeItem('wc_token');
  }, [token]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [themeRes, pagesRes, postsRes, pkgRes, inqRes] = await Promise.all([
          fetch(`${API_URL}/theme`),
          fetch(`${API_URL}/pages`),
          fetch(`${API_URL}/posts`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/inquiries`)
        ]);

        if (themeRes.ok) {
           const themeData = await themeRes.json();
           if (themeData && themeData.primaryColor) setTheme(themeData);
        }
        
        if (pagesRes.ok) {
           const pagesData = await pagesRes.json();
           if (Object.keys(pagesData).length > 0) setPages(pagesData);
        }

        if (postsRes.ok) {
            const postsData = await postsRes.json();
            if (postsData.length > 0) setPosts(postsData);
        }
        
        if (pkgRes.ok) {
           const pkgData = await pkgRes.json();
           setPackages(pkgData.map((d: any) => ({ ...d, id: d._id || d.id })));
        }

        if (inqRes.ok) {
            const inqData = await inqRes.json();
            if (inqData.length > 0) setInquiries(inqData);
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    };
    fetchData();
  }, []);

  // Apply Theme to CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor || '#3B82F6');
    root.style.setProperty('--color-secondary', theme.secondaryColor || '#1E40AF');
    root.style.setProperty('--color-accent', theme.accentColor || '#F59E0B');
    if (theme.fontFamilySans) document.body.style.fontFamily = theme.fontFamilySans;
  }, [theme]);

  const updateTheme = async (newTheme: Partial<SiteTheme>) => {
    try {
      const res = await fetch(`${API_URL}/theme`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...theme, ...newTheme })
      });
      if (res.ok) setTheme(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const updatePage = async (slug: string, data: Partial<PageData>) => {
    try {
      const res = await fetch(`${API_URL}/pages/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...pages[slug], ...data, slug })
      });
      if (res.ok) {
        const updated = await res.json();
        setPages(prev => ({ ...prev, [slug]: updated }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addPost = async (post: BlogPost) => {
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        const created = await res.json();
        setPosts(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (id: string, updatedPost: Partial<BlogPost>) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPost)
      });
      if (res.ok) {
        const updated = await res.json();
        setPosts(prev => prev.map(p => (p.id === id || (p as any)._id === id) ? updated : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id && (p as any)._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = (newToken: string) => setToken(newToken);
  const logout = () => setToken(null);

  const addPackage = async (pkg: TravelPackage) => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pkg)
      });
      const data = await res.json();
      if (res.ok) {
        setPackages(prev => [...prev, { ...data, id: data._id || data.id }]);
      } else {
        console.error("Error adding package:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setPackages(prev => prev.filter(p => p.id !== id && (p as any)._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addInquiry = async (inquiry: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) {
        const created = await res.json();
        setInquiries(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CMSContext.Provider value={{
      theme, pages, posts, packages, inquiries, token,
      updateTheme, updatePage, addPost, updatePost, deletePost, addPackage, deletePackage, addInquiry, login, logout
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within a CMSProvider");
  return context;
};
