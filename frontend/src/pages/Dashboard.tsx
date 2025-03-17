import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, BookOpen, PieChart, Calendar, Send, Receipt, GraduationCap, Utensils, Building, CreditCard, ChevronRight, Clock, DollarSign, Plus, FileText, User, ChevronDown, Info, Brain, MessageSquare } from 'lucide-react';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  institution: string;
  logo: string;
  lastUpdated: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  accountId: string;
}

interface UserLearning {
  id: string;
  timestamp: string;
  category: 'spending' | 'saving' | 'goal' | 'preference';
  content: string;
}

const Dashboard = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [aiInstruction, setAiInstruction] = useState<string>('');
  const [processingInstruction, setProcessingInstruction] = useState<boolean>(false);
  const [income, setIncome] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [userLearnings, setUserLearnings] = useState<UserLearning[]>([]);
  const [showAllLearnings, setShowAllLearnings] = useState<boolean>(false);

  useEffect(() => {
    fetchAnalysis();
    fetchAccounts();
    fetchRecentTransactions();
    fetchUserLearnings();
    
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

  const fetchRecentTransactions = async () => {
    // This would be an API call in a real app
    setRecentTransactions([
      {
        id: 't1',
        date: '2023-06-15',
        description: 'Starbucks Coffee',
        amount: -4.95,
        category: 'Food & Drink',
        accountId: '1'
      },
      {
        id: 't2',
        date: '2023-06-14',
        description: 'Amazon Prime',
        amount: -14.99,
        category: 'Subscriptions',
        accountId: '1'
      },
      {
        id: 't3',
        date: '2023-06-14',
        description: 'Uber Ride',
        amount: -12.50,
        category: 'Transportation',
        accountId: '1'
      },
      {
        id: 't4',
        date: '2023-06-13',
        description: 'Paycheck',
        amount: 850.00,
        category: 'Income',
        accountId: '1'
      },
      {
        id: 't5',
        date: '2023-06-12',
        description: 'Grocery Store',
        amount: -75.32,
        category: 'Groceries',
        accountId: '1'
      }
    ]);
  };

  const fetchUserLearnings = async () => {
    // This would be an API call in a real app
    // Sample data for now
    setUserLearnings([
      {
        id: '1',
        timestamp: '2023-06-15 09:23 AM',
        category: 'spending',
        content: 'User tends to spend $4-6 on coffee 3-4 times per week, totaling approximately $80/month on coffee purchases.'
      },
      {
        id: '2',
        timestamp: '2023-06-15 09:24 AM',
        category: 'saving',
        content: 'User is saving approximately 12% of monthly income, which is good but below the recommended 20% for college students with part-time income.'
      },
      {
        id: '3',
        timestamp: '2023-06-14 02:15 PM',
        category: 'goal',
        content: 'User has mentioned wanting to save for a new laptop by the end of the semester.'
      },
      {
        id: '4',
        timestamp: '2023-06-13 11:45 AM',
        category: 'preference',
        content: 'User prefers to cook at home but occasionally eats out on weekends (1-2 times).'
      },
      {
        id: '5',
        timestamp: '2023-06-12 04:32 PM',
        category: 'spending',
        content: 'User spending on textbooks is higher than average for their major. May benefit from rental or second-hand options.'
      },
      {
        id: '6',
        timestamp: '2023-06-10 10:17 AM',
        category: 'saving',
        content: 'User has an emergency fund covering approximately 1.5 months of expenses. Recommended to increase to 3 months.'
      },
      {
        id: '7', 
        timestamp: '2023-06-08 03:45 PM',
        category: 'preference',
        content: 'User prioritizes spending on educational resources and technology over entertainment.'
      }
    ]);
  };

  const fetchAccounts = async () => {
    // This would normally be an API call
    // Sample data for now - adding some sample data instead of empty array to show functionality
    setAccounts([
      {
        id: '1',
        name: 'Student Checking',
        type: 'checking',
        balance: 1246.78,
        institution: 'Chase Bank',
        logo: 'https://logo.clearbit.com/chase.com',
        lastUpdated: '2 hours ago'
      }
    ]);  
  };

  const fetchAnalysis = async () => {
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
    console.log("AI instruction:", aiInstruction);
    
    // Wait 1 second to simulate API call
    setTimeout(() => {
      // Add a new learning based on the instruction
      const newLearning: UserLearning = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        category: 'preference',
        content: `User mentioned: "${aiInstruction}"`
      };
      
      setUserLearnings(prev => [newLearning, ...prev]);
      setProcessingInstruction(false);
      setAiInstruction('');
      // Show a success message or update the UI based on the instruction
      alert("Your financial preferences have been saved!");
    }, 1000);
  };

  // Calculate remaining money after bills
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remainingMoney = income - totalBills;

  // Calculate account statistics
  const totalBalance = accounts.reduce((sum, account) => 
    account.type !== 'credit' ? sum + account.balance : sum, 0);
  
  const totalCredit = accounts.reduce((sum, account) => 
    account.type === 'credit' ? Math.abs(account.balance) : sum, 0);
  
  const totalDebt = accounts.reduce((sum, account) => 
    account.type === 'credit' && account.balance < 0 ? Math.abs(account.balance) : sum, 0);
    
  // Get limited learnings for collapsed view
  const visibleLearnings = showAllLearnings 
    ? userLearnings 
    : userLearnings.slice(0, 3);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100 font-display">Dashboard</h1>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 shadow-lg text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-slate-700/50 rounded-full">
              <Building className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-display text-slate-200">No Financial Accounts Connected</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Connect your bank accounts to get personalized financial insights and automatically track your spending.
            </p>
            <a 
              href="/transactions" 
              className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 font-button"
            >
              <Plus className="w-4 h-4" />
              <span>Connect Your First Account</span>
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Main Dashboard Layout - Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                      <Wallet className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-button">Current Balance</p>
                      <p className="text-2xl font-bold text-slate-100">${totalBalance.toFixed(2)} <span className="text-green-400 text-lg">💰</span></p>
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
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                      <CreditCard className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-button">Available Credit</p>
                      <p className="text-2xl font-bold text-slate-100">${totalCredit.toFixed(2)} <span className="text-purple-400 text-lg">💳</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Instructions Input */}
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Tell me about your finances
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-300">Share your income, expenses, or financial goals:</p>
                  <div className="relative">
                    <textarea 
                      value={aiInstruction}
                      onChange={(e) => setAiInstruction(e.target.value)}
                      placeholder="E.g., I make $800/month from my part-time job, my rent is $500..."
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

              {/* Connected Accounts */}
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2">
                    <Building className="w-5 h-5 text-cyan-400" />
                    Financial Accounts
                  </h2>
                  <a 
                    href="/transactions" 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1"
                  >
                    Manage accounts
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div key={account.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors">
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {account.logo ? (
                            <img src={account.logo} alt={account.institution} className="w-8 h-8 rounded-lg bg-white p-1" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center">
                              <Wallet className="w-4 h-4 text-slate-300" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium text-slate-200 text-sm">{account.name}</h3>
                            <p className="text-slate-400 text-xs">{account.institution}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-slate-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {account.lastUpdated}
                          </div>
                          <span className={`font-medium ${account.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${Math.abs(account.balance).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-100 font-display mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Recent Transactions
                </h2>
                <div className="overflow-hidden rounded-lg border border-slate-700/50">
                  <div className="border-b border-slate-700/50 p-3 bg-slate-700/30">
                    <div className="grid grid-cols-12 text-sm font-medium text-slate-400">
                      <div className="col-span-3">Date</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2 text-right">Amount</div>
                    </div>
                  </div>
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border-b border-slate-700/30 p-3 hover:bg-slate-700/20 transition-colors">
                      <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 text-slate-400 text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <div className="col-span-5 text-slate-200">
                          {transaction.description}
                        </div>
                        <div className="col-span-2 text-slate-400 text-sm">
                          {transaction.category}
                        </div>
                        <div className={`col-span-2 text-right font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* User Learning Section */}
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    Financial Profile
                  </h2>
                  <button 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1"
                    onClick={() => setShowAllLearnings(!showAllLearnings)}
                  >
                    {showAllLearnings ? 'Show Less' : 'Show All'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAllLearnings ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                <div className="mb-4 bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
                  <div className="flex items-center gap-2 text-slate-300 mb-2">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <p className="text-sm">Things I've learned about your financial habits:</p>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {visibleLearnings.map((learning) => (
                    <div key={learning.id} className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
                      <div className="flex items-start gap-2">
                        {learning.category === 'spending' && (
                          <DollarSign className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        {learning.category === 'saving' && (
                          <Wallet className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        )}
                        {learning.category === 'goal' && (
                          <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        {learning.category === 'preference' && (
                          <User className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-slate-300 text-sm">{learning.content}</p>
                          <p className="text-xs text-slate-500 mt-1">{learning.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {!showAllLearnings && userLearnings.length > 3 && (
                  <button 
                    className="w-full mt-3 py-2 border border-slate-600 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors text-sm"
                    onClick={() => setShowAllLearnings(true)}
                  >
                    Show {userLearnings.length - 3} more items
                  </button>
                )}
              </div>
              
              

              {/* Top College Expenses */}
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-100 font-display flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-cyan-400" />
                  Top College Expenses
                </h2>
                <div className="space-y-3">
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
                </div>
              </div>
            </div>
          </div>

          {/* Charts - Full Width */}
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
        </>
      )}
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;