import React from 'react';

// Minimal stacked bar chart that displays interest vs principal per month
export default function EMIChart({ schedule, width = 600, height = 160, showTop = 24 }) {
  if (!Array.isArray(schedule) || schedule.length === 0) return null;
  const data = schedule.slice(0, showTop);
  const maxPayment = Math.max(...data.map(d => d.payment));
  const barWidth = Math.max(6, Math.floor((width - 20) / data.length));

  return (
    <div className="overflow-x-auto p-2">
      <svg width={Math.max(width, data.length * (barWidth + 8))} height={height} className="w-full h-auto">
        <defs>
          <linearGradient id="gInterest" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="gPrincipal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#12b8a2" />
          </linearGradient>
        </defs>

        {data.map((d, idx) => {
          const x = 10 + idx * (barWidth + 8);
          const interestH = (d.interestPaid / maxPayment) * (height - 40);
          const principalH = (d.principalPaid / maxPayment) * (height - 40);
          const yInterest = 10 + (height - 40 - interestH);
          const yPrincipal = yInterest + 0; // stacked

          return (
            <g key={d.month}>
              <rect x={x} y={yInterest} width={barWidth} height={interestH} fill="url(#gInterest)" rx="4" />
              <rect x={x} y={yInterest + interestH - principalH} width={barWidth} height={principalH} fill="url(#gPrincipal)" rx="4" />
              <text x={x + barWidth/2} y={height - 8} fontSize="10" fill="#cbd5e1" textAnchor="middle">{d.month}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
