import React, { useState } from 'react';
import type { UserFractionalHolding, ConnectedWallet } from '../types';
import { formatInr } from '../services/caffeineIcp';
import { TrendingUp, Coins, CheckCircle2, Download, RefreshCw } from 'lucide-react';

interface EscrowPortfolioProps {
  holdings: UserFractionalHolding[];
  wallet: ConnectedWallet | null;
  onOpenWalletModal: () => void;
  onClaimYield: (propertyId: string, amountIcp: number) => void;
}

export const EscrowPortfolio: React.FC<EscrowPortfolioProps> = ({
  holdings,
  wallet,
  onOpenWalletModal,
  onClaimYield
}) => {
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  const totalValueInr = holdings.reduce((acc, h) => acc + h.currentValueInr, 0);
  const totalMonthlyYieldInr = holdings.reduce((acc, h) => acc + h.monthlyRentalYieldInr, 0);
  const totalClaimableIcp = holdings.reduce((acc, h) => acc + h.claimableYieldIcp, 0);

  const handleClaim = (propertyId: string, amountIcp: number) => {
    if (!wallet) {
      onOpenWalletModal();
      return;
    }

    setClaimingId(propertyId);
    setTimeout(() => {
      onClaimYield(propertyId, amountIcp);
      setClaimingId(null);
      setClaimSuccess(`Claimed ${amountIcp.toFixed(2)} ICP yield directly to your wallet!`);
      setTimeout(() => setClaimSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Portfolio Metrics Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              My Real Estate Portfolio & Escrow
            </h3>
            <p className="text-xs text-slate-400">
              Fractional ICRC-7 token holdings on Internet Computer Protocol
            </p>
          </div>

          <div className="flex items-center gap-2">
            {wallet ? (
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Connected: {wallet.network}
              </span>
            ) : (
              <button
                onClick={onOpenWalletModal}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Portfolio Valuation</span>
            <span className="text-2xl font-black text-white mt-1 block">
              {formatInr(totalValueInr)}
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
              ≈ {(totalValueInr / 3400).toFixed(1)} ICP
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs text-slate-400 block">Monthly Passive Rental Yield</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              ₹{totalMonthlyYieldInr.toLocaleString('en-IN')}/mo
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Distributed in real-time via Canister
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
            <span className="text-xs text-cyan-300 block">Total Claimable Yield</span>
            <span className="text-2xl font-black text-cyan-300 mt-1 block">
              {totalClaimableIcp.toFixed(2)} ICP
            </span>
            <span className="text-[11px] text-slate-300 block mt-1">
              ≈ {formatInr(totalClaimableIcp * 3400)}
            </span>
          </div>
        </div>
      </div>

      {claimSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{claimSuccess}</span>
        </div>
      )}

      {/* Holdings Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <Coins className="w-4 h-4 text-cyan-400" />
          Fractional Token Assets ({holdings.length})
        </h4>

        <div className="space-y-3">
          {holdings.map((h) => (
            <div
              key={h.propertyId}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm sm:text-base font-bold text-white">{h.propertyTitle}</h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    {h.tokensOwned} Tokens
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Escrow: {h.canisterEscrowId}</span>
                  <span>•</span>
                  <span>Ownership: {((h.tokensOwned / h.totalTokens) * 100).toFixed(2)}%</span>
                </div>
              </div>

              {/* Financial values */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Current Value</span>
                  <span className="font-bold text-white block">{formatInr(h.currentValueInr)}</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Monthly Rent</span>
                  <span className="font-bold text-emerald-400 block">
                    ₹{h.monthlyRentalYieldInr.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-cyan-300 block">Available Dividend</span>
                  <span className="font-bold text-cyan-300 block">{h.claimableYieldIcp} ICP</span>
                </div>
              </div>

              {/* Claim Action */}
              <button
                onClick={() => handleClaim(h.propertyId, h.claimableYieldIcp)}
                disabled={claimingId === h.propertyId || h.claimableYieldIcp <= 0}
                className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition flex-shrink-0"
              >
                {claimingId === h.propertyId ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Claim {h.claimableYieldIcp} ICP Dividend</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
