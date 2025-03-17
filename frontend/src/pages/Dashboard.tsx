import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, BookOpen, PieChart, Calendar, Send, Receipt, GraduationCap, Utensils } from 'lucide-react';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

const Dashboard = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [aiInstruction, setAiInstruction] = useState<string>('');
  const [processingInstruction, setProcessingInstruction] = useState<boolean>(false);
  const [income, setIncome] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    fetchAnalysis();
    
    // Load saved data from localStorage
    const savedIncome = localStorage.getItem('userIncome');
    const savedBills = localStorage.getItem('userBills');
    
    if (savedIncome) {
      setIncome(parseFloat(savedIncome));
    }
    
    if (savedBills) {
      setBills(JSON.parse(savedBills));
    }
  }, []);

  const fetchAnalysis = async () => {
    // Commented out real API call
    /*try {
      const response = await fetch('/api/v1/transactions/analyze');
      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      }
    } catch (error) {
      console.error('Failed to fetch analysis:', error);
    }*/

    // Sample data
    setAnalysis({
      currentBalance: 1234.56,
      income: 800.00,
      expenses: 650.00,
      tuitionSpent: 2200.00
    });
  };

  const processInstructions = async () => {
    if (!aiInstruction.trim()) return;
    
    setProcessingInstruction(true);
    
    // In the future, this would call an API to process the natural language instruction
    // For now, we'll simulate a delay and just log the instruction
    console.log("AI instruction:", aiInstruction);
    
    // Wait 1 second to simulate API call
    setTimeout(() => {
      setProcessingInstruction(false);
      setAiInstruction('');
      // Show a success message or update the UI based on the instruction
      alert("Your financial preferences have been saved!");
    }, 1000);
  };

  // Calculate remaining money after bills
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remainingMoney = income - totalBills;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100 font-display">Dashboard</h1>
      </div>

      {/* AI Instructions Input */}
      <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          Tell me about your finances
        </h2>
        <div className="space-y-4">
          <p className="text-slate-300">Tell me about your income, monthly expenses, financial goals or any specific concerns:</p>
          <div className="relative">
            <textarea 
              value={aiInstruction}
              onChange={(e) => setAiInstruction(e.target.value)}
              placeholder="E.g., I make $800/month from my part-time job, my rent is $500, I spend about $200 on groceries, and I want to save for a laptop..."
              className="w-full h-24 bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            ></textarea>
            <button 
              onClick={processInstructions}
              disabled={processingInstruction || !aiInstruction.trim()}
              className={`absolute bottom-3 right-3 p-2 rounded-lg ${processingInstruction || !aiInstruction.trim() ? 'bg-slate-600/50 text-slate-400' : 'bg-cyan-500 text-white hover:bg-cyan-600'} transition-colors`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-400">I'll help organize your finances and provide personalized recommendations based on your input.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-button">Current Balance</p>
              <p className="text-2xl font-bold text-slate-100">${analysis?.currentBalance || 0} <span className="text-green-400 text-lg">💰</span></p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-button">Income</p>
              <p className="text-2xl font-bold text-slate-100">${income || 0} <span className="text-blue-400 text-lg">📈</span></p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-button">Expenses</p>
              <p className="text-2xl font-bold text-slate-100">${analysis?.expenses || 0} <span className="text-red-400 text-lg">📉</span></p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-button">Tuition & Books</p>
              <p className="text-2xl font-bold text-slate-100">${analysis?.tuitionSpent || 0} <span className="text-indigo-400 text-lg">🎓</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Top College Expenses */}
      <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
          <Utensils className="w-5 h-5 text-cyan-400" />
          Top College Expenses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-200">Housing & Utilities</h3>
              <span className="text-red-400 font-bold">$650/mo</span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2 mb-1">
              <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-slate-400">85% of average student budget</p>
          </div>
          
          <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-200">Food & Groceries</h3>
              <span className="text-amber-400 font-bold">$320/mo</span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2 mb-1">
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-slate-400">65% of average student budget</p>
          </div>
          
          <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-200">Transportation</h3>
              <span className="text-blue-400 font-bold">$180/mo</span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2 mb-1">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-slate-400">45% of average student budget</p>
          </div>
          
          <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-200">Textbooks & Supplies</h3>
              <span className="text-indigo-400 font-bold">$120/mo</span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2 mb-1">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <p className="text-xs text-slate-400">30% of average student budget</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-cyan-400" />
            Spending by Category
          </h2>
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="p-4 bg-slate-700/50 rounded-full mb-4">
              <PieChart className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 mb-2">Share your spending details in the text box above</p>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Academic Term Analysis
          </h2>
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="p-4 bg-slate-700/50 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 mb-2">Tell me your semester dates and budget goals above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;