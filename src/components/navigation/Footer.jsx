import React from 'react';
import { Link } from 'react-router-dom';
import ShieldLogo from '../common/ShieldLogo';
import { Shield, Lock, Award, HeartHandshake, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Mission */}
          <div className="footer-brand-col">
            <ShieldLogo size={26} variant="dark" />
            <p className="footer-desc">
              DigiCitizen is an open educational initiative dedicated to cultivating informed, ethical, and resilient digital citizens. 
              We equip students and professionals with hands-on cybersecurity skills, critical media literacy, and data privacy awareness.
            </p>
            <div className="footer-trust-badge">
              <Shield size={16} className="text-primary" />
              <span>Certified Educational Cybersecurity Framework</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Learning Pathways</h4>
            <ul className="footer-links-list">
              <li><Link to="/learn/digital-citizenship-fundamentals">Digital Fundamentals</Link></li>
              <li><Link to="/learn/cybersecurity-awareness">Cybersecurity Awareness</Link></li>
              <li><Link to="/learn/online-privacy-data-protection">Privacy & Data Protection</Link></li>
              <li><Link to="/learn/cyberbullying-online-harassment">Anti-Cyberbullying</Link></li>
              <li><Link to="/learn/digital-ethics-intellectual-property">Digital Ethics & Copyright</Link></li>
              <li><Link to="/learn/fake-news-and-misinformation">Information Verification</Link></li>
            </ul>
          </div>

          {/* Column 3: Interactive Tools */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Interactive Labs</h4>
            <ul className="footer-links-list">
              <li><Link to="/simulator">Phishing Awareness Detector</Link></li>
              <li><Link to="/simulator">Password Strength Checker</Link></li>
              <li><Link to="/scenarios">Real-World Safety Scenarios</Link></li>
              <li><Link to="/leaderboard">Student Honor Roll & Rankings</Link></li>
              <li><Link to="/certificate">Digital Accreditation</Link></li>
            </ul>
          </div>

          {/* Column 4: Platform Standards */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Digital Safety Standards</h4>
            <ul className="footer-standards-list">
              <li>
                <CheckCircle size={14} className="text-success" />
                <span>Zero Commercial Telemetry</span>
              </li>
              <li>
                <Lock size={14} className="text-success" />
                <span>Local-First Password Analysis</span>
              </li>
              <li>
                <Award size={14} className="text-success" />
                <span>Verifiable PDF Certificates</span>
              </li>
              <li>
                <HeartHandshake size={14} className="text-success" />
                <span>Empathetic Online Conduct</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="copyright-text">
              © {new Date().getFullYear()} DigiCitizen Platform. Built for digital literacy, ethical technology engagement, and cyber defense.
            </p>
            <div className="footer-bottom-links">
              <Link to="/about">About Us</Link>
              <span>•</span>
              <Link to="/learn">Curriculum</Link>
              <span>•</span>
              <Link to="/login">Student Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
