# 🇮🇳 Qmoosa — Web 4.0 Autonomous Indian Real Estate Protocol
### Powered by [Caffeine.ai](https://caffeine.ai) & Internet Computer Protocol (ICP)

[![ICP Mainnet](https://img.shields.io/badge/ICP_Canister-Active-10b981?style=for-the-badge&logo=internet-computer)](https://internetcomputer.org)
[![Caffeine AI](https://img.shields.io/badge/Caffeine_AI-AIware_Generator-06b6d4?style=for-the-badge)](https://caffeine.ai)
[![x402 Protocol](https://img.shields.io/badge/x402_Bazaar-HTTP_402_Autonomous-6366f1?style=for-the-badge)](https://qmoosa.ai)
[![RERA Certified](https://img.shields.io/badge/RERA-100%25_Verified-f59e0b?style=for-the-badge)](https://maharera.mahaonline.gov.in)

> **Qmoosa** is a Web 4.0 decentralized real-estate protocol built for Indian property buyers, NRIs, and institutional investors. By combining the autonomous AI generation capabilities of **Caffeine.ai**, the zero-gas reverse cycle model of **Internet Computer Protocol (ICP)**, the **x402 Bazaar machine-to-machine negotiation protocol**, and **Conway Cellular Automata urban growth modeling**, Qmoosa removes traditional brokers and brings transparent, instant on-chain property tokenization to India.

---

## 🌟 Key Architecture & Tech Highlights

### 1. 🤖 Caffeine AI & ICP Protocol Core
* **Native Canister Infrastructure**: Powered by Caffeine AI’s architecture ([caffeine.ai](https://caffeine.ai)), deploying autonomous smart canisters directly to the Internet Computer.
* **Internet Identity Authentication**: Default passkey login powered by II Canister `rdmx6-jaaaa-aaaaa-aaadq-cai` and gateway host `caffeine.xyz` / `icp-api.io`.
* **Zero Gas Reverse-Gas Model**: End users pay **zero gas fees** (`0 cycles charged`); gas fees are automatically subsidized by the protocol's cycle reserve.
* **Sub-Second Finality**: Atomic real estate fractional settlements finalized in under 0.8 seconds on ICP subnets.

### 2. 🇮🇳 Tailored for Indian Real Estate & Customers
* **Prime Locations**: Properties in Mumbai (Bandra Carter Road, BKC), Bengaluru (Indiranagar 100ft Rd, Whitefield), Gurugram (DLF Golf Course Road), Hyderabad (Financial District Gachibowli), Goa (Assagao), and Pune (Koregaon Park).
* **Dual Currency Denomination**: Instant real-time toggle between **INR (₹ Crores & Lakhs)**, **ICP tokens**, **ETH**, and **USD**.
* **100% RERA & Land Record Verification**:
  * Real-time verification against **MahaRERA**, **Karnataka RERA (K-RERA)**, and **HRERA**.
  * **7/12 Land Revenue Extracts** & **A-Khata / Patta status** verified on-chain.
  * **30-Year Nil Encumbrance Certificate (EC)** verification.
* **Vastu Shastra Orientation Audit**: Detailed directional compliance (North-East Ishanya entrance, Agni-Kona kitchen, Nairutya master suite).
* **Indian Stamp Duty & Registration AI Calculator**: State-specific statutory tax calculations (Maharashtra 6%, Karnataka 5.6%, Haryana 7%, Telangana 7.5%).
* **Fractional Tokenization (ICRC-7)**: Retail co-ownership starting from just ₹5,000 / 1.5 ICP with automated monthly rental yield payouts.

### 3. 💳 Multi-Wallet & Indian Banking Rails
* **Internet Computer Native**: Internet Identity, Plug Wallet, Bitfinity, Stoic.
* **EVM & Solana**: MetaMask, WalletConnect, Phantom.
* **Indian UPI-to-Crypto Bridge**: Frictionless on-ramp supporting Google Pay, PhonePe, Paytm, and BHIM UPI with automated 1% TDS compliance.
* **Interactive Faucet**: One-click test funds (+25 ICP / ₹85,000 INR) for testing minting and bidding.

### 4. 🧠 Multi-Agentic AI Swarm ("Caffeine Swarm")
Four autonomous agents collaborating in real-time over the canister message bus:
1. 🌸 **Maya (Property & Vastu Advisor)**: Natural Hinglish/English conversational assistant for family living requirements, metro proximity, and Vastu Shastra.
2. ⚖️ **Adv. Vikram (Legal & RERA Due Diligence)**: Specializes in title deeds, 7/12 mutations, encumbrance certificates, and RERA Section 4(2)(l)(D) escrow accounts.
3. 💰 **Kuber (Crypto Escrow & x402 Finance Agent)**: Manages ICRC-7 fractional tokenization, canister escrow lock/release, APY yields, and installment structuring.
4. 🧬 **Conway Automaton (Spatial Cellular AI)**: Models urban transit expansion, micro-market density, and generative 3-year CAGR appreciation.
* **Swarm Consensus Mode**: A single prompt engages all 4 agents in an automated round-table debate to deliver a comprehensive 360° investment dossier.

### 5. 🌐 x402 Bazaar Protocol (Web 4.0 Machine-to-Machine Commerce)
* Built upon the **HTTP 402 ("Payment Required")** standard.
* Autonomous buyer agents and seller agents negotiate real estate pricing directly.
* Bids lock a **5% refundable micro-collateral** in canister escrow.
* Dynamic AI counter-offers and automatic execution with zero broker commission.

### 6. 🧬 Conway Urban Automaton Simulator
* Interactive 2D cellular automaton adapting John Conway's Game of Life to urban planning.
* Cells model:
  * 🔵 Residential Townships
  * 🟣 Commercial IT & Tech Parks
  * 🟡 Metro & Expressway Transit Lines
  * 🟢 Eco-Green Forests & Canopies
* Rules dynamically compute locality appreciation, infrastructure catalysts, and urban decay in real-time with customizable Indian corridor presets (Bengaluru ORR, Mumbai Coastal Road, Gurugram Cyber City).

### 7. 💻 Caffeine AIware Studio
* Native integration honoring Caffeine.ai’s tagline: *"Chat to create apps, services, and websites with powerful AI inside"*.
* Allows users to prompt the neural compiler to generate and deploy custom Indian real-estate micro-apps into dedicated ICP canisters on the fly.

---

## 📂 Project Structure

```
qmoosa/
├── canisters/
│   ├── qmoosa_core/
│   │   └── main.mo            # ICRC-7 Fractional Token & RERA Registry Canister
│   ├── x402_bazaar/
│   │   └── bazaar.mo          # HTTP 402 Autonomous Machine-to-Machine Bidding Canister
│   └── caffeine_engine/
│       └── agent.mo           # Multi-Agent Swarm Orchestration Canister
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Top Nav, Currency switch, Wallet trigger
│   │   ├── PropertyCard.tsx           # Indian Property Card with RERA & Vastu badges
│   │   ├── PropertyDetailModal.tsx    # Dossier, Stamp Duty Calc, Fractional Slider
│   │   ├── MultiWalletModal.tsx       # II, Plug, Bitfinity, MetaMask, UPI Ramp
│   │   ├── MultiAgentChat.tsx         # Maya, Vikram, Kuber, Conway Swarm
│   │   ├── X402BazaarTerminal.tsx     # Autonomous Bidding & Order Book
│   │   ├── ConwayAutomatonSim.tsx     # Cellular Automata Urban Growth Simulator
│   │   ├── CaffeineAiStudio.tsx       # AIware Micro-App Canister Generator
│   │   └── EscrowPortfolio.tsx        # Token Holdings & Rental Yield Claim
│   ├── data/
│   │   └── properties.ts      # Curated Indian Properties Dataset
│   ├── services/
│   │   └── caffeineIcp.ts     # Caffeine AI & ICP Config, Tax Formulas
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces & domain types
│   ├── App.tsx                # Master Application Orchestration
│   └── index.css              # Tailwind v4 & Glassmorphism Styling
├── dfx.json                   # DFINITY Canister Deployment Configuration
├── vite.config.ts             # Vite + React + Tailwind v4 Plugin
├── tsconfig.json              # TypeScript Configuration
└── README.md                  # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18+ (Node v24 tested)
* **npm**: v9+
* **DFINITY Canister SDK (`dfx`)** *(Optional for local canister deployment)*

### 1. Installation
```bash
git clone https://github.com/marti/qmoosa.git
cd qmoosa
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Deploying Canisters to Internet Computer (Local or Mainnet)
```bash
# Start local ICP replica
dfx start --background

# Deploy canisters
dfx deploy
```

---

## 🇮🇳 हिंदी सारांश (Hindi Summary)

> **Qmoosa** एक संपूर्ण Web 4.0 भारतीय रियल एस्टेट एप्लिकेशन है जिसे **Caffeine.ai** और **Internet Computer Protocol (ICP)** पर बनाया गया है।
> इसमें शामिल हैं:
> 1. **भारतीय ग्राहक और संपत्तियां**: मुंबई, बेंगलुरु, गुरुग्राम, हैदराबाद, गोवा और पुणे की संपत्तियां। MahaRERA/K-RERA वेरिफिकेशन, 7/12 सात-बारा उतारा, 100% वास्तु शास्त्र अनुपालन और स्टाम्प ड्यूटी कैलकुलेटर।
> 2. **मल्टी-वॉलेट और क्रिप्टो पेमेंट्स**: Internet Identity, Plug, MetaMask, Phantom और भारतीय UPI (GPay/PhonePe) ऑन-रैंप। कैनिस्टर रिवर्स-गैस मॉडल के कारण यूज़र को **0 गैस फीस** देनी होती है।
> 3. **मल्टी AI एजेंट स्वार्म**: माया (प्रॉपर्टी और वास्तु), विक्रम (रेरा और कानूनी जांच), कुबेर (एस्क्रो और टोकनाइज़ेशन), और कॉनवे (शहरी विकास सिमुलेशन)।
> 4. **x402 बाज़ार प्रोटोकॉल**: मशीन-टू-मशीन स्वायत्त बोली और एस्क्रो सैटलमेंट।
> 5. **कॉनवे ऑटोमेटन**: सेलुलर ऑटोमेटा द्वारा भारतीय शहरों के मेट्रो कॉरिडोर और प्रॉपर्टी मूल्य वृद्धि का सिमुलेशन।

---

## 📜 License
Distributed under the MIT License. Built with ❤️ for the Indian Web3 Real Estate Revolution.
