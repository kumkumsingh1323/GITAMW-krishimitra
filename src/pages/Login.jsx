import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ROLE_DASHBOARD } from '../router/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { Leaf, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginAsDemo } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const snap = await getDoc(doc(db, 'users', cred.user.uid));
      const role = snap.exists() ? snap.data().role : 'farmer';
      navigate(ROLE_DASHBOARD[role] || '/farmer/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login shortcuts
  const demoLogin = (role) => {
    loginAsDemo(role);
    navigate(ROLE_DASHBOARD[role] || '/farmer/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F8FAFC' }}>

      {/* ── LEFT PANEL — Real farmer photo ── */}
      <div className="hidden lg:flex flex-col w-[45%] relative overflow-hidden">
        {/* Full-bleed background photo */}
        <img
          src="/farmer-hero.jpg"
          alt="Indian farmer harvesting rice crops in the field at golden hour"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay so text reads clearly */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 100%)' }}
        />

        {/* Content layered over the photo */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10">

          {/* Logo — top left */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              <Leaf size={22} color="white" />
            </div>
            <span className="font-heading text-2xl font-bold text-white drop-shadow-lg">
              KRISHAMITRA
            </span>
          </Link>

          {/* Bottom content over photo */}
          <div>
            <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white mb-5"
              style={{ background: 'rgba(212,168,67,0.9)', letterSpacing: '0.05em' }}>
              🌾 EMPOWERING INDIA'S FARMERS
            </div>
            <h2 className="font-heading text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Welcome back!
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-sm">
              Access your personalized dashboard based on your role — Farmer, Buyer, Restaurant, Transport and more.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📈', text: 'Real-time mandi prices & demand' },
                { icon: '🤝', text: 'Verified buyer & farmer connections' },
                { icon: '🤖', text: 'AI-powered crop & business advice' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                    {item.icon}
                  </div>
                  <span className="text-white/90 font-semibold text-base leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo (only shown when left panel is hidden) */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              <Leaf size={18} color="white" />
            </div>
            <span className="font-heading text-lg font-bold"
              style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KRISHAMITRA
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500 text-base mt-1">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle size={16} />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="you@example.com" className="form-input pl-10"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Enter password"
                  className="form-input pl-10 pr-10"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-brand w-full flex items-center justify-center gap-2 text-base py-3.5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          {/* Demo shortcuts */}
          <div className="mt-7 p-5 rounded-2xl border border-pink-100" style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)' }}>
            <div className="text-sm font-bold text-gray-600 mb-4 text-center">🎮 Demo — Skip Login (No Account Needed)</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { role: 'farmer', label: '👨‍🌾 Farmer' },
                { role: 'business', label: '🏪 Business' },
                { role: 'restaurant', label: '🍽️ Restaurant' },
                { role: 'admin', label: '🔐 Admin' },
              ].map(d => (
                <button key={d.role} onClick={() => demoLogin(d.role)}
                  className="text-sm font-semibold py-3 px-4 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 text-gray-700 transition-colors">
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to KRISHAMITRA?{' '}
            <Link to="/register" className="font-semibold no-underline" style={{ color: '#C9748F' }}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
