import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const products = [
  { name: '🍅 Fresh Tomatoes', farmer: 'Ravi Kumar · 12 km', price: '₹22/kg', qty: 'Available: 200kg', fresh: true },
  { name: '🧅 Organic Onions', farmer: 'Suresh Goud · 18 km', price: '₹18/kg', qty: 'Available: 150kg', fresh: true },
  { name: '🌾 Brown Rice', farmer: 'Anjamma · 25 km', price: '₹45/kg', qty: 'Available: 500kg', fresh: false },
];

const orders = [
  { id: '#O201', items: 'Tomato 5kg, Onion 3kg', date: 'Sep 10', status: 'Delivered', total: '₹164' },
  { id: '#O198', items: 'Rice 10kg', date: 'Sep 7', status: 'Delivered', total: '₹450' },
];

function CustomerHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Customer';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Hi, {name} 👤
          </h1>
          <p className="text-gray-500 text-sm">Buy fresh produce directly from local farmers at farm prices.</p>
        </div>
        <button onClick={() => setActiveSection('orders')} className="btn-brand py-2 px-5 text-sm">🛒 View Cart (0)</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: '12', icon: '📦' },
          { label: 'Saved vs Market', value: '₹2,400', icon: '💰' },
          { label: 'Farmers Supported', value: '6', icon: '👨‍🌾' },
          { label: 'My Rating', value: '4.8 ⭐', icon: '🌟' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Fresh Near You</h2>
          <div className="space-y-3">
            {products.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                    {p.name}
                    {p.fresh && <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Fresh</span>}
                  </div>
                  <div className="text-xs text-gray-500">{p.farmer}</div>
                  <div className="text-xs text-gray-400">{p.qty}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700 mb-1">{p.price}</div>
                  <button onClick={() => setActiveSection('orders')} className="text-xs btn-brand py-1 px-3">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Recent Orders</h2>
          <div className="space-y-3">
            {orders.map((o, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-800">{o.id}</div>
                  <div className="text-xs text-gray-500">{o.items}</div>
                  <div className="text-xs text-gray-400">{o.date}</div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">{o.status}</span>
                  <div className="font-bold text-gray-800 mt-1">{o.total}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <CustomerHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection 
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack} 
    />
  );
}

