import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F4A7C0, #D4A843)' }}>
                <Leaf size={18} color="white" />
              </div>
              <span className="font-heading text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #C9748F, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                KRISHAMITRA
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              A Digital Mitra for Every Farmer. Helping rural India understand demand, 
              find buyers, reduce waste and earn better through technology.
            </p>
            <div className="flex gap-3 mt-5">
              {/* Social icons container */}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Platform</div>
            {['Dashboard','Smart Map','Market Intelligence','AI Center','Surplus to Value','Input Discovery'].map(item => (
              <div key={item} className="mb-2">
                <Link to="#" className="text-sm text-gray-500 hover:text-pink-400 transition-colors no-underline">{item}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Contact</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-pink-300" />
                support@krishamitra.in
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} className="text-pink-300" />
                1800-KRISHA (toll free)
              </div>
            </div>
            <div className="mt-5 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #FDE8F0, #F5E6C0)' }}>
              <div className="text-xs font-semibold text-gray-700">Supported Languages</div>
              <div className="text-xs text-gray-500 mt-1">తెలుగు • हिंदी • English</div>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400">
            © 2026 KRISHAMITRA. Built with ❤️ for India's Farmers.
          </div>
          <div className="flex gap-4">
            {['Privacy Policy','Terms of Use','Grievance'].map(item => (
              <Link key={item} to="#" className="text-xs text-gray-400 hover:text-pink-400 no-underline">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
