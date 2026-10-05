import React, { useState, useEffect, useRef } from 'react';
import type { AgentRole, AgentProfile, ChatMessage, Property } from '../types';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export const AGENT_PROFILES: Record<AgentRole, AgentProfile> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    title: 'Property Discovery & Vastu Advisor',
    avatar: '🌸',
    badge: 'Vastu & Lifestyle AI',
    specialty: 'Indian Metros, 3BHK/4BHK, Vastu Shastra, School & Metro proximity',
    intro: 'Namaste! Main Maya hoon. Aapke budget aur family requirement k hisaab se best luxury properties aur Vastu-aligned homes find karne me main aapki help karungi.'
  },
  vikram: {
    id: 'vikram',
    name: 'Adv. Vikram',
    title: 'RERA & Land Title Due Diligence Agent',
    avatar: '⚖️',
    badge: 'Legal & RERA Compliance',
    specialty: 'MahaRERA/K-RERA Registry, 7/12 Extract, Nil Encumbrance, Stamp Duty Laws',
    intro: 'Adab! I am Advocate Vikram. Main ensure karta hoon ki har property 100% legal, RERA approved aur 30-year encumbrance-free ho before you commit funds.'
  },
  kuber: {
    id: 'kuber',
    name: 'Kuber',
    title: 'Crypto Escrow & x402 Finance Agent',
    avatar: '💰',
    badge: 'ICP Escrow & Tokenization',
    specialty: 'ICRC-7 Fractional Tokens, Multi-Wallet Escrow, x402 Bidding, Rental APY Yields',
    intro: 'Pranam! I am Kuber. I execute decentralized escrow releases on ICP Canisters, calculate fractional yields, and settle x402 autonomous bazaar bids.'
  },
  conway: {
    id: 'conway',
    name: 'Conway Agent',
    title: 'Spatial Cellular Automaton Engine',
    avatar: '🧬',
    badge: 'Urban Cellular Growth',
    specialty: 'Conway Game of Life for Urban Corridors, Infrastructure Density, Generative ROI',
    intro: 'Greetings. I simulate urban zoning, metro transit expansion, and real-estate capital appreciation using 2D cellular automata algorithms.'
  }
};

interface MultiAgentChatProps {
  properties: Property[];
  selectedPropertyForContext?: Property | null;
}

