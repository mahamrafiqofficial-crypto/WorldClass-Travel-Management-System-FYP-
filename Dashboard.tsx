import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Users, FileText, Plane, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { inquiries, posts, packages } = useCMS();

  const stats = [
    { title: 'Total Inquiries', value: inquiries.length, icon: <Users className="text-blue-500" />, change: '+12% this week' },
    { title: 'Active Packages', value: packages.length, icon: <Plane className="text-green-500" />, change: 'Updated yesterday' },
    { title: 'Blog Posts', value: posts.length, icon: <FileText className="text-purple-500" />, change: '3 drafts pending' },
    { title: 'Site Visits', value: '12.5k', icon: <Eye className="text-orange-500" />, change: '+5% vs last month' },
  ];

  // Dummy data for chart
  const data = [
    { name: 'Mon', visits: 4000 },
    { name: 'Tue', visits: 3000 },
    { name: 'Wed', visits: 2000 },
    { name: 'Thu', visits: 2780 },
    { name: 'Fri', visits: 1890 },
    { name: 'Sat', visits: 2390 },
    { name: 'Sun', visits: 3490 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Traffic</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} />
              <Bar dataKey="visits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Inquiries</h3>
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No inquiries yet.</p>
            ) : (
              inquiries.slice(0, 5).map(inq => (
                <div key={inq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <h4 className="font-bold text-gray-900">{inq.name}</h4>
                    <p className="text-xs text-gray-500">{inq.email}</p>
                    <p className="text-sm text-gray-700 mt-1 truncate max-w-xs">{inq.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(inq.date).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
