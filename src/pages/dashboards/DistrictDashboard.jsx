import React from 'react';
import { useAuth } from '../../context/AuthContext';

import PrototypeSection from '../../components/PrototypeSection';

const mandals = [
  { name: 'Suryapet', farmers: 1240, avgPrice: '₹26/kg', surplus: '2.4T', demand: 'High' },
  { name: 'Nalgonda', farmers: 980, avgPrice: '₹22/kg', surplus: '1.8T', demand: 'Medium' },
  { name: 'Miryalaguda', farmers: 750, avgPrice: '₹25/kg', surplus: '0.9T', demand: 'High' },
  { name: 'Huzurnagar', farmers: 620, avgPrice: '₹21/kg', surplus: '1.2T', demand: 'Low' },
];

function DistrictHome({ profile, setActiveSection }) {
  const name = profile?.district || 'District';

  return (
    <div className="pb-10 max-w-7xl mx-auto section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {name} District Analytics 🏛️
          </h1>
          <p className="text-gray-500 text-sm">Demand, supply, prices and surplus across all mandals.</p>
        </div>
        <button onClick={() => setActiveSection('reports')} className="btn-brand py-2 px-5 text-sm">📊 Export Report</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Farmers', value: '3,590', icon: '👨‍🌾' },
          { label: 'Avg. Market Price', value: '₹24/kg', icon: '💰' },
          { label: 'Total Surplus', value: '6.3T', icon: '♻️' },
          { label: 'Active Buyers', value: '148', icon: '🏪' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Mandal-wise Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Mandal', 'Farmers', 'Avg Price', 'Surplus', 'Demand'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mandals.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{m.name}</td>
                  <td className="py-3.5 px-4 text-gray-600">{m.farmers}</td>
                  <td className="py-3.5 px-4 text-gray-600">{m.avgPrice}</td>
                  <td className="py-3.5 px-4 text-gray-600">{m.surplus}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      m.demand === 'High' ? 'bg-green-50 text-green-700' :
                      m.demand === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'
                    }`}>{m.demand}</span>
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

export default function DistrictDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();
  const handleBack = () => setActiveSection('home');

  if (activeSection === 'home') {
    return <DistrictHome profile={profile} setActiveSection={setActiveSection} />;
  }

  return (
    <PrototypeSection 
      sectionKey={activeSection}
      title={activeSection}
      onBack={handleBack} 
    />
  );
}

