import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const todayNeeds = [
  { item: '🍅 Tomatoes', qty: '20 kg', status: 'Sourced', eta: '6:00 AM' },
  { item: '🥬 Spinach', qty: '5 kg', status: 'Pending', eta: '—' },
  { item: '🧅 Onions', qty: '15 kg', status: 'Sourced', eta: '5:30 AM' },
  { item: '🌶️ Green Chilli', qty: '2 kg', status: 'Pending', eta: '—' },
];

const farmers = [
  { name: 'Ravi Kumar', items: 'Tomato, Onion', dist: '8 km', rating: 4.9, freshToday: true },
  { name: 'Anjamma', items: 'Leafy greens', dist: '12 km', rating: 4.7, freshToday: true },
];

function RestaurantHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Restaurant';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {name}'s Kitchen 🍽️
          </h1>
          <p className="text-gray-500 text-sm">Fresh produce sourced directly from verified local farmers.</p>
        </div>
        <button onClick={() => setActiveSection('add-requirements')} className="btn-brand py-2 px-5 text-sm">+ Add Today's Requirement</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Orders", value: '3', icon: '📦', color: '#F97316' },
          { label: 'Active Farmers', value: '5', icon: '👨‍🌾', color: '#10B981' },
          { label: 'Items Sourced', value: '2/4', icon: '✅', color: '#3B82F6' },
          { label: 'Saved vs Market', value: '₹840', icon: '💰', color: '#8B5CF6' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Supply */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Today's Supply Status</h2>
          <div className="space-y-3">
            {todayNeeds.map((n, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-800">{n.item}</div>
                  <div className="text-xs text-gray-500">{n.qty} · ETA: {n.eta}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  n.status === 'Sourced' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                }`}>{n.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Farmers */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Fresh From Farm</h2>
          <div className="space-y-4">
            {farmers.map((f, i) => (
              <div key={i} className="p-4 rounded-xl border border-green-100 bg-green-50/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">🌾</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{f.name}</div>
                      <div className="text-xs text-gray-500">{f.items} · {f.dist}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">🟢 Fresh Today</span>
                </div>
                <button onClick={() => setActiveSection('orders')} className="w-full py-2 rounded-xl text-sm font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 transition-colors">
                  Place Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  const titles = {
    'profile': 'Restaurant Profile',
    'add-requirements': 'Add Requirements',
    'search-produce': 'Search Fresh Produce',
    'farmer-products': 'Farmer Products',
    'prices': 'Check Prices',
    'orders': 'Place Orders',
    'track-orders': 'Track Orders',
    'payments': 'Payments',
    'history': 'Purchase History',
    'messages': 'Messages',
    'notifications': 'Notifications',
  };

  // Map restaurant section keys to global keys in SECTION_MAP where possible
  const keyMap = {
    'search-produce': 'search-crops',
    'farmer-products': 'view-farmers',
    'prices': 'market-prices',
    'orders': 'orders',
    'track-orders': 'track-orders',
    'payments': 'payments',
    'history': 'history',
    'add-requirements': 'requirements',
    'messages': 'messages',
    'notifications': 'notifications',
  };

  if (activeSection === 'home') {
    return <RestaurantHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection
      sectionKey={keyMap[activeSection] || activeSection}
      title={titles[activeSection] || activeSection}
      onBack={handleBack}
    />
  );
}
