import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const recentUsers = [
  { name: 'Ravi Kumar', role: 'Farmer', status: 'Verified', joined: 'Sep 10' },
  { name: 'Sri Lakshmi Traders', role: 'Business', status: 'Pending', joined: 'Sep 11' },
  { name: 'Green Eats Restaurant', role: 'Restaurant', status: 'Verified', joined: 'Sep 9' },
  { name: 'Anjamma', role: 'Farmer', status: 'Pending', joined: 'Sep 11' },
];

function AdminHome({ profile, setActiveSection }) {
  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Admin Control Center 🔐
          </h1>
          <p className="text-gray-500 text-sm">Manage users, verify accounts, monitor platform activity.</p>
        </div>
        <button onClick={() => setActiveSection('reports')} className="btn-brand py-2 px-5 text-sm">📊 Download Full Report</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: '24,180', icon: '👥', color: '#3B82F6' },
          { label: 'Pending Verification', value: '47', icon: '⏳', color: '#F59E0B' },
          { label: "Today's Orders", value: '1,248', icon: '📦', color: '#10B981' },
          { label: 'Open Complaints', value: '9', icon: '🚨', color: '#EF4444' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl">{s.icon}</div>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-bold text-gray-900">Recent Registrations</h2>
          <button onClick={() => setActiveSection('users')} className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Name', 'Role', 'Status', 'Joined', 'Action'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{u.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{u.role}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      u.status === 'Verified' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>{u.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{u.joined}</td>
                  <td className="py-3.5 px-4">
                    {u.status === 'Pending' ? (
                      <button onClick={() => setActiveSection('users')} className="text-xs btn-brand py-1 px-3">Verify</button>
                    ) : (
                      <button onClick={() => setActiveSection('users')} className="text-xs text-gray-400 hover:text-gray-600">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Platform Uptime', value: '99.8%', icon: '🟢' },
          { label: 'API Response Avg', value: '140ms', icon: '⚡' },
          { label: 'Firebase Reads Today', value: '284K', icon: '🔥' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="text-2xl">{s.icon}</div>
            <div>
              <div className="font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  const titles = {
    'users': 'All Users',
    'farmers': 'Farmer Management',
    'businesses': 'Business Management',
    'restaurant-mgmt': 'Restaurant Management',
    'village': 'Village Management',
    'district': 'District Management',
    'state': 'State Management',
    'roles': 'Role Management',
    'crop-mgmt': 'Crop Management',
    'marketplace': 'Marketplace',
    'order-mgmt': 'Order Management',
    'reports': 'Reports & Analytics',
    'settings': 'Platform Settings',
    'notifications': 'Notifications',
  };

  if (activeSection === 'home') {
    return <AdminHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection
      sectionKey={activeSection}
      title={titles[activeSection] || activeSection}
      onBack={handleBack}
    />
  );
}
