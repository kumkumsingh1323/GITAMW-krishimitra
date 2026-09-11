import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const surplus = [
  { crop: '🍅 Tomato (Grade C)', qty: '800 kg', location: 'Suryapet', price: '₹6/kg', farmer: 'Ravi Kumar' },
  { crop: '🧅 Onion (Surplus)', qty: '500 kg', location: 'Nalgonda', price: '₹4/kg', farmer: 'Suresh G.' },
  { crop: '🌽 Maize', qty: '1200 kg', location: 'Warangal', price: '₹8/kg', farmer: 'Venkat R.' },
];

function ProcessingHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Unit';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {name}'s Processing Unit ♻️
          </h1>
          <p className="text-gray-500 text-sm">Convert surplus crops into value-added products.</p>
        </div>
        <button onClick={() => setActiveSection('requirements')} className="btn-brand py-2 px-5 text-sm">Post Procurement Requirement</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Surplus Available', value: '3 lots', icon: '♻️' },
          { label: 'Active Orders', value: '7', icon: '📦' },
          { label: 'Tons Processed', value: '24T', icon: '🏭' },
          { label: 'This Month Revenue', value: '₹4.2L', icon: '💰' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-bold text-gray-900">Available Surplus Lots</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Live</span>
        </div>
        <div className="space-y-3">
          {surplus.map((s, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-purple-100 bg-purple-50/30 gap-4">
              <div>
                <div className="font-semibold text-gray-800 mb-1">{s.crop}</div>
                <div className="text-xs text-gray-500">{s.qty} · {s.location} · Farmer: {s.farmer}</div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-gray-400">Price</div>
                  <div className="font-bold text-purple-700">{s.price}</div>
                </div>
                <button onClick={() => setActiveSection('orders')} className="btn-brand text-sm py-2 px-4">Buy Lot</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessingDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <ProcessingHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection 
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack} 
    />
  );
}

