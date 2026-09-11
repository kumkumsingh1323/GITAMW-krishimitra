import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const farmers = [
  { name: 'Ramaiah', crop: 'Tomato', status: 'Active', phone: '9876501234' },
  { name: 'Savitri Devi', crop: 'Onion', status: 'Not Onboarded', phone: '—' },
  { name: 'Krishnaiah', crop: 'Maize', status: 'Active', phone: '9876541230' },
];

function VillageHome({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Coordinator';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {name}'s Village Hub 🏘️
          </h1>
          <p className="text-gray-500 text-sm">Onboard, train and support farmers in your village.</p>
        </div>
        <button onClick={() => setActiveSection('farmers')} className="btn-brand py-2 px-5 text-sm">+ Onboard Farmer</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Farmers', value: '34', icon: '👨‍🌾' },
          { label: 'Onboarded', value: '28', icon: '✅' },
          { label: 'Pending', value: '6', icon: '⏳' },
          { label: 'Trainings Done', value: '12', icon: '📚' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Farmer Directory</h2>
        <div className="space-y-3">
          {farmers.map((f, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg">👨‍🌾</div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{f.name}</div>
                  <div className="text-xs text-gray-500">Main crop: {f.crop} · {f.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  f.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>{f.status}</span>
                {f.status === 'Not Onboarded' && (
                  <button onClick={() => setActiveSection('farmers')} className="btn-brand text-xs py-1.5 px-4">Onboard</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VillageDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <VillageHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection 
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack} 
    />
  );
}

