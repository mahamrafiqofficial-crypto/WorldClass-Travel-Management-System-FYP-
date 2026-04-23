import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CMSProvider, useCMS } from './context/CMSContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import OurStory from './pages/OurStory';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import PackageDetail from './pages/PackageDetail';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPages from './pages/admin/AdminPages';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPackages from './pages/admin/AdminPackages';
import AdminSettings from './pages/admin/AdminSettings';
import Login from './pages/admin/Login';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isAdmin ? '' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useCMS();
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/package/:id" element={<PackageDetail />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </CMSProvider>
  );
};

export default App;