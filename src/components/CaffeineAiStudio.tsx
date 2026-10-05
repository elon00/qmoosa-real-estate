import React, { useState } from 'react';
import { Cpu, Sparkles, Terminal, CheckCircle2, Play, ArrowRight, RefreshCw, FileCode, ExternalLink } from 'lucide-react';

interface AIwareMicroApp {
  id: string;
  name: string;
  description: string;
  canisterId: string;
  category: string;
  prompt: string;
  status: 'DEPLOYED_ON_CANISTER';
  inputs: { label: string; placeholder: string; defaultValue: string; key: string }[];
  resultTemplate: (inputs: Record<string, string>) => { title: string; output: string };
}

export const CaffeineAiStudio: React.FC = () => {
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string | null>(null);

  const [activeApp, setActiveApp] = useState<AIwareMicroApp | null>(null);
  const [appFormInputs, setAppFormInputs] = useState<Record<string, string>>({});
  const [appResult, setAppResult] = useState<{ title: string; output: string } | null>(null);

  const [microApps, setMicroApps] = useState<AIwareMicroApp[]>([
    {
      id: 'app-nri-tds',
      name: 'NRI Tax & TDS Section 195 Shield',
      description: 'Calculates Indian property capital gains tax and TDS withholding for Non-Resident Indians.',
      canisterId: 'nri-tds-rdmx6-cai',
      category: 'Legal & Tax AIware',
      prompt: 'Build an NRI tax calculator for sale of luxury apartment in Bandra with DTAA treaty relief',
      status: 'DEPLOYED_ON_CANISTER',
      inputs: [
        { label: 'Sale Price (in ₹ INR)', placeholder: '150000000', defaultValue: '185000000', key: 'salePrice' },
        { label: 'Original Purchase Price (in ₹ INR)', placeholder: '80000000', defaultValue: '90000000', key: 'purchasePrice' },
        { label: 'Holding Period (Years)', placeholder: '5', defaultValue: '4', key: 'holdingYears' }
      ],
      resultTemplate: (vals) => {
        const sale = Number(vals.salePrice) || 185000000;
        const purchase = Number(vals.purchasePrice) || 90000000;
        const gain = Math.max(0, sale - purchase);
        const ltcg = gain * 0.125; // 12.5% new LTCG rule
        const tds195 = sale * 0.20; // 20% standard Section 195 TDS
        return {
          title: 'NRI Tax & Lower Deduction Certificate (Form 13) Analysis',
          output: `• Long Term Capital Gain (LTCG): ₹${(gain / 10000000).toFixed(2)} Cr\n• Tax Liability under Sec 112: ₹${(ltcg / 10000000).toFixed(2)} Cr\n• Mandatory Section 195 TDS (20% on gross): ₹${(tds195 / 10000000).toFixed(2)} Cr\n💡 AI Recommendation: Apply for Form 13 Lower Deduction Certificate to save ₹${((tds195 - ltcg) / 10000000).toFixed(2)} Cr locked withholding!`
        };
      }
    },
    {
      id: 'app-vastu-ai',
      name: 'Vastu Directional Remedial AI',
      description: 'Evaluates architectural layout discrepancies and suggests non-destructive geometric remedies.',
      canisterId: 'vastu-remedy-aaadq-cai',
      category: 'Vastu Shastra AIware',
      prompt: 'Create a Vastu remedy generator for apartments where main door faces South-West',
      status: 'DEPLOYED_ON_CANISTER',
      inputs: [
        { label: 'Entrance Facing Direction', placeholder: 'South-West', defaultValue: 'South-West', key: 'direction' },
        { label: 'Kitchen Placement', placeholder: 'North-East', defaultValue: 'North-East', key: 'kitchen' }
      ],
      resultTemplate: (vals) => {
        return {
          title: 'Vastu Shastra Energy Rectification Report',
          output: `⚠️ Warning: ${vals.direction} entrance can introduce financial drain.\n✅ Remedial Action: Place Lead Metal Pyramids and Hanuman Bahuk Yantra above the door frame. Do not relocate walls.\n⚠️ Kitchen in ${vals.kitchen}: Suppresses water element. Place bronze bowl with camphor and install a red bulb in Agni corner (South-East).`
        };
      }
    }
  ]);

  const handleGenerateNewAIware = () => {
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setGenerationStep('1/4: Analyzing intent via Caffeine AI Neural Compiler...');

    setTimeout(() => {
      setGenerationStep('2/4: Synthesizing Motoko Canister Actor Smart Contract...');
    }, 900);

    setTimeout(() => {
      setGenerationStep('3/4: Generating Agentic UI & Reverse Gas Cycle Allocation...');
    }, 1800);

    setTimeout(() => {
      setGenerationStep('4/4: Deploying canister to ICP Subnet (0.8s finality)...');
    }, 2700);

    setTimeout(() => {
      const newApp: AIwareMicroApp = {
        id: `app-custom-${Date.now()}`,
        name: promptInput.length > 30 ? `${promptInput.slice(0, 30)}... AIware` : promptInput,
        description: `Autonomous Web 4.0 tool compiled by Caffeine AI on ICP Canister.`,
        canisterId: `caffeine-qms-${Math.random().toString(36).substring(2, 7)}-cai`,
        category: 'Custom Micro-App',
        prompt: promptInput,
        status: 'DEPLOYED_ON_CANISTER',
        inputs: [
          { label: 'Input Parameter (e.g. Budget/Area)', placeholder: 'Enter value', defaultValue: '50000000', key: 'val1' },
          { label: 'Secondary Parameter (e.g. City/Term)', placeholder: 'Enter locality', defaultValue: 'Mumbai', key: 'val2' }
        ],
        resultTemplate: (vals) => ({
          title: 'Autonomous Execution Result',
          output: `Successfully executed custom logic for ${vals.val2} with budget ₹${Number(vals.val1).toLocaleString('en-IN')}. Canister state synchronized across ICP replica.`
        })
      };

      setMicroApps([newApp, ...microApps]);
      setActiveApp(newApp);
      setIsGenerating(false);
      setGenerationStep(null);
      setPromptInput('');
    }, 3600);
  };

  const selectAppToRun = (app: AIwareMicroApp) => {
    setActiveApp(app);
    const initialInputs: Record<string, string> = {};
    app.inputs.forEach((i) => {
      initialInputs[i.key] = i.defaultValue;
    });
    setAppFormInputs(initialInputs);
    setAppResult(app.resultTemplate(initialInputs));
  };

  const handleRunActiveApp = () => {
    if (!activeApp) return;
    const res = activeApp.resultTemplate(appFormInputs);
    setAppResult(res);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-slate-950 font-bold">
              <Cpu className="w-5 h-5 text-white" />
            </span>
            <h3 className="text-xl font-black text-white">Caffeine AIware Studio</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              caffeine.ai Native Engine
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            "Chat to create apps, services, and websites with powerful AI inside." Prompt Caffeine AI to autonomously compile, test, and deploy Indian real-estate micro-apps into dedicated ICP Canisters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
          >
            <span>caffeine.ai</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>
      </div>

      {/* Generator Prompt Box */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Generate New Real-Estate AIware via Natural Language
          </h4>
          <span className="text-xs text-slate-400">Target: Internet Computer Canister</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g. Build an automated MahaRERA litigation scanner with WhatsApp notification alerts"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            disabled={isGenerating}
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleGenerateNewAIware}
            disabled={isGenerating || !promptInput.trim()}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Compile & Deploy Canister</span>
          </button>
        </div>

        {isGenerating && (
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
            <span className="font-mono">{generationStep}</span>
          </div>
        )}

        {/* Quick prompt templates */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-slate-400 pt-1">
          <span className="text-[11px] flex-shrink-0">Try Prompts:</span>
          {[
            'Build 1% TDS deduction calculator for Indian Property Sale',
            'Generate 3D Vastu Shastra layout optimizer for 3BHK flat',
            'Create automated rental yield staking contract on ICP'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setPromptInput(prompt)}
              className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Available AIware Apps (Left) + Live Runnable Canister Sandbox (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Deployed AIware Gallery (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Deployed AIware Canisters ({microApps.length})
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
              0.8s Finality
            </span>
          </div>

          <div className="space-y-3">
            {microApps.map((app) => {
              const isSelected = activeApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => selectAppToRun(app)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-sm font-bold text-white">{app.name}</h5>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">
                        {app.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Live
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {app.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{app.canisterId}</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      Open Sandbox <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Interactive Sandbox (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          {activeApp ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    {activeApp.name} (Live Sandbox)
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    Canister: {activeApp.canisterId}
                  </span>
                </div>
                <button
                  onClick={handleRunActiveApp}
                  className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute on Canister</span>
                </button>
              </div>

              {/* Dynamic Inputs */}
              <div className="space-y-3">
                {activeApp.inputs.map((inp) => (
                  <div key={inp.key} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">{inp.label}:</label>
                    <input
                      type="text"
                      placeholder={inp.placeholder}
                      value={appFormInputs[inp.key] || ''}
                      onChange={(e) =>
                        setAppFormInputs((prev) => ({ ...prev, [inp.key]: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                ))}
              </div>

              {/* Execution Result Box */}
              {appResult && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                    <span>{appResult.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400">Canister State 200 OK</span>
                  </div>
                  <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {appResult.output}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Cpu className="w-10 h-10 text-slate-600" />
              <h5 className="text-sm font-semibold text-slate-300">Select an AIware Canister from the left</h5>
              <p className="text-xs text-slate-500 max-w-sm">
                Each micro-app is a self-contained Web 4.0 program hosted permanently on the Internet Computer Protocol.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
