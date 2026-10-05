import React, { useState } from 'react';
import type { Property, Currency, ConnectedWallet } from '../types';
import { formatInr, formatIcp, calculateStampDutyAndReg } from '../services/caffeineIcp';
import { 
  X, ShieldCheck, Compass, FileText, CheckCircle2, 
  Coins, Sparkles, Building, Lock
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: Currency;
  wallet: ConnectedWallet | null;
  onClose: () => void;
  onOpenWalletModal: () => void;
  onOpenBazaar: (property: Property) => void;
  onPurchaseTokens: (property: Property, tokenCount: number, costIcp: number, costInr: number) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  wallet,
  onClose,
  onOpenWalletModal,
  onOpenBazaar,
  onPurchaseTokens
}) => {
  const [tokenCount, setTokenCount] = useState<number>(5);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'legal' | 'fractional' | 'stampDuty'>('overview');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  if (!property) return null;

  const stampDutyInfo = calculateStampDutyAndReg(property.priceInr, property.city);
  const totalFractionalCostInr = tokenCount * property.tokenPriceInr;
  const totalFractionalCostIcp = tokenCount * property.tokenPriceIcp;
  const monthlyRentalYieldInr = Math.round((totalFractionalCostInr * (property.annualYieldPercent / 100)) / 12);

  const handleBuyTokens = () => {
    if (!wallet) {
      onOpenWalletModal();
      return;
    }
    onPurchaseTokens(property, tokenCount, totalFractionalCostIcp, totalFractionalCostInr);
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Top Header / Modal Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-wider border border-cyan-500/30">
                {property.city}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Canister ID: {property.canisterId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {property.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Property Overview' },
            { id: 'legal', label: 'RERA & 7/12 Legal Dossier' },
            { id: 'fractional', label: 'Fractional Tokens (ICRC-7)' },
            { id: 'stampDuty', label: 'Stamp Duty AI Calculator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-3 px-2 border-b-2 font-semibold whitespace-nowrap transition ${
                selectedTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Main Image + Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex md:flex-col gap-3">
                  {property.gallery.slice(0, 2).map((img, i) => (
                    <div key={i} className="flex-1 h-32 rounded-xl overflow-hidden border border-slate-800">
                      <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Primary Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Total Purchase Price (INR)</div>
                  <div className="text-2xl font-black text-cyan-300">{formatInr(property.priceInr)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Crypto Denomination (ICP / ETH)</div>
                  <div className="text-2xl font-black text-white">{formatIcp(property.priceIcp)}</div>
                  <div className="text-xs text-slate-400">≈ Ξ {property.priceEth.toFixed(2)} ETH</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Builder & Handover</div>
                  <div className="text-base font-bold text-slate-200">{property.builder}</div>
                  <div className="text-xs text-slate-400">Completion: {property.completionYear}</div>
                </div>
              </div>

              {/* Highlights & Features */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-cyan-400" />
                  Key Infrastructure & Automation Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Bar inside Overview */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedTab('fractional')}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition"
                >
                  <Coins className="w-4 h-4" />
                  Buy Fractional Ownership Tokens
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBazaar(property);
                  }}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Launch x402 AI Negotiation
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: LEGAL & RERA & 7/12 DOSSIER */}
          {selectedTab === 'legal' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">
                    Indian Legal & Regulatory Due Diligence Verified
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    This property has passed autonomous title validation by Agent Vikram on the official {property.reraState} blockchain registry. Title deeds and revenue extracts are recorded with tamper-proof cryptographic proofs on ICP canisters.
                  </p>
                </div>
              </div>

              {/* Legal Verification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-semibold uppercase">RERA Registration Authority</div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    {property.reraState}
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">APPROVED</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    ID: {property.reraId}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Title free from litigation; escrow project bank account verified under Section 4(2)(l)(D).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Revenue & Land Record (7/12 / Khata)</div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    {property.landExtractStatus}
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">MUTATION DONE</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Encumbrance: {property.encumbranceStatus}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Searched 30 years sub-registrar index II records with zero mortgage or pending lis pendens.
                  </p>
                </div>

                {/* Vastu Shastra Analysis */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-amber-400 font-bold uppercase flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-400" />
                      Vastu Shastra Orientation Audit
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black">
                      {property.vastuScore}% COMPLIANT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {property.vastuHighlights.map((v, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: FRACTIONAL TOKENS */}
          {selectedTab === 'fractional' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <Coins className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">
                    Fractional Real Estate On-Chain via ICP ICRC-7 Canister
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Every token represents legally binding fractional co-ownership managed by an SPV (Special Purpose Vehicle) registered in India. Dividends are paid monthly into your connected multi-wallet.
                  </p>
                </div>
              </div>

              {/* Slider for Tokens */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Select Number of Fractional Tokens:</span>
                  <span className="text-xl font-black text-cyan-400 px-3 py-1 bg-cyan-950/80 rounded-xl border border-cyan-500/40">
                    {tokenCount} Tokens
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="50"
                  value={tokenCount}
                  onChange={(e) => setTokenCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Total Investment (INR)</span>
                    <span className="text-lg font-black text-white mt-1 block">
                      {formatInr(totalFractionalCostInr)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Total Investment (ICP)</span>
                    <span className="text-lg font-black text-cyan-300 mt-1 block">
                      {totalFractionalCostIcp.toFixed(2)} ICP
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                    <span className="text-emerald-300 block">Projected Monthly Yield</span>
                    <span className="text-lg font-black text-emerald-400 mt-1 block">
                      ₹{monthlyRentalYieldInr.toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-[10px] text-emerald-300/80">{property.annualYieldPercent}% APY</span>
                  </div>
                </div>
              </div>

              {/* Wallet Execution */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Payment Escrow Rail</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2 mt-0.5">
                    {wallet ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{wallet.network} ({wallet.address.slice(0, 10)}...)</span>
                      </>
                    ) : (
                      <span className="text-amber-400">No Multi-Wallet Connected</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleBuyTokens}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition"
                >
                  <Lock className="w-4 h-4" />
                  {wallet ? `Mint ${tokenCount} Tokens (${totalFractionalCostIcp.toFixed(2)} ICP)` : 'Connect Multi-Wallet to Mint'}
                </button>
              </div>

              {purchaseSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Purchase Confirmed on ICP Canister!</span>
                    <span>{tokenCount} ICRC-7 tokens credited to your wallet. Escrow contract activated.</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: STAMP DUTY AI CALCULATOR */}
          {selectedTab === 'stampDuty' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Indian State Registration & Stamp Duty Breakdown
                  </h4>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                    State: {property.city}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Stamp Duty Rate</span>
                    <span className="text-sm font-bold text-white mt-1 block">{stampDutyInfo.stampDutyRate}</span>
                    <span className="text-cyan-400 font-mono mt-1 block">{formatInr(stampDutyInfo.stampDutyAmount)}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Registration Surcharge</span>
                    <span className="text-sm font-bold text-white mt-1 block">{stampDutyInfo.registrationFeeRate}</span>
                    <span className="text-cyan-400 font-mono mt-1 block">{formatInr(stampDutyInfo.registrationAmount)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Statutory Government Outflow</span>
                    <span className="text-xl font-black text-amber-300 block">
                      {formatInr(stampDutyInfo.totalGovtCharges)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Equivalent in ICP</span>
                    <span className="text-sm font-bold text-white block">
                      {(stampDutyInfo.totalGovtCharges / 3400).toFixed(2)} ICP
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Note: Fractional token investors are exempt from direct stamp duty registration since legal ownership is vested within the Qmoosa SPV Canister, drastically lowering entry friction for retail Indian investors!
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
