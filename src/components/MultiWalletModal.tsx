import React, { useState } from 'react';
import type { ConnectedWallet, WalletType } from '../types';
import { CAFFEINE_ICP_CONFIG } from '../services/caffeineIcp';
import { X, CheckCircle, ShieldCheck, Zap, ArrowRight, Smartphone, RefreshCw, Wallet } from 'lucide-react';

interface MultiWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWallet: ConnectedWallet | null;
  onConnectWallet: (wallet: ConnectedWallet) => void;
  onDisconnectWallet: () => void;
  onAddFaucetFunds: (icp: number, inr: number) => void;
}

export const MultiWalletModal: React.FC<MultiWalletModalProps> = ({
  isOpen,
  onClose,
  currentWallet,
  onConnectWallet,
  onDisconnectWallet,
  onAddFaucetFunds
}) => {
  const [connectingType, setConnectingType] = useState<WalletType | null>(null);
  const [upiIdInput, setUpiIdInput] = useState('');
  const [showUpiInput, setShowUpiInput] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (type: WalletType) => {
    if (type === 'upi-crypto-ramp' && !showUpiInput) {
      setShowUpiInput(true);
      return;
    }

    setConnectingType(type);

    setTimeout(() => {
      let mockWallet: ConnectedWallet;

      if (type === 'internet-identity') {
        mockWallet = {
          type: 'internet-identity',
          address: 'rdmx6-qmoosa-478a2-cai',
          principalId: 'qms9-2km7p-v489w-y82x1-cai',
          balanceIcp: 142.50,
          balanceEth: 1.25,
          balanceInr: 484500,
          network: 'ICP Mainnet (Caffeine Canister)'
        };
      } else if (type === 'plug') {
        mockWallet = {
          type: 'plug',
          address: 'plug-0x78a48b9c1d2e',
          principalId: 'plug-icp-88bfe-392ac',
          balanceIcp: 88.40,
          balanceEth: 0.8,
          balanceInr: 300560,
          network: 'ICP Canister Network'
        };
      } else if (type === 'bitfinity') {
        mockWallet = {
          type: 'bitfinity',
          address: '0x99aF...412B',
          principalId: 'bitfinity-icp-00293',
          balanceIcp: 45.20,
          balanceEth: 0.5,
          balanceInr: 153680,
          network: 'Bitfinity EVM / ICP'
        };
      } else if (type === 'metamask') {
        mockWallet = {
          type: 'metamask',
          address: '0x71C...B49f',
          balanceIcp: 30.00,
          balanceEth: 2.85,
          balanceInr: 712500,
          network: 'Ethereum Mainnet'
        };
      } else if (type === 'phantom') {
        mockWallet = {
          type: 'phantom',
          address: 'Sol8A...9Kx',
          balanceIcp: 18.00,
          balanceEth: 0.3,
          balanceInr: 135000,
          network: 'Solana SVM'
        };
      } else {
        // UPI Instant Ramp
        const finalUpi = upiIdInput.trim() || 'user@okhdfcbank';
        mockWallet = {
          type: 'upi-crypto-ramp',
          address: `UPI: ${finalUpi}`,
          principalId: 'icp-upi-escrow-bridge-v4',
          balanceIcp: 50.00,
          balanceEth: 0.68,
          balanceInr: 170000,
          network: 'Indian UPI ⇄ ICP Escrow Rail'
        };
      }

      onConnectWallet(mockWallet);
      setConnectingType(null);
      setShowUpiInput(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Qmoosa Multi-Wallet Connector</h3>
              <p className="text-xs text-slate-400">Powered by Caffeine AI & ICP Canister Protocol</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Wallet status if connected */}
        {currentWallet ? (
          <div className="my-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Wallet Connected</span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-mono">
                {currentWallet.network}
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-slate-950/60 rounded-lg">
                <span className="text-slate-400 block">Identifier / Principal</span>
                <span className="text-white font-mono truncate block" title={currentWallet.principalId || currentWallet.address}>
                  {currentWallet.principalId ? `${currentWallet.principalId.slice(0, 14)}...` : currentWallet.address}
                </span>
              </div>
              <div className="p-2 bg-slate-950/60 rounded-lg">
                <span className="text-slate-400 block">Available Balances</span>
                <span className="text-cyan-300 font-bold block">{currentWallet.balanceIcp.toFixed(2)} ICP</span>
                <span className="text-slate-300 block">₹{currentWallet.balanceInr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Test Faucet & Disconnect */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onAddFaucetFunds(25, 85000)}
                className="flex-1 py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Zap className="w-3.5 h-3.5" />
                Claim Test Faucet (+25 ICP / ₹85k)
              </button>
              <button
                onClick={() => {
                  onDisconnectWallet();
                  onClose();
                }}
                className="py-2 px-3 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-semibold transition"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="my-4 space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect via Internet Computer (ICP) native identity, EVM wallets, or instant Indian UPI bridge. Canister reverse-gas cycle ensures 0 gas fees for all users.
            </p>

            {/* ICP Wallets Section */}
            <div>
              <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Native ICP & Caffeine AI Protocol
              </div>
              
              <div className="space-y-2">
                {/* Internet Identity */}
                <button
                  onClick={() => handleConnect('internet-identity')}
                  disabled={connectingType !== null}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/80 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                      II
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white group-hover:text-cyan-300 flex items-center gap-2">
                        Internet Identity
                        <span className="text-[10px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">Caffeine AI Default</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Passkey / Biometric login on Canister {CAFFEINE_ICP_CONFIG.iiCanisterId.slice(0, 10)}...</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                </button>

                {/* Plug Wallet */}
                <button
                  onClick={() => handleConnect('plug')}
                  disabled={connectingType !== null}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-600 rounded-xl transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                      PLUG
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">Plug Wallet</div>
                      <div className="text-[11px] text-slate-400">ICP tokens, ICRC-1 / ICRC-7 Real Estate NFTs</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </button>

                {/* Bitfinity Wallet */}
                <button
                  onClick={() => handleConnect('bitfinity')}
                  disabled={connectingType !== null}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-600 rounded-xl transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-bold text-purple-400 text-xs">
                      BIT
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">Bitfinity Wallet</div>
                      <div className="text-[11px] text-slate-400">EVM compatibility on Internet Computer</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>

            {/* EVM & Multichain */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                EVM & Cross-Chain Wallets
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleConnect('metamask')}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-800/80 hover:bg-slate-700/60 border border-slate-700 rounded-xl transition text-left"
                >
                  <div className="w-7 h-7 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">🦊</div>
                  <div>
                    <div className="font-medium text-xs text-white">MetaMask</div>
                    <div className="text-[10px] text-slate-400">Ethereum / Polygon</div>
                  </div>
                </button>
                <button
                  onClick={() => handleConnect('phantom')}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-800/80 hover:bg-slate-700/60 border border-slate-700 rounded-xl transition text-left"
                >
                  <div className="w-7 h-7 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">👻</div>
                  <div>
                    <div className="font-medium text-xs text-white">Phantom</div>
                    <div className="text-[10px] text-slate-400">Solana SVM</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Indian Customers Instant UPI On-Ramp */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                Indian Banking & UPI Instant On-Ramp
              </div>

              {!showUpiInput ? (
                <button
                  onClick={() => setShowUpiInput(true)}
                  className="w-full flex items-center justify-between p-3 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 rounded-xl transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400 text-xs">
                      UPI
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white group-hover:text-amber-300">
                        Pay via UPI / GPay / PhonePe / Paytm
                      </div>
                      <div className="text-[11px] text-slate-400">Instant INR to ICP Canister Escrow Bridge</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>
              ) : (
                <div className="p-3 bg-slate-950 border border-amber-500/40 rounded-xl space-y-2.5">
                  <label className="text-xs text-amber-300 block font-medium">Enter your VPA / UPI ID:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleConnect('upi-crypto-ramp')}
                      disabled={connectingType !== null}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
                    >
                      Verify & Connect
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Compliant with RBI digital payment guidelines & 1% TDS smart contract withholding mirror.
                  </p>
                </div>
              )}
            </div>

            {connectingType && (
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center gap-2.5 text-xs text-cyan-300">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                Authorizing {connectingType} through ICP Subnet Canister...
              </div>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Reverse Gas Model: 0 Cycles Charged to User</span>
          <span>DFINITY / Caffeine AI Compatible</span>
        </div>

      </div>
    </div>
  );
};
