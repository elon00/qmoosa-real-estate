export type Currency = 'INR' | 'ICP' | 'USD' | 'ETH';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  city: 'Mumbai' | 'Bengaluru' | 'Gurugram' | 'Hyderabad' | 'Goa' | 'Pune';
  locality: string;
  priceInr: number; // In Rupees (e.g. 185000000 for 18.5 Cr)
  priceIcp: number; // In ICP tokens
  priceEth: number;
  carpetAreaSqFt: number;
  superBuiltUpSqFt: number;
  bedrooms: number;
  bathrooms: number;
  reraId: string;
  reraState: 'MahaRERA' | 'Karnataka RERA' | 'HRERA' | 'TS RERA' | 'Goa RERA';
  landExtractStatus: 'Verified 7/12 Extract' | 'Clear A-Khata' | 'Patta Cleared' | 'Title Freehold';
  encumbranceStatus: 'Nil Encumbrance (30 yrs)' | 'Verified Bank Lien Free';
  vastuScore: number; // 0-100%
  vastuHighlights: string[];
  image: string;
  gallery: string[];
  isFractionalAllowed: boolean;
  tokenSupply: number;
  tokenPriceIcp: number;
  tokenPriceInr: number;
  tokensSold: number;
  annualYieldPercent: number;
  builder: string;
  completionYear: number;
  metroDistanceKm: number;
  features: string[];
  canisterId: string;
}

export type WalletType = 
  | 'internet-identity'
  | 'plug'
  | 'bitfinity'
  | 'metamask'
  | 'phantom'
  | 'upi-crypto-ramp';

export interface ConnectedWallet {
  type: WalletType;
  address: string;
  principalId?: string; // For ICP
  balanceIcp: number;
  balanceEth: number;
  balanceInr: number;
  network: string;
}

export type AgentRole = 'maya' | 'vikram' | 'kuber' | 'conway';

export interface AgentProfile {
  id: AgentRole;
  name: string;
  title: string;
  avatar: string;
  badge: string;
  specialty: string;
  intro: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | AgentRole | 'swarm-system';
  agentName?: string;
  agentRole?: AgentRole;
  text: string;
  timestamp: string;
  metadata?: {
    propertyId?: string;
    calculation?: Record<string, string | number>;
    legalBadge?: string;
    bazaarBid?: {
      amount: number;
      currency: string;
      status: string;
    };
  };
}

export interface X402Bid {
  id: string;
  propertyId: string;
  propertyName: string;
  bidderAddress: string;
  bidderAgent: string;
  amountIcp: number;
  amountInr: number;
  timestamp: string;
  status: 'PENDING_AI_VERIFICATION' | 'COUNTER_OFFER' | 'ACCEPTED' | 'SETTLED_ON_ICP';
  collateralLockedIcp: number;
  counterPriceIcp?: number;
  counterPriceInr?: number;
  aiNegotiationNote: string;
}

export interface UserFractionalHolding {
  propertyId: string;
  propertyTitle: string;
  tokensOwned: number;
  totalTokens: number;
  investedIcp: number;
  investedInr: number;
  currentValueInr: number;
  monthlyRentalYieldInr: number;
  claimableYieldIcp: number;
  canisterEscrowId: string;
}
