import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mapMarkers } from '../data/mockData';
import { Search, Filter, Navigation2, Star, Shield, Phone } from 'lucide-react';

// Custom Map Marker Icons using Leaflet divIcon
const createCustomIcon = (type) => {
  const config = {
    buyer: { emoji: '🤝', color: '#4CAF50' }, // Green
    market: { emoji: '🏬', color: '#2196F3' }, // Blue
    storage: { emoji: '❄️', color: '#9C27B0' }, // Purple
    transport: { emoji: '🚛', color: '#FF9800' }, // Orange
    processing: { emoji: '🏭', color: '#E91E63' }, // Pink
    restaurant: { emoji: '🍽️', color: '#795548' }, // Brown
    input: { emoji: '🌱', color: '#00BCD4' }, // Cyan
  };

  const c = config[type] || { emoji: '📍', color: '#F44336' };

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="
      background-color: white; 
      border: 2px solid ${c.color}; 
      border-radius: 50%; 
      width: 36px; height: 36px; 
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      ${type === 'buyer' ? 'animation: pulse 2s infinite;' : ''}
    ">${c.emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

const categories = [
  { id: 'all', label: 'All Places' },
  { id: 'buyer', label: 'Buyers' },
  { id: 'market', label: 'Markets' },
  { id: 'storage', label: 'Storage' },
  { id: 'transport', label: 'Transport' },
  { id: 'processing', label: 'Processing' },
  { id: 'input', label: 'Agri Inputs' },
];

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Default center (Nalgonda roughly based on mock data)
  const center = [17.38, 79.20]; 

  const filteredMarkers = mapMarkers.filter(m => {
    if (activeCategory !== 'all' && m.type !== activeCategory) return false;
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-4">
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Smart Map</h1>
        <p className="text-gray-500 text-sm">Discover buyers, markets, transport, and more around you.</p>
      </div>

      {/* ── CONTROLS ── */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-pink-100 mb-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search location, buyer, etc..." 
            className="form-input pl-9 py-2"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories (Scrollable horizontally on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar flex-1">
          {categories.map(c => (
            <button 
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                activeCategory === c.id 
                  ? 'bg-pink-50 border-pink-300 text-pink-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP CONTAINER ── */}
      <div className="flex-1 bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm relative z-0">
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredMarkers.map(marker => (
            <Marker 
              key={marker.id} 
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(marker.type)}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{marker.name}</h3>
                    {marker.verified && (
                      <div className="bg-green-50 p-1 rounded-full text-green-600" title="Verified">
                        <Shield size={14} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-yellow-500 mb-3">
                    <Star size={12} fill="currentColor" />
                    <span className="font-medium">{marker.rating}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Requirement</span>
                      <span className="font-medium text-gray-800">{marker.requirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rate</span>
                      <span className="font-bold text-pink-600">{marker.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distance</span>
                      <span className="font-medium text-gray-800">{marker.distance}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-pink-50 text-pink-600 border border-pink-200 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-pink-100">
                      <Phone size={12} /> Call
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-pink-400 to-amber-500 text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:opacity-90">
                      <Navigation2 size={12} /> Navigate
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Helper popup */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-pink-100 max-w-[250px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-800">Live Data</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            Showing {filteredMarkers.length} active opportunities around you based on your selected crops.
          </p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper { border-radius: 16px; padding: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); border: 1px solid rgba(244,167,192,0.3); }
        .leaflet-popup-content { margin: 12px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
