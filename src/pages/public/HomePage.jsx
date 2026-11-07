import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Compass, Lock, EyeOff, HeartHandshake, Scale, AlertTriangle, 
  ArrowRight, CheckCircle2, Award, Zap, Users, BookOpen, Sparkles, Terminal
} from 'lucide-react';
import { moduleService } from '../../services/moduleService';
import ShieldLogo from '../../components/common/ShieldLogo';

const ICON_MAP = {
  Compass: Compass,
  ShieldAlert: Shield,
  EyeOff: EyeOff,
  HeartHandshake: HeartHandshake,
  Scale: Scale,
  AlertTriangle: AlertTriangle
};

export default function HomePage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await moduleService.getAllModules();
        setModules(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="home-page">
      {/* 1. DARK NAVY HERO SECTION */}
      <section className="hero-navy">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in">
              <Shield size={16} /> Certified Digital Safety Initiative
            </div>
            <h1 className="hero-title animate-fade-in">
              Empowering the Next Generation of <span className="hero-title-accent">Safe, Ethical Digital Citizens</span>
            </h1>
            <p className="hero-description animate-fade-in">
              DigiCitizen is an interactive cybersecurity and digital citizenship awareness platform. 
              Master data privacy, neutralize social engineering, combat cyberbullying, and earn accredited credentials through real-world labs.
            </p>
            <div className="hero-cta-group animate-fade-in">
              <Link to="/register" className="btn btn-hero">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/learn" className="btn btn-outline-white">
                Explore 6 Modules
              </Link>
            </div>
          </div>

          {/* Hero Feature Highlight Card */}
          <div className="hero-card-preview animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#93c5fd' }}>Cyber Defense Lab Active</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>SEC-V2.5</span>
            </div>

            <div className="hero-metric-item">
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                <BookOpen size={20} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '2px' }}>6 Core Academic Modules</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>From digital footprint management to AI copyright ethics.</p>
              </div>
            </div>

            <div className="hero-metric-item">
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                <Terminal size={20} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '2px' }}>Interactive Threat Detectors</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Heuristic phishing analysis & client-side password strength audits.</p>
              </div>
            </div>

            <div className="hero-metric-item">
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
                <Award size={20} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '2px' }}>Verifiable PDF Certificates</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Demonstrate accredited digital citizenship to schools & employers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION TO DIGITAL CITIZENSHIP */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Core Philosophy</span>
            <h2 className="section-title">What is Modern Digital Citizenship?</h2>
            <p className="section-subtitle">
              Digital citizenship transcends basic internet access. It is the active practice of digital responsibility, 
              protecting fundamental rights, and engaging empathetically across global online ecosystems.
            </p>
          </div>

          <div className="grid-3">
            <div className="card card-hover">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Safety & Threat Sovereignty</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Understanding how threat actors engineer deceit. Equipping yourself with multi-factor authentication, encryption, and proactive vulnerability awareness.
              </p>
            </div>

            <div className="card card-hover">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Empathy & Upstander Action</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Recognizing digital bullying, doxxing, and flaming. Transitioning from a passive bystander into a courageous upstander who protects peers.
              </p>
            </div>

            <div className="card card-hover">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Scale size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Ethics, Truth & Information Integrity</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Navigating copyright, Fair Use, creative attribution, and utilizing lateral reading to debunk deepfakes, clickbait, and algorithmic misinformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIX LEARNING MODULES SHOWCASE */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Comprehensive Curriculum</span>
            <h2 className="section-title">Explore the Six Learning Modules</h2>
            <p className="section-subtitle">
              Carefully researched modules designed by cybersecurity professionals and educators, complete with interactive assessments and practical takeaways.
            </p>
          </div>

          <div className="grid-3">
            {modules.map((mod) => {
              const IconComponent = ICON_MAP[mod.icon] || Shield;
              return (
                <div key={mod.id} className="module-card">
                  <div className="module-icon-wrap">
                    <IconComponent size={26} />
                  </div>
                  <h3 className="module-card-title">{mod.title}</h3>
                  <p className="module-card-desc">{mod.description}</p>
                  
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Key Objectives:
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      {(mod.learning_objectives || []).slice(0, 2).map((obj, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="module-card-footer">
                    <span className="module-time-chip">
                      ⏱️ {mod.estimated_time || '25 mins'}
                    </span>
                    <Link to={`/learn/${mod.slug}`} className="btn btn-primary btn-sm">
                      Start Learning <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/learn" className="btn btn-secondary btn-lg">
              View Complete Syllabus & Objectives <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM FEATURES SECTION */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Interactive Learning Tools</span>
            <h2 className="section-title">Beyond Theory: Hands-On Security Labs</h2>
            <p className="section-subtitle">
              DigiCitizen bridges academic understanding with real-world technical skills through safe, heuristic simulators.
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Heuristic Phishing Detector</h3>
                    <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Paste suspicious emails, SMS texts, or hyperlinks to inspect deceptive indicators: manufactured urgency, lookalike domains, and credential-harvesting prompts.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Lock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Zero-Knowledge Password Strength Checker</h3>
                    <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Evaluate entropy, dictionary patterns, and estimated brute-force crack time entirely in your browser. Passwords are never saved, cached, or transmitted.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Branching Online Safety Scenarios</h3>
                    <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Engage in realistic dilemmas: payroll phishing traps, group chat harassment, marketplace overpayment scams, and viral breaking news hoaxes.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link to="/simulator" className="btn btn-primary">
                  Launch Interactive Labs <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Interactive Preview Box */}
            <div className="card" style={{ padding: '2rem', border: '1px solid #bfdbfe', backgroundColor: '#f8fafc', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Live Lab Preview: Phishing Heuristics</span>
                <span className="badge badge-warning">Heuristic Mode</span>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', marginBottom: '1rem', fontFamily: 'monospace' }}>
                From: security@paypal-verify-alert.xyz<br />
                Subject: URGENT: Account Limited Within 2 Hours<br />
                Body: Click here to verify your Social Security Number immediately...
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertTriangle size={16} /> Lookalike Domain: .xyz generic top-level domain
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertTriangle size={16} /> Coercive Urgency: "Within 2 Hours"
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertTriangle size={16} /> High Risk: Soliciting Social Security Number
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW THE PLATFORM WORKS */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-accent-light)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Learning Journey</span>
            <h2 className="section-title">How DigiCitizen Works</h2>
            <p className="section-subtitle">
              A structured, evidence-based educational pathway taking students from foundational understanding to verifiable cybersecurity certification.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.75rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.35rem', fontWeight: 800 }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Study Core Modules</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Engage with 6 in-depth modules covering cyber hygiene, privacy legislation, netiquette, upstander intervention, copyright, and misinformation analysis.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.75rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.35rem', fontWeight: 800 }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Test Knowledge & Labs</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Answer 54 database-backed MCQ assessments (9 questions per module) with instant explanatory feedback. Navigate real-world branching scenarios.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.75rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#d97706', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.35rem', fontWeight: 800 }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Earn Accreditation</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Unlock achievement badges, climb the student leaderboard, and generate an official verifiable PDF Certificate of Digital Citizenship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="section-py" style={{ backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1.25rem' }}>
            Ready to Become a Certified Digital Citizen?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2.25rem' }}>
            Join students and lifelong learners worldwide. Complete interactive modules, test your cybersecurity reflexes, and earn your official digital certificate today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-hero">
              Create Your Free Student Account <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-outline-white">
              Student Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
