import React, { useState, useRef } from 'react';
import {
  TrendingUp, Zap, CloudRain, Shield, Plus, Trash2,
  Upload, CheckCircle, AlertTriangle, Send, Leaf, Search,
  Phone, Star, Package, Clock, CheckSquare, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ─── Static mock data ─── */
const MY_CROPS = [
  { id: 1, name: 'Tomato', emoji: '🍅', grade: 'Grade A', qty: '500 kg', status: 'Ready', planted: 'Aug 10', harvest: 'Sep 20' },
  { id: 2, name: 'Onion',  emoji: '🧅', grade: 'Grade B', qty: '300 kg', status: 'Harvesting', planted: 'Jul 25', harvest: 'Sep 15' },
  { id: 3, name: 'Chilli', emoji: '🌶️', grade: 'Grade A', qty: '150 kg', status: 'Growing', planted: 'Aug 20', harvest: 'Oct 10' },
];
const SCHEMES = [
  { name: 'PM-KISAN', desc: 'Income support ₹6,000/year to farmer families', status: 'Eligible', deadline: 'Oct 31' },
  { name: 'PMFBY (Crop Insurance)', desc: 'Coverage against crop failure, pest attack, weather', status: 'Apply Now', deadline: 'Sep 30' },
  { name: 'Soil Health Card Scheme', desc: 'Free soil health card with nutrient analysis', status: 'Enrolled', deadline: 'Ongoing' },
  { name: 'Kisan Credit Card (KCC)', desc: 'Low-interest credit for farming activities', status: 'Apply Now', deadline: 'Dec 31' },
];
const NOTIFICATIONS = [
  { type: 'success', msg: 'Buyer Sri Lakshmi Traders matched your Tomato listing', time: '2 hrs ago', read: false },
  { type: 'warning', msg: 'Light rain expected tomorrow — harvest Tomato before 6 AM', time: '4 hrs ago', read: false },
  { type: 'info',    msg: 'PM-KISAN instalment of ₹2,000 credited to your account', time: '1 day ago', read: true },
  { type: 'success', msg: 'Your Onion order #ORD-102 has been confirmed', time: '2 days ago', time: '2 days ago', read: true },
];
const MARKET_CROPS = [
  { name: 'Tomato', emoji: '🍅', price: '₹27/kg', change: '+₹3', buyer: 'Sri Lakshmi Traders', dist: '38 km', verified: true },
  { name: 'Onion',  emoji: '🧅', price: '₹18/kg', change: '+₹1', buyer: 'Hyderabad APMC',      dist: '55 km', verified: true },
  { name: 'Chilli', emoji: '🌶️', price: '₹85/kg', change: '-₹2', buyer: 'Spice World Traders', dist: '40 km', verified: false },
  { name: 'Potato', emoji: '🥔', price: '₹14/kg', change: '+₹2', buyer: 'Veggie Fresh Co.',    dist: '22 km', verified: true },
];
const ORDERS = [
  { id: '#ORD-201', crop: 'Tomato', qty: '200 kg', buyer: 'Sri Lakshmi Traders', date: 'Sep 12', status: 'Delivered', amount: '₹5,400' },
  { id: '#ORD-202', crop: 'Onion',  qty: '150 kg', buyer: 'Hyderabad APMC',      date: 'Sep 14', status: 'In Transit', amount: '₹2,700' },
  { id: '#ORD-203', crop: 'Chilli', qty: '80 kg',  buyer: 'Spice World',         date: 'Sep 16', status: 'Pending',    amount: '₹6,800' },
];

/* ─── AI Disease mock result ─── */
const DISEASE_RESULTS = {
  'default': {
    diseaseName: 'Early Blight (Alternaria solani)',
    description: 'Early Blight is a common fungal disease in tomatoes. It appears as dark, concentric ring spots on older leaves, causing them to yellow and drop prematurely.',
    cause: 'Caused by the fungus Alternaria solani. Spreads rapidly in warm, humid conditions with temperatures between 24–29°C. Overcrowded plants with poor air circulation are most vulnerable.',
    treatment: 'Apply Mancozeb (2.5 g/L water) or Chlorothalonil-based fungicide every 7–10 days. Remove and destroy all infected leaves immediately. Avoid overhead watering.',
    fertilizer: 'Apply Potassium-rich fertilizer (NPK 0-0-50) to strengthen plant immunity. Also spray Calcium Nitrate (1%) to improve cell wall strength against fungal infection.',
    prevention: 'Maintain proper plant spacing (60 cm). Practice crop rotation (avoid tomatoes in the same plot for 2 years). Use disease-resistant varieties. Apply mulch to prevent soil splash.',
    confidence: 94,
    severity: 'Moderate',
  }
};

/* ─── Chat messages ─── */
const AI_RESPONSES = {
  'tomato': 'Tomatoes grow best in well-drained soil with pH 6.0–6.8. Plant in full sunlight (6–8 hrs/day). Water regularly but avoid waterlogging. Apply NPK 10-26-26 at transplanting and NPK 12-12-17 at flowering stage. Watch for Early Blight and use Mancozeb for prevention.',
  'onion': 'Onions prefer sandy loam soil with pH 6.0–7.0. Best planted in October–November in South India. Apply basal dose of FYM 25t/ha. Top dress with Urea (50 kg/ha) 30 days after planting. Harvest when tops fall over naturally.',
  'rain': 'Before expected rainfall: (1) Complete harvesting of mature crops, (2) Ensure proper drainage channels, (3) Do not apply fertilizer 24 hrs before rain, (4) Spray preventive fungicide on susceptible crops like tomato and chilli.',
  'default': 'Thank you for your question! As your KRISHAMITRA AI assistant, I recommend consulting the nearest KVK (Krishi Vigyan Kendra) for localized advice. For general guidance, proper soil preparation, balanced fertilization (NPK), and regular monitoring for pests and diseases are the foundation of good crop health.',
};

/* ─── Section renderers ─── */
function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'Ready': 'badge-green', 'Delivered': 'badge-green', 'Enrolled': 'badge-green', 'Eligible': 'badge-blue',
    'Harvesting': 'badge-amber', 'In Transit': 'badge-amber', 'Apply Now': 'badge-amber',
    'Growing': 'badge-blue', 'Pending': 'badge-amber',
  };
  return <span className={map[status] || 'badge-blue'}>{status}</span>;
}

