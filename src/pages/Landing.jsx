import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Star, Shield, Zap, TrendingUp, Users, Globe, ChevronDown, Play, Mic } from 'lucide-react';
import Footer from '../components/layout/Footer';

const journeySteps = [
  { icon: '🌱', label: 'Grow', desc: 'Manage crops & farming info', color: '#E8F5E9' },
  { icon: '📊', label: 'Understand', desc: 'View demand, prices & markets', color: '#FDE8F0' },
  { icon: '🗺️', label: 'Discover', desc: 'Find buyers & opportunities', color: '#F5E6C0' },
  { icon: '🤝', label: 'Connect', desc: 'Direct buyer connection', color: '#FDE8F0' },
  { icon: '🚚', label: 'Sell & Deliver', desc: 'Transport & delivery options', color: '#F5E6C0' },
  { icon: '💰', label: 'Earn', desc: 'Track revenue & profit', color: '#FDE8F0' },
  { icon: '♻️', label: 'Reduce Waste', desc: 'Surplus-to-value opportunities', color: '#E8F5E9' },
];

const features = [
  { icon: '🤖', title: 'AI-Powered Decisions', desc: 'Smart recommendations for when to sell, where to sell, and at what price.' },
  { icon: '🗺️', title: 'Live Smart Map', desc: 'Find buyers, markets, storage, and transport near you on an interactive map.' },
  { icon: '📊', title: 'Market Intelligence', desc: 'Price trends, demand forecasts, and district-level supply analysis.' },
  { icon: '♻️', title: 'Surplus to Value', desc: 'Convert unsold produce to processing opportunities. Zero waste goal.' },
  { icon: '🎤', title: 'Voice-First', desc: 'Speak in Telugu, Hindi or English. No typing needed for farmers.' },
  { icon: '✅', title: 'Verified Trust System', desc: 'Every buyer and farmer verified with a KRISHAMITRA Trust Score.' },
];

const stats = [
  { value: '2.4L+', label: 'Farmers Onboarded' },
  { value: '₹180Cr+', label: 'Revenue Generated' },
  { value: '1,200+', label: 'Verified Buyers' },
  { value: '35%', label: 'Avg Wastage Reduced' },
];

const testimonials = [
  { name: 'Lakshmi Devi', village: 'Suryapet, Telangana', crop: 'Tomato Farmer', quote: 'KRISHAMITRA found a buyer 38 km away offering ₹5 more per kg than my local mandi. This platform changed my life.', rating: 5 },
  { name: 'Suresh Goud', village: 'Adilabad, Telangana', crop: 'Chilli Farmer', quote: 'The AI told me exactly when to harvest and who to sell to. I earned ₹28,000 more this season.', rating: 5 },
  { name: 'Rama Rao', village: 'Nalgonda, Telangana', crop: 'Onion Farmer', quote: 'I talk to KRISHAMITRA in Telugu. It understands me and shows me opportunities nearby. Very easy to use.', rating: 5 },
];

