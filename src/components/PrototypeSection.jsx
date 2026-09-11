import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Package, MapPin, Star, Search, Bell, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';

/* ─── Shared mini-components ─── */
function SectionPageHeader({ title, desc, onBack }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors flex-shrink-0">
        <ArrowLeft size={22} />
      </button>
      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{title}</h1>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.4rem', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
}

function Badge({ type }) {
  const styles = {
    verified: 'bg-green-50 text-green-700 border border-green-200',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    transit: 'bg-blue-50 text-blue-700 border border-blue-200',
    delivered: 'bg-green-50 text-green-700 border border-green-200',
    open: 'bg-purple-50 text-purple-700 border border-purple-200',
    matched: 'bg-green-50 text-green-700 border border-green-200',
    up: 'bg-green-50 text-green-700',
    down: 'bg-red-50 text-red-700',
  };
  const labels = { verified: 'Verified', pending: 'Pending', transit: 'In Transit', delivered: 'Delivered', open: 'Open', matched: 'Matched', up: '↑ +2.4%', down: '↓ -1.2%' };
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[type] || 'bg-gray-50 text-gray-700'}`}>{labels[type] || type}</span>;
}

/* ═══════════════════════════════════════════════════════
   SECTION CONTENT COMPONENTS — one per meaningful section
═══════════════════════════════════════════════════════ */

/* --- Browse Farmers (for Business dashboard) --- */
function BrowseFarmers() {
  const farmers = [
    { name: 'Ravi Kumar', village: 'Rampur, UP', crops: 'Wheat, Tomato', trust: 92, acres: 12, emoji: '👨‍🌾' },
    { name: 'Anjamma Devi', village: 'Nalgonda, TS', crops: 'Rice, Chilli', trust: 88, acres: 8, emoji: '👩‍🌾' },
    { name: 'Suresh Patel', village: 'Surat, GJ', crops: 'Cotton, Groundnut', trust: 95, acres: 20, emoji: '👨‍🌾' },
    { name: 'Meena Kumari', village: 'Jaipur, RJ', crops: 'Mustard, Onion', trust: 86, acres: 6, emoji: '👩‍🌾' },
    { name: 'Bheemaiah', village: 'Kurnool, AP', crops: 'Maize, Soyabean', trust: 90, acres: 15, emoji: '👨‍🌾' },
    { name: 'Savitri Ben', village: 'Anand, GJ', crops: 'Potato, Garlic', trust: 89, acres: 10, emoji: '👩‍🌾' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {farmers.map((f, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl">{f.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{f.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><MapPin size={13} /> {f.village}</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-amber-600 mt-1.5">
                <Star size={13} className="fill-amber-500" /> Trust: {f.trust}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Crops:</span> {f.crops}</div>
            <div className="text-sm text-gray-600 mt-1"><span className="font-semibold text-gray-800">Land:</span> {f.acres} Acres</div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors text-sm">
            Contact Farmer
          </button>
        </div>
      ))}
    </div>
  );
}

/* --- Browse Restaurants (for Business/Farmer dashboard) --- */
function BrowseRestaurants() {
  const restaurants = [
    { name: 'Green Eats', location: 'Hyderabad', cuisine: 'Veg, Multi', need: 'Daily Veggies', order: '50 kg/day', emoji: '🍽️' },
    { name: 'Annalakshmi', location: 'Chennai', cuisine: 'South Indian', need: 'Rice, Lentils', order: '100 kg/day', emoji: '🍛' },
    { name: 'Farm Fresh Bistro', location: 'Pune', cuisine: 'Continental', need: 'Salad Greens', order: '20 kg/day', emoji: '🥗' },
    { name: 'Desi Tadka', location: 'Delhi', cuisine: 'North Indian', need: 'Tomato, Onion', order: '80 kg/day', emoji: '🍲' },
    { name: 'Saraswati Bhavan', location: 'Bengaluru', cuisine: 'Udupi', need: 'Coconut, Veggies', order: '40 kg/day', emoji: '🥥' },
    { name: 'The Spice Route', location: 'Mumbai', cuisine: 'Pan-India', need: 'Spices, Grains', order: '60 kg/day', emoji: '🌶️' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {restaurants.map((r, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl">{r.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{r.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><MapPin size={13} /> {r.location}</div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">{r.cuisine}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Needs:</span> {r.need}</div>
            <div className="text-sm text-gray-600 mt-1"><span className="font-semibold text-gray-800">Order Size:</span> {r.order}</div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-orange-50 text-orange-700 font-semibold rounded-xl hover:bg-orange-100 transition-colors text-sm">
            Offer Supply
          </button>
        </div>
      ))}
    </div>
  );
}

/* --- Browse Businesses / Buyers --- */
function BrowseBuyers() {
  const buyers = [
    { name: 'AgriMart Pvt Ltd', location: 'Hyderabad', buys: 'Wheat, Rice', volume: '10 Ton/month', emoji: '🏪' },
    { name: 'FreshLink Traders', location: 'Mumbai', buys: 'Vegetables', volume: '5 Ton/month', emoji: '🏬' },
    { name: 'GrainBridge Co.', location: 'Pune', buys: 'Soyabean, Maize', volume: '20 Ton/month', emoji: '🏢' },
    { name: 'NatFoods Export', location: 'Surat', buys: 'Cotton, Groundnut', volume: '15 Ton/month', emoji: '🏭' },
    { name: 'VegConnect', location: 'Delhi', buys: 'Onion, Tomato', volume: '8 Ton/month', emoji: '🛒' },
    { name: 'Sahaj Agro', location: 'Jaipur', buys: 'Mustard, Spices', volume: '6 Ton/month', emoji: '🏪' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {buyers.map((b, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">{b.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{b.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><MapPin size={13} /> {b.location}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Buying:</span> {b.buys}</div>
            <div className="text-sm text-gray-600 mt-1"><span className="font-semibold text-gray-800">Volume:</span> {b.volume}</div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-colors text-sm">
            Make Offer
          </button>
        </div>
      ))}
    </div>
  );
}

/* --- Market Prices --- */
function MarketPrices() {
  const prices = [
    { name: 'Wheat 🌾', msp: '₹2,275', market: '₹2,500', unit: 'Qtl', trend: 'up' },
    { name: 'Rice 🍚', msp: '₹2,183', market: '₹3,200', unit: 'Qtl', trend: 'up' },
    { name: 'Tomato 🍅', msp: '—', market: '₹32/kg', unit: 'kg', trend: 'down' },
    { name: 'Onion 🧅', msp: '—', market: '₹45/kg', unit: 'kg', trend: 'up' },
    { name: 'Soyabean 🌱', msp: '₹4,600', market: '₹4,100', unit: 'Qtl', trend: 'down' },
    { name: 'Cotton ☁️', msp: '₹7,020', market: '₹6,800', unit: 'Qtl', trend: 'down' },
    { name: 'Mustard 🌼', msp: '₹5,650', market: '₹5,400', unit: 'Qtl', trend: 'up' },
    { name: 'Maize 🌽', msp: '₹2,090', market: '₹2,200', unit: 'Qtl', trend: 'up' },
  ];
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-900">Live Mandi Prices — Today</h2>
        <span className="text-sm text-green-600 font-semibold">🟢 Updated 2h ago</span>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {['Commodity', 'MSP (Govt.)', 'Market Price', 'Unit', 'Trend'].map(h => (
              <th key={h} className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {prices.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-bold text-gray-900 text-base">{row.name}</td>
              <td className="p-4 text-gray-500 text-sm">{row.msp}</td>
              <td className="p-4 font-bold text-green-700 text-base">{row.market}</td>
              <td className="p-4 text-gray-500 text-sm">per {row.unit}</td>
              <td className="p-4">
                {row.trend === 'up'
                  ? <span className="flex items-center gap-1 text-green-600 font-semibold text-sm"><TrendingUp size={15}/> +2.4%</span>
                  : <span className="flex items-center gap-1 text-red-500 font-semibold text-sm"><TrendingDown size={15}/> -1.8%</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- Search / Browse Crops --- */
function SearchCrops() {
  const crops = [
    { name: 'Tomato', emoji: '🍅', price: '₹32/kg', farmer: 'Ravi Kumar', qty: '500 kg', district: 'Nalgonda' },
    { name: 'Potato', emoji: '🥔', price: '₹20/kg', farmer: 'Suresh Patel', qty: '1 Ton', district: 'Surat' },
    { name: 'Onion', emoji: '🧅', price: '₹45/kg', farmer: 'Meena Kumari', qty: '300 kg', district: 'Jaipur' },
    { name: 'Wheat', emoji: '🌾', price: '₹25/kg', farmer: 'Bheemaiah', qty: '2 Ton', district: 'Kurnool' },
    { name: 'Rice', emoji: '🍚', price: '₹45/kg', farmer: 'Savitri Ben', qty: '1.5 Ton', district: 'Anand' },
    { name: 'Carrot', emoji: '🥕', price: '₹50/kg', farmer: 'Anjamma Devi', qty: '200 kg', district: 'Nalgonda' },
    { name: 'Corn', emoji: '🌽', price: '₹22/kg', farmer: 'Ravi Kumar', qty: '800 kg', district: 'Rampur' },
    { name: 'Chilli', emoji: '🌶️', price: '₹120/kg', farmer: 'Suresh Patel', qty: '100 kg', district: 'Surat' },
  ];
  return (
    <div>
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-green-400 bg-white" placeholder="Search crops by name, district..." defaultValue="" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {crops.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-all">
            <div className="text-5xl mb-3">{c.emoji}</div>
            <h3 className="font-bold text-lg text-gray-900">{c.name}</h3>
            <div className="text-green-600 font-bold text-lg mt-1">{c.price}</div>
            <div className="text-sm text-gray-500 mt-1">Qty: {c.qty}</div>
            <div className="text-sm text-gray-500">By: {c.farmer}</div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1"><MapPin size={11}/>{c.district}</div>
            <button className="w-full mt-4 py-2 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 text-sm">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Orders / Track Orders --- */
function OrdersList() {
  const orders = [
    { id: 'ORD-9021', item: 'Wheat 🌾', qty: '500 kg', amount: '₹12,500', seller: 'Ravi Kumar', status: 'delivered', date: 'Sep 08' },
    { id: 'ORD-9034', item: 'Tomato 🍅', qty: '200 kg', amount: '₹6,400', seller: 'Anjamma Devi', status: 'transit', date: 'Sep 10' },
    { id: 'ORD-9047', item: 'Onion 🧅', qty: '300 kg', amount: '₹13,500', seller: 'Meena Kumari', status: 'pending', date: 'Sep 11' },
    { id: 'ORD-9059', item: 'Rice 🍚', qty: '1 Ton', amount: '₹45,000', seller: 'Savitri Ben', status: 'transit', date: 'Sep 11' },
  ];
  const statusIcon = { delivered: <CheckCircle size={18} className="text-green-500" />, transit: <Truck size={18} className="text-blue-500"/>, pending: <Clock size={18} className="text-amber-500"/> };
  return (
    <div className="space-y-4">
      {orders.map((o, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl flex-shrink-0">
            <Package size={28} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 text-lg">{o.id}</h3>
              <Badge type={o.status} />
            </div>
            <div className="text-base text-gray-700">{o.item} • {o.qty} • <span className="font-bold text-green-700">{o.amount}</span></div>
            <div className="text-sm text-gray-500 mt-1">Seller: {o.seller} · {o.date}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {statusIcon[o.status]}
            <button className="py-2 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200">Track</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- Payments --- */
function PaymentsList() {
  const payments = [
    { id: 'PAY-441', desc: 'Wheat purchase · Ravi Kumar', amount: '₹12,500', date: 'Sep 08', status: 'Paid', mode: 'UPI' },
    { id: 'PAY-439', desc: 'Tomato purchase · Anjamma Devi', amount: '₹6,400', date: 'Sep 10', status: 'Paid', mode: 'Bank Transfer' },
    { id: 'PAY-451', desc: 'Onion order · Meena Kumari', amount: '₹13,500', date: 'Sep 11', status: 'Pending', mode: 'UPI' },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: 'Total Paid', val: '₹1.8L', color: 'text-green-700', bg: 'bg-green-50' }, { label: 'Pending', val: '₹13,500', color: 'text-amber-700', bg: 'bg-amber-50' }, { label: 'This Month', val: '₹32,400', color: 'text-blue-700', bg: 'bg-blue-50' }].map((s, i) => (
          <div key={i} className={`rounded-2xl p-5 border-2 border-gray-200 ${s.bg} flex flex-col`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200"><h2 className="font-bold text-lg text-gray-900">Transaction History</h2></div>
        {payments.map((p, i) => (
          <div key={i} className="p-5 border-b border-gray-100 last:border-0 flex items-center gap-4 hover:bg-gray-50">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">{p.mode === 'UPI' ? '📱' : '🏦'}</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{p.desc}</div>
              <div className="text-sm text-gray-500">{p.id} · {p.date} · {p.mode}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">{p.amount}</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Requirements (Business) --- */
function RequirementsList() {
  const reqs = [
    { crop: 'Tomato 🍅', qty: '500 kg', grade: 'Grade A', by: 'Sep 14', status: 'open', matches: 3 },
    { crop: 'Onion 🧅', qty: '300 kg', grade: 'Grade B', by: 'Sep 16', status: 'matched', matches: 1 },
    { crop: 'Chilli 🌶️', qty: '200 kg', grade: 'Grade A', by: 'Sep 18', status: 'open', matches: 2 },
    { crop: 'Potato 🥔', qty: '1 Ton', grade: 'Grade A', by: 'Sep 20', status: 'pending', matches: 0 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <button className="btn-brand py-2.5 px-5 text-sm">+ Post New Requirement</button>
      </div>
      {reqs.map((r, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm flex items-center gap-5">
          <div className="text-4xl">{r.crop.split(' ')[1]}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 text-lg">{r.crop.split(' ')[0]}</h3>
              <Badge type={r.status} />
            </div>
            <div className="text-base text-gray-700">{r.qty} · {r.grade} · By {r.by}</div>
            {r.matches > 0 && <div className="text-sm text-green-600 font-semibold mt-1">✅ {r.matches} farmers matched</div>}
          </div>
          <button className="py-2 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 flex-shrink-0">Edit</button>
        </div>
      ))}
    </div>
  );
}

/* --- Sell Crops (Farmer) --- */
function SellCrops() {
  const listings = [
    { crop: 'Wheat 🌾', qty: '500 kg', price: '₹25/kg', status: 'open', views: 12 },
    { crop: 'Tomato 🍅', qty: '200 kg', price: '₹32/kg', status: 'matched', views: 8 },
    { crop: 'Onion 🧅', qty: '100 kg', price: '₹40/kg', status: 'pending', views: 5 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-2xl p-5 border-2 border-green-200">
          <div className="text-2xl font-bold text-green-700">3 Active</div>
          <div className="text-sm text-green-600 mt-1">Crop Listings</div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200">
          <div className="text-2xl font-bold text-blue-700">25 Interested</div>
          <div className="text-sm text-blue-600 mt-1">Buyers This Week</div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button className="btn-brand py-2.5 px-5 text-sm">+ List New Crop</button>
      </div>
      <div className="space-y-4">
        {listings.map((l, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm flex items-center gap-5">
            <div className="text-4xl">{l.crop.split(' ')[1]}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{l.crop.split(' ')[0]}</h3>
                <Badge type={l.status} />
              </div>
              <div className="text-base text-gray-700">{l.qty} · {l.price} · 👁 {l.views} views</div>
            </div>
            <button className="py-2 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 flex-shrink-0">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Notifications --- */
function NotificationsList() {
  const notifs = [
    { icon: '📦', title: 'Order Delivered', desc: 'Your Wheat order (ORD-9021) has been delivered.', time: '2h ago', read: false },
    { icon: '💬', title: 'New Message', desc: 'Ravi Kumar sent you a message about pricing.', time: '4h ago', read: false },
    { icon: '📈', title: 'Price Alert', desc: 'Onion prices rose 8% in your district today.', time: '6h ago', read: true },
    { icon: '✅', title: 'Profile Verified', desc: 'Your account has been verified by KRISHAMITRA admin.', time: 'Yesterday', read: true },
    { icon: '🌧️', title: 'Weather Alert', desc: 'Light rain expected in your district for next 3 days.', time: 'Yesterday', read: true },
  ];
  return (
    <div className="space-y-3">
      {notifs.map((n, i) => (
        <div key={i} className={`bg-white rounded-2xl p-4 border-2 flex items-start gap-4 transition-colors ${n.read ? 'border-gray-200' : 'border-green-200 bg-green-50/30'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${n.read ? 'bg-gray-100' : 'bg-green-100'}`}>{n.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-base ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</h3>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{n.desc}</p>
          </div>
          {!n.read && <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>}
        </div>
      ))}
    </div>
  );
}

/* --- Admin: All Users --- */
function AllUsers() {
  const users = [
    { name: 'Ravi Kumar', role: 'Farmer', district: 'Nalgonda', status: 'verified', joined: 'Sep 10' },
    { name: 'Sri Lakshmi Traders', role: 'Business', district: 'Hyderabad', status: 'verified', joined: 'Sep 09' },
    { name: 'Green Eats Restaurant', role: 'Restaurant', district: 'Pune', status: 'pending', joined: 'Sep 11' },
    { name: 'Anjamma Devi', role: 'Farmer', district: 'Kurnool', status: 'pending', joined: 'Sep 11' },
    { name: 'SpeedCargo Logistics', role: 'Transport', district: 'Bengaluru', status: 'verified', joined: 'Sep 08' },
    { name: 'Suresh Patel', role: 'Farmer', district: 'Surat', status: 'verified', joined: 'Sep 07' },
  ];
  const roleColors = { Farmer: 'bg-green-50 text-green-700', Business: 'bg-blue-50 text-blue-700', Restaurant: 'bg-orange-50 text-orange-700', Transport: 'bg-purple-50 text-purple-700' };
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-900">All Registered Users</h2>
        <span className="badge-green">Total: 24,180</span>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {['Name', 'Role', 'District', 'Status', 'Joined', 'Action'].map(h => (
              <th key={h} className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-4 font-bold text-gray-900">{u.name}</td>
              <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleColors[u.role]}`}>{u.role}</span></td>
              <td className="p-4 text-gray-500">{u.district}</td>
              <td className="p-4"><Badge type={u.status} /></td>
              <td className="p-4 text-gray-500 text-sm">{u.joined}</td>
              <td className="p-4">
                {u.status === 'pending'
                  ? <button className="btn-brand py-1.5 px-4 text-xs">Verify</button>
                  : <button className="text-sm text-gray-500 hover:text-gray-800 font-semibold">View</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- Admin: Management sections (Farmer Mgmt, Restaurant Mgmt etc) --- */
function AdminManagement({ type }) {
  const configs = {
    farmer: { emoji: '👨‍🌾', color: 'bg-green-50', border: 'border-green-200', label: 'Farmers', names: ['Ravi Kumar', 'Anjamma Devi', 'Suresh Patel', 'Meena Kumari'], districts: ['Nalgonda', 'Kurnool', 'Surat', 'Jaipur'] },
    business: { emoji: '🏪', color: 'bg-blue-50', border: 'border-blue-200', label: 'Businesses', names: ['Sri Lakshmi Traders', 'AgriMart Pvt Ltd', 'FreshLink Traders', 'GrainBridge Co.'], districts: ['Hyderabad', 'Hyderabad', 'Mumbai', 'Pune'] },
    restaurant: { emoji: '🍽️', color: 'bg-orange-50', border: 'border-orange-200', label: 'Restaurants', names: ['Green Eats', 'Annalakshmi', 'Farm Fresh Bistro', 'Desi Tadka'], districts: ['Pune', 'Chennai', 'Pune', 'Delhi'] },
    village: { emoji: '🏡', color: 'bg-amber-50', border: 'border-amber-200', label: 'Villages', names: ['Rampur', 'Nalgonda Village', 'Anand Gram', 'Bikaner Panchayat'], districts: ['UP', 'Telangana', 'Gujarat', 'Rajasthan'] },
    district: { emoji: '🏙️', color: 'bg-indigo-50', border: 'border-indigo-200', label: 'Districts', names: ['Nalgonda', 'Kurnool', 'Surat', 'Jaipur'], districts: ['Telangana', 'Andhra Pradesh', 'Gujarat', 'Rajasthan'] },
    state: { emoji: '🗺️', color: 'bg-purple-50', border: 'border-purple-200', label: 'States', names: ['Telangana', 'Andhra Pradesh', 'Gujarat', 'Rajasthan'], districts: ['Active', 'Active', 'Active', 'Active'] },
    crop: { emoji: '🌾', color: 'bg-green-50', border: 'border-green-200', label: 'Crops', names: ['Wheat', 'Rice', 'Tomato', 'Onion'], districts: ['Rabi Season', 'Kharif Season', 'Year Round', 'Year Round'] },
    order: { emoji: '📦', color: 'bg-blue-50', border: 'border-blue-200', label: 'Orders', names: ['ORD-9021', 'ORD-9034', 'ORD-9047', 'ORD-9059'], districts: ['Delivered', 'In Transit', 'Pending', 'In Transit'] },
  };
  const cfg = configs[type] || configs.farmer;
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`rounded-2xl p-5 border-2 ${cfg.border} ${cfg.color}`}>
          <div className="text-3xl font-bold text-gray-900">4 {cfg.label}</div>
          <div className="text-sm text-gray-600 mt-1">Listed in system (demo)</div>
        </div>
        <div className="rounded-2xl p-5 border-2 border-amber-200 bg-amber-50">
          <div className="text-3xl font-bold text-amber-700">2 Pending</div>
          <div className="text-sm text-amber-600 mt-1">Need verification</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cfg.names.map((name, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm flex items-center gap-4`}>
            <div className={`w-14 h-14 rounded-2xl ${cfg.color} flex items-center justify-center text-3xl`}>{cfg.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{name}</h3>
              <div className="text-sm text-gray-500 mt-0.5">{cfg.districts[i]}</div>
            </div>
            <div className="flex gap-2">
              <button className="py-2 px-4 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-100">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Marketplace / Platform-wide --- */
function Marketplace() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ l: 'Active Listings', v: '1,248', e: '🌾' }, { l: 'Farmers Selling', v: '342', e: '👨‍🌾' }, { l: 'Active Buyers', v: '186', e: '🏪' }, { l: 'Today\'s Trades', v: '₹4.2L', e: '💰' }].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm text-center">
            <div className="text-3xl mb-2">{s.e}</div>
            <div className="text-2xl font-bold text-gray-900">{s.v}</div>
            <div className="text-sm text-gray-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <SearchCrops />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MASTER LOOKUP — maps sectionKey → component
═══════════════════════════════════════════════════════ */
const SECTION_MAP = {
  // Business
  'view-farmers': { component: <BrowseFarmers />, title: 'Browse Farmers', desc: '6 verified farmers available near you.' },
  'search-crops': { component: <SearchCrops />, title: 'Search Crops', desc: 'Find the freshest produce directly from farms.' },
  'market-prices': { component: <MarketPrices />, title: 'Market Prices', desc: 'Live mandi rates updated every 2 hours.' },
  'buy-crops': { component: <SearchCrops />, title: 'Buy Crops', desc: 'Browse and purchase available farm produce.' },
  'requirements': { component: <RequirementsList />, title: 'My Requirements', desc: 'Post what you need, farmers will match your order.' },
  'orders': { component: <OrdersList />, title: 'Orders', desc: 'All your placed orders and their status.' },
  'place-order': { component: <OrdersList />, title: 'Place Orders', desc: 'Browse and order from available crop listings.' },
  'track-orders': { component: <OrdersList />, title: 'Track Orders', desc: 'Real-time status updates for your orders.' },
  'payments': { component: <PaymentsList />, title: 'Payments', desc: 'View all your payment transactions.' },
  'history': { component: <PaymentsList />, title: 'Purchase History', desc: 'Your complete order and payment history.' },
  'notifications': { component: <NotificationsList />, title: 'Notifications', desc: 'Latest updates, alerts, and messages.' },
  'messages': { component: <NotificationsList />, title: 'Messages', desc: 'Your conversations with farmers and buyers.' },

  // Farmer
  'sell-crops': { component: <SellCrops />, title: 'Sell My Crops', desc: 'List your crops and connect with buyers.' },
  'buyers': { component: <BrowseBuyers />, title: 'Browse Buyers', desc: 'Find verified businesses and restaurants near you.' },
  'restaurants': { component: <BrowseRestaurants />, title: 'Browse Restaurants', desc: 'Connect directly with restaurants buying daily produce.' },

  // Admin
  'users': { component: <AllUsers />, title: 'All Users', desc: 'Manage and verify all registered users.' },
  'farmers': { component: <AdminManagement type="farmer" />, title: 'Farmer Management', desc: 'Review and manage all farmer accounts.' },
  'businesses': { component: <AdminManagement type="business" />, title: 'Business Management', desc: 'Review and manage all business accounts.' },
  'restaurant-mgmt': { component: <AdminManagement type="restaurant" />, title: 'Restaurant Management', desc: 'Review and manage all restaurant accounts.' },
  'village': { component: <AdminManagement type="village" />, title: 'Village Management', desc: 'Manage panchayats and village-level data.' },
  'district': { component: <AdminManagement type="district" />, title: 'District Management', desc: 'Manage district-level configurations.' },
  'state': { component: <AdminManagement type="state" />, title: 'State Management', desc: 'Manage state-level configurations.' },
  'roles': { component: <AllUsers />, title: 'Role Management', desc: 'Assign and manage user roles.' },
  'crop-mgmt': { component: <AdminManagement type="crop" />, title: 'Crop Management', desc: 'Manage crop categories and MSP data.' },
  'marketplace': { component: <Marketplace />, title: 'Marketplace', desc: 'Platform-wide crop listing overview.' },
  'order-mgmt': { component: <AdminManagement type="order" />, title: 'Order Management', desc: 'View and manage all platform orders.' },
};

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function PrototypeSection({ title, desc, onBack, sectionKey }) {
  // Try to find a match by sectionKey first, then by title text
  let match = SECTION_MAP[sectionKey];
  if (!match) {
    const k = Object.keys(SECTION_MAP).find(key => SECTION_MAP[key].title.toLowerCase() === (title || '').toLowerCase());
    match = k ? SECTION_MAP[k] : null;
  }

  const displayTitle = match?.title || title || 'Feature';
  const displayDesc = match?.desc || desc || 'Demo data for this section.';

  return (
    <div style={{ paddingBottom: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionPageHeader title={displayTitle} desc={displayDesc} onBack={onBack} />
      <div className="fade-up">
        {match ? match.component : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center min-h-[300px] flex flex-col justify-center items-center">
            <div className="text-5xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{displayTitle}</h3>
            <p className="text-gray-500 text-lg max-w-md">This section is being built. Backend integration will connect here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
