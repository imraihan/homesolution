'use client';
import { useEffect, useRef, useState, useId } from 'react';

// Hand-rolled SVG charts (no dependency, SSR safe). Width follows the container after mount;
// the first render always uses DEFAULT_W so server and client markup are identical.
const DEFAULT_W = 640;
function useWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(DEFAULT_W);
  useEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

// Smallest "round" top value that splits into 4 equal, readable steps.
const niceMax = (v) => {
  const rough = (v || 1) / 4;
  const k = 10 ** Math.floor(Math.log10(rough));
  const q = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * k).find((c) => c >= rough);
  return q * 4;
};

export function LineChart({ data, height = 240, color = '#2563eb', format = (v) => v, label = 'Line chart' }) {
  const [ref, w] = useWidth();
  const gid = useId().replace(/:/g, '');
  const pad = { l: 38, r: 26, t: 14, b: 28 };
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const min = 0;
  const x = (i) => pad.l + (data.length === 1 ? iw / 2 : (i * iw) / (data.length - 1));
  const y = (v) => pad.t + ih - ((v - min) / (max - min)) * ih;
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)},${pad.t + ih} L${pad.l},${pad.t + ih} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => min + (max - min) * t);
  const step = w < 420 ? 2 : 1;
  return (
    <div ref={ref} className="pn-chart" style={{ height }}>
      <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} role="img" aria-label={label}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke="#e5eaf3" strokeDasharray="3 4" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{format(Math.round(t))}</text>
          </g>
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <g key={data[i].label}>
            <circle cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke={color} strokeWidth="2.5"><title>{`${data[i].label}: ${format(data[i].value)}`}</title></circle>
            {i % step === 0 && <text x={p[0]} y={height - 8} textAnchor="middle" fontSize="11" fill="#6b7280">{data[i].label}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BarChart({ data, height = 240, color = '#2563eb', format = (v) => v, label = 'Bar chart' }) {
  const [ref, w] = useWidth();
  const pad = { l: 44, r: 10, t: 14, b: 28 };
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const bw = Math.min(40, (iw / data.length) * 0.55);
  const y = (v) => pad.t + ih - (v / max) * ih;
  return (
    <div ref={ref} className="pn-chart" style={{ height }}>
      <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} role="img" aria-label={label}>
        <defs>
          <linearGradient id="pn-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y(max * t)} y2={y(max * t)} stroke="#e5eaf3" strokeDasharray="3 4" />
            <text x={pad.l - 8} y={y(max * t) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{format(Math.round(max * t))}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = pad.l + (iw / data.length) * (i + 0.5);
          return (
            <g key={d.label}>
              <rect x={cx - bw / 2} y={y(d.value)} width={bw} height={pad.t + ih - y(d.value)} rx="6" fill="url(#pn-bar)"><title>{`${d.label}: ${format(d.value)}`}</title></rect>
              <text x={cx} y={height - 8} textAnchor="middle" fontSize="11" fill="#6b7280">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Donut({ data, size = 180, thickness = 30, label = 'Donut chart' }) {
  const total = data.reduce((n, d) => n + d.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="pn-donut">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {data.map((d) => {
            const len = (d.value / total) * c;
            const el = (
              <circle key={d.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={`${Math.max(len - 2, 0)} ${c - len + 2}`} strokeDashoffset={-acc}>
                <title>{`${d.label}: ${d.value}%`}</title>
              </circle>
            );
            acc += len;
            return el;
          })}
        </g>
      </svg>
      <ul className="pn-donut__legend">
        {data.map((d) => (
          <li key={d.label}>
            <i style={{ background: d.color }} />
            <span>{d.label}</span>
            <b>{Math.round((d.value / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
