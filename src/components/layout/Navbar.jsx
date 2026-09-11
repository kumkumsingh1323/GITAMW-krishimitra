import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, TrendingUp, Cpu, Recycle, ShoppingCart,
  BarChart2, Bell, User, Menu, X, LogOut, Leaf, ChevronDown
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/map', icon: <Map size={18} />, label: 'Smart Map' },
  { to: '/market', icon: <TrendingUp size={18} />, label: 'Market' },
  { to: '/ai', icon: <Cpu size={18} />, label: 'AI Center' },
  { to: '/surplus', icon: <Recycle size={18} />, label: 'Surplus' },
  { to: '/inputs', icon: <ShoppingCart size={18} />, label: 'Inputs' },
  { to: '/orders', icon: <BarChart2 size={18} />, label: 'Orders' },
  { to: '/profit', icon: <BarChart2 size={18} />, label: 'Profit' },
  { to: '/notifications', icon: <Bell size={18} />, label: 'Alerts' },
];

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100"
      style={{ boxShadow: '0 1px 12px rgba(244,167,192,0.12)' }}>
      <div className="flex items-center justify-between px-4 h-16">
        {/* Hamburger for mobile / sidebar toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-pink-50 transition-colors text-pink-400"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              <Leaf size={18} color="white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold"
                style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                KRISHAMITRA
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 6).map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all no-underline ${
                  isActive ? 'bg-pink-50 text-pink-dark' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-dark'
                }`
              }
              style={({ isActive }) => isActive ? { color: '#C9748F' } : {}}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <NavLink to="/notifications" className="relative p-2 rounded-xl hover:bg-pink-50 transition-colors no-underline"
            style={{ color: '#6b6b8a' }}>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-brand"></span>
          </NavLink>

          {/* Profile dropdown */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-pink-50 transition-colors">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
                R
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-gray-800">Ravi Kumar</div>
                <div className="text-xs text-gray-400">Farmer</div>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden z-50">
                <div className="p-4 border-b border-pink-50">
                  <div className="text-sm font-semibold text-gray-800">Ravi Kumar</div>
                  <div className="text-xs text-gray-400">Palamuru, Nalgonda</div>
                </div>
                <div className="p-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-pink-50 no-underline"
                    onClick={() => setProfileOpen(false)}>
                    <User size={15} /> My Profile
                  </Link>
                  <button onClick={() => { setProfileOpen(false); navigate('/'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-50">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
