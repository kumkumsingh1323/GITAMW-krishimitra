import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Leaf, Plus, Activity, Cpu, FlaskConical, Droplets,
  Cloud, Sprout, Zap, ShoppingBag, Package, BookOpen, Bell, HelpCircle,
  LogOut, Menu, X, ChevronDown, TrendingUp, Users, MessageSquare,
  ShoppingCart, Truck, BarChart2, Shield, Settings, AlertTriangle,
  Megaphone, FileText, DollarSign, History, Search, Globe, Landmark,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── Sidebar nav items per role ── */
const ROLE_NAV = {
  farmer: [
    { section: 'home',               icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'profile',            icon: User,            label: 'My Profile' },
    { section: 'my-crops',           icon: Leaf,            label: 'My Crops' },
    { section: 'add-crop',           icon: Plus,            label: 'Add New Crop' },
    { section: 'crop-health',        icon: Activity,        label: 'Crop Health' },
    { section: 'ai-disease',         icon: Cpu,             label: 'AI Disease Detection' },
    { section: 'soil-testing',       icon: FlaskConical,    label: 'Soil Testing' },
    { section: 'irrigation',         icon: Droplets,        label: 'Water & Irrigation' },
    { section: 'weather',            icon: Cloud,           label: 'Weather' },
    { section: 'crop-recommendation',icon: Sprout,          label: 'Crop Recommendation' },
    { section: 'fertilizer',         icon: Zap,             label: 'Fertilizer Guide' },
    { section: 'marketplace',        icon: ShoppingBag,     label: 'Marketplace' },
    { section: 'my-orders',          icon: Package,         label: 'My Orders' },
    { section: 'schemes',            icon: BookOpen,        label: 'Gov. Schemes' },
    { section: 'notifications',      icon: Bell,            label: 'Notifications' },
    { section: 'help',               icon: HelpCircle,      label: 'Help & Support' },
  ],
  business: [
    { section: 'home',          icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'profile',       icon: User,            label: 'Business Profile' },
    { section: 'search-crops',  icon: Search,          label: 'Search Crops' },
    { section: 'view-farmers',  icon: Users,           label: 'Browse Farmers' },
    { section: 'market-prices', icon: TrendingUp,      label: 'Market Prices' },
    { section: 'buy-crops',     icon: ShoppingBag,     label: 'Buy Crops' },
    { section: 'requirements',  icon: FileText,        label: 'Requirements' },
    { section: 'orders',        icon: Package,         label: 'Place Orders' },
    { section: 'track-orders',  icon: Truck,           label: 'Track Orders' },
    { section: 'payments',      icon: DollarSign,      label: 'Payments' },
    { section: 'history',       icon: History,         label: 'Purchase History' },
    { section: 'messages',      icon: MessageSquare,   label: 'Messages' },
    { section: 'notifications', icon: Bell,            label: 'Notifications' },
  ],
  restaurant: [
    { section: 'home',              icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'profile',           icon: User,            label: 'Restaurant Profile' },
    { section: 'add-requirements',  icon: Plus,            label: 'Add Requirements' },
    { section: 'search-produce',    icon: Search,          label: 'Search Fresh Produce' },
    { section: 'farmer-products',   icon: Leaf,            label: 'Farmer Products' },
    { section: 'prices',            icon: TrendingUp,      label: 'Check Prices' },
    { section: 'orders',            icon: Package,         label: 'Place Orders' },
    { section: 'track-orders',      icon: Truck,           label: 'Track Orders' },
    { section: 'payments',          icon: DollarSign,      label: 'Payments' },
    { section: 'history',           icon: History,         label: 'Purchase History' },
    { section: 'messages',          icon: MessageSquare,   label: 'Messages' },
    { section: 'notifications',     icon: Bell,            label: 'Notifications' },
  ],
  village: [
    { section: 'home',            icon: LayoutDashboard, label: 'Village Overview' },
    { section: 'farmers',         icon: Users,           label: 'Registered Farmers' },
    { section: 'requests',        icon: FileText,        label: 'Farmer Requests' },
    { section: 'crop-info',       icon: Leaf,            label: 'Crop Information' },
    { section: 'disease-reports', icon: AlertTriangle,   label: 'Disease Reports' },
    { section: 'water-problems',  icon: Droplets,        label: 'Water Problems' },
    { section: 'soil-problems',   icon: Activity,        label: 'Soil Problems' },
    { section: 'issues',          icon: Shield,          label: 'Local Issues' },
    { section: 'emergency',       icon: Bell,            label: 'Emergency Requests' },
    { section: 'announcements',   icon: Megaphone,       label: 'Announcements' },
    { section: 'reports',         icon: BarChart2,       label: 'Reports' },
  ],
  district: [
    { section: 'home',               icon: LayoutDashboard, label: 'District Overview' },
    { section: 'farmers',            icon: Users,           label: 'Total Farmers' },
    { section: 'villages',           icon: Globe,           label: 'Villages' },
    { section: 'crop-stats',         icon: Leaf,            label: 'Crop Statistics' },
    { section: 'production',         icon: Activity,        label: 'Crop Production' },
    { section: 'disease-reports',    icon: AlertTriangle,   label: 'Disease Reports' },
    { section: 'soil-reports',       icon: FlaskConical,    label: 'Soil Reports' },
    { section: 'water-reports',      icon: Droplets,        label: 'Water Reports' },
    { section: 'market-prices',      icon: TrendingUp,      label: 'Market Prices' },
    { section: 'complaints',         icon: MessageSquare,   label: 'Farmer Complaints' },
    { section: 'schemes',            icon: BookOpen,        label: 'Gov. Schemes' },
    { section: 'village-performance',icon: BarChart2,       label: 'Village Performance' },
    { section: 'analytics',          icon: Cpu,             label: 'Analytics' },
    { section: 'reports',            icon: FileText,        label: 'Reports' },
  ],
  state: [
    { section: 'home',                icon: LayoutDashboard, label: 'State Overview' },
    { section: 'farmers',             icon: Users,           label: 'Total Farmers' },
    { section: 'districts',           icon: Landmark,        label: 'Districts' },
    { section: 'villages',            icon: Globe,           label: 'Villages' },
    { section: 'production',          icon: Activity,        label: 'Crop Production' },
    { section: 'district-performance',icon: BarChart2,       label: 'District Performance' },
    { section: 'disease-trends',      icon: AlertTriangle,   label: 'Disease Trends' },
    { section: 'soil-analytics',      icon: FlaskConical,    label: 'Soil Analytics' },
    { section: 'water-analytics',     icon: Droplets,        label: 'Water Analytics' },
    { section: 'market-analytics',    icon: TrendingUp,      label: 'Market Analytics' },
    { section: 'schemes',             icon: BookOpen,        label: 'Gov. Schemes' },
    { section: 'farmer-issues',       icon: MessageSquare,   label: 'Farmer Issues' },
    { section: 'ai-insights',         icon: Cpu,             label: 'AI Insights' },
    { section: 'reports',             icon: FileText,        label: 'Reports' },
  ],
  admin: [
    { section: 'home',           icon: LayoutDashboard, label: 'Admin Overview' },
    { section: 'users',          icon: Users,           label: 'All Users' },
    { section: 'farmer-mgmt',    icon: Leaf,            label: 'Farmer Management' },
    { section: 'business-mgmt',  icon: ShoppingBag,     label: 'Business Management' },
    { section: 'restaurant-mgmt',icon: ShoppingCart,    label: 'Restaurant Management' },
    { section: 'village-mgmt',   icon: Globe,           label: 'Village Management' },
    { section: 'district-mgmt',  icon: Landmark,        label: 'District Management' },
    { section: 'state-mgmt',     icon: MapPin,          label: 'State Management' },
    { section: 'roles',          icon: Shield,          label: 'Role Management' },
    { section: 'crops',          icon: Leaf,            label: 'Crop Management' },
    { section: 'marketplace',    icon: ShoppingCart,    label: 'Marketplace' },
    { section: 'orders',         icon: Package,         label: 'Order Management' },
    { section: 'ai-monitoring',  icon: Cpu,             label: 'AI Monitoring' },
    { section: 'complaints',     icon: MessageSquare,   label: 'Complaints' },
    { section: 'reports',        icon: BarChart2,       label: 'Reports' },
    { section: 'notifications',  icon: Bell,            label: 'Notifications' },
    { section: 'settings',       icon: Settings,        label: 'System Settings' },
  ],
  // Legacy roles — minimal nav
  processing: [
    { section: 'home', icon: LayoutDashboard, label: 'Dashboard' },
  ],
  transport: [
    { section: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'deliveries', icon: Truck, label: 'Deliveries' },
    { section: 'routes', icon: MapPin, label: 'Routes' },
    { section: 'earnings', icon: DollarSign, label: 'Earnings' },
  ],
  customer: [
    { section: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'products', icon: ShoppingCart, label: 'Products' },
    { section: 'orders', icon: Package, label: 'My Orders' },
  ],
};

