import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const deliveries = [
  { id: '#D101', from: 'Suryapet Farm', to: 'Hyderabad Mandi', weight: '500 kg', status: 'In Transit', earn: '₹850' },
  { id: '#D102', from: 'Nalgonda', to: 'Secunderabad', weight: '300 kg', status: 'Pickup Pending', earn: '₹620' },
  { id: '#D103', from: 'Warangal', to: 'Kothapet Market', weight: '1200 kg', status: 'Delivered', earn: '₹1,200' },
];

function TransportHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Driver';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {name}'s Transport Hub 🚚
          </h1>
          <p className="text-gray-500 text-sm">Manage pickups, routes and deliveries efficiently.</p>
        </div>
        <button onClick={() => setActiveSection('routes')} className="btn-brand py-2 px-5 text-sm">📍 Update My Location</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Trips Today', value: '3', icon: '🚛' },
          { label: 'Pending Pickup', value: '1', icon: '📦' },
          { label: 'Km Covered', value: '148 km', icon: '🗺️' },
          { label: "Today's Earning", value: '₹2,670', icon: '💰' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Today's Deliveries</h2>
        <div className="space-y-3">
          {deliveries.map((d, i) => (
            <div key={i} className="dash-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl">🚛</div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{d.id} · {d.weight}</div>
                  <div className="text-xs text-gray-500">{d.from} → {d.to}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  d.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                  d.status === 'In Transit' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                }`}>{d.status}</span>
                <div className="font-bold text-sky-600">{d.earn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TransportDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <TransportHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack}
    />
  );
}
