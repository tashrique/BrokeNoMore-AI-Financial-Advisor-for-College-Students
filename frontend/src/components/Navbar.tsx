import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Upload, ShoppingBag, BarChart3, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useAuth();
  const [hoveringLogo, setHoveringLogo] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-slate-800/90 backdrop-blur-sm p-6 shadow-lg flex flex-col border-r border-slate-700/50 overflow-y-auto">
      <div 
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onMouseEnter={() => setHoveringLogo(true)}
        onMouseLeave={() => setHoveringLogo(false)}
      >
        <div className="relative">
          <Wallet className={`w-8 h-8 text-cyan-400 transition-all duration-300 ${hoveringLogo ? 'rotate-12' : ''}`} />
          {hoveringLogo && (
            <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
          )}
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-display">
          Broke<span className="text-amber-400">No</span>More
        </h1>
      </div>

      <div className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 font-button ${
              isActive
                ? 'bg-gradient-to-r from-slate-700/80 to-slate-700/40 text-cyan-400 shadow-md'
                : 'hover:bg-slate-700/30 text-slate-300 hover:translate-x-1'
            }`
          }
        >
          <BarChart3 className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 font-button ${
              isActive
                ? 'bg-gradient-to-r from-slate-700/80 to-slate-700/40 text-cyan-400 shadow-md'
                : 'hover:bg-slate-700/30 text-slate-300 hover:translate-x-1'
            }`
          }
        >
          <Upload className="w-5 h-5" />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/advisor"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 font-button ${
              isActive
                ? 'bg-gradient-to-r from-slate-700/80 to-slate-700/40 text-cyan-400 shadow-md'
                : 'hover:bg-slate-700/30 text-slate-300 hover:translate-x-1'
            }`
          }
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Purchase Advisor</span>
        </NavLink>
      </div>

      {/* Spacer to push logout to bottom */}
      <div className="flex-grow min-h-[50px]"></div>

      <div className="mt-auto sticky bottom-0 pb-4">
        <div className="p-4 bg-gradient-to-r from-slate-700/50 to-slate-700/30 rounded-lg mb-4 border border-slate-600/30 hover:border-cyan-500/20 transition-colors">
          <p className="text-sm text-slate-400 mb-1">Logged in as:</p>
          <p className="font-medium text-slate-200 truncate flex items-center font-button">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            {user?.email}
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 justify-center p-3 text-slate-300 bg-slate-700/30 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-300 group border border-transparent hover:border-red-500/20 font-button"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;