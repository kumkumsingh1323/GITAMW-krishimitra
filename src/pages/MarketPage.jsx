import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { priceData, demandData, stateDistrictData } from '../data/mockData';

export default function MarketPage() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const crops = ['Tomato', 'Onion', 'Chilli', 'Cotton', 'Maize'];

  return (
    <div className="pb-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-1">Market Intelligence</h1>
          <p className="text-gray-500">Real-time price trends, demand analysis, and AI forecasts.</p>
        </div>
        
        {/* Crop Selector */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-pink-100 shadow-sm overflow-x-auto hide-scrollbar">
          {crops.map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCrop === crop 
                  ? 'bg-gradient-to-r from-pink-400 to-amber-500 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOP STATS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full blur-xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Avg Market Price</span>
            <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} /> 12%
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-bold text-gray-900">₹25</span>
            <span className="text-gray-500 font-medium">/ kg</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Up ₹3 from last week in Nalgonda</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full blur-xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Estimated Demand</span>
            <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              Very High
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-bold text-gray-900">85<span className="text-2xl">%</span></span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="rounded-3xl p-6 border border-pink-200 shadow-md relative overflow-hidden flex flex-col justify-center"
          style={{ background: 'linear-gradient(135deg, #FDE8F0 0%, #F5E6C0 100%)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-pink-500" />
            <span className="text-sm font-bold text-pink-700 uppercase tracking-wider">AI Forecast</span>
          </div>
          <p className="text-gray-800 font-medium leading-relaxed mb-3">
            Prices are expected to peak in the next 3-4 days due to supply shortage in Hyderabad markets.
          </p>
          <button className="bg-white text-pink-600 text-xs font-bold px-4 py-2 rounded-xl shadow-sm self-start hover:shadow-md transition-shadow">
            View Detail Report
          </button>
        </div>
      </div>

      {/* ── CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Price Trend Chart */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Price Trends (Past 6 Months)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                  labelStyle={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="local" name="Local Mandi" stroke="#C9748F" strokeWidth={3} dot={{ r: 4, fill: '#C9748F', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="buyer" name="Direct Buyers" stroke="#D4A843" strokeWidth={3} dot={{ r: 4, fill: '#D4A843', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand vs Supply Chart */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Current Demand vs Supply Index</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="demand" name="Demand" fill="#F4A7C0" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="supply" name="Supply" fill="#F5E6C0" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── DISTRICT HEATMAP DATA ── */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-heading text-xl font-bold text-gray-900">District Intelligence (Telangana)</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search district..." className="form-input pl-9 py-1.5 text-sm w-full sm:w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-y border-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold rounded-tl-xl">District</th>
                <th className="px-4 py-3 font-semibold text-center">Top Crop in Demand</th>
                <th className="px-4 py-3 font-semibold text-center">Demand Index</th>
                <th className="px-4 py-3 font-semibold text-center">Supply Index</th>
                <th className="px-4 py-3 font-semibold text-right rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {stateDistrictData.map((d, i) => {
                const isHighDemand = d.demand > d.supply;
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-pink-50/30 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">{d.district}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                        {d.topCrop}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-6 text-right font-medium">{d.demand}</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-400 rounded-full" style={{ width: `${d.demand}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-6 text-right font-medium">{d.supply}</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${d.supply}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {isHighDemand ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                          <ArrowUpRight size={12} /> Favorable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                          <ArrowDownRight size={12} /> Oversupplied
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
