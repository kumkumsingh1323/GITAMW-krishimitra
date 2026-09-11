import React from 'react';
import { Recycle, ArrowRight, TrendingDown, Factory, CheckCircle2 } from 'lucide-react';
import { surplusOpportunities } from '../data/mockData';

export default function SurplusPage() {
  return (
    <div className="pb-10">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold mb-3 border border-pink-200">
          <Recycle size={14} /> Zero Waste Initiative
        </div>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Surplus to Value</h1>
        <p className="text-gray-500 max-w-2xl">
          Don't let your hard work go to waste. When fresh market prices are low or supply is too high, 
          convert your suitable produce into value-added products through our verified processing partners.
        </p>
      </div>

      {/* ── VISUAL FLOW ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-sm mb-10 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-50 rounded-full blur-3xl" />
        <h2 className="font-heading text-xl font-bold text-gray-900 mb-8 text-center relative z-10">The Value Addition Process</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center w-full md:w-auto">
            <div className="w-20 h-20 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-3xl mb-3 border-2 border-red-100">
              🍅
            </div>
            <div className="font-semibold text-gray-800 text-sm">Fresh Crop</div>
            <div className="text-[10px] font-bold text-red-500 uppercase tracking-wide mt-1 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded">
              <TrendingDown size={10} /> Low Demand
            </div>
          </div>

          <div className="text-gray-300 md:-mt-6 flex flex-col items-center">
            <ArrowRight size={24} className="hidden md:block" />
            <div className="h-6 w-[2px] bg-gray-200 md:hidden my-2"></div>
            <span className="text-[10px] font-bold text-gray-400 mt-1">PROCUREMENT</span>
          </div>

          <div className="flex flex-col items-center text-center w-full md:w-auto">
            <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3 border-2 border-amber-200 shadow-sm shadow-amber-100"
              style={{ background: 'linear-gradient(135deg, #F5E6C0, #fff)' }}>
              <Factory size={32} />
            </div>
            <div className="font-semibold text-gray-800 text-sm">Processing Unit</div>
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mt-1 bg-amber-50 px-2 py-0.5 rounded">
              Verified Partner
            </div>
          </div>

          <div className="text-gray-300 md:-mt-6 flex flex-col items-center">
            <ArrowRight size={24} className="hidden md:block" />
            <div className="h-6 w-[2px] bg-gray-200 md:hidden my-2"></div>
            <span className="text-[10px] font-bold text-gray-400 mt-1">VALUE ADDITION</span>
          </div>

          <div className="flex flex-col items-center text-center w-full md:w-auto">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-md"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)', border: '2px solid rgba(255,255,255,0.5)' }}>
              🥫
            </div>
            <div className="font-semibold text-gray-800 text-sm">Value Product</div>
            <div className="text-[10px] font-bold text-green-600 uppercase tracking-wide mt-1 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
              <CheckCircle2 size={10} /> Higher Shelf Life
            </div>
          </div>
        </div>
      </div>

      {/* ── OPPORTUNITIES LIST ── */}
      <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Current Processing Opportunities</h2>
      
      <div className="space-y-8">
        {surplusOpportunities.map((cropOpp, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)' }}>
                  {cropOpp.crop === 'Tomato' ? '🍅' : '🧅'}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-gray-900">{cropOpp.crop} Opportunities</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs font-semibold">
                    <span className="text-gray-500">Fresh Demand: <span className="text-red-500">{cropOpp.freshDemand}</span></span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">Market Supply: <span className="text-amber-500">{cropOpp.supply}</span></span>
                  </div>
                </div>
              </div>
              <button className="btn-outline py-2 px-4 text-sm bg-pink-50/50">View on Map</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cropOpp.channels.map((channel, i) => (
                <div key={i} className="rounded-2xl p-4 border border-gray-100 hover:border-pink-300 hover:shadow-md transition-all cursor-pointer bg-gray-50/50 hover:bg-white group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {channel.icon}
                    </div>
                    <div className="bg-pink-100 text-pink-700 px-2 py-1 rounded-lg text-xs font-bold">
                      {channel.price}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{channel.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{channel.desc}</p>
                  <div className="flex items-center text-xs font-semibold" style={{ color: '#D4A843' }}>
                    Connect Partner <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
