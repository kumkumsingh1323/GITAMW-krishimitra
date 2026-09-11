import React from 'react';
import { TrendingUp, Package, Users, Map, Star, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const stats = [
  { label: 'Active Orders', value: '12', icon: '📦', color: '#3B82F6', bg: '#EFF6FF' },
  { label: 'Farmers Connected', value: '38', icon: '👨‍🌾', color: '#10B981', bg: '#ECFDF5' },
  { label: 'Total Spent (₹)', value: '1.2L', icon: '💸', color: '#F59E0B', bg: '#FEF3C7' },
  { label: 'Avg. Rating Given', value: '4.7', icon: '⭐', color: '#8B5CF6', bg: '#F5F3FF' },
];

const requirements = [
  { crop: '🍅 Tomato', qty: '500 kg', quality: 'Grade A', date: 'Sep 14', status: 'Open' },
  { crop: '🧅 Onion', qty: '300 kg', quality: 'Grade B', date: 'Sep 16', status: 'Matched' },
  { crop: '🌶️ Chilli', qty: '200 kg', quality: 'Grade A', date: 'Sep 18', status: 'Open' },
];

const nearbyFarmers = [
  { name: 'Ravi Kumar', crop: 'Tomato · 500kg', dist: '12 km', rating: 4.8, verified: true },
  { name: 'Suresh Goud', crop: 'Chilli · 300kg', dist: '28 km', rating: 4.6, verified: true },
  { name: 'Lakshmi Devi', crop: 'Onion · 400kg', dist: '35 km', rating: 4.9, verified: true },
];

function BusinessHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Business';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
            Welcome, {name} 🏪
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.7 }}>Source fresh produce directly from verified farmers.</p>
        </div>
        <button onClick={() => setActiveSection('requirements')} className="btn-brand py-2 px-5 text-sm flex items-center gap-2">
          <Zap size={15} /> Post Requirement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border-2 shadow-sm" style={{ borderColor: '#D1D5DB' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{s.icon}</div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <TrendingUp size={15} style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="text-sm text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Requirements */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-bold text-gray-900">My Requirements</h2>
            <button onClick={() => setActiveSection('requirements')} className="text-sm font-semibold text-blue-600 hover:underline">+ Add New</button>
          </div>
          <div className="space-y-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                <div>
                  <div className="font-semibold text-sm text-gray-800">{r.crop}</div>
                  <div className="text-xs text-gray-500">{r.qty} · {r.quality} · By {r.date}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  r.status === 'Matched' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                }`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Farmers */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-bold text-gray-900">Nearby Farmers</h2>
            <button onClick={() => setActiveSection('view-farmers')} className="text-sm font-semibold text-blue-600 hover:underline">View Map</button>
          </div>
          <div className="space-y-3">
            {nearbyFarmers.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">👨‍🌾</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                      {f.name} {f.verified && <span className="text-green-500 text-xs">✓</span>}
                    </div>
                    <div className="text-xs text-gray-500">{f.crop} · {f.dist}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                    <Star size={11} fill="#F59E0B" /> {f.rating}
                  </div>
                  <button onClick={() => setActiveSection('messages')} className="text-xs btn-brand py-1 px-3">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  
  const handleBack = () => setActiveSection('home');

  const titles = {
    'profile': 'Business Profile',
    'search-crops': 'Search Crops',
    'view-farmers': 'Browse Farmers',
    'market-prices': 'Market Prices',
    'buy-crops': 'Buy Crops',
    'requirements': 'My Requirements',
    'orders': 'Place Orders',
    'track-orders': 'Track Orders',
    'payments': 'Payments',
    'history': 'Purchase History',
    'messages': 'Messages',
    'notifications': 'Notifications',
  };

  if (activeSection === 'home') {
    return <BusinessHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection
      sectionKey={activeSection}
      title={titles[activeSection] || activeSection}
      onBack={handleBack}
    />
  );
}
