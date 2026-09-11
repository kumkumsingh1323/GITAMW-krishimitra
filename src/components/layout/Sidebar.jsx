import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, TrendingUp, Cpu, Recycle, ShoppingCart,
  BarChart2, Bell, User, Leaf, Package, Activity
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/map', icon: <Map size={18} />, label: 'Smart Map' },
  { to: '/market', icon: <TrendingUp size={18} />, label: 'Market Intelligence' },
  { to: '/ai', icon: <Cpu size={18} />, label: 'AI Center' },
  { to: '/surplus', icon: <Recycle size={18} />, label: 'Surplus to Value' },
  { to: '/inputs', icon: <ShoppingCart size={18} />, label: 'Input Discovery' },
  { to: '/orders', icon: <Package size={18} />, label: 'Orders & Transport' },
  { to: '/profit', icon: <Activity size={18} />, label: 'Profit Dashboard' },
  { to: '/notifications', icon: <Bell size={18} />, label: 'Notifications' },
  { to: '/profile', icon: <User size={18} />, label: 'My Profile' },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-pink-100
        transition-transform duration-300 ease-in-out overflow-y-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:top-0
      `} style={{ boxShadow: '2px 0 20px rgba(244,167,192,0.08)' }}>

        {/* Brand header (visible in sidebar on desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-5 border-b border-pink-50">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
            <Leaf size={18} color="white" />
          </div>
          <div>
            <div className="font-heading text-base font-bold"
              style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KRISHAMITRA
            </div>
            <div className="text-xs text-gray-400">Digital Mitra for Farmers</div>
          </div>
        </div>

        {/* Farmer quick info */}
        <div className="mx-3 my-4 p-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              R
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Ravi Kumar</div>
              <div className="text-xs text-gray-500">Palamuru, Nalgonda</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs text-gray-500">Trust Score</span>
            <div className="flex items-center gap-1">
              <div className="w-20 h-1.5 rounded-full bg-white overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '87%', background: 'linear-gradient(90deg, #F4A7C0, #D4A843)' }} />
              </div>
              <span className="text-xs font-bold" style={{ color: '#D4A843' }}>87</span>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="px-3 pb-6 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Navigation</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span style={{ color: 'inherit' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="mx-3 mb-4 p-4 rounded-2xl text-center"
          style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
          <div className="text-white text-xs font-semibold mb-1">🌾 3 crops ready to sell</div>
          <div className="text-white/80 text-xs">Check today's opportunities</div>
        </div>
      </aside>
    </>
  );
}
