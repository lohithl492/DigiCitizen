import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ShieldLogo({ size = 32, variant = 'blue', showText = true }) {
  const isLight = variant === 'light';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
      <div
        style={{
          width: size + 10,
          height: size + 10,
          borderRadius: '10px',
          background: isLight
            ? 'rgba(255, 255, 255, 0.15)'
            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isLight
            ? '0 0 15px rgba(255, 255, 255, 0.2)'
            : '0 4px 12px rgba(37, 99, 235, 0.25)',
          color: '#ffffff',
          flexShrink: 0
        }}
      >
        <ShieldCheck size={size} strokeWidth={2.2} />
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: isLight ? '#ffffff' : '#0f172a'
            }}
          >
            Digi<span style={{ color: isLight ? '#93c5fd' : '#2563eb' }}>Citizen</span>
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: isLight ? 'rgba(255, 255, 255, 0.75)' : '#64748b'
            }}
          >
            Digital Safety Platform
          </span>
        </div>
      )}
    </div>
  );
}
