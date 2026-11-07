/**
 * Password Strength Checker Utility
 * Analyzes password complexity strictly client-side.
 * SECURITY GUARANTEE: Never transmits, caches, or logs user passwords to any server.
 */

export function checkPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      strengthLabel: 'Empty',
      strengthClass: 'empty',
      percentage: 0,
      color: '#94a3b8',
      crackTimeEstimate: 'Instant',
      checks: {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        noPatterns: true
      },
      weaknesses: [],
      suggestions: ['Start typing a password to evaluate its resilience.']
    };
  }

  let score = 0;
  const weaknesses = [];
  const suggestions = [];

  // Checks
  const hasMinLength = password.length >= 8;
  const hasGoodLength = password.length >= 12;
  const hasGreatLength = password.length >= 16;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  // Length scoring
  if (password.length < 8) {
    weaknesses.push('Too short (under 8 characters). Modern brute-force engines crack short passwords rapidly.');
    suggestions.push('Increase length to at least 12-16 characters or use a passphrase.');
  } else if (password.length >= 8 && password.length < 12) {
    score += 25;
    suggestions.push('Consider aiming for 14+ characters to guard against offline hash cracking.');
  } else if (password.length >= 12 && password.length < 16) {
    score += 40;
  } else {
    score += 55; // 16+ characters
  }

  // Character variety scoring
  let diversityCount = 0;
  if (hasUpper) diversityCount++;
  if (hasLower) diversityCount++;
  if (hasNumber) diversityCount++;
  if (hasSymbol) diversityCount++;

  score += diversityCount * 10;

  if (!hasUpper) suggestions.push('Include uppercase letters (A-Z).');
  if (!hasLower) suggestions.push('Include lowercase letters (a-z).');
  if (!hasNumber) suggestions.push('Include numbers (0-9).');
  if (!hasSymbol) suggestions.push('Include special characters or punctuation symbols (!@#$%^&*).');

  // Pattern Detection
  let patternFound = false;

  // 1. Sequential characters (e.g. 1234, abcd)
  if (/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi)/i.test(password)) {
    patternFound = true;
    score -= 15;
    weaknesses.push('Contains predictable sequential numbers or letters (e.g. "123", "abc").');
    suggestions.push('Avoid sequential runs of characters.');
  }

  // 2. Keyboard walks (e.g. qwerty, asdf)
  if (/(qwerty|asdfgh|zxcvbn|qazwsx|1q2w3e)/i.test(password)) {
    patternFound = true;
    score -= 20;
    weaknesses.push('Contains standard keyboard row patterns (e.g. "qwerty").');
    suggestions.push('Avoid common keyboard walks.');
  }

  // 3. Repeated characters (e.g. aaa, 111)
  if (/(.)\1{2,}/.test(password)) {
    patternFound = true;
    score -= 10;
    weaknesses.push('Contains characters repeated three or more times consecutively.');
  }

  // 4. Common dictionary passwords
  const commonPasswords = ['password', 'admin', 'welcome', 'login', 'letmein', 'iloveyou', 'sunshine', 'football', 'monkey', 'dragon'];
  if (commonPasswords.some((w) => password.toLowerCase().includes(w))) {
    patternFound = true;
    score -= 30;
    weaknesses.push('Contains a widely known dictionary word present in leaked credential lists.');
    suggestions.push('Never use common dictionary words or names.');
  }

  // Clamp score between 0 and 100
  score = Math.max(5, Math.min(100, score));

  // Determine Label & Crack Time Estimate
  let strengthLabel = 'Very Weak';
  let strengthClass = 'very-weak';
  let color = '#ef4444';
  let crackTimeEstimate = 'A few seconds';

  if (score >= 85) {
    strengthLabel = 'Very Strong';
    strengthClass = 'very-strong';
    color = '#10b981';
    crackTimeEstimate = 'Centuries (Resistant to modern offline hash clusters)';
  } else if (score >= 65) {
    strengthLabel = 'Strong';
    strengthClass = 'strong';
    color = '#059669';
    crackTimeEstimate = 'Several years';
  } else if (score >= 45) {
    strengthLabel = 'Moderate';
    strengthClass = 'moderate';
    color = '#f59e0b';
    crackTimeEstimate = 'A few hours to days';
  } else if (score >= 25) {
    strengthLabel = 'Weak';
    strengthClass = 'weak';
    color = '#f97316';
    crackTimeEstimate = 'A few minutes';
  }

  return {
    score,
    strengthLabel,
    strengthClass,
    percentage: score,
    color,
    crackTimeEstimate,
    checks: {
      length: hasGoodLength,
      uppercase: hasUpper,
      lowercase: hasLower,
      numbers: hasNumber,
      symbols: hasSymbol,
      noPatterns: !patternFound
    },
    weaknesses,
    suggestions: suggestions.length > 0 ? suggestions : ['Excellent password! Unique, diverse, and resistant to dictionary attacks.']
  };
}
