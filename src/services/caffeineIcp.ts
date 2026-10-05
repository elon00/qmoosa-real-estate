// Caffeine AI & Internet Computer Protocol (ICP) System Service

export const CAFFEINE_ICP_CONFIG = {
  appName: 'Qmoosa Indian Properties',
  caffeineApiUrl: 'https://api.caffeine.ai',
  iiCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
  iiApiUrl: 'https://icp-api.io',
  iiUrl: 'https://id.ai',
  icHttpGatewayHost: 'https://caffeine.xyz',
  qmoosaCoreCanister: 'qms-core-88b-cai',
  x402BazaarCanister: 'x402-bazaar-qms-cai',
  reverseGasEnabled: true, // End-users pay 0 gas; canisters consume ICP cycles
  cycleBurnRatePerQuery: '100,000 Cycles (Subsidized by Qmoosa DAO)',
  subsecondFinality: '0.8s on ICP Subnet'
};

// Rates as of live mock
export const EXCHANGE_RATES = {
  ICP_TO_INR: 3400, // 1 ICP = ₹3,400
  ETH_TO_INR: 250000, // 1 ETH = ₹2,50,000
  USD_TO_INR: 84.50, // 1 USD = ₹84.50
};

export function formatInr(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatIcp(amount: number): string {
  return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ICP`;
}

// Indian Stamp Duty & Registration Estimator
export function calculateStampDutyAndReg(propertyPriceInr: number, state: string) {
  if (state.includes('Maha') || state === 'Mumbai' || state === 'Pune') {
    const stampDutyRate = 0.06; // 5% + 1% Metro Cess
    const stampDuty = propertyPriceInr * stampDutyRate;
    const registrationFee = Math.min(30000, propertyPriceInr * 0.01);
    return {
      stampDutyRate: '6.0% (5% Stamp Duty + 1% Metro Cess)',
      registrationFeeRate: 'Capped at ₹30,000',
      stampDutyAmount: stampDuty,
      registrationAmount: registrationFee,
      totalGovtCharges: stampDuty + registrationFee
    };
  } else if (state.includes('Karnataka') || state === 'Bengaluru') {
    const stampDutyRate = 0.056; // 5% + 10% cess on duty
    const stampDuty = propertyPriceInr * stampDutyRate;
    const registrationFee = propertyPriceInr * 0.01;
    return {
      stampDutyRate: '5.6% (5% + 10% Cess on Stamp Duty)',
      registrationFeeRate: '1.0% of Property Value',
      stampDutyAmount: stampDuty,
      registrationAmount: registrationFee,
      totalGovtCharges: stampDuty + registrationFee
    };
  } else if (state.includes('HRERA') || state === 'Gurugram') {
    const stampDutyRate = 0.07;
    const stampDuty = propertyPriceInr * stampDutyRate;
    const registrationFee = 50000;
    return {
      stampDutyRate: '7.0% (Haryana Urban Area)',
      registrationFeeRate: 'Fixed slab ₹50,000',
      stampDutyAmount: stampDuty,
      registrationAmount: registrationFee,
      totalGovtCharges: stampDuty + registrationFee
    };
  } else if (state.includes('TS RERA') || state === 'Hyderabad') {
    const stampDutyRate = 0.075;
    const stampDuty = propertyPriceInr * stampDutyRate;
    const registrationFee = propertyPriceInr * 0.005;
    return {
      stampDutyRate: '7.5% (Stamp Duty + Transfer Duty)',
      registrationFeeRate: '0.5% Registration',
      stampDutyAmount: stampDuty,
      registrationAmount: registrationFee,
      totalGovtCharges: stampDuty + registrationFee
    };
  } else {
    const stampDutyRate = 0.05;
    const stampDuty = propertyPriceInr * stampDutyRate;
    const registrationFee = propertyPriceInr * 0.01;
    return {
      stampDutyRate: '5.0%',
      registrationFeeRate: '1.0%',
      stampDutyAmount: stampDuty,
      registrationAmount: registrationFee,
      totalGovtCharges: stampDuty + registrationFee
    };
  }
}
