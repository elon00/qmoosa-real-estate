import React from 'react';
import type { ConnectedWallet, Currency } from '../types';
import { Building2, Bot, Layers, Network, Wallet, TrendingUp, Cpu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  wallet: ConnectedWallet | null;
  onOpenWalletModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  wallet,
  onOpenWalletModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mini Bar: Caffeine AI & ICP Canister Network */}
        <div className="py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ICP Canister Active (0.8s Finality)
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Caffeine AIware Protocol • Canister <code className="text-cyan-400">rdmx6-jaaaa-aaadq-cai</code>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-amber-400/90 font-medium">
              🇮🇳 Target: Indian Real Estate (RERA & Vastu Verified)
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-mono text-[10px]">
              Reverse Gas: Zero User Fees
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('properties')}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Building2 className="w-5 h-5 text-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-black text-slate-950">
                4
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">QMOOSA</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                  WEB 4.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Indian Properties • Powered by Caffeine AI & ICP
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'properties'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Properties
            </button>

            <button
              onClick={() => setActiveTab('agent-swarm')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'agent-swarm'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Multi-Agent Swarm
            </button>

            <button
              onClick={() => setActiveTab('x402-bazaar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'x402-bazaar'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              x402 Bazaar
            </button>

            <button
              onClick={() => setActiveTab('conway-sim')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'conway-sim'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Conway Automaton
            </button>

            <button
              onClick={() => setActiveTab('caffeine-studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'caffeine-studio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Caffeine AIware Studio
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'portfolio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Escrow & Yields
            </button>
          </nav>

          {/* Currency Switcher & Multi-Wallet Trigger */}
          <div className="flex items-center gap-2">
            
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {(['INR', 'ICP', 'USD', 'ETH'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] font-bold rounded ${
                    currency === c
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c === 'INR' ? '₹ INR' : c}
                </button>
              ))}
            </div>

            {/* Wallet Button */}
            <button
              onClick={onOpenWalletModal}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition shadow-sm ${
                wallet
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white border-transparent'
              }`}
            >
              <Wallet className="w-4 h-4" />
              {wallet ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {wallet.balanceIcp.toFixed(1)} ICP
                </span>
              ) : (
                <span>Connect Multi-Wallet</span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Submenu tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-900 scrollbar-hidden">
          {[
            { id: 'properties', label: 'Properties', icon: Building2 },
            { id: 'agent-swarm', label: 'AI Swarm', icon: Bot },
            { id: 'x402-bazaar', label: 'x402 Bazaar', icon: Network },
            { id: 'conway-sim', label: 'Conway Automaton', icon: Layers },
            { id: 'caffeine-studio', label: 'AIware Studio', icon: Cpu },
            { id: 'portfolio', label: 'Escrow', icon: TrendingUp },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-none flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  activeTab === t.id
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 bg-slate-900'
                }`}
              >
                <Icon className="w-3 h-3" />
                {t.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
