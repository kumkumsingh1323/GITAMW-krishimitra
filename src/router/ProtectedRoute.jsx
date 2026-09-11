import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Role → default dashboard route map
export const ROLE_DASHBOARD = {
  farmer:     '/farmer/dashboard',
  business:   '/business/dashboard',
  restaurant: '/restaurant/dashboard',
  processing: '/processing/dashboard',
  transport:  '/transport/dashboard',
  customer:   '/customer/dashboard',
  village:    '/village/dashboard',
  district:   '/district/dashboard',
  state:      '/state/dashboard',
  admin:      '/admin/dashboard',
};

// Extracts the role prefix from a path like /farmer/dashboard
export function getRoleFromPath(path) {
  const match = path.match(/^\/(\w+)\//);
  return match ? match[1] : null;
}

/**
 * ProtectedRoute — wraps any dashboard route.
 * - If not logged in → /login
 * - If logged in but wrong role → their correct dashboard
 * - allowedRole = null means any authenticated user can access
 */
export function ProtectedRoute({ children, allowedRole = null }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDFAF6' }}>
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">🌱</div>
          <div className="text-gray-500 text-sm">Loading KRISHAMITRA...</div>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role check needed
  if (allowedRole && profile?.role && profile.role !== allowedRole) {
    const correctDash = ROLE_DASHBOARD[profile.role] || '/login';
    return <Navigate to={correctDash} replace />;
  }

  return children;
}
