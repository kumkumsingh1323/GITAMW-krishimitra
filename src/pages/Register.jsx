import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ROLE_DASHBOARD } from '../router/ProtectedRoute';
import { Leaf, ArrowRight, ArrowLeft, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

const roles = [
  { id: 'farmer',     icon: '👨‍🌾', label: 'Farmer',          desc: 'Sell crops, find buyers, get market prices' },
  { id: 'business',   icon: '🏪', label: 'Business',         desc: 'Source produce directly from farmers' },
  { id: 'restaurant', icon: '🍽️', label: 'Restaurant',       desc: 'Fresh daily supply from nearby farms' },
  { id: 'processing', icon: '♻️', label: 'Processing Unit',  desc: 'Procure raw produce for processing' },
  { id: 'transport',  icon: '🚚', label: 'Transporter',      desc: 'Provide transport for farm produce' },
  { id: 'customer',   icon: '👤', label: 'Customer',         desc: 'Buy fresh produce at farm prices' },
  { id: 'village',    icon: '🏘️', label: 'Village Support',  desc: 'Help onboard farmers in your area' },
  { id: 'district',   icon: '🏛️', label: 'District Office',  desc: 'Manage district-level agricultural data' },
  { id: 'state',      icon: '🗺️', label: 'State Office',     desc: 'State-level analytics and oversight' },
  { id: 'admin',      icon: '🔐', label: 'Admin',            desc: 'Platform management and verification' },
];

const indianStates = ['Telangana','Andhra Pradesh','Maharashtra','Karnataka','Madhya Pradesh','Rajasthan','Uttar Pradesh','Punjab','Haryana','Tamil Nadu'];
const cropList = ['Tomato','Onion','Chilli','Potato','Brinjal','Maize','Cotton','Rice','Wheat','Groundnut','Turmeric','Cabbage'];
const emptyCrop = { name: '', quantity: '', unit: 'kg', quality: 'Grade A', status: 'Ready' };

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', village: '', district: '', state: '', landSize: '', password: '' });
  const [crops, setCrops] = useState([{ ...emptyCrop }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isFarmer = role === 'farmer';
  const totalSteps = isFarmer ? 4 : 3;
  const progress = (step / totalSteps) * 100;

  const addCrop = () => setCrops([...crops, { ...emptyCrop }]);
  const removeCrop = (i) => setCrops(crops.filter((_, idx) => idx !== i));
  const updateCrop = (i, key, val) => { const u = [...crops]; u[i][key] = val; setCrops(u); };

  const handleFinish = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields (Name, Email, Password).');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      const userData = {
        uid: cred.user.uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        village: form.village,
        district: form.district,
        state: form.state,
        role,
        ...(isFarmer && { landSize: form.landSize, crops }),
        createdAt: serverTimestamp(),
        trustScore: 70,
        verified: false,
      };
      await setDoc(doc(db, 'users', cred.user.uid), userData);
      navigate(ROLE_DASHBOARD[role] || '/farmer/dashboard');
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'An account with this email already exists.'
        : err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#F8FAFC' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
              <Leaf size={18} color="white" />
            </div>
            <span className="font-heading text-lg font-bold"
              style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KRISHAMITRA
            </span>
          </Link>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Step {step} of {totalSteps}</span>
            <span className="text-xs text-gray-400">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #F4A7C0, #D4A843)' }} />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle size={16} />{error}
            </div>
          )}

          {/* Step 1 — Role */}
          {step === 1 && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">Who are you?</h1>
              <p className="text-gray-500 text-base mb-8">Select your role to get a personalized dashboard experience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map(r => (
                  <div key={r.id} onClick={() => setRole(r.id)}
                    className={`role-card relative cursor-pointer ${role === r.id ? 'selected' : ''}`}>
                    {role === r.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                        <Check size={13} color="white" />
                      </div>
                    )}
                    <div className="text-4xl mb-3">{r.icon}</div>
                    <div className="text-base font-bold text-gray-800 mb-1.5">{r.label}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Basic Info */}
          {step === 2 && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">Basic Information</h1>
              <p className="text-gray-500 text-base mb-8">Tell us about yourself to set up your account.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your full name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Mobile Number</label>
                  <input className="form-input" placeholder="10-digit mobile" type="tel"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Village / Town</label>
                  <input className="form-input" placeholder="Your village/town"
                    value={form.village} onChange={e => setForm({ ...form, village: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">District</label>
                  <input className="form-input" placeholder="Your district"
                    value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">State</label>
                  <select className="form-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                    <option value="">Select state</option>
                    {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Create Password *</label>
                  <input className="form-input" type="password" placeholder="Min. 6 characters"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Farm Info (Farmer only) */}
          {step === 3 && isFarmer && (
            <div>
              <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Farm Details</h1>
              <p className="text-gray-500 text-sm mb-6">Help us understand your farm better.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="form-label">Total Farm Land Size</label>
                  <div className="flex gap-2">
                    <input className="form-input flex-1" placeholder="e.g. 5" type="number"
                      value={form.landSize} onChange={e => setForm({ ...form, landSize: e.target.value })} />
                    <select className="form-input w-28">
                      <option>Acres</option><option>Hectares</option><option>Guntas</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-sm font-semibold text-gray-700 mb-1">📍 Location will be auto-detected</div>
                  <div className="text-xs text-gray-500">Your GPS location helps buyers and KRISHAMITRA show accurate distance and nearby opportunities.</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Crops (Farmer only) */}
          {step === 4 && isFarmer && (
            <div>
              <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Your Crops</h1>
              <p className="text-gray-500 text-sm mb-6">Add the crops you are currently growing or ready to sell.</p>
              <div className="space-y-4">
                {crops.map((crop, i) => (
                  <div key={i} className="p-4 rounded-xl bg-green-50/50 border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-gray-700">Crop {i + 1}</div>
                      {crops.length > 1 && (
                        <button onClick={() => removeCrop(i)} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="form-label">Crop Name</label>
                        <select className="form-input" value={crop.name} onChange={e => updateCrop(i, 'name', e.target.value)}>
                          <option value="">Select</option>
                          {cropList.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Quantity (kg)</label>
                        <input className="form-input" type="number" placeholder="e.g. 500"
                          value={crop.quantity} onChange={e => updateCrop(i, 'quantity', e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label">Quality</label>
                        <select className="form-input" value={crop.quality} onChange={e => updateCrop(i, 'quality', e.target.value)}>
                          <option>Grade A</option><option>Grade B</option><option>Grade C</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Status</label>
                        <select className="form-input" value={crop.status} onChange={e => updateCrop(i, 'status', e.target.value)}>
                          <option>Ready</option><option>Harvesting</option><option>Growing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addCrop}
                className="mt-4 flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border-2 border-dashed border-green-300 text-green-700 hover:bg-green-50 transition-all">
                <Plus size={16} /> Add Another Crop
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => { setStep(Math.max(1, step - 1)); setError(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-gray-100 text-gray-500'
              }`}>
              <ArrowLeft size={16} /> Back
            </button>

            {step < totalSteps ? (
              <button onClick={() => { if (role && step >= 1) { setStep(step + 1); setError(''); } }}
                disabled={step === 1 && !role}
                className="btn-brand flex items-center gap-2 text-sm py-2.5 px-6">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleFinish} disabled={loading}
                className="btn-brand flex items-center gap-2 text-sm py-2.5 px-6">
                {loading ? 'Creating Account...' : <><Check size={16} /> Complete Setup</>}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold no-underline" style={{ color: '#C9748F' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
