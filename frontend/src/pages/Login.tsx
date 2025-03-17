import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, ShieldCheck, Sparkles, Coffee, Pizza, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Login = () => {
  const { login } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const [moneyEmojis, setMoneyEmojis] = useState<{ id: number; emoji: string; left: number; top: number; rotate: number }[]>([]);
  const [showBrokeMessage, setShowBrokeMessage] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(0);

  const brokeJokes = [
    "When your bank account has more mood swings than you do...",
    "My budget has three lines: rent, ramen, regret.",
    "My wallet is like an onion - opening it makes me cry.",
    "My financial plan? Wait for my student loans to expire with me.",
    "My credit score is so low it needs a ladder to reach rock bottom."
  ];

  useEffect(() => {
    // Create falling money emojis at intervals
    const interval = setInterval(() => {
      if (moneyEmojis.length < 15) {
        setMoneyEmojis(prev => [...prev, {
          id: Date.now(),
          emoji: Math.random() > 0.5 ? '💸' : '💰',
          left: Math.random() * 100,
          top: -10,
          rotate: Math.random() * 360
        }]);
      }
    }, 1000);

    // Animate money emojis falling
    const animationInterval = setInterval(() => {
      setMoneyEmojis(prev => 
        prev.map(emoji => ({
          ...emoji,
          top: emoji.top + 5,
          rotate: emoji.rotate + 5
        })).filter(emoji => emoji.top < 150) // Increased from 100 to 150 to ensure emojis are off-screen before removal
      );
    }, 200);

    // Rotate through broke jokes
    const jokeInterval = setInterval(() => {
      setCurrentJoke(prev => (prev + 1) % brokeJokes.length);
    }, 5000);

    // Show broke message after a delay
    setTimeout(() => {
      setShowBrokeMessage(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(animationInterval);
      clearInterval(jokeInterval);
    };
  }, [moneyEmojis.length]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 p-4 font-sans overflow-hidden relative">
      {/* Falling money animations */}
      {moneyEmojis.map(emoji => (
        <div 
          key={emoji.id}
          className="absolute text-2xl animate-bounce"
          style={{ 
            left: `${emoji.left}%`, 
            top: `${emoji.top}%`,
            transform: `rotate(${emoji.rotate}deg)`,
            opacity: 0.7,
            zIndex: 0,
            transition: 'top 0.5s linear, rotate 0.5s linear'
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* Broke message that floats and bounces */}
      <div 
        className={`absolute top-4  transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-cyan-500 text-white px-5 py-2 rounded-full font-medium shadow-lg transition-all duration-700 z-10 backdrop-blur-sm border border-white/20 font-button animate-[bounce_3s_ease-in-out_infinite] ${
          showBrokeMessage 
            ? 'opacity-100 translate-y-0 scale-100 rotate-1' 
            : 'opacity-0 -translate-y-20 scale-90 rotate-6'
        }`}
      >
        <p className="text-sm whitespace-nowrap tracking-wide flex items-center gap-2">
          {brokeJokes[currentJoke]} 
          <span className="animate-spin inline-block text-amber-300">💸</span>
        </p>
      </div>

      {/* Left side - App info */}
      <div className="max-w-xl w-full p-6 md:p-8 md:pr-12 z-10">
        <h1 className="text-6xl font-extrabold text-center md:text-left bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight font-display">
          Broke<span className="text-amber-400">No</span>More
        </h1>
        <p className="text-xl text-slate-300 mb-6 text-center md:text-left font-light">
          AI-powered financial buddy for college students.
        </p>
        <div className="space-y-4 mb-6">
          <FeatureItem 
            icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
            title="AI Financial Advisor"
            description="Stop making terrible money decisions. Our AI will do the thinking you can't."
          />
          
          <FeatureItem 
            icon={<ShieldCheck className="w-6 h-6 text-cyan-400" />}
            title="Purchase Guardian"
            description="Because we know you'll buy it anyway unless daddy stops you."
          />
          
          <FeatureItem 
            icon={<TrendingUp className="w-6 h-6 text-cyan-400" />}
            title="Spending Reality Check"
            description="See why you're always broke each month."
          />
        </div>

        {/* Money draining visuals - More compact */}
        <div className="bg-slate-800/70 rounded-lg border border-slate-700/80 shadow-lg overflow-hidden">
          <div className="bg-slate-700/50 py-2 px-4 border-b border-slate-600/50">
            <h3 className="font-semibold text-slate-200 font-display text-sm">WHERE YOUR MONEY ACTUALLY GOES</h3>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-3 gap-1">
              <ExpenseItem icon={<Coffee />} name="Coffee" amount="$143/mo" percent={34} color="amber" />
              <ExpenseItem icon={<Pizza />} name="Takeout" amount="$175/mo" percent={51} color="red" />
              <ExpenseItem icon={<CreditCard />} name="Impulse" amount="$413/mo" percent={74} color="blue" />
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700/50">
              <p className="text-slate-400 text-xs text-center">Average college student wastes $675/month on non-essentials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full mt-6 md:mt-0 transform transition-all duration-300 hover:shadow-2xl border border-white/20 hover:border-cyan-500/20 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <Wallet 
              className={`w-16 h-16 text-cyan-400 mb-4 transition-all duration-500 ${isHovering ? 'rotate-12 scale-110' : ''}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            />
            {isHovering && (
              <span className="absolute -top-2 -right-2 animate-ping bg-cyan-400 rounded-full h-3 w-3"></span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 tracking-tight font-display">
            Take Control Now
          </h2>
          <p className="text-slate-300 text-center">
            Your AI Financial Bestie 🤑
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-amber-400/10 border border-amber-500/20 rounded-lg p-3 mb-4">
            <p className="text-amber-300 font-medium font-button">
              Tired of being broke before month-end?
            </p>
          </div>
          
          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 font-button font-medium tracking-wide"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <div className="pt-6">
            <p className="text-xs text-slate-400">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for feature items
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 border border-white/10 hover:border-cyan-500/20 group">
    <div className="flex-shrink-0 p-2 bg-slate-800/80 rounded-lg group-hover:bg-slate-700/80 transition-colors">{icon}</div>
    <div>
      <h3 className="font-semibold text-white tracking-wide group-hover:text-cyan-400 transition-colors font-display text-base">{title}</h3>
      <p className="text-slate-300 font-light text-sm">{description}</p>
    </div>
  </div>
);

// Helper component for expense visualization with progress bar
const ExpenseItem = ({ 
  icon, 
  name, 
  amount, 
  percent, 
  color 
}: { 
  icon: React.ReactNode; 
  name: string; 
  amount: string; 
  percent: number;
  color: 'amber' | 'red' | 'blue';
}) => {
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'amber': return 'from-amber-500 to-amber-400 text-amber-400';
      case 'red': return 'from-red-500 to-red-400 text-red-400';
      case 'blue': return 'from-blue-500 to-blue-400 text-blue-400';
      default: return 'from-cyan-500 to-cyan-400 text-cyan-400';
    }
  };

  return (
    <div className="flex flex-col items-center p-2">
      <div className="p-2 bg-slate-700/80 rounded-full mb-1 text-center">
        {icon}
      </div>
      <p className="text-slate-300 text-xs mb-1 font-medium">{name}</p>
      <p className={`font-bold font-button text-sm ${getColorClasses(color).split(' ').pop()}`}>{amount}</p>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-1 overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${getColorClasses(color).split(' ').slice(0, 2).join(' ')} h-full rounded-full`} 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;