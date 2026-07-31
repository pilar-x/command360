import React from 'react';

interface TacticalGaugeProps {
  value: number; // 0 - 100
  title: string;
  subtitle?: string;
  color?: 'emerald' | 'amber' | 'blue' | 'purple' | 'red';
  unit?: string;
  targetValue?: number;
  statusLabel?: string;
}

export const TacticalGauge: React.FC<TacticalGaugeProps> = ({
  value,
  title,
  subtitle,
  color = 'emerald',
  unit = '%',
  targetValue,
  statusLabel
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  // Color maps
  const colorHex = {
    emerald: '#10b981',
    amber: '#f59e0b',
    blue: '#3b82f6',
    purple: '#a855f7',
    red: '#ef4444'
  }[color];

  const glowClass = {
    emerald: 'border-emerald-800/60 shadow-emerald-950/30',
    amber: 'border-amber-800/60 shadow-amber-950/30',
    blue: 'border-blue-800/60 shadow-blue-950/30',
    purple: 'border-purple-800/60 shadow-purple-950/30',
    red: 'border-red-800/60 shadow-red-950/30'
  }[color];

  // SVG Gauge Math
  const radius = 55;
  const strokeWidth = 9;
  const center = 75;
  const circumference = Math.PI * radius; // Half circle length ~ 172.78
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  // Pointer needle angle (-180 to 0 degrees)
  const angle = -180 + (clampedValue / 100) * 180;
  const needleRad = (angle * Math.PI) / 180;
  const needleLength = radius - 10;
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);

  return (
    <div className={`p-4 bg-slate-900/90 border rounded-xl flex flex-col items-center justify-between relative shadow-lg ${glowClass}`}>
      {/* Title */}
      <div className="w-full text-center mb-1">
        <h4 className="text-[11px] font-extrabold font-mono text-slate-200 uppercase tracking-wider">{title}</h4>
        {subtitle && <p className="text-[10px] text-slate-400 font-mono mt-0.5">{subtitle}</p>}
      </div>

      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-44 h-26 flex items-center justify-center my-1">
        <svg viewBox="0 0 150 90" className="w-full h-full overflow-visible">
          {/* Background Arc */}
          <path
            d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Ticks */}
          {Array.from({ length: 11 }).map((_, i) => {
            const tickAngle = -180 + (i / 10) * 180;
            const tickRad = (tickAngle * Math.PI) / 180;
            const innerR = radius - 12;
            const outerR = radius - 16;
            const x1 = center + innerR * Math.cos(tickRad);
            const y1 = center + innerR * Math.sin(tickRad);
            const x2 = center + outerR * Math.cos(tickRad);
            const y2 = center + outerR * Math.sin(tickRad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#334155"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Filled Progress Arc */}
          <path
            d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
            fill="none"
            stroke={colorHex}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />

          {/* Target indicator mark */}
          {targetValue !== undefined && (
            (() => {
              const targetAngle = -180 + (targetValue / 100) * 180;
              const targetRad = (targetAngle * Math.PI) / 180;
              const tx1 = center + (radius - 6) * Math.cos(targetRad);
              const ty1 = center + (radius - 6) * Math.sin(targetRad);
              const tx2 = center + (radius + 6) * Math.cos(targetRad);
              const ty2 = center + (radius + 6) * Math.sin(targetRad);
              return (
                <line
                  x1={tx1}
                  y1={ty1}
                  x2={tx2}
                  y2={ty2}
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                />
              );
            })()
          )}

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            stroke="#f8fafc"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* Needle Hub Pivot */}
          <circle cx={center} cy={center} r={4.5} fill={colorHex} stroke="#0f172a" strokeWidth={2} />
        </svg>

        {/* Center Text overlay below pivot */}
        <div className="absolute bottom-0 text-center font-mono">
          <div className="text-lg font-extrabold text-slate-100 tracking-tight flex items-baseline justify-center">
            {value.toFixed(value % 1 === 0 ? 0 : 1)}
            <span className="text-xs text-slate-400 font-normal ml-0.5">{unit}</span>
          </div>
          {statusLabel && (
            <span
              className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border tracking-wider mt-0.5"
              style={{
                color: colorHex,
                borderColor: `${colorHex}50`,
                backgroundColor: `${colorHex}15`
              }}
            >
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      {/* Target Note */}
      {targetValue !== undefined && (
        <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 border-t border-slate-800 pt-1.5">
          <span>Target Minimum:</span>
          <span className="text-amber-400 font-bold">{targetValue}{unit}</span>
        </div>
      )}
    </div>
  );
};
