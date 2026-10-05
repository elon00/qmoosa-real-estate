import React, { useState, useEffect, useRef } from 'react';
import { Layers, Play, Pause, SkipForward, RotateCcw, Sparkles, Building2, Trees, Train, Briefcase } from 'lucide-react';

type CellType = 'EMPTY' | 'RESIDENTIAL' | 'COMMERCIAL' | 'TRANSIT' | 'GREEN';

const GRID_SIZE = 24;

const CELL_COLORS: Record<CellType, string> = {
  EMPTY: '#0f172a', // Slate 900
  RESIDENTIAL: '#38bdf8', // Sky 400
  COMMERCIAL: '#a855f7', // Purple 500
  TRANSIT: '#facc15', // Yellow 400
  GREEN: '#22c55e', // Emerald 500
};

export const ConwayAutomatonSim: React.FC = () => {
  const [grid, setGrid] = useState<CellType[][]>(() => createEmptyGrid());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [selectedBrush, setSelectedBrush] = useState<CellType>('RESIDENTIAL');
  const [speedMs, setSpeedMs] = useState<number>(350);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  function createEmptyGrid(): CellType[][] {
    const rows: CellType[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      rows.push(Array(GRID_SIZE).fill('EMPTY'));
    }
    return rows;
  }

  // Pre-configured Indian corridor presets
  const loadPreset = (preset: 'bengaluru' | 'mumbai' | 'gurugram') => {
    setIsRunning(false);
    setGeneration(0);
    const newGrid = createEmptyGrid();

    if (preset === 'bengaluru') {
      // Outer Ring Road & Tech Corridor
      // Horizontal Metro line in middle
      for (let c = 0; c < GRID_SIZE; c++) {
        newGrid[12][c] = 'TRANSIT';
      }
      // Tech Parks at key junctions
      newGrid[11][6] = 'COMMERCIAL';
      newGrid[11][7] = 'COMMERCIAL';
      newGrid[13][16] = 'COMMERCIAL';
      newGrid[13][17] = 'COMMERCIAL';
      // Residential clusters
      newGrid[10][6] = 'RESIDENTIAL';
      newGrid[10][7] = 'RESIDENTIAL';
      newGrid[14][16] = 'RESIDENTIAL';
      // Parks
      newGrid[8][12] = 'GREEN';
      newGrid[9][12] = 'GREEN';
    } else if (preset === 'mumbai') {
      // Mumbai Coastal Road & Bandra-BKC Axis
      // Vertical coastal expressway on left
      for (let r = 0; r < GRID_SIZE; r++) {
        newGrid[r][4] = 'TRANSIT';
      }
      // BKC Commercial cluster in middle
      newGrid[10][10] = 'COMMERCIAL';
      newGrid[10][11] = 'COMMERCIAL';
      newGrid[11][10] = 'COMMERCIAL';
      newGrid[11][11] = 'COMMERCIAL';
      // Sea facing luxury residential on western coast
      for (let r = 6; r < 16; r += 2) {
        newGrid[r][3] = 'RESIDENTIAL';
      }
      // Mangrove Green buffer
      newGrid[14][10] = 'GREEN';
      newGrid[15][10] = 'GREEN';
    } else {
      // Gurugram Cyber City & Golf Course Road
      // Diagonal transit
      for (let i = 4; i < 20; i++) {
        newGrid[i][i] = 'TRANSIT';
      }
      newGrid[8][7] = 'COMMERCIAL';
      newGrid[7][8] = 'COMMERCIAL';
      newGrid[15][16] = 'RESIDENTIAL';
      newGrid[16][15] = 'RESIDENTIAL';
      newGrid[10][12] = 'GREEN';
    }

    setGrid(newGrid);
  };

  const handleCellClick = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = next[r][c] === selectedBrush ? 'EMPTY' : selectedBrush;
      return next;
    });
  };

  // Evolution step using modified Conway real-estate rules
  const stepSimulation = () => {
    setGrid((currentGrid) => {
      const nextGrid = currentGrid.map((row) => [...row]);

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const currentCell = currentGrid[r][c];

          // Infrastructure (Transit lines) are fixed capital assets; they stay intact
          if (currentCell === 'TRANSIT') {
            continue;
          }

          // Count neighbor types
          let residentialNeighbors = 0;
          let commercialNeighbors = 0;
          let transitNeighbors = 0;
          let greenNeighbors = 0;

          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = r + dr;
              const nc = c + dc;

              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                const nType = currentGrid[nr][nc];
                if (nType === 'RESIDENTIAL') residentialNeighbors++;
                else if (nType === 'COMMERCIAL') commercialNeighbors++;
                else if (nType === 'TRANSIT') transitNeighbors++;
                else if (nType === 'GREEN') greenNeighbors++;
              }
            }
          }

          const totalLiving = residentialNeighbors + commercialNeighbors;

          // Rule 1: Empty land birth
          if (currentCell === 'EMPTY') {
            // High infrastructure stimulation: proximity to metro or 3 residential neighbors spawns residential
            if (transitNeighbors >= 1 && (residentialNeighbors >= 1 || commercialNeighbors >= 1)) {
              nextGrid[r][c] = 'RESIDENTIAL';
            } else if (totalLiving === 3) {
              // Classic Conway birth
              nextGrid[r][c] = commercialNeighbors >= 2 ? 'COMMERCIAL' : 'RESIDENTIAL';
            }
          }

          // Rule 2: Residential survival & overcrowding
          if (currentCell === 'RESIDENTIAL') {
            // Underpopulation: isolated homes decay
            if (totalLiving < 2 && transitNeighbors === 0) {
              nextGrid[r][c] = 'EMPTY';
            }
            // Overcrowding: excessive density without green buffer leads to urban decay
            else if (totalLiving > 4 && greenNeighbors === 0) {
              nextGrid[r][c] = 'EMPTY';
            }
            // Transition to commercial if heavily surrounded by offices
            else if (commercialNeighbors >= 3) {
              nextGrid[r][c] = 'COMMERCIAL';
            }
          }

          // Rule 3: Commercial persistence
          if (currentCell === 'COMMERCIAL') {
            if (totalLiving < 1 && transitNeighbors === 0) {
              nextGrid[r][c] = 'EMPTY';
            }
          }

          // Rule 4: Green spaces resist decay
          if (currentCell === 'GREEN') {
            if (commercialNeighbors >= 5) {
              nextGrid[r][c] = 'RESIDENTIAL'; // Encroached
            }
          }
        }
      }

      return nextGrid;
    });

    setGeneration((prev) => prev + 1);
  };

  // Run loop
  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        stepSimulation();
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isRunning, speedMs]);

  // Real-time calculation metrics
  let residentialCount = 0;
  let commercialCount = 0;
  let greenCount = 0;
  let transitCount = 0;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const type = grid[r][c];
      if (type === 'RESIDENTIAL') residentialCount++;
      else if (type === 'COMMERCIAL') commercialCount++;
      else if (type === 'GREEN') greenCount++;
      else if (type === 'TRANSIT') transitCount++;
    }
  }

  // Locality Appreciation Formula derived from density balance
  const densityRatio = (residentialCount + commercialCount * 1.5) / (GRID_SIZE * GRID_SIZE);
  const greenBalance = greenCount / (residentialCount + commercialCount + 1);
  const transitBonus = transitCount * 0.4;
  const projectedCagr = Math.min(28.5, Math.max(6.2, 8.5 + densityRatio * 30 + greenBalance * 15 + transitBonus * 0.5));

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-white">Conway Urban Automaton Simulator</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              Cellular Automata Engine
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Modeling how transit lines (Metro/Expressways), commercial IT clusters, and green zones dynamically spawn residential growth and capital appreciation across Indian urban micro-markets.
          </p>
        </div>

        {/* Live Simulation Generation Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Generation</span>
            <span className="text-lg font-black text-cyan-400 font-mono">#{generation}</span>
          </div>
          <div className="px-4 py-2 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-center">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Forecast CAGR</span>
            <span className="text-lg font-black text-emerald-400 font-mono">+{projectedCagr.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Simulator Control & Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Canvas (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col items-center shadow-xl space-y-4">
          
          {/* Controls Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause Simulation' : 'Start Simulation'}</span>
              </button>

              <button
                onClick={stepSimulation}
                disabled={isRunning}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 transition"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Step</span>
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setGeneration(0);
                  setGrid(createEmptyGrid());
                }}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Presets:</span>
              <button
                onClick={() => loadPreset('bengaluru')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 text-cyan-300 text-[11px] font-semibold"
              >
                Bengaluru ORR
              </button>
              <button
                onClick={() => loadPreset('mumbai')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 text-cyan-300 text-[11px] font-semibold"
              >
                Mumbai Coastal
              </button>
              <button
                onClick={() => loadPreset('gurugram')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 text-cyan-300 text-[11px] font-semibold"
              >
                Cyber City
              </button>
            </div>
          </div>

          {/* Canvas Grid */}
          <div className="relative p-2 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner overflow-auto max-w-full">
            <div
              className="grid gap-[2px]"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: 'min(500px, 80vw)',
                height: 'min(500px, 80vw)'
              }}
            >
              {grid.map((row, r) =>
                row.map((cellType, c) => (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className="aspect-square rounded-[2px] cursor-pointer transition-colors duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: CELL_COLORS[cellType],
                      border: '0.5px solid rgba(255, 255, 255, 0.05)'
                    }}
                    title={`Row ${r}, Col ${c}: ${cellType}`}
                  />
                ))
              )}
            </div>
          </div>

          {/* Brush Selector */}
          <div className="w-full pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Click on grid to paint:</span>
            <div className="flex items-center gap-1.5">
              {[
                { type: 'RESIDENTIAL', label: 'Residential (Township)', color: 'bg-sky-400' },
                { type: 'COMMERCIAL', label: 'Commercial (IT Park)', color: 'bg-purple-500' },
                { type: 'TRANSIT', label: 'Transit (Metro)', color: 'bg-yellow-400' },
                { type: 'GREEN', label: 'Eco-Park', color: 'bg-emerald-500' },
                { type: 'EMPTY', label: 'Clear Land', color: 'bg-slate-800' }
              ].map((b) => (
                <button
                  key={b.type}
                  onClick={() => setSelectedBrush(b.type as CellType)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    selectedBrush === b.type
                      ? 'bg-slate-700 text-white border border-cyan-400 ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${b.color}`}></span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Real Estate Spatial Insights (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Cellular Density Analytics
          </h4>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-sky-400 mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Residential</span>
              </div>
              <span className="text-lg font-black text-white">{residentialCount}</span>
              <span className="text-[10px] text-slate-500 block">Housing Density</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-purple-400 mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Commercial</span>
              </div>
              <span className="text-lg font-black text-white">{commercialCount}</span>
              <span className="text-[10px] text-slate-500 block">IT Parks / Jobs</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                <Train className="w-3.5 h-3.5" />
                <span>Transit Arteries</span>
              </div>
              <span className="text-lg font-black text-white">{transitCount}</span>
              <span className="text-[10px] text-slate-500 block">Metro Nodes</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-emerald-400 mb-1">
                <Trees className="w-3.5 h-3.5" />
                <span>Eco Greenery</span>
              </div>
              <span className="text-lg font-black text-white">{greenCount}</span>
              <span className="text-[10px] text-slate-500 block">Open Canopies</span>
            </div>
          </div>

          {/* Spatial Interpretation Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2.5">
            <span className="font-bold text-cyan-300 block">
              Autonomous Planning Insights:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {transitCount > 0
                ? 'Transit infrastructure (yellow) acts as a powerful catalyst. Surrounding parcels gain residential density every 2-3 generations without overpopulating.'
                : 'No transit lines identified. Growth is purely organic and subject to rapid stagnation without rapid public transport.'}
            </p>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {greenCount < 3
                ? '⚠️ Low ecological buffer: Unchecked commercial clustering could induce traffic bottlenecks and drop residential desirability.'
                : '🌿 Healthy green buffer detected: Sustains premium luxury valuations across multi-generation ticks.'}
            </p>
          </div>

          {/* Speed slider */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Simulation Clock Speed:</span>
              <span className="font-mono text-cyan-300">{speedMs} ms/tick</span>
            </div>
            <input
              type="range"
              min="100"
              max="800"
              step="50"
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