const roles = [
  { icon: '👨‍🌾', label: 'Farmer', color: '#FDE8F0' },
  { icon: '🏢', label: 'Business', color: '#F5E6C0' },
  { icon: '🍽️', label: 'Restaurant', color: '#FDE8F0' },
  { icon: '🏭', label: 'Processing Unit', color: '#F5E6C0' },
  { icon: '🚛', label: 'Transporter', color: '#FDE8F0' },
  { icon: '🏘️', label: 'Village Support', color: '#F5E6C0' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#FDFAF6' }}>
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100"
        style={{ boxShadow: '0 1px 12px rgba(244,167,192,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {['Features','How It Works','Testimonials','Roles'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`}
                className="text-sm text-gray-500 hover:text-pink-400 transition-colors no-underline">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="btn-outline text-sm py-2 px-4">Login</button>
            <button onClick={() => navigate('/register')}
              className="btn-brand text-sm py-2 px-4">Get Started</button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="gradient-hero pt-24 pb-20 px-6 overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)', border: '1px solid rgba(212,168,67,0.2)' }}>
                <Zap size={14} style={{ color: '#D4A843' }} />
                <span className="text-xs font-semibold" style={{ color: '#A87D28' }}>AI-Powered Agriculture Platform</span>
              </div>

              <h1 className="section-title mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                KRISHAMITRA
              </h1>
              <div className="font-heading text-xl md:text-2xl font-semibold mb-5"
                style={{ color: '#C9748F', fontStyle: 'italic' }}>
                "Your Digital Mitra for Smarter Farming."
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                Discover demand, find the right buyer, make smarter selling decisions, 
                reduce crop wastage and access agricultural support — all from one platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => navigate('/register')}
                  className="btn-brand flex items-center gap-2 text-base px-6 py-3.5">
                  Get Started <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/dashboard')}
                  className="btn-outline flex items-center gap-2 text-base px-6 py-3.5">
                  <Play size={16} /> Explore KRISHAMITRA
                </button>
              </div>

              {/* Voice pill */}
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'white', border: '1.5px solid rgba(244,167,192,0.3)', boxShadow: '0 4px 16px rgba(244,167,192,0.12)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
                  <Mic size={16} color="white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-700">Voice Support</div>
                  <div className="text-xs text-gray-400">తెలుగు • हिंदी • English</div>
                </div>
              </div>
            </div>

            {/* Right — Hero Visual */}
            <div className={`relative transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #FDE8F0 0%, #F5E6C0 100%)', padding: '2.5rem', minHeight: '420px' }}>

                {/* Floating cards */}
                <div className="absolute top-6 right-6 bg-white rounded-2xl px-4 py-3 shadow-md"
                  style={{ border: '1px solid rgba(244,167,192,0.2)' }}>
                  <div className="text-xs text-gray-400 mb-1">Best Price Today</div>
                  <div className="font-heading text-2xl font-bold" style={{ color: '#D4A843' }}>₹27/kg</div>
                  <div className="text-xs text-green-500 font-medium">↑ +₹5 vs local mandi</div>
                </div>

                <div className="absolute bottom-20 left-4 bg-white rounded-2xl px-4 py-3 shadow-md"
                  style={{ border: '1px solid rgba(244,167,192,0.2)' }}>
                  <div className="text-xs text-gray-400 mb-1">Verified Buyer Nearby</div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🤝</div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700">Sri Lakshmi Traders</div>
                      <div className="text-xs text-gray-400">38 km · ✓ Verified</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-4 py-3 shadow-md"
                  style={{ border: '1px solid rgba(244,167,192,0.2)' }}>
                  <div className="text-xs text-gray-400 mb-1">AI Recommendation</div>
                  <div className="text-xs font-semibold text-gray-700">🌾 Sell now. Price at peak!</div>
                  <div className="text-xs text-pink-400 mt-0.5">KRISHAMITRA AI</div>
                </div>

                {/* Central illustration */}
                <div className="flex flex-col items-center justify-center h-full pt-8">
                  <div className="text-8xl mb-4">👩‍🌾</div>
                  <div className="text-center">
                    <div className="font-heading text-xl font-bold text-gray-800">500 kg Tomato</div>
                    <div className="text-gray-500 text-sm">Ready to sell · Grade A</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {['🌾 Grow','📊 Analyse','🤝 Connect','💰 Earn'].map((s, i) => (
                      <div key={i} className="text-xs px-2 py-1 rounded-full bg-white/80 text-gray-600 font-medium">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="stat-number">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="how-it-works" className="py-20 px-6" style={{ background: '#FDFAF6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="badge-gold inline-block mb-4">The KRISHAMITRA Journey</div>
          <h2 className="section-title mb-4">From Farm to Profit</h2>
          <p className="section-subtitle mb-14">
            Every farmer's journey — simplified, digitized, and optimized.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-0">
            {journeySteps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="journey-step" style={{ minWidth: '110px' }}>
                  <div className="journey-icon" style={{ background: step.color }}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{step.label}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-tight">{step.desc}</div>
                </div>
                {i < journeySteps.length - 1 && (
                  <div className="hidden md:flex items-center mt-7" style={{ color: '#D4A843', fontSize: '1.4rem' }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pink inline-block mb-4">Platform Features</div>
            <h2 className="section-title mb-4">Everything a Farmer Needs</h2>
            <p className="section-subtitle">
              Built specifically for rural India with simplicity, speed and impact in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="ai-feature fade-up-delay-1">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section id="roles" className="py-20 px-6" style={{ background: '#FDFAF6' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="badge-gold inline-block mb-4">For Everyone in Agriculture</div>
          <h2 className="section-title mb-4">Role-Based Experience</h2>
          <p className="section-subtitle mb-12">
            Every stakeholder gets a personalized dashboard built for their needs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="role-card cursor-default">
                <div className="text-3xl mb-2">{r.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-pink inline-block mb-4">Farmer Stories</div>
            <h2 className="section-title mb-4">Voices from the Field</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="opp-card">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#D4A843" color="#D4A843" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.village} · {t.crop}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F4A7C0 0%, #D4A843 100%)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Join 2.4 lakh farmers already growing smarter with KRISHAMITRA.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => navigate('/register')}
                className="bg-white font-semibold rounded-xl px-7 py-3.5 transition-all hover:shadow-lg"
                style={{ color: '#C9748F' }}>
                Start Free — Get Started
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="border-2 border-white/60 text-white font-semibold rounded-xl px-7 py-3.5 hover:bg-white/10 transition-all">
                View Demo Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
