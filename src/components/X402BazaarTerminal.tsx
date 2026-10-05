import React, { useState } from 'react';
import type { Property, ConnectedWallet, X402Bid } from '../types';
import { formatInr, formatIcp } from '../services/caffeineIcp';
import { Network, Zap, RefreshCw, Lock, Sparkles, Bot } from 'lucide-react';

interface X402BazaarTerminalProps {
  properties: Property[];
  wallet: ConnectedWallet | null;
  onOpenWalletModal: () => void;
  preselectedProperty?: Property | null;
}

export const X402BazaarTerminal: React.FC<X402BazaarTerminalProps> = ({
  properties,
  wallet,
  onOpenWalletModal,
  preselectedProperty
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    preselectedProperty?.id || properties[0]?.id || ''
  );
  const [bidAmountIcp, setBidAmountIcp] = useState<number>(50000);
  const [isSubmittingBid, setIsSubmittingBid] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const [bids, setBids] = useState<X402Bid[]>([
    {
      id: 'x402-bid-01',
      propertyId: 'prop-mum-01',
      propertyName: 'The Sea Crest Grand Skyline (Bandra West)',
      bidderAddress: 'plug-0x78a48b9c1d2e',
      bidderAgent: 'Kuber AI Agent',
      amountIcp: 52000,
      amountInr: 176800000,
      timestamp: '2 mins ago',
      status: 'COUNTER_OFFER',
      collateralLockedIcp: 2600,
      counterPriceIcp: 53500,
      counterPriceInr: 181900000,
      aiNegotiationNote: 'Seller AI evaluated buyer credential (MahaRERA escrow verified). Counter-offered at 53,500 ICP.'
    },
    {
      id: 'x402-bid-02',
      propertyId: 'prop-blr-02',
      propertyName: 'Nandi Silicon Cyber Oasis (Indiranagar)',
      bidderAddress: 'rdmx6-qmoosa-478a2-cai',
      bidderAgent: 'Maya Discovery Agent',
      amountIcp: 22500,
      amountInr: 76500000,
      timestamp: '14 mins ago',
      status: 'ACCEPTED',
      collateralLockedIcp: 1125,
      aiNegotiationNote: 'Bid within 2% margin. Seller Agent accepted. Awaiting final canister deed signature.'
    },
    {
      id: 'x402-bid-03',
      propertyId: 'prop-del-03',
      propertyName: 'DLF Golf Drive Zenith Penthouse',
      bidderAddress: '0x71C...B49f',
      bidderAgent: 'Automated x402 Proxy',
      amountIcp: 26200,
      amountInr: 89080000,
      timestamp: '45 mins ago',
      status: 'SETTLED_ON_ICP',
      collateralLockedIcp: 1310,
      aiNegotiationNote: 'Full atomic settlement complete on ICP Subnet. Title registered to buyer principal.'
    }
  ]);

  const handlePlaceBid = () => {
    if (!wallet) {
      onOpenWalletModal();
      return;
    }

    if (!selectedProperty) return;

    setIsSubmittingBid(true);
    setStatusMessage('Broadcasting HTTP 402 Machine-to-Machine packet on ICP Canister...');

    setTimeout(() => {
      const bidInr = bidAmountIcp * 3400;
      const collateral = bidAmountIcp * 0.05; // 5% collateral

      // Determine counter offer or accept based on margin
      const reserve = selectedProperty.priceIcp;
      const discount = (reserve - bidAmountIcp) / reserve;

      let newStatus: X402Bid['status'] = 'COUNTER_OFFER';
      let note = '';
      let counterIcp: number | undefined = undefined;

      if (discount <= 0.03) {
        newStatus = 'ACCEPTED';
        note = 'Bid accepted! Within 3% of reserve. Seller agent triggered escrow contract preparation.';
      } else if (discount <= 0.08) {
        newStatus = 'COUNTER_OFFER';
        counterIcp = Math.round(reserve * 0.96);
        note = `Seller agent countered at ${counterIcp} ICP (₹${((counterIcp * 3400) / 10000000).toFixed(2)} Cr).`;
      } else {
        newStatus = 'COUNTER_OFFER';
        counterIcp = Math.round(reserve * 0.98);
        note = `Discount too steep. Seller AI counter-offered ${counterIcp} ICP.`;
      }

      const newBid: X402Bid = {
        id: `x402-bid-${Date.now()}`,
        propertyId: selectedProperty.id,
        propertyName: selectedProperty.title,
        bidderAddress: wallet.principalId || wallet.address,
        bidderAgent: 'User Directed Agent Proxy',
        amountIcp: bidAmountIcp,
        amountInr: bidInr,
        timestamp: 'Just now',
        status: newStatus,
        collateralLockedIcp: collateral,
        counterPriceIcp: counterIcp,
        counterPriceInr: counterIcp ? counterIcp * 3400 : undefined,
        aiNegotiationNote: note
      };

      setBids((prev) => [newBid, ...prev]);
      setIsSubmittingBid(false);
      setStatusMessage('Bid logged and negotiated by autonomous agent!');
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner / Explanation */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <Network className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-white">x402 Bazaar Protocol (Web 4.0)</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              HTTP 402 Autonomous
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Eliminating traditional real-estate brokerage fees. Autonomous buyer and seller agents negotiate property deals in real time over the HTTP 402 standard, locking refundable micro-collateral in ICP Canister escrows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Canister Subnet</span>
            <span className="text-xs font-mono text-cyan-300 block">x402-bazaar-qms-cai</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Gas Overhead</span>
            <span className="text-xs font-black text-emerald-400">0 Cycles Charged</span>
          </div>
        </div>
      </div>

      {/* Grid: Live Bidding Terminal + Active Negotiation Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form: Submit x402 Bid (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Configure Autonomous Bid
            </h4>
            <span className="text-xs text-slate-400">Micro-Collateral: 5%</span>
          </div>

          {/* Property Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Target Indian Property:</label>
            <select
              value={selectedPropertyId}
              onChange={(e) => {
                setSelectedPropertyId(e.target.value);
                const p = properties.find((item) => item.id === e.target.value);
                if (p) setBidAmountIcp(Math.round(p.priceIcp * 0.95));
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.city}) — {formatInr(p.priceInr)}
                </option>
              ))}
            </select>
          </div>

          {/* Target Property Summary */}
          {selectedProperty && (
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Listing Price (Reserve):</span>
                <span className="font-bold text-white">{formatIcp(selectedProperty.priceIcp)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">INR Valuation:</span>
                <span className="font-bold text-cyan-300">{formatInr(selectedProperty.priceInr)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">RERA Registry:</span>
                <span className="font-mono text-emerald-400">{selectedProperty.reraId}</span>
              </div>
            </div>
          )}

          {/* Bid Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-slate-300">Your AI Agent Bid (in ICP):</label>
              <span className="font-mono text-cyan-300 font-bold">
                ≈ {formatInr(bidAmountIcp * 3400)}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                value={bidAmountIcp}
                onChange={(e) => setBidAmountIcp(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base font-bold text-white focus:outline-none focus:border-cyan-400"
              />
              <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">
                ICP
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Required Collateral (5% Escrow):</span>
              <span className="font-bold text-amber-300">{(bidAmountIcp * 0.05).toFixed(2)} ICP</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePlaceBid}
            disabled={isSubmittingBid}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition disabled:opacity-50"
          >
            {isSubmittingBid ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Negotiating with Seller AI Agent...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{wallet ? 'Broadcast x402 Bid & Lock Collateral' : 'Connect Multi-Wallet to Bid'}</span>
              </>
            )}
          </button>

          {statusMessage && (
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="pt-2 text-[11px] text-slate-500 space-y-1">
            <p>• Collateral is 100% refunded if negotiation fails.</p>
            <p>• Machine-negotiated transactions take under 2 seconds on ICP Subnets.</p>
          </div>
        </div>

        {/* Right Feed: Real-Time Bids & Autonomous Counter-Offers (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                Live x402 Autonomous Order Book
              </h4>
              <p className="text-[11px] text-slate-400">Direct Canister Stream</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              3 Active Negotiations
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1">
            {bids.map((bid) => {
              const isAccepted = bid.status === 'ACCEPTED';
              const isSettled = bid.status === 'SETTLED_ON_ICP';

              return (
                <div
                  key={bid.id}
                  className={`p-4 rounded-2xl border transition ${
                    isSettled
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isAccepted
                      ? 'bg-cyan-950/20 border-cyan-500/40'
                      : 'bg-slate-950/70 border-slate-800'
                  }`}
                >
                  {/* Top Bar of Bid Item */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white">{bid.propertyName}</h5>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Bidder: {bid.bidderAddress.slice(0, 14)}... ({bid.bidderAgent})
                      </span>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isSettled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isAccepted
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {bid.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Bid Metrics */}
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Bid Amount</span>
                      <span className="font-black text-cyan-300 block">{formatIcp(bid.amountIcp)}</span>
                      <span className="text-[10px] text-slate-500">{formatInr(bid.amountInr)}</span>
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Locked Collateral</span>
                      <span className="font-bold text-amber-300 block">{bid.collateralLockedIcp} ICP</span>
                      <span className="text-[10px] text-slate-500">In Canister Escrow</span>
                    </div>

                    {bid.counterPriceIcp && (
                      <div className="p-2 bg-slate-900 rounded-lg col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-amber-400 block">AI Counter-Offer</span>
                        <span className="font-black text-white block">{formatIcp(bid.counterPriceIcp)}</span>
                        <span className="text-[10px] text-slate-500">Seller Agent Quote</span>
                      </div>
                    )}
                  </div>

                  {/* AI Note */}
                  <div className="mt-2.5 p-2 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{bid.aiNegotiationNote}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
