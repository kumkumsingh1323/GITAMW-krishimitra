import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin, Zap, TrendingUp, Sun, CloudRain, Star, Shield, Play } from 'lucide-react';
import { 
  currentFarmer, 
  todayOpportunities, 
  smartRecommendation,
  marketPriceComparison 
} from '../data/mockData';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="pb-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-1">
            {greeting}, {currentFarmer.name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500">
            Here's what you should focus on today for your {currentFarmer.crops.length} active crops.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-outline flex items-center gap-2 py-2" onClick={() => navigate('/ai')}>
            <Zap size={16} /> AI Advice
          </button>
          <button className="btn-brand flex items-center gap-2 py-2" onClick={() => navigate('/market')}>
            View Market
          </button>
        </div>
      </div>

      {/* ── SMART RECOMMENDATION ── */}
      <div className="mb-8 relative rounded-3xl overflow-hidden p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, #FDE8F0 0%, #F5E6C0 100%)', border: '1px solid rgba(244,167,192,0.3)' }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #F4A7C0, #D4A843)' }} />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="badge-gold">KRISHAMITRA Recommendation</div>
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <Zap size={12} className="text-pink-400" /> Best Opportunity Today
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              Sell your 500 kg Tomato now
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg">
              We found a verified buyer 38 km away offering ₹4 more per kg than your local mandi. Selling now will give you the highest net return this week.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/60 rounded-xl p-3 border border-white">
                <div className="text-xs text-gray-500 mb-1">Buyer</div>
                <div className="font-semibold text-sm text-gray-800 flex items-center gap-1">
                  {smartRecommendation.buyer}
                  {smartRecommendation.buyerVerified && <Shield size={12} className="text-green-500" />}
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-3 border border-white">
                <div className="text-xs text-gray-500 mb-1">Rate</div>
                <div className="font-semibold text-sm text-gray-800">₹{(smartRecommendation.sellingPrice / 100).toFixed(0)}/kg</div>
              </div>
              <div className="bg-white/60 rounded-xl p-3 border border-white">
                <div className="text-xs text-gray-500 mb-1">Transport</div>
                <div className="font-semibold text-sm text-gray-800">₹{smartRecommendation.transport} est.</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-pink-200 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Net Return</div>
                <div className="font-bold text-lg" style={{ color: '#C9748F' }}>₹{smartRecommendation.netReturn}</div>
              </div>
            </div>

            <button className="btn-brand flex items-center gap-2" onClick={() => navigate('/map')}>
              Connect with Buyer
            </button>
          </div>

          {/* Right Visual */}
          <div className="w-full lg:w-72 bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">Price Comparison</div>
            <div className="space-y-3">
              {marketPriceComparison.options.map((opt, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-xl ${opt.highlight ? 'bg-pink-50 border border-pink-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{opt.icon}</span>
                    <div>
                      <div className={`text-xs font-semibold ${opt.highlight ? 'text-pink-700' : 'text-gray-700'}`}>{opt.label}</div>
                      <div className="text-[10px] text-gray-500">{opt.detail}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${opt.highlight ? 'text-pink-600' : 'text-gray-800'}`}>
                    ₹{opt.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TODAY'S OPPORTUNITIES ── */}
      <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Today's Focus</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {todayOpportunities.map((opp, i) => (
          <div key={opp.id} className={`opp-card fade-up-delay-${(i % 4) + 1} flex flex-col`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-${opp.color}-50 text-${opp.color}-600`}>
                {opp.label}
              </div>
              <div className="text-xl">{opp.icon}</div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">{opp.title}</h3>
            <p className="text-xs text-gray-500 mb-4 flex-1">{opp.detail}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className={`text-lg font-bold text-${opp.color}-600`}>{opp.value}</span>
              <button className="text-xs font-semibold hover:underline" style={{ color: '#D4A843' }}>
                {opp.action} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Crops */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Your Crops</h2>
            <button className="text-sm font-semibold text-pink-500 hover:underline">Manage All</button>
          </div>
          <div className="space-y-4">
            {currentFarmer.crops.map((crop, i) => (
              <div key={crop.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-pink-200 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)' }}>
                    {crop.name === 'Tomato' ? '🍅' : crop.name === 'Onion' ? '🧅' : '🌶️'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{crop.name} <span className="text-gray-400 font-normal ml-1">· {crop.quality}</span></div>
                    <div className="text-sm text-gray-500">{crop.quantity} {crop.unit}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    crop.status === 'Ready' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {crop.status}
                  </div>
                  <button className="btn-outline py-1.5 px-4 text-xs">Find Buyers</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="space-y-6">
          {/* Weather & Advisory */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10" />
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 relative z-10">Weather & Advisory</h2>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <CloudRain size={28} className="text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">28°C</div>
                  <div className="text-xs text-gray-500">Light Rain Expected</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-0.5">Tomorrow</div>
                <div className="text-sm font-semibold text-blue-500">12mm rain</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 relative z-10">
              <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <Zap size={12} /> KRISHAMITRA Advisory
              </div>
              <div className="text-xs text-gray-600 leading-relaxed">
                Harvest Tomato before 6 AM tomorrow to avoid rain damage. Ensure proper storage.
              </div>
            </div>
          </div>

          {/* Quick Voice Access */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h3 className="font-semibold text-gray-800 mb-1">Need help? Just ask.</h3>
            <p className="text-xs text-gray-500 mb-4">Tap to speak in Telugu, Hindi or English</p>
            <button className="w-full py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-md"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              Start Voice Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
