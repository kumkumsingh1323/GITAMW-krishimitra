import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './router/ProtectedRoute';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Shared layout wrapper
import DashboardLayout from './components/layout/DashboardLayout';

// Role dashboards
import FarmerDashboard    from './pages/dashboards/FarmerDashboard';
import BusinessDashboard  from './pages/dashboards/BusinessDashboard';
import RestaurantDashboard from './pages/dashboards/RestaurantDashboard';
import ProcessingDashboard from './pages/dashboards/ProcessingDashboard';
import TransportDashboard from './pages/dashboards/TransportDashboard';
import CustomerDashboard  from './pages/dashboards/CustomerDashboard';
import VillageDashboard   from './pages/dashboards/VillageDashboard';
import DistrictDashboard  from './pages/dashboards/DistrictDashboard';
import StateDashboard     from './pages/dashboards/StateDashboard';
import AdminDashboard     from './pages/dashboards/AdminDashboard';

// Helper: wraps a dashboard page in DashboardLayout + ProtectedRoute
function RoleRoute({ role, children }) {
  return (
    <ProtectedRoute allowedRole={role}>
      <DashboardLayout role={role}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Farmer ── */}
          <Route path="/farmer/dashboard" element={<RoleRoute role="farmer"><FarmerDashboard /></RoleRoute>} />
          <Route path="/farmer/*" element={<RoleRoute role="farmer"><FarmerDashboard /></RoleRoute>} />

          {/* ── Business ── */}
          <Route path="/business/dashboard" element={<RoleRoute role="business"><BusinessDashboard /></RoleRoute>} />
          <Route path="/business/*" element={<RoleRoute role="business"><BusinessDashboard /></RoleRoute>} />

          {/* ── Restaurant ── */}
          <Route path="/restaurant/dashboard" element={<RoleRoute role="restaurant"><RestaurantDashboard /></RoleRoute>} />
          <Route path="/restaurant/*" element={<RoleRoute role="restaurant"><RestaurantDashboard /></RoleRoute>} />

          {/* ── Processing ── */}
          <Route path="/processing/dashboard" element={<RoleRoute role="processing"><ProcessingDashboard /></RoleRoute>} />
          <Route path="/processing/*" element={<RoleRoute role="processing"><ProcessingDashboard /></RoleRoute>} />

          {/* ── Transport ── */}
          <Route path="/transport/dashboard" element={<RoleRoute role="transport"><TransportDashboard /></RoleRoute>} />
          <Route path="/transport/*" element={<RoleRoute role="transport"><TransportDashboard /></RoleRoute>} />

          {/* ── Customer ── */}
          <Route path="/customer/dashboard" element={<RoleRoute role="customer"><CustomerDashboard /></RoleRoute>} />
          <Route path="/customer/*" element={<RoleRoute role="customer"><CustomerDashboard /></RoleRoute>} />

          {/* ── Village ── */}
          <Route path="/village/dashboard" element={<RoleRoute role="village"><VillageDashboard /></RoleRoute>} />
          <Route path="/village/*" element={<RoleRoute role="village"><VillageDashboard /></RoleRoute>} />

          {/* ── District ── */}
          <Route path="/district/dashboard" element={<RoleRoute role="district"><DistrictDashboard /></RoleRoute>} />
          <Route path="/district/*" element={<RoleRoute role="district"><DistrictDashboard /></RoleRoute>} />

          {/* ── State ── */}
          <Route path="/state/dashboard" element={<RoleRoute role="state"><StateDashboard /></RoleRoute>} />
          <Route path="/state/*" element={<RoleRoute role="state"><StateDashboard /></RoleRoute>} />

          {/* ── Admin ── */}
          <Route path="/admin/dashboard" element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>} />
          <Route path="/admin/*" element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>} />

          {/* ── Legacy & Catch-all ── */}
          <Route path="/dashboard" element={<Navigate to="/farmer/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