const ROLE_META = {
  farmer:     { label: 'Farmer',          icon: '👨‍🌾', color: '#10B981' },
  business:   { label: 'Business',        icon: '🏪',   color: '#3B82F6' },
  restaurant: { label: 'Restaurant',      icon: '🍽️',  color: '#F97316' },
  processing: { label: 'Processing Unit', icon: '♻️',   color: '#8B5CF6' },
  transport:  { label: 'Transporter',     icon: '🚚',   color: '#0EA5E9' },
  customer:   { label: 'Customer',        icon: '👤',   color: '#EC4899' },
  village:    { label: 'Village Support', icon: '🏘️',  color: '#D97706' },
  district:   { label: 'District Office', icon: '🏛️',  color: '#DC2626' },
  state:      { label: 'State Office',    icon: '🗺️',  color: '#7C3AED' },
  admin:      { label: 'Admin',           icon: '🔐',   color: '#1D4ED8' },
};

export default function DashboardLayout({ children, role }) {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ROLE_NAV[role] || [];
  const meta = ROLE_META[role] || { label: 'User', icon: '👤', color: '#10B981' };
  const displayName = profile?.name || user?.displayName || 'User';
  const location = profile?.village ? `${profile.village}${profile.district ? ', ' + profile.district : ''}` : meta.label;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  // Find current section label for header
  const currentItem = navItems.find(n => n.section === activeSection) || navItems[0];

  return (
    <div className="min-h-screen flex" style={{ background: '#F8FAFC' }}>
      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `} style={{ borderRight: '1.5px solid #E5E7EB', boxShadow: '2px 0 16px rgba(0,0,0,0.06)' }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1.5px solid #F3F4F6' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              <Leaf size={18} color="white" />
            </div>
            <div>
              <div className="font-heading text-sm font-bold leading-tight"
                style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                KRISHAMITRA
              </div>
              <div className="text-[10px] text-gray-400 font-medium">Digital Mitra</div>
            </div>
          </div>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="mx-3 my-3 p-3 rounded-xl" style={{ background: '#F9FAFB', border: '1.5px solid #E5E7EB' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${meta.color}18` }}>
              {meta.icon}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{displayName}</div>
              <div className="text-[11px] text-gray-500 truncate">{location}</div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: `${meta.color}15`, color: meta.color }}>
              {meta.label}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Trust {profile?.trustScore || 70}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-3 overflow-y-auto hide-scrollbar">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 py-3 mt-1">
            Navigation
          </div>
          <div className="space-y-0.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 pt-2" style={{ borderTop: '1.5px solid #F3F4F6' }}>
          <button
            onClick={handleLogout}
            className="sidebar-link w-full"
            style={{ color: '#EF4444' }}
          >
            <LogOut size={16} className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── TOP NAVBAR ── */}
        <header className="sticky top-0 z-20 bg-white h-14 flex items-center px-4 gap-3"
          style={{ borderBottom: '1.5px solid #E5E7EB', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>

          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-sm">
            <span className="text-gray-400 font-medium">{meta.label}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-semibold">{currentItem?.label || 'Dashboard'}</span>
          </div>

          <div className="flex-1" />

          {/* Notification bell */}
          <button
            onClick={() => handleNavClick('notifications')}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: meta.color }}>
                {displayName[0]?.toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-gray-800 leading-tight">{displayName}</div>
                <div className="text-[10px] text-gray-400">{meta.label}</div>
              </div>
              <ChevronDown size={13} className="text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg overflow-hidden z-50"
                style={{ border: '1.5px solid #E5E7EB' }}>
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <div className="text-sm font-semibold text-gray-800">{displayName}</div>
                  <div className="text-xs text-gray-400">{meta.label}</div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => { handleNavClick('profile'); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 text-left"
                  >
                    <User size={14} /> My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 text-left"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-6 overflow-x-hidden">
          {React.cloneElement(children, { activeSection, setActiveSection })}
        </main>
      </div>
    </div>
  );
}