/* ─── HOME SECTION ─── */
function HomeSection({ profile, setActiveSection }) {
  const name = profile?.name?.split(' ')[0] || 'Farmer';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  return (
    <div className="section-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
            {greeting}, {name} 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.7 }}>Here is your farm overview for today.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-outline py-2 px-4 text-sm" onClick={() => setActiveSection('ai-disease')}>
            <Zap size={14} /> AI Assistant
          </button>
          <button className="btn-brand py-2 px-4 text-sm" onClick={() => setActiveSection('marketplace')}>
            <TrendingUp size={14} /> View Market
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Active Crops', value: '3', icon: '🌱', color: '#10B981' },
          { label: 'Ready to Sell', value: '500 kg', icon: '📦', color: '#3B82F6' },
          { label: "Today's Price", value: '₹27/kg', icon: '💰', color: '#D4A843' },
          { label: 'Pending Orders', value: '1', icon: '🚚', color: '#F97316' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border-2 shadow-sm" style={{ borderColor: '#D1D5DB' }}>
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="text-sm text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Recommendation Banner */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #FEF3C7 100%)', border: '1.5px solid #D1FAE5' }}>
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #10B981, #F59E0B)' }} />
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-green">KRISHAMITRA Recommendation</span>
            <span className="text-xs text-gray-500 flex items-center gap-1"><Zap size={11} className="text-amber-400" /> Best Opportunity Today</span>
          </div>
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Sell your 500 kg Tomato now — Best Price This Week</h2>
          <p className="text-gray-600 text-sm mb-4">Sri Lakshmi Traders (38 km away) is offering ₹27/kg — ₹5 more than your local mandi. Net return after transport: ₹12,700</p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-brand py-2 px-5 text-sm" onClick={() => setActiveSection('marketplace')}>
              View Buyer Details
            </button>
            <button className="btn-outline py-2 px-5 text-sm" onClick={() => setActiveSection('ai-disease')}>
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* My Crops Quick View */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-bold text-gray-900">My Active Crops</h2>
          <button className="text-sm font-semibold text-green-600 hover:underline" onClick={() => setActiveSection('my-crops')}>
            Manage All →
          </button>
        </div>
        <div className="space-y-3">
          {MY_CROPS.map(crop => (
            <div key={crop.id} className="dash-row flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#F3F4F6' }}>{crop.emoji}</div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{crop.name} <span className="text-gray-400 font-normal text-xs">· {crop.grade}</span></div>
                  <div className="text-xs text-gray-500">{crop.qty} · Harvest: {crop.harvest}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={crop.status} />
                <button className="btn-outline py-1 px-3 text-xs" onClick={() => setActiveSection('marketplace')}>Find Buyers</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MY CROPS SECTION ─── */
function MyCropsSection({ setActiveSection }) {
  return (
    <div className="section-page">
      <SectionHeader
        title="My Crops"
        subtitle="Track and manage all your crops here."
        action={<button className="btn-brand py-2 px-4 text-sm" onClick={() => setActiveSection('add-crop')}><Plus size={14} /> Add New Crop</button>}
      />
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {['Crop', 'Grade', 'Quantity', 'Planted', 'Harvest Date', 'Status', 'Action'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MY_CROPS.map(crop => (
                <tr key={crop.id}>
                  <td><div className="flex items-center gap-2"><span className="text-lg">{crop.emoji}</span><span className="font-semibold text-gray-800">{crop.name}</span></div></td>
                  <td><span className="badge-blue">{crop.grade}</span></td>
                  <td className="font-medium">{crop.qty}</td>
                  <td className="text-gray-500">{crop.planted}</td>
                  <td className="text-gray-500">{crop.harvest}</td>
                  <td><StatusBadge status={crop.status} /></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn-brand py-1 px-3 text-xs" onClick={() => setActiveSection('marketplace')}>Sell</button>
                      <button className="btn-outline py-1 px-3 text-xs" onClick={() => setActiveSection('crop-health')}>Health</button>
                    </div>
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

/* ─── ADD CROP SECTION ─── */
function AddCropSection({ setActiveSection }) {
  const [form, setForm] = useState({ name: '', quantity: '', unit: 'kg', grade: 'Grade A', status: 'Growing', planted: '', harvest: '', land: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const cropOptions = ['Tomato','Onion','Chilli','Potato','Brinjal','Maize','Cotton','Rice','Wheat','Groundnut','Turmeric','Cabbage'];

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setActiveSection('my-crops'); }, 1500);
  };

  return (
    <div className="section-page">
      <SectionHeader title="Add New Crop" subtitle="Enter details about the crop you are currently growing." />
      {saved && <div className="info-box green mb-4 flex items-center gap-2"><CheckCircle size={16} /> Crop added successfully! Redirecting...</div>}
      <div className="card max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Crop Name *</label>
              <select className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required>
                <option value="">Select crop</option>
                {cropOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Quantity *</label>
              <div className="flex gap-2">
                <input className="form-input flex-1" type="number" placeholder="e.g. 500" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required />
                <select className="form-input w-20" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                  <option>kg</option><option>quintal</option><option>ton</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Quality Grade *</label>
              <select className="form-input" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})}>
                <option>Grade A</option><option>Grade B</option><option>Grade C</option>
              </select>
            </div>
            <div>
              <label className="form-label">Current Status *</label>
              <select className="form-input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option>Growing</option><option>Flowering</option><option>Harvesting</option><option>Ready</option>
              </select>
            </div>
            <div>
              <label className="form-label">Planting Date</label>
              <input className="form-input" type="date" value={form.planted} onChange={e => setForm({...form, planted: e.target.value})} />
            </div>
            <div>
              <label className="form-label">Expected Harvest Date</label>
              <input className="form-input" type="date" value={form.harvest} onChange={e => setForm({...form, harvest: e.target.value})} />
            </div>
            <div>
              <label className="form-label">Land Area (Acres)</label>
              <input className="form-input" type="number" placeholder="e.g. 2.5" value={form.land} onChange={e => setForm({...form, land: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="form-label">Additional Notes</label>
            <textarea className="form-input" rows={3} placeholder="Any special notes about this crop..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-brand py-2.5 px-6">Save Crop</button>
            <button type="button" className="btn-outline py-2.5 px-6" onClick={() => setActiveSection('my-crops')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── AI DISEASE DETECTION + CHAT ─── */
function AIDiseaseSection() {
  const [tab, setTab] = useState('disease');
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { from: 'ai', text: 'Namaste! I am KRISHAMITRA AI, your smart agriculture assistant. Ask me anything about crops, soil, weather, fertilizers, diseases, or market prices. I understand questions in Telugu, Hindi and English.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(DISEASE_RESULTS['default']);
    }, 2500);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);
    setTimeout(() => {
      const key = Object.keys(AI_RESPONSES).find(k => userMsg.toLowerCase().includes(k));
      const resp = key ? AI_RESPONSES[key] : AI_RESPONSES['default'];
      setChatMessages(prev => [...prev, { from: 'ai', text: resp }]);
      setChatLoading(false);
      chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="section-page">
      <SectionHeader title="AI Crop Assistant" subtitle="AI-powered disease detection and agriculture Q&A." />

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('disease')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tab === 'disease' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
          🔬 Disease Detection
        </button>
        <button onClick={() => setTab('chat')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tab === 'chat' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
          💬 AI Chat Assistant
        </button>
      </div>

      {/* Disease Detection Tab */}
      {tab === 'disease' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="card">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Upload Crop / Leaf Image</h2>
              <p className="text-sm text-gray-500 mb-4">Take a clear photo of the affected leaf, stem, or fruit and upload it here for AI analysis.</p>

              {!image ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-2xl p-10 bg-green-50/30 cursor-pointer hover:bg-green-50 transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Upload size={36} className="text-green-500 mb-3" />
                  <div className="font-semibold text-gray-700 mb-1">Click to Upload Image</div>
                  <div className="text-xs text-gray-400">or drag and drop — JPG, PNG, WEBP supported</div>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-gray-900 flex justify-center" style={{ maxHeight: 280 }}>
                    <img src={image} alt="Uploaded crop" className="object-contain max-h-64" />
                    <button onClick={() => { setImage(null); setResult(null); }}
                      className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-lg text-xs font-semibold text-gray-700 hover:bg-white">
                      Change Image
                    </button>
                  </div>
                  {!result ? (
                    <button onClick={handleAnalyze} disabled={analyzing} className="btn-brand w-full py-3 text-base justify-center">
                      {analyzing ? (
                        <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" /></svg> Analyzing Image — Please Wait...</>
                      ) : (
                        <><Zap size={18} /> Analyze with AI</>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0' }}>
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="font-bold text-green-800">Analysis Complete — {result.confidence}% Confidence</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="card" style={{ borderLeft: '3px solid #EF4444' }}>
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Disease Name</div>
                          <div className="font-bold text-red-600">{result.diseaseName}</div>
                          <div className="text-xs text-gray-500 mt-1">Severity: <span className="font-semibold text-amber-600">{result.severity}</span></div>
                        </div>
                        <div className="card" style={{ borderLeft: '3px solid #F59E0B' }}>
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Possible Cause</div>
                          <div className="text-sm text-gray-700">{result.cause}</div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Disease Description</div>
                        <p className="text-sm text-gray-700">{result.description}</p>
                      </div>
                      <div className="card" style={{ background: '#EFF6FF', borderColor: '#BFDBFE' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={16} className="text-blue-600" />
                          <div className="text-xs font-bold text-blue-700 uppercase">Recommended Treatment</div>
                        </div>
                        <p className="text-sm text-gray-700">{result.treatment}</p>
                      </div>
                      <div className="card" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
                        <div className="text-xs font-bold text-green-700 uppercase mb-2">Recommended Fertilizer</div>
                        <p className="text-sm text-gray-700">{result.fertilizer}</p>
                      </div>
                      <div className="card" style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
                        <div className="text-xs font-bold text-amber-700 uppercase mb-2">Prevention Tips</div>
                        <p className="text-sm text-gray-700">{result.prevention}</p>
                      </div>
                      <button onClick={() => { setImage(null); setResult(null); }} className="btn-outline w-full py-2.5">
                        Analyze Another Image
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar tips */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-3">📸 How to Take a Good Photo</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Use natural daylight — avoid flash', 'Focus on the most affected leaf', 'Capture both front and back of leaf', 'Keep the background plain', 'Ensure the image is not blurry'].map((t, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckSquare size={14} className="text-green-500 mt-0.5 flex-shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ background: 'linear-gradient(135deg, #ECFDF5, #FEF3C7)', border: '1.5px solid #D1FAE5' }}>
              <h3 className="font-semibold text-gray-800 mb-2">💡 Quick Tip</h3>
              <p className="text-sm text-gray-600">Early detection saves crops! Check your crops every 3 days and upload any suspicious-looking leaves for AI analysis.</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-0 overflow-hidden flex flex-col" style={{ height: 520 }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#F9FAFB', borderBottom: '1.5px solid #E5E7EB' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #10B981, #D4A843)' }}>AI</div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">KRISHAMITRA AI Assistant</div>
                  <div className="text-[11px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online — Farming Expert
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={chatRef} className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ background: '#F9FAFB' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.from === 'ai' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1"
                        style={{ background: 'linear-gradient(135deg, #10B981, #D4A843)' }}>AI</div>
                    )}
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-green-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #10B981, #D4A843)' }}>AI</div>
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendChat} className="flex gap-2 p-3" style={{ borderTop: '1.5px solid #E5E7EB', background: 'white' }}>
                <input
                  type="text"
                  className="form-input flex-1 py-2.5 text-sm"
                  placeholder="Ask about crops, diseases, fertilizers, prices..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                />
                <button type="submit" disabled={chatLoading || !chatInput.trim()} className="btn-brand px-4 py-2.5">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-3">💬 Quick Questions</h3>
              <div className="space-y-2">
                {[
                  'Best fertilizer for tomato?',
                  'How to treat onion disease?',
                  'What to do before heavy rain?',
                  'How to improve soil health?',
                  'Best time to harvest chilli?',
                ].map((q, i) => (
                  <button key={i} onClick={() => setChatInput(q)}
                    className="w-full text-left text-sm px-3 py-2 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors text-gray-700">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SOIL TESTING ─── */
function SoilTestingSection() {
  const [form, setForm] = useState({ ph: '', nitrogen: '', phosphorus: '', potassium: '', organic: '' });
  const [result, setResult] = useState(null);
  const analyze = (e) => {
    e.preventDefault();
    setResult({
      status: 'Moderate',
      recommendation: 'Your soil has low Nitrogen levels. Apply Urea (46-0-0) at 50 kg/acre. pH is slightly alkaline — add Gypsum to reduce. Phosphorus is adequate. Add FYM (compost) to improve organic matter.',
      crops: ['Tomato', 'Onion', 'Maize', 'Groundnut'],
    });
  };
  return (
    <div className="section-page">
      <SectionHeader title="Soil Testing" subtitle="Enter your soil test values to get AI recommendations." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Enter Soil Test Values</h2>
          <form onSubmit={analyze} className="space-y-4">
            {[
              { label: 'Soil pH', key: 'ph', placeholder: 'e.g. 6.5 (range 0-14)' },
              { label: 'Nitrogen (N) mg/kg', key: 'nitrogen', placeholder: 'e.g. 120' },
              { label: 'Phosphorus (P) kg/ha', key: 'phosphorus', placeholder: 'e.g. 22' },
              { label: 'Potassium (K) kg/ha', key: 'potassium', placeholder: 'e.g. 180' },
              { label: 'Organic Carbon %', key: 'organic', placeholder: 'e.g. 0.45' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" type="number" step="0.01" placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} required />
              </div>
            ))}
            <button type="submit" className="btn-brand w-full py-3 justify-center">Get Soil Analysis & Recommendations</button>
          </form>
        </div>
        {result ? (
          <div className="space-y-4">
            <div className="info-box amber flex items-center gap-2">
              <AlertCircle size={16} /> Soil Status: <strong>{result.status}</strong>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-2">AI Recommendation</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{result.recommendation}</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-2">Suitable Crops for Your Soil</h3>
              <div className="flex flex-wrap gap-2">
                {result.crops.map(c => <span key={c} className="badge-green">{c}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center" style={{ minHeight: 300 }}>
            <div className="text-center text-gray-400">
              <div className="text-5xl mb-3">🧪</div>
              <div className="font-medium">Enter soil values and click Analyze</div>
              <div className="text-sm mt-1">You will receive fertilizer and crop recommendations</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── WEATHER ─── */
function WeatherSection() {
  return (
    <div className="section-page">
      <SectionHeader title="Weather Information" subtitle="7-day forecast and farming advisories for your location." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', border: 'none' }}>
            <div className="flex items-center justify-between text-white">
              <div>
                <div className="text-sm opacity-75 mb-1">📍 Your Location</div>
                <div className="font-heading text-4xl font-bold mb-1">28°C</div>
                <div className="text-lg">Partly Cloudy</div>
                <div className="text-sm opacity-75 mt-1">Humidity: 72% · Wind: 14 km/h</div>
              </div>
              <div className="text-7xl">⛅</div>
            </div>
          </div>
          <div className="card">
            <h3 className="font-heading text-base font-bold text-gray-900 mb-3">7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-1">
              {[
                { day: 'Mon', icon: '☀️', high: 30, low: 22 },
                { day: 'Tue', icon: '🌧️', high: 26, low: 20 },
                { day: 'Wed', icon: '🌧️', high: 24, low: 19 },
                { day: 'Thu', icon: '⛅', high: 28, low: 21 },
                { day: 'Fri', icon: '☀️', high: 32, low: 23 },
                { day: 'Sat', icon: '☀️', high: 33, low: 24 },
                { day: 'Sun', icon: '⛅', high: 29, low: 22 },
              ].map((d, i) => (
                <div key={i} className="text-center p-2 rounded-xl hover:bg-gray-50">
                  <div className="text-xs text-gray-500 font-medium mb-1">{d.day}</div>
                  <div className="text-xl mb-1">{d.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{d.high}°</div>
                  <div className="text-xs text-gray-400">{d.low}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card" style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
            <h3 className="font-semibold text-amber-800 mb-2">⚠️ Farming Advisory</h3>
            <div className="space-y-2 text-sm text-amber-700">
              <p>• Heavy rain expected Tuesday–Wednesday. Harvest mature tomatoes before Monday evening.</p>
              <p>• Apply preventive fungicide today before rain arrives.</p>
              <p>• Avoid fertilizer application 24 hrs before rain.</p>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-2">🌾 Best Farming Days</h3>
            <div className="space-y-2">
              {['Monday — Good for harvesting', 'Friday — Good for planting', 'Saturday — Good for spraying'].map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckSquare size={14} className="text-green-500" /> {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MARKETPLACE ─── */
function MarketplaceSection() {
  const [search, setSearch] = useState('');
  const filtered = MARKET_CROPS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="section-page">
      <SectionHeader title="Marketplace" subtitle="Browse live buyer offers and sell your crops directly." />
      <div className="card mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="form-input pl-10" placeholder="Search crops..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input sm:w-44">
            <option>All Crops</option><option>Vegetables</option><option>Grains</option><option>Spices</option>
          </select>
          <select className="form-input sm:w-44">
            <option>Nearest First</option><option>Price: High to Low</option><option>Price: Low to High</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((crop, i) => (
          <div key={i} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{crop.emoji}</div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.buyer} {crop.verified && <span className="text-green-500 font-semibold">✓ Verified</span>}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-700">{crop.price}</div>
                <div className={`text-xs font-semibold ${crop.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{crop.change} vs yesterday</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">📍 {crop.dist} away</span>
              <div className="flex gap-2">
                <button className="btn-outline py-1.5 px-4 text-xs"><Phone size={12} /> Contact</button>
                <button className="btn-brand py-1.5 px-4 text-xs">Sell Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MY ORDERS ─── */
function MyOrdersSection() {
  return (
    <div className="section-page">
      <SectionHeader title="My Orders" subtitle="Track all your crop sale orders here." />
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>{['Order ID', 'Crop', 'Quantity', 'Buyer', 'Date', 'Amount', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {ORDERS.map((o, i) => (
                <tr key={i}>
                  <td className="font-semibold text-blue-600">{o.id}</td>
                  <td className="font-medium">{o.crop}</td>
                  <td>{o.qty}</td>
                  <td>{o.buyer}</td>
                  <td className="text-gray-500">{o.date}</td>
                  <td className="font-bold text-green-700">{o.amount}</td>
                  <td><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── GOVERNMENT SCHEMES ─── */
function SchemesSection() {
  return (
    <div className="section-page">
      <SectionHeader title="Government Schemes" subtitle="Eligible schemes and subsidies available for you." />
      <div className="space-y-4">
        {SCHEMES.map((s, i) => (
          <div key={i} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{s.name}</h3>
                  <StatusBadge status={s.status} />
                </div>
                <p className="text-sm text-gray-600">{s.desc}</p>
                <div className="text-xs text-gray-400 mt-1">Deadline: {s.deadline}</div>
              </div>
              <button className="btn-brand py-2 px-5 text-sm flex-shrink-0">
                {s.status === 'Enrolled' ? 'View Details' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── NOTIFICATIONS ─── */
function NotificationsSection() {
  const icons = { success: '✅', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className="section-page">
      <SectionHeader title="Notifications" subtitle="Your latest alerts and updates." />
      <div className="space-y-3">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className={`notif-item ${!n.read ? 'unread' : ''}`}>
            <div className="text-2xl flex-shrink-0">{icons[n.type]}</div>
            <div className="flex-1">
              <div className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.msg}</div>
              <div className="text-xs text-gray-400 mt-1">{n.time}</div>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GENERIC SECTIONS (Crop Health, Irrigation, Crop Rec, Fertilizer, Profile, Help) ─── */
function CropHealthSection() {
  return (
    <div className="section-page">
      <SectionHeader title="Crop Health Monitoring" subtitle="Real-time health status of all your crops." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {MY_CROPS.map((crop, i) => (
          <div key={i} className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{crop.emoji}</div>
              <div>
                <div className="font-bold text-gray-900">{crop.name}</div>
                <StatusBadge status={crop.status} />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Plant Health', value: i === 0 ? 78 : i === 1 ? 91 : 95, color: i === 0 ? '#F59E0B' : '#10B981' },
                { label: 'Water Level', value: i === 0 ? 60 : i === 1 ? 80 : 88, color: '#3B82F6' },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs font-medium mb-1"><span className="text-gray-600">{m.label}</span><span>{m.value}%</span></div>
                  <div className="h-2 bg-gray-100 rounded-full"><div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} /></div>
                </div>
              ))}
            </div>
            {i === 0 && <div className="info-box amber mt-3 text-xs">⚠️ Possible Early Blight detected. Check AI Disease section.</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function IrrigationSection() {
  return (
    <div className="section-page">
      <SectionHeader title="Water & Irrigation Support" subtitle="Track irrigation schedules and water usage." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Irrigation Schedule</h2>
          <div className="space-y-3">
            {MY_CROPS.map((crop, i) => (
              <div key={i} className="dash-row flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{crop.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{crop.name}</div>
                    <div className="text-xs text-gray-500">Next irrigation: {['Tomorrow 6 AM', 'Today 5 PM', 'Day after tomorrow'][i]}</div>
                  </div>
                </div>
                <span className={['badge-amber', 'badge-red', 'badge-green'][i]}>{['Due Soon', 'Due Today', 'On Schedule'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Water Problem Report</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Problem Type</label>
              <select className="form-input">
                <option>Water Shortage</option><option>Excess Water / Flooding</option><option>Poor Water Quality</option><option>Drainage Issue</option>
              </select>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={3} placeholder="Describe the water problem..." />
            </div>
            <button className="btn-brand py-2.5 px-5">Submit Report to Village Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CropRecommendationSection() {
  const [form, setForm] = useState({ season: '', soil: '', water: '', area: '' });
  const [result, setResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(['Tomato', 'Onion', 'Chilli', 'Groundnut']);
  };
  return (
    <div className="section-page">
      <SectionHeader title="Crop Recommendation" subtitle="AI suggests the best crops for your conditions." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Season', key: 'season', options: ['Kharif (Jun–Oct)', 'Rabi (Oct–Mar)', 'Zaid (Mar–Jun)'] },
              { label: 'Soil Type', key: 'soil', options: ['Red Sandy', 'Black Cotton', 'Sandy Loam', 'Clay', 'Alluvial'] },
              { label: 'Water Availability', key: 'water', options: ['Rain-fed Only', 'Irrigation Available', 'Drip Irrigation'] },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label} *</label>
                <select className="form-input" value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} required>
                  <option value="">Select {f.label.toLowerCase()}</option>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="form-label">Land Area (Acres)</label>
              <input className="form-input" type="number" placeholder="e.g. 3" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
            </div>
            <button type="submit" className="btn-brand w-full py-3 justify-center">Get AI Crop Recommendation</button>
          </form>
        </div>
        {result ? (
          <div className="card">
            <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">AI Recommended Crops</h3>
            <p className="text-sm text-gray-500 mb-4">Based on your season, soil, and water availability:</p>
            <div className="space-y-3">
              {result.map((crop, i) => (
                <div key={i} className="dash-row flex items-center justify-between">
                  <div className="font-semibold text-gray-800">{crop}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5 - i)].map((_, j) => <Star key={j} size={12} fill="#D4A843" color="#D4A843" />)}
                    <span className="text-xs text-gray-500 ml-1">{['Best', 'Very Good', 'Good', 'Fair'][i]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center" style={{ minHeight: 300 }}>
            <div className="text-center text-gray-400"><div className="text-5xl mb-3">🌾</div><div>Fill the form to get recommendations</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

function FertilizerSection() {
  const [crop, setCrop] = useState('');
  const [result, setResult] = useState(null);
  const crops = ['Tomato', 'Onion', 'Chilli', 'Potato', 'Rice', 'Wheat'];
  const data = {
    Tomato: { basal: 'FYM 25t/ha + NPK (120:60:60 kg/ha)', top1: 'Urea 30 kg/ha at flowering', top2: 'NPK 13-0-45 at fruit set', tips: 'Spray 0.5% Boron at flower initiation to prevent fruit drop.' },
    Onion: { basal: 'FYM 20t/ha + NPK (100:50:50 kg/ha)', top1: 'Urea 25 kg/ha at 30 days', top2: 'MOP 20 kg/ha at bulbing', tips: 'Avoid excess Nitrogen at late stage — causes soft bulbs.' },
  };
  return (
    <div className="section-page">
      <SectionHeader title="Fertilizer Guide" subtitle="AI-based fertilizer recommendations for your crops." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <label className="form-label">Select Your Crop</label>
          <select className="form-input mb-4" value={crop} onChange={e => { setCrop(e.target.value); setResult(data[e.target.value] || null); }}>
            <option value="">Select crop</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {!crop && <div className="text-center py-8 text-gray-400"><div className="text-5xl mb-2">🌿</div><div>Select a crop to see recommendations</div></div>}
        </div>
        {result && (
          <div className="space-y-4">
            <div className="card" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
              <div className="text-xs font-bold text-green-700 uppercase mb-2">Basal Fertilizer (Before Planting)</div>
              <p className="text-sm text-gray-700">{result.basal}</p>
            </div>
            <div className="card">
              <div className="text-xs font-bold text-gray-500 uppercase mb-2">Top Dressing 1</div>
              <p className="text-sm text-gray-700">{result.top1}</p>
            </div>
            <div className="card">
              <div className="text-xs font-bold text-gray-500 uppercase mb-2">Top Dressing 2</div>
              <p className="text-sm text-gray-700">{result.top2}</p>
            </div>
            <div className="card" style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
              <div className="text-xs font-bold text-amber-700 uppercase mb-2">💡 Expert Tip</div>
              <p className="text-sm text-gray-700">{result.tips}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileSection({ profile }) {
  return (
    <div className="section-page">
      <SectionHeader title="My Profile" subtitle="Your personal and farm details." />
      <div className="card max-w-lg">
        <div className="flex items-center gap-4 mb-6 pb-5" style={{ borderBottom: '1.5px solid #E5E7EB' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#ECFDF5' }}>👨‍🌾</div>
          <div>
            <div className="font-heading text-xl font-bold text-gray-900">{profile?.name || 'Farmer'}</div>
            <div className="text-sm text-gray-500">{profile?.email || '—'}</div>
            <span className="badge-green mt-1 inline-block">Verified Farmer</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Phone', value: profile?.phone || '—' },
            { label: 'Village', value: profile?.village || '—' },
            { label: 'District', value: profile?.district || '—' },
            { label: 'State', value: profile?.state || '—' },
            { label: 'Land Size', value: profile?.landSize ? `${profile.landSize} Acres` : '—' },
            { label: 'Trust Score', value: `${profile?.trustScore || 70}/100` },
          ].map(f => (
            <div key={f.label}>
              <div className="text-gray-400 font-medium text-xs mb-0.5">{f.label}</div>
              <div className="font-semibold text-gray-800">{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpSection() {
  return (
    <div className="section-page">
      <SectionHeader title="Help & Support" subtitle="Get help with any farming or platform issue." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { icon: '📞', title: 'Helpline', desc: 'Call our agriculture helpline', action: '1800-XXX-XXXX (Toll Free)', btn: 'Call Now' },
          { icon: '💬', title: 'AI Chat Support', desc: 'Ask the AI assistant', action: 'Available 24/7 in Telugu, Hindi & English', btn: 'Open Chat' },
          { icon: '📹', title: 'Video Tutorials', desc: 'Learn how to use KRISHAMITRA', action: '25+ farming video guides available', btn: 'Watch' },
          { icon: '📚', title: 'FAQ', desc: 'Frequently asked questions', action: 'Find answers to common problems', btn: 'Browse FAQ' },
        ].map((h, i) => (
          <div key={i} className="card">
            <div className="text-3xl mb-2">{h.icon}</div>
            <div className="font-bold text-gray-900 mb-1">{h.title}</div>
            <div className="text-sm text-gray-500 mb-1">{h.desc}</div>
            <div className="text-xs text-gray-400 mb-3">{h.action}</div>
            <button className="btn-brand py-2 px-4 text-sm">{h.btn}</button>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Submit a Support Ticket</h2>
        <div className="space-y-4">
          <div><label className="form-label">Issue Category</label>
            <select className="form-input"><option>Login / Account</option><option>Crop & AI</option><option>Payment</option><option>Order</option><option>Other</option></select>
          </div>
          <div><label className="form-label">Description</label>
            <textarea className="form-input" rows={4} placeholder="Describe your problem in detail..." />
          </div>
          <button className="btn-brand py-2.5 px-6">Submit Ticket</button>
        </div>
      </div>
    </div>
  );
}

/* ─── PLACEHOLDER for small sections ─── */
function PlaceholderSection({ title, icon, desc }) {
  return (
    <div className="section-page">
      <SectionHeader title={title} />
      <div className="card flex items-center justify-center" style={{ minHeight: 300 }}>
        <div className="text-center">
          <div className="text-6xl mb-4">{icon}</div>
          <div className="font-heading text-xl font-bold text-gray-800 mb-2">{title}</div>
          <div className="text-gray-500 max-w-sm mx-auto">{desc}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN FARMER DASHBOARD COMPONENT
═══════════════════════════════════════════════════════ */
export default function FarmerDashboard({ activeSection = 'home', setActiveSection = () => {} }) {
  const { profile } = useAuth();

  const sections = {
    'home':                <HomeSection profile={profile} setActiveSection={setActiveSection} />,
    'profile':             <ProfileSection profile={profile} />,
    'my-crops':            <MyCropsSection setActiveSection={setActiveSection} />,
    'add-crop':            <AddCropSection setActiveSection={setActiveSection} />,
    'crop-health':         <CropHealthSection />,
    'ai-disease':          <AIDiseaseSection />,
    'soil-testing':        <SoilTestingSection />,
    'irrigation':          <IrrigationSection />,
    'weather':             <WeatherSection />,
    'crop-recommendation': <CropRecommendationSection />,
    'fertilizer':          <FertilizerSection />,
    'marketplace':         <MarketplaceSection />,
    'my-orders':           <MyOrdersSection />,
    'schemes':             <SchemesSection />,
    'notifications':       <NotificationsSection />,
    'help':                <HelpSection />,
  };

  return sections[activeSection] || sections['home'];
}