export const MultiAgentChat: React.FC<MultiAgentChatProps> = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole | 'swarm'>('swarm');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'swarm-system',
      text: '⚡ Qmoosa Coffeine AI Swarm online. 4 Specialized Agents (Maya, Vikram, Kuber, Conway) are synchronized on ICP Canisters to assist you with Indian Properties.',
      timestamp: 'Just now'
    },
    {
      id: 'init-2',
      sender: 'maya',
      agentName: 'Maya',
      agentRole: 'maya',
      text: 'Namaste! Welcome to Qmoosa. We have verified prime properties in Mumbai, Bengaluru, Gurugram, Hyderabad, Goa & Pune. Would you like a property recommendation, a legal RERA check, or a cellular growth simulation?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Agent response or Swarm consensus
    setTimeout(() => {
      if (selectedAgent === 'swarm') {
        generateSwarmResponse();
      } else {
        generateSingleAgentResponse(selectedAgent, userText);
      }
      setIsTyping(false);
    }, 1200);
  };

  const generateSingleAgentResponse = (agent: AgentRole, query: string) => {
    const qLower = query.toLowerCase();
    let reply = '';

    if (agent === 'maya') {
      if (qLower.includes('mumbai') || qLower.includes('bandra')) {
        reply = 'Bandra West me "The Sea Crest Grand Skyline" represents ultimate coastal luxury! 4BHK with 3,850 sq.ft carpet area, Arabian Sea views, aur 94% Vastu compliance (North-East entrance, Ishanya prosperity angle). Budget around ₹18.5 Cr or fractional entry from ₹18,500!';
      } else if (qLower.includes('bangalore') || qLower.includes('bengaluru')) {
        reply = 'Bengaluru Indiranagar 100ft Road pe hamare paas "Nandi Silicon Cyber Oasis" hai. East-facing grand courtyard with 98% Vastu compliance, metro just 400m away, aur 10.4% projected annual rental yield!';
      } else {
        reply = `Aapke query ke liye humare paas top Tier-1 Indian locations available hain. Mumbai, Bengaluru, Gurugram aur Hyderabad me sabhi homes 90%+ Vastu compliant hain. Kya aapko family living k liye 3BHK/4BHK dekhna hai ya high rental yield fractional property?`;
      }
    } else if (agent === 'vikram') {
      if (qLower.includes('rera') || qLower.includes('legal') || qLower.includes('title')) {
        reply = 'Legal Due Diligence Summary: Qmoosa ke sabhi listings MahaRERA, K-RERA ya HRERA me formally registered hain. For example, Bandra property ka MahaRERA ID #P51800029381 hai. 30-year sub-registrar index II search me "Nil Encumbrance" confirmed hai and 7/12 land revenue record mutated hai.';
      } else {
        reply = 'Legal Notice: Har deal Indian Real Estate (Regulation and Development) Act 2016 ke under escrow bank account me locked rehti hai. Hamare ICP smart contract canisters ensure karte hain ki builder ko release milestone delivery par hi ho!';
      }
    } else if (agent === 'kuber') {
      if (qLower.includes('fractional') || qLower.includes('yield') || qLower.includes('token') || qLower.includes('upi')) {
        reply = 'Financial Architecture: Hum ICRC-7 token standard use karte hain on Internet Computer Protocol. You can invest using Internet Identity, Plug, MetaMask, ya directly Indian UPI (GPay/PhonePe). Tokens yield 8.8% to 12.8% annual rental income credited directly in ICP to your wallet!';
      } else {
        reply = 'x402 Protocol Settlement Active: Any bid you place on the x402 Bazaar locks a 5% refundable micro-collateral in the canister. AI agents execute dynamic price discovery without intermediary broker commissions!';
      }
    } else {
      // Conway
      reply = 'Conway Cellular Automaton Analysis: Localities near new metro lines (like Indiranagar Purple Line or Mumbai Coastal Road) show high cellular generation fertility. In our 2D grid simulation, residential clusters adjacent to transit arteries show +34.2% compound 3-year valuation appreciation!';
    }

    const agentMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: agent,
      agentName: AGENT_PROFILES[agent].name,
      agentRole: agent,
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, agentMsg]);
  };

  const generateSwarmResponse = () => {
    // In swarm mode, provide a multi-perspective synthesis
    const responses: ChatMessage[] = [
      {
        id: `swarm-maya-${Date.now()}`,
        sender: 'maya',
        agentName: 'Maya (Discovery & Vastu)',
        agentRole: 'maya',
        text: `🌸 [Maya]: For Indian buyers, I recommend focusing on prime transit hubs. "The Sea Crest" (Bandra West, Mumbai) and "Nandi Cyber Oasis" (Indiranagar, Bengaluru) score highest on both luxury and 95%+ Vastu Shastra harmony.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `swarm-vikram-${Date.now() + 1}`,
        sender: 'vikram',
        agentName: 'Adv. Vikram (Legal RERA)',
        agentRole: 'vikram',
        text: `⚖️ [Adv. Vikram]: Title verification report: Both properties have passed 30-year encumbrance search with zero active liens. MahaRERA P51800029381 & K-RERA PRM/KA/RERA/1251 are verified on-chain. State stamp duty is 6% for MH and 5.6% for KA.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `swarm-conway-${Date.now() + 2}`,
        sender: 'conway',
        agentName: 'Conway Automaton (Spatial AI)',
        agentRole: 'conway',
        text: `🧬 [Conway Automaton]: Cellular automaton simulation shows Indiranagar & Bandra in sustainable density equilibrium (Generation 42+). High infrastructure connectivity suppresses decay rules, modeling a 14.8% capital growth forecast.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `swarm-kuber-${Date.now() + 3}`,
        sender: 'kuber',
        agentName: 'Kuber (Crypto & x402)',
        agentRole: 'kuber',
        text: `💰 [Kuber]: Financial Escrow Recommendation: Fractional ICRC-7 entry starts at ₹15,600 (4.58 ICP) with 10.4% annual rental yield. You can lock an x402 automated bid with zero gas fees via our ICP Canister!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages((prev) => [...prev, ...responses]);
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputMessage(promptText);
  };

  return (
    <div className="flex flex-col h-[750px] bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Top Agent Selector Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Caffeine Multi-Agentic Swarm
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Web 4.0 Autonomous
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Coordinated neural agents operating on ICP canister message bus
            </p>
          </div>
        </div>

        {/* Agent Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hidden">
          <button
            onClick={() => setSelectedAgent('swarm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedAgent === 'swarm'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Swarm Mode (All 4)</span>
          </button>

          {(Object.keys(AGENT_PROFILES) as AgentRole[]).map((role) => {
            const p = AGENT_PROFILES[role];
            return (
              <button
                key={role}
                onClick={() => setSelectedAgent(role)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  selectedAgent === role
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{p.avatar}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Agent Info Banner */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        {selectedAgent === 'swarm' ? (
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            Swarm Consensus: Maya (Discovery) + Vikram (Legal) + Kuber (Finance) + Conway (Cellular AI)
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="text-white font-medium">{AGENT_PROFILES[selectedAgent].name}</span>
            <span>—</span>
            <span className="text-slate-300">{AGENT_PROFILES[selectedAgent].specialty}</span>
          </span>
        )}
        <span className="hidden sm:inline font-mono text-[11px] text-emerald-400">
          Reverse Gas: 0 cycles charged
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => {
          if (m.sender === 'swarm-system') {
            return (
              <div key={m.id} className="text-center my-2">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-mono">
                  {m.text}
                </span>
              </div>
            );
          }

          if (m.sender === 'user') {
            return (
              <div key={m.id} className="flex justify-end gap-2.5">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-cyan-600 to-indigo-600 text-white p-3.5 text-xs shadow-md">
                  <p className="leading-relaxed">{m.text}</p>
                  <span className="text-[10px] text-cyan-200/70 block text-right mt-1.5">
                    {m.timestamp}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          // Agent message
          const role = m.agentRole || (m.sender as AgentRole);
          const profile = AGENT_PROFILES[role] || AGENT_PROFILES.maya;

          return (
            <div key={m.id} className="flex justify-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                {profile.avatar}
              </div>
              <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-slate-800/90 border border-slate-700/80 p-4 text-xs text-slate-200 shadow-md space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{m.agentName || profile.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-cyan-300 font-medium">
                      {profile.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-slate-100">{m.text}</p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-950/60 p-3 rounded-2xl w-fit border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Agentic Swarm is synthesizing on ICP Canisters...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-hidden">
        <span className="text-[11px] text-slate-400 flex-shrink-0 font-medium">Quick Prompts:</span>
        {[
          'Verify MahaRERA for Bandra Penthouse',
          'Explain Vastu compliance for Bangalore Villa',
          'Simulate Conway Cellular Growth for IT Corridors',
          'How does x402 Bazaar Escrow work on ICP?'
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickPrompt(prompt)}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 hover:text-white transition whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder={
            selectedAgent === 'swarm'
              ? 'Ask all 4 agents (e.g. "Recommend a 4BHK in Mumbai with RERA verification & high ROI")'
              : `Ask ${AGENT_PROFILES[selectedAgent].name} a question...`
          }
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
        />

        <button
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-slate-950 font-bold transition shadow-md shadow-cyan-600/30 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
