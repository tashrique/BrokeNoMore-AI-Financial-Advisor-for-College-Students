import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Wallet, Upload, ShoppingBag, BarChart3 } from 'lucide-react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PurchaseAdvisor from './pages/PurchaseAdvisor';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 font-sans">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Navbar />
                  <div className="flex-1 p-8 ml-64">
                    <Dashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Navbar />
                  <div className="flex-1 p-8 ml-64">
                    <Transactions />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisor"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Navbar />
                  <div className="flex-1 p-8 ml-64">
                    <PurchaseAdvisor />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;