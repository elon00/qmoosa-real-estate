import { useState } from 'react';
import type { Property, Currency, ConnectedWallet, UserFractionalHolding } from './types';
import { INDIAN_PROPERTIES, INITIAL_HOLDINGS } from './data/properties';
import { Header } from './components/Header';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MultiWalletModal } from './components/MultiWalletModal';
import { AboutModal } from './components/AboutModal';
import { MultiAgentChat } from './components/MultiAgentChat';
import { X402BazaarTerminal } from './components/X402BazaarTerminal';
import { ConwayAutomatonSim } from './components/ConwayAutomatonSim';
import { CaffeineAiStudio } from './components/CaffeineAiStudio';
import { EscrowPortfolio } from './components/EscrowPortfolio';
import { Building2, Search, Sparkles, ShieldCheck, Compass, Zap } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('properties');
  const [currency, setCurrency] = useState<Currency>('INR');
  
  // Default connected wallet initialized with Internet Identity
  const [wallet, setWallet] = useState<ConnectedWallet | null>({
    type: 'internet-identity',
    address: 'rdmx6-qmoosa-478a2-cai',
    principalId: 'qms9-2km7p-v489w-y82x1-cai',
    balanceIcp: 142.50,
    balanceEth: 1.25,
    balanceInr: 484500,
    network: 'ICP Mainnet (Caffeine Canister)'
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bazaarProperty, setBazaarProperty] = useState<Property | null>(null);

  // Property Filters
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterFractionalOnly, setFilterFractionalOnly] = useState<boolean>(false);

  // User Holdings State
  const [holdings, setHoldings] = useState<UserFractionalHolding[]>(INITIAL_HOLDINGS);

  // Filter properties
  const filteredProperties = INDIAN_PROPERTIES.filter((prop) => {
    const matchesCity = selectedCity === 'All' || prop.city === selectedCity;
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.builder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.reraId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFractional = !filterFractionalOnly || prop.isFractionalAllowed;
    return matchesCity && matchesSearch && matchesFractional;
  });

  // Handle Token Purchase from Modal
  const handlePurchaseTokens = (
    property: Property,
    tokenCount: number,
    costIcp: number,
    costInr: number
  ) => {
    // Deduct from wallet balance
    if (wallet) {
      setWallet({
        ...wallet,
        balanceIcp: Math.max(0, wallet.balanceIcp - costIcp),
        balanceInr: Math.max(0, wallet.balanceInr - costInr)
      });
    }

    // Add or update holding
    setHoldings((prev) => {
      const existing = prev.find((h) => h.propertyId === property.id);
      if (existing) {
        return prev.map((h) =>
          h.propertyId === property.id
            ? {
                ...h,
                tokensOwned: h.tokensOwned + tokenCount,
                investedIcp: h.investedIcp + costIcp,
                investedInr: h.investedInr + costInr,
                currentValueInr: h.currentValueInr + costInr,
                monthlyRentalYieldInr: Math.round(
                  ((h.investedInr + costInr) * (property.annualYieldPercent / 100)) / 12
                )
              }
            : h
        );
      } else {
        const monthlyYield = Math.round((costInr * (property.annualYieldPercent / 100)) / 12);
        const newHolding: UserFractionalHolding = {
          propertyId: property.id,
          propertyTitle: property.title,
          tokensOwned: tokenCount,
          totalTokens: property.tokenSupply,
          investedIcp: costIcp,
          investedInr: costInr,
          currentValueInr: costInr,
          monthlyRentalYieldInr: monthlyYield,
          claimableYieldIcp: 0.15,
          canisterEscrowId: `canister-escrow-${property.id.slice(0, 10)}`
        };
        return [newHolding, ...prev];
      }
    });
  };

  // Handle Claim Yield from Portfolio
  const handleClaimYield = (propertyId: string, amountIcp: number) => {
    if (wallet) {
      setWallet({
        ...wallet,
        balanceIcp: wallet.balanceIcp + amountIcp,
        balanceInr: wallet.balanceInr + amountIcp * 3400
      });
    }

    setHoldings((prev) =>
      prev.map((h) =>
        h.propertyId === propertyId
          ? { ...h, claimableYieldIcp: 0 }
          : h
      )
    );
  };

  // Faucet add funds
  const handleAddFaucetFunds = (icp: number, inr: number) => {
    if (wallet) {
      setWallet({
        ...wallet,
        balanceIcp: wallet.balanceIcp + icp,
        balanceInr: wallet.balanceInr + inr
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* TAB 1: PROPERTIES MARKETPLACE */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            
            {/* Hero / Header Section */}
            <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Next-Gen Web 4.0 Indian Real Estate Protocol</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Tokenized Luxury & Commercial Real Estate across India
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Direct crypto settlement on DFINITY / Internet Computer Canisters with <strong className="text-cyan-400">zero gas fees</strong>, autonomous multi-agentic diligence, 100% RERA & Vastu verification, and x402 Bazaar negotiations.
                </p>

                {/* Hero Feature Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-emerald-300 flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    MahaRERA & K-RERA Verified
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-amber-300 flex items-center gap-1.5 font-semibold">
                    <Compass className="w-4 h-4 text-amber-400" />
                    100% Vastu Shastra Audited
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-cyan-300 flex items-center gap-1.5 font-semibold">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    0.8s ICP Canister Settlement
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
              
              {/* City selector pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hidden pb-1 md:pb-0">
                {['All', 'Mumbai', 'Bengaluru', 'Gurugram', 'Hyderabad', 'Goa', 'Pune'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedCity === city
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Search & Fractional Toggle */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search RERA ID, builder, locality..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={filterFractionalOnly}
                    onChange={(e) => setFilterFractionalOnly(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Fractional Tokens Only</span>
                </label>
              </div>

            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  currency={currency}
                  onSelectProperty={(p) => setSelectedProperty(p)}
                  onOpenBazaarForProperty={(p) => {
                    setBazaarProperty(p);
                    setActiveTab('x402-bazaar');
                  }}
                  onAskAgentAboutProperty={() => {
                    setActiveTab('agent-swarm');
                  }}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <Building2 className="w-10 h-10 mx-auto text-slate-600" />
                <h4 className="text-base font-semibold text-slate-300">No Indian properties match your criteria</h4>
                <p className="text-xs">Try selecting 'All' cities or clearing your search query.</p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: MULTI-AGENT SWARM */}
        {activeTab === 'agent-swarm' && (
          <MultiAgentChat
            properties={INDIAN_PROPERTIES}
            selectedPropertyForContext={selectedProperty}
          />
        )}

        {/* TAB 3: x402 BAZAAR PROTOCOL */}
        {activeTab === 'x402-bazaar' && (
          <X402BazaarTerminal
            properties={INDIAN_PROPERTIES}
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            preselectedProperty={bazaarProperty}
          />
        )}

        {/* TAB 4: CONWAY AUTOMATON SIMULATOR */}
        {activeTab === 'conway-sim' && <ConwayAutomatonSim />}

        {/* TAB 5: CAFFEINE AIWARE STUDIO */}
        {activeTab === 'caffeine-studio' && <CaffeineAiStudio />}

        {/* TAB 6: ESCROW & PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <EscrowPortfolio
            holdings={holdings}
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            onClaimYield={handleClaimYield}
          />
        )}

      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        currency={currency}
        wallet={wallet}
        onClose={() => setSelectedProperty(null)}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenBazaar={(p) => {
          setBazaarProperty(p);
          setActiveTab('x402-bazaar');
        }}
        onPurchaseTokens={handlePurchaseTokens}
      />

      {/* Multi-Wallet Modal */}
      <MultiWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        currentWallet={wallet}
        onConnectWallet={(w) => setWallet(w)}
        onDisconnectWallet={() => setWallet(null)}
        onAddFaucetFunds={handleAddFaucetFunds}
      />

      {/* About Qmoosa Protocol Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">Qmoosa Indian Properties</span>
            <span>•</span>
            <span>Powered by Caffeine AI & ICP Canister Protocol</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-cyan-400 transition underline underline-offset-4"
            >
              About Protocol
            </button>
            <span>•</span>
            <span>RERA Compliant</span>
            <span>•</span>
            <span>x402 Bazaar Protocol</span>
            <span>•</span>
            <span>Conway Cellular Automaton</span>
            <span>•</span>
            <span>Reverse Gas Subsidized</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
