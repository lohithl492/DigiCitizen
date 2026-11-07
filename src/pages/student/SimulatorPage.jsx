import React, { useState } from 'react';
import { analyzePhishingContent } from '../../utils/phishingDetector';
import { checkPasswordStrength } from '../../utils/passwordChecker';
import {
  ShieldAlert, Lock, AlertTriangle, CheckCircle2,
  Info, Eye, EyeOff, Sparkles, Terminal, Copy, ArrowRight
} from 'lucide-react';

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState('phishing'); // 'phishing' | 'password'

  // Phishing state
  const [phishingInput, setPhishingInput] = useState('');
  const [phishingResult, setPhishingResult] = useState(null);

  // Password state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordResult = checkPasswordStrength(passwordInput);

  const handleAnalyzePhishing = (e) => {
    e?.preventDefault();
    const result = analyzePhishingContent(phishingInput);
    setPhishingResult(result);
  };

  const loadSample = (sampleText) => {
    setPhishingInput(sampleText);
    const result = analyzePhishingContent(sampleText);
    setPhishingResult(result);
  };

  return (
    <div className="simulator-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
          Interactive Cyber Labs
        </span>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
          Security Analysis & Hygiene Simulator
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Interactive tools to dissect phishing social engineering attacks and evaluate master password defense.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('phishing')}
          className={`btn ${activeTab === 'phishing' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          <ShieldAlert size={16} /> Phishing Awareness Detector
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`btn ${activeTab === 'password' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          <Lock size={16} /> Password Strength Checker
        </button>
      </div>

      {/* TAB 1: PHISHING DETECTOR */}
      {activeTab === 'phishing' && (
        <div className="animate-fade-in">
          {/* Disclaimer Banner */}
          <div className="alert alert-warning" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>Educational Tool Disclaimer:</strong> This detector is a local heuristic simulator designed to illustrate common social engineering deception markers. It does <strong>not</strong> visit, crawl, or execute submitted hyperlinks. Never open unverified links on external devices.
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>
              Inspect a Suspicious Message or URL
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Paste email text, SMS prompts, or URLs below to inspect heuristic threat indicators.
            </p>

            <form onSubmit={handleAnalyzePhishing}>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '130px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                  placeholder="Paste suspicious email text, SMS message, or domain link here..."
                  value={phishingInput}
                  onChange={(e) => setPhishingInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Test Sample Lures:</span>
                  <button
                    type="button"
                    onClick={() => loadSample('URGENT: Your Direct Deposit failed due to a system migration. Click http://payroll-portal.xyz/login within 2 hours or salary withheld. Verify your SSN and routing number immediately.')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  >
                    Payroll Phishing
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('Hey! Claim your $200 Steam gift card right now at bit.ly/free-steam-codes-2026. Please forward your 6-digit verification code to confirm.')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  >
                    2FA Gift Card Scam
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!phishingInput.trim()}
                  className="btn btn-primary btn-sm"
                >
                  <Terminal size={14} /> Analyze Content
                </button>
              </div>
            </form>
          </div>

          {/* Results Display */}
          {phishingResult && (
            <div className="card animate-fade-in" style={{ padding: '2rem', borderTop: `4px solid ${phishingResult.badgeColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <span className="badge" style={{ backgroundColor: `${phishingResult.badgeColor}15`, color: phishingResult.badgeColor, border: `1px solid ${phishingResult.badgeColor}40`, marginBottom: '0.35rem' }}>
                    {phishingResult.riskLevel}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: '#0f172a', margin: 0 }}>
                    {phishingResult.verdictTitle}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: phishingResult.badgeColor }}>
                    {phishingResult.score}<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/100</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Heuristic Threat Score</span>
                </div>
              </div>

              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {phishingResult.summary}
              </p>

              {/* Indicators List */}
              <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                Detected Attack Indicators ({phishingResult.indicators.length}):
              </h4>

              {phishingResult.indicators.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {phishingResult.indicators.map((ind, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: ind.severity === 'danger' ? '#fef2f2' : ind.severity === 'warning' ? '#fffbeb' : '#f0f9ff',
                        border: `1px solid ${ind.severity === 'danger' ? '#fecaca' : ind.severity === 'warning' ? '#fde68a' : '#bae6fd'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '0.9rem', color: ind.severity === 'danger' ? '#991b1b' : ind.severity === 'warning' ? '#92400e' : '#0369a1' }}>
                          {ind.label}
                        </strong>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
                          Matched: "{ind.matchedTerm}"
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', lineHeight: 1.4 }}>
                        {ind.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#059669', fontSize: '0.9rem', margin: 0 }}>
                  ✓ No overt malicious heuristics were flagged in this sample.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PASSWORD CHECKER */}
      {activeTab === 'password' && (
        <div className="animate-fade-in">
          {/* Security Guarantee Banner */}
          <div className="alert alert-success" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <Lock size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>Client-Side Guarantee:</strong> Your password is evaluated strictly in your local browser sandbox using mathematical entropy calculations. It is <strong>never</strong> transmitted over network sockets, cached in databases, or logged.
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>
              Test Password Resilience
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Discover how modern GPU clusters crack weak passwords, and learn to build dictionary-resistant passphrases.
            </p>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Enter a Test Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: '42px', fontSize: '1.05rem', letterSpacing: showPassword ? 'normal' : '0.15em' }}
                  placeholder="Type a password to test..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Strength Meter Bar */}
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                    Strength Rating: <span style={{ color: passwordResult.color }}>{passwordResult.strengthLabel}</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Entropy Score: {passwordResult.score}/100
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${passwordResult.percentage}%`,
                      height: '100%',
                      backgroundColor: passwordResult.color,
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Estimated Crack Time */}
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Estimated Offline Brute-Force Crack Time:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: passwordResult.color, marginTop: '2px' }}>
                {passwordResult.crackTimeEstimate}
              </div>
            </div>

            {/* Diversity Checklist */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#0f172a' }}>Complexity Parameters:</h4>
              <div className="grid-2" style={{ gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.length ? '#059669' : '#64748b' }}>
                  {passwordResult.checks.length ? <CheckCircle2 size={16} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                  <span>12+ Characters Length</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.uppercase ? '#059669' : '#64748b' }}>
                  {passwordResult.checks.uppercase ? <CheckCircle2 size={16} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                  <span>Uppercase Letters (A-Z)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.lowercase ? '#059669' : '#64748b' }}>
                  {passwordResult.checks.lowercase ? <CheckCircle2 size={16} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                  <span>Lowercase Letters (a-z)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.numbers ? '#059669' : '#64748b' }}>
                  {passwordResult.checks.numbers ? <CheckCircle2 size={16} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                  <span>Numeric Digits (0-9)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.symbols ? '#059669' : '#64748b' }}>
                  {passwordResult.checks.symbols ? <CheckCircle2 size={16} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                  <span>Special Symbols (!@#$%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: passwordResult.checks.noPatterns ? '#059669' : '#dc2626' }}>
                  {passwordResult.checks.noPatterns ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span>No Predictable Sequences / Words</span>
                </div>
              </div>
            </div>

            {/* Weaknesses Detected */}
            {passwordResult.weaknesses.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#dc2626', marginBottom: '0.4rem' }}>Identified Vulnerabilities:</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#dc2626', margin: 0 }}>
                  {passwordResult.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.4rem' }}>Security Recommendations:</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                {passwordResult.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
