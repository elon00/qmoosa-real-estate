import React from 'react';
import { X, Building2, ShieldCheck, Zap, Sparkles, Network, Layers, Coins, ExternalLink } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">About Qmoosa Protocol</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  Web 4.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Autonomous Indian Real Estate on Caffeine.ai & Internet Computer Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300">
          
          {/* Mission Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 border border-cyan-500/30 space-y-2">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Manifesto
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Democratizing India’s \$1 Trillion Real Estate Asset Class
            </h4>
            <p className="leading-relaxed text-slate-300">
              Traditional Indian real estate transactions are burdened by 2%–3% opaque brokerage fees, lengthy title-search delays, and prohibitive capital requirements. Qmoosa replaces human intermediaries with an autonomous, mathematically verified protocol powered by <strong>Caffeine AI</strong> and <strong>ICP Canisters</strong>.
            </p>
          </div>

          {/* Comparison Matrix */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Traditional Indian Brokerage vs. Qmoosa Web 4.0
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase font-semibold">
                    <th className="p-3">Feature</th>
                    <th className="p-3">Traditional Real Estate</th>
                    <th className="p-3 text-cyan-300">Qmoosa Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                  <tr>
                    <td className="p-3 font-semibold text-white">Brokerage Commission</td>
                    <td className="p-3 text-rose-300">2% – 3% + GST</td>
                    <td className="p-3 text-emerald-400 font-bold">0% (Autonomous x402 Canister)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Blockchain Gas Fee</td>
                    <td className="p-3 text-slate-400">High on EVM chains</td>
                    <td className="p-3 text-emerald-400 font-bold">₹0 (ICP Reverse-Gas Cycle Model)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Minimum Ticket Size</td>
                    <td className="p-3 text-slate-400">₹50 Lakhs to ₹15+ Cr</td>
                    <td className="p-3 text-cyan-300 font-bold">₹5,000 / 1.5 ICP (Fractional ICRC-7)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Legal Verification</td>
                    <td className="p-3 text-slate-400">3–4 weeks manual registry search</td>
                    <td className="p-3 text-white font-medium">Instant Adv. Vikram AI (MahaRERA + 7/12)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Payment Rails</td>
                    <td className="p-3 text-slate-400">RTGS, Cheques, lengthy loans</td>
                    <td className="p-3 text-white font-medium">Multi-Wallet (Internet ID, Plug, UPI Instant)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The 6 Technological Pillars Grid */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">
              The 6 Technological Pillars
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Caffeine AI & ICP Canisters</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Runs directly on Internet Computer subnets with 0.8s finality and cycle-subsidized execution.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RERA & 7/12 Legal Rigor</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  MahaRERA, K-RERA, and 30-year Nil Encumbrance Certificates mapped directly to cryptographic hashes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <Network className="w-4 h-4" />
                  <span>x402 Bazaar Protocol</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  HTTP 402 machine-to-machine bidding with 5% refundable collateral locked in canister escrow.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>Conway Cellular Automaton</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  2D generative cellular grid modeling transit-oriented growth and projected 3-year CAGR appreciation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Coins className="w-4 h-4" />
                  <span>Multi-Wallet & Indian UPI</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Support for Internet Identity, Plug, MetaMask, Phantom, and Indian UPI instant on-ramp.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-pink-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Multi-Agent Swarm</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Maya (Vastu), Adv. Vikram (RERA), Kuber (Escrow), and Conway (Cellular AI) collaborating in real time.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Official Repo:</span>
            <a
              href="https://github.com/elon00/qmoosa-real-estate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
            >
              github.com/elon00/qmoosa-real-estate <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
