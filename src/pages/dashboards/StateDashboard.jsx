import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const districts = [
  { name: 'Nalgonda', farmers: 18200, surplus: '48T', demand: 'High', topCrop: 'Tomato' },
  { name: 'Suryapet', farmers: 14600, surplus: '32T', demand: 'High', topCrop: 'Chilli' },
  { name: 'Warangal', farmers: 22000, surplus: '61T', demand: 'Medium', topCrop: 'Cotton' },
  { name: 'Karimnagar', farmers: 19800, surplus: '44T', demand: 'Medium', topCrop: 'Maize' },
  { name: 'Khammam', farmers: 16500, surplus: '29T', demand: 'High', topCrop: 'Onion' },
];

function StateHome({ profile, setActiveSection }) {
  const stateName = profile?.state || 'Telangana';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {stateName} State Overview 🗺️
          </h1>
          <p className="text-gray-500 text-sm">District-wise agricultural analytics, supply and demand trends.</p>
        </div>
        <button onClick={() => setActiveSection('reports')} className="btn-brand py-2 px-5 text-sm">📊 State Report</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Farmers (State)', value: '2.4 Lakh', icon: '👨‍🌾' },
          { label: 'Total Revenue Generated', value: '₹180 Cr', icon: '💰' },
          { label: 'Districts Active', value: '33', icon: '🏛️' },
          { label: 'Total Surplus Handled', value: '480T', icon: '♻️' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">District Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['District', 'Farmers', 'Surplus', 'Top Crop', 'Demand'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {districts.map((d, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{d.name}</td>
                  <td className="py-3.5 px-4 text-gray-600">{d.farmers.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-gray-600">{d.surplus}</td>
                  <td className="py-3.5 px-4 text-gray-600">{d.topCrop}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      d.demand === 'High' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>{d.demand}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function StateDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <StateHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection 
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack} 
    />
  );
}

