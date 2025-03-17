import React, { useState } from 'react';
import { Upload, FileText, Plus, Building, Check, X, Wallet, Trash2, RefreshCw, ExternalLink } from 'lucide-react';

type BankAccount = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  institution: string;
  logo: string;
  lastUpdated: string;
  connected: boolean;
};

const Transactions = () => {
  const [activeTab, setActiveTab] = useState<'accounts' | 'upload'>('accounts');
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [refreshingAccount, setRefreshingAccount] = useState<string | null>(null);

  // Sample data
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Student Checking',
      type: 'checking',
      balance: 1246.78,
      institution: 'Chase Bank',
      logo: 'https://logo.clearbit.com/chase.com',
      lastUpdated: '2 hours ago',
      connected: true
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'savings',
      balance: 3520.45,
      institution: 'Bank of America',
      logo: 'https://logo.clearbit.com/bankofamerica.com',
      lastUpdated: '1 day ago',
      connected: true
    },
    {
      id: '3',
      name: 'Student Credit Card',
      type: 'credit',
      balance: -450.21,
      institution: 'Discover',
      logo: 'https://logo.clearbit.com/discover.com',
      lastUpdated: '3 hours ago',
      connected: true
    }
  ]);

  const popularBanks = [
    { id: 'chase', name: 'Chase', logo: 'https://logo.clearbit.com/chase.com' },
    { id: 'bofa', name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
    { id: 'wells', name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
    { id: 'citi', name: 'Citibank', logo: 'https://logo.clearbit.com/citi.com' },
    { id: 'capital', name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
    { id: 'discover', name: 'Discover', logo: 'https://logo.clearbit.com/discover.com' }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add a new "account" for the uploaded statement
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      name: `Imported Statement (${file.name})`,
      type: 'checking',
      balance: 1325.67, // Sample balance
      institution: 'Uploaded Statement',
      logo: '',
      lastUpdated: 'Just now',
      connected: false
    };
    
    setAccounts([...accounts, newAccount]);
    setFile(null);
    setUploading(false);
    setActiveTab('accounts'); // Switch to accounts tab after upload
  };

  const connectBank = (bankId: string) => {
    setSelectedBank(bankId);
    // In a real app, this would open an OAuth flow to the bank
    setTimeout(() => {
      const bank = popularBanks.find(b => b.id === bankId);
      if (bank) {
        const newAccount: BankAccount = {
          id: Date.now().toString(),
          name: `${bank.name} Account`,
          type: 'checking',
          balance: 1500 + Math.random() * 1000,
          institution: bank.name,
          logo: bank.logo,
          lastUpdated: 'Just now',
          connected: true
        };
        setAccounts([...accounts, newAccount]);
      }
      setSelectedBank(null);
      setShowConnectModal(false);
    }, 2000);
  };

  const refreshAccount = (accountId: string) => {
    setRefreshingAccount(accountId);
    setTimeout(() => {
      setAccounts(accounts.map(account => 
        account.id === accountId 
          ? {...account, lastUpdated: 'Just now'} 
          : account
      ));
      setRefreshingAccount(null);
    }, 1500);
  };

  const disconnectAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100 font-display">Manage Financial Accounts</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowConnectModal(true)}
            className="bg-slate-700 hover:bg-slate-600 text-cyan-400 py-2 px-4 rounded-lg flex items-center gap-2 transition-colors font-button shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Account</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700/50 flex">
        <button
          className={`py-3 px-6 font-button transition-colors ${
            activeTab === 'accounts'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => setActiveTab('accounts')}
        >
          <span className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Connected Accounts
          </span>
        </button>
        <button
          className={`py-3 px-6 font-button transition-colors ${
            activeTab === 'upload'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Statements
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            {accounts.length === 0 ? (
              <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 shadow-lg text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-full">
                    <Building className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-display text-slate-200">No Accounts Connected</h3>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Connect your bank accounts to automatically import transactions and track your spending habits.
                  </p>
                  <button 
                    onClick={() => setShowConnectModal(true)}
                    className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 font-button"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Connect Your First Account</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {accounts.map((account) => (
                  <div key={account.id} className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg hover:border-slate-600 transition-all overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {account.logo ? (
                          <img src={account.logo} alt={account.institution} className="w-10 h-10 rounded-lg bg-white p-1" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-slate-200">{account.name}</h3>
                          <p className="text-slate-400 text-sm">{account.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => refreshAccount(account.id)}
                          className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-700/50"
                          disabled={refreshingAccount === account.id}
                        >
                          <RefreshCw className={`w-4 h-4 ${refreshingAccount === account.id ? 'animate-spin' : ''}`} />
                        </button>
                        <button 
                          onClick={() => disconnectAccount(account.id)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-slate-700/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-slate-700/50 p-4 flex items-center justify-between">
                      <p className="text-sm text-slate-400">
                        Last updated: {account.lastUpdated}
                      </p>
                      <span className={`font-medium ${account.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${Math.abs(account.balance).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-lg">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-600 hover:border-cyan-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-slate-700/50 rounded-full">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-200">
                    Drop your bank statement here
                  </p>
                  <p className="text-slate-400 mt-1">
                    or click to select a file from your computer
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".csv,.pdf,.ofx,.qfx"
                />
                <label
                  htmlFor="fileInput"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer font-button"
                >
                  Select File
                </label>
              </div>
            </div>

            {file && (
              <div className="mt-6">
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <FileText className="w-6 h-6 text-slate-300" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-200">{file.name}</p>
                    <p className="text-sm text-slate-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 font-button flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-slate-700/50 pt-6">
              <h3 className="text-lg font-semibold text-slate-100 font-display mb-3 flex items-center gap-2">
                Supported Formats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">CSV Files</p>
                    <p className="text-sm text-slate-400">Comma-separated values from most banks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">PDF Statements</p>
                    <p className="text-sm text-slate-400">PDF bank statements (text must be extractable)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">OFX/QFX Files</p>
                    <p className="text-sm text-slate-400">Open Financial Exchange format</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">Bank Exports</p>
                    <p className="text-sm text-slate-400">Exports from most major banks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connect Bank Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl max-w-2xl w-full animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-100 font-display">Connect Your Bank</h3>
              <button onClick={() => setShowConnectModal(false)} className="text-slate-400 hover:text-red-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-slate-300 mb-6">
              Connect your accounts to automatically import and categorize your transactions.
              Your login credentials are securely encrypted and never stored on our servers.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {popularBanks.map(bank => (
                <button
                  key={bank.id}
                  onClick={() => connectBank(bank.id)}
                  disabled={selectedBank === bank.id}
                  className={`p-4 bg-slate-700/50 rounded-lg flex flex-col items-center gap-3 transition-all hover:bg-slate-700 hover:shadow-md ${selectedBank === bank.id ? 'bg-slate-700 border border-cyan-500/50' : 'border border-transparent'}`}
                >
                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                    <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain" />
                  </div>
                  <span className="text-slate-200 text-sm font-medium">{bank.name}</span>
                  {selectedBank === bank.id && (
                    <div className="flex items-center gap-2 text-xs text-cyan-400">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Connecting...</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 border-t border-slate-700/50 pt-4">
              <ExternalLink className="w-5 h-5 text-slate-400" />
              <p className="text-sm text-slate-400">
                Connections are secured via bank-level encryption and use read-only access.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;