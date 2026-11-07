/**
 * Phishing Awareness Detector Utility
 * Educational heuristic analyzer for suspicious emails, messages, and URLs.
 * NOTE: This is an educational heuristic simulation tool, NOT an automated web crawler
 * and does not execute or visit submitted URLs.
 */

export function analyzePhishingContent(input) {
  if (!input || !input.trim()) {
    return {
      score: 0,
      riskLevel: 'LOW',
      indicators: [],
      summary: 'Please enter a message or URL to analyze.'
    };
  }

  const text = input.trim();
  const lower = text.toLowerCase();
  const indicators = [];
  let riskScore = 0;

  // 1. Check for Urgent / Coercive Language
  const urgencyKeywords = [
    { word: 'immediate', label: 'Urgent Demands', weight: 20, desc: 'Creates artificial urgency to panic the victim into bypassing skepticism.' },
    { word: 'urgent', label: 'Urgent Demands', weight: 20, desc: 'Uses panic-inducing words to rush the recipient.' },
    { word: 'within 2 hours', label: 'Tight Time Window', weight: 25, desc: 'Strict short deadlines are classic social engineering tactics.' },
    { word: 'within 24 hours', label: 'Time Pressure', weight: 15, desc: 'Manufactured deadlines discourage out-of-band verification.' },
    { word: 'account suspended', label: 'Account Suspension Threat', weight: 30, desc: 'Threatens service denial or punitive consequence.' },
    { word: 'suspended', label: 'Threatening Language', weight: 15, desc: 'Coercive threat indicating account termination.' },
    { word: 'unauthorized login', label: 'Fear of Breach', weight: 20, desc: 'Fakes a security alert to induce hasty credential entry.' },
    { word: 'salary withheld', label: 'Financial Intimidation', weight: 35, desc: 'Catastrophic financial threat used in business email compromise.' },
    { word: 'act now', label: 'High Urgency Call-to-Action', weight: 15, desc: 'Aggressive call to action.' },
    { word: 'final notice', label: 'Escalation Pressure', weight: 25, desc: 'Pressure tactic suggesting immediate negative repercussion.' }
  ];

  urgencyKeywords.forEach((kw) => {
    if (lower.includes(kw.word)) {
      riskScore += kw.weight;
      if (!indicators.some((i) => i.label === kw.label)) {
        indicators.push({
          type: 'URGENT_LANGUAGE',
          label: kw.label,
          matchedTerm: kw.word,
          description: kw.desc,
          severity: kw.weight >= 25 ? 'danger' : 'warning'
        });
      }
    }
  });

  // 2. Sensitive Information Requests
  const sensitiveKeywords = [
    { word: 'password', label: 'Password Request', weight: 35, desc: 'Legitimate organizations never ask for your password via email or chat.' },
    { word: 'ssn', label: 'Social Security Number', weight: 40, desc: 'High-risk identity metric requested over unencrypted channels.' },
    { word: 'social security', label: 'Social Security Number', weight: 40, desc: 'Requests for government identification are extreme red flags.' },
    { word: 'credit card', label: 'Payment Card Details', weight: 30, desc: 'Harvesting payment instrument numbers directly.' },
    { word: 'routing number', label: 'Banking Credentials', weight: 30, desc: 'Attempting direct deposit or bank account diversion.' },
    { word: 'gift card', label: 'Gift Card Demands', weight: 40, desc: 'Untraceable currency often demanded by fraud rings.' },
    { word: 'crypto', label: 'Cryptocurrency Transfer', weight: 30, desc: 'Irreversible transaction mechanism common in extortion.' },
    { word: 'verification code', label: '2FA Token Interception', weight: 35, desc: 'Attempting to intercept your one-time multi-factor authentication SMS or prompt.' },
    { word: 'verify your account', label: 'Credential Harvesting Prompt', weight: 20, desc: 'Generic lure leading to spoofed credential landing pages.' }
  ];

  sensitiveKeywords.forEach((kw) => {
    if (lower.includes(kw.word)) {
      riskScore += kw.weight;
      if (!indicators.some((i) => i.label === kw.label)) {
        indicators.push({
          type: 'SENSITIVE_DATA_REQUEST',
          label: kw.label,
          matchedTerm: kw.word,
          description: kw.desc,
          severity: 'danger'
        });
      }
    }
  });

  // 3. Link & Domain Heuristics
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const foundUrls = text.match(urlPattern) || [];

  if (foundUrls.length > 0) {
    indicators.push({
      type: 'CONTAINS_LINKS',
      label: 'Embedded Hyperlinks',
      matchedTerm: `${foundUrls.length} link(s) found`,
      description: 'Phishing emails direct victims to lookalike fake portals to steal credentials.',
      severity: 'info'
    });

    foundUrls.forEach((url) => {
      const lowerUrl = url.toLowerCase();
      // IP address in URL
      if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(url)) {
        riskScore += 45;
        indicators.push({
          type: 'SUSPICIOUS_URL',
          label: 'Raw IP Address in URL',
          matchedTerm: url,
          description: 'Legitimate institutions use registered domain names, not bare IP addresses.',
          severity: 'danger'
        });
      }
      // Suspicious TLDs
      if (/\.(xyz|top|work|country|stream|kim|party|gq|cf|ml)\b/.test(lowerUrl)) {
        riskScore += 35;
        indicators.push({
          type: 'SUSPICIOUS_TLD',
          label: 'High-Risk Top Level Domain',
          matchedTerm: url,
          description: 'Uses inexpensive or disposable domain extensions frequently leveraged by threat actors.',
          severity: 'danger'
        });
      }
      // URL shorteners
      if (/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy)/.test(lowerUrl)) {
        riskScore += 25;
        indicators.push({
          type: 'URL_SHORTENER',
          label: 'Obfuscated Link (URL Shortener)',
          matchedTerm: url,
          description: 'Shorteners conceal the true destination domain of the hyperlink.',
          severity: 'warning'
        });
      }
      // Brand impersonation in subdomains
      if (/(paypal|apple|google|netflix|microsoft|amazon|bank|chase|wellsfargo).*\.(com|org|net)\.[a-z]{2,}/.test(lowerUrl) ||
          /(paypal|apple|google|netflix|microsoft|amazon).*(login|secure|verify|account)/.test(lowerUrl)) {
        riskScore += 40;
        indicators.push({
          type: 'BRAND_SPOOF',
          label: 'Lookalike Brand Impersonation',
          matchedTerm: url,
          description: 'Appears to mimic a well-known brand inside a secondary subdomain or suspicious path.',
          severity: 'danger'
        });
      }
    });
  }

  // 4. Determine Risk Tier
  let riskLevel = 'LOW';
  let badgeColor = 'var(--color-success)';
  let verdictTitle = 'Minimal Phishing Indicators Detected';
  let summary = 'This content does not show overt markers of common mass-phishing lures. However, always exercise caution with unexpected correspondence.';

  if (riskScore >= 60) {
    riskLevel = 'HIGH_RISK';
    badgeColor = 'var(--color-danger)';
    verdictTitle = 'Probable Phishing Attack / High Threat';
    summary = 'Strong indicators of social engineering, credential harvesting, or spoofing detected. Do not click links or disclose confidential data.';
  } else if (riskScore >= 25) {
    riskLevel = 'CAUTION';
    badgeColor = 'var(--color-warning)';
    verdictTitle = 'Suspicious Elements Detected (Proceed with Caution)';
    summary = 'Contains manipulative urgency, sensitive prompts, or shortened links. Verify via official out-of-band communication before taking action.';
  }

  return {
    score: Math.min(100, riskScore),
    riskLevel,
    badgeColor,
    verdictTitle,
    summary,
    indicators,
    educationalDisclaimer: 'DigiCitizen Phishing Detector is an educational heuristic simulation designed to illustrate common attack vectors. It is not an anti-malware gateway and does not inspect external web infrastructure.'
  };
}
