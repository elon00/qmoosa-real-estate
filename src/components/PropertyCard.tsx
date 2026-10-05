import React from 'react';
import type { Property, Currency } from '../types';
import { formatInr, formatIcp } from '../services/caffeineIcp';
import { ShieldCheck, Compass, Train, Coins, Sparkles, ArrowUpRight, Bed, Maximize } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  onOpenBazaarForProperty: (property: Property) => void;
  onAskAgentAboutProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  onSelectProperty,
  onOpenBazaarForProperty,
  onAskAgentAboutProperty,
}) => {
  const renderPrice = () => {
    switch (currency) {
      case 'ICP':
        return formatIcp(property.priceIcp);
      case 'ETH':
        return `Ξ ${property.priceEth.toFixed(2)} ETH`;
      case 'USD':
        return `$${((property.priceInr) / 84.5).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      case 'INR':
      default:
        return formatInr(property.priceInr);
    }
  };

  const renderSecondaryPrice = () => {
    if (currency === 'INR') {
      return formatIcp(property.priceIcp);
    }
    return formatInr(property.priceInr);
  };

  const soldPercent = Math.round((property.tokensSold / property.tokenSupply) * 100);

  return (
    <div className="glass-panel glass-card-hover rounded-2xl overflow-hidden flex flex-col border border-slate-800/80 bg-slate-900/60 text-slate-100">
      
      {/* Property Image & Badges */}
      <div className="relative h-56 w-full overflow-hidden group">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* RERA Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{property.reraState}</span>
            <span className="text-[10px] text-emerald-200/70 font-mono">#{property.reraId.slice(0, 10)}</span>
          </div>

          {/* Vastu Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{property.vastuScore}% Vastu</span>
          </div>
        </div>

        {/* City and Title overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {property.city}
            </span>
            <span className="text-xs text-slate-300 truncate">
              {property.locality}
            </span>
          </div>
          <h4 className="text-base font-bold text-white leading-snug truncate">
            {property.title}
          </h4>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Dimensions & Specs */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center text-xs">
          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40">
            <div className="flex items-center gap-1 text-slate-400">
              <Bed className="w-3.5 h-3.5" />
              <span>BHK</span>
            </div>
            <span className="font-bold text-white mt-0.5">{property.bedrooms} BHK</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40">
            <div className="flex items-center gap-1 text-slate-400">
              <Maximize className="w-3.5 h-3.5" />
              <span>Carpet</span>
            </div>
            <span className="font-bold text-white mt-0.5">{property.carpetAreaSqFt} sq.ft</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-950/40">
            <div className="flex items-center gap-1 text-slate-400">
              <Train className="w-3.5 h-3.5" />
              <span>Metro</span>
            </div>
            <span className="font-bold text-white mt-0.5">{property.metroDistanceKm} km</span>
          </div>
        </div>

        {/* Pricing Matrix */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Total Valuation</div>
            <div className="text-xl font-black text-cyan-300">
              {renderPrice()}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              ≈ {renderSecondaryPrice()}
            </div>
          </div>

          {/* Land Extract Status Badge */}
          <div className="text-right">
            <span className="inline-block px-2 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">
              {property.landExtractStatus}
            </span>
            <div className="text-[10px] text-slate-400 mt-1">
              {property.encumbranceStatus}
            </div>
          </div>
        </div>

        {/* Fractional Tokenization Box */}
        {property.isFractionalAllowed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-950 to-cyan-950/30 border border-cyan-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                <Coins className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fractional ICP Token (ICRC-7)</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {property.annualYieldPercent}% APY Yield
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>Token: {formatInr(property.tokenPriceInr)} / {property.tokenPriceIcp} ICP</span>
              <span className="text-slate-400">{soldPercent}% Minted</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                style={{ width: `${soldPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="w-full py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 transition"
          >
            <span>Inspect & Buy</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenBazaarForProperty(property)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <span>x402 AI Bid</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Ask Swarm Agent Button */}
        <button
          onClick={() => onAskAgentAboutProperty(property)}
          className="w-full text-center text-[11px] text-slate-400 hover:text-cyan-400 transition"
        >
          Ask AI Swarm about RERA, Vastu & Stamp Duty →
        </button>

      </div>
    </div>
  );
};
