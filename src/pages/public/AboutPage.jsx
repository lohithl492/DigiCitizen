import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Target, HeartHandshake, BookOpen, 
  Users, CheckCircle2, ArrowRight, Lock, Award 
} from 'lucide-react';
import ShieldLogo from '../../components/common/ShieldLogo';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Header Banner */}
      <section className="hero-navy" style={{ padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="hero-badge" style={{ margin: '0 auto 1.25rem auto' }}>
            <ShieldCheck size={16} /> Platform Mission & Educational Vision
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
            About the <span className="hero-title-accent">DigiCitizen</span> Platform
          </h1>
          <p className="hero-description" style={{ margin: '0 auto', fontSize: '1.1rem' }}>
            Fostering ethical responsibility, proactive cyber defense, and digital literacy across connected communities.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Section 1: What Digital Citizenship Means */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-tag">Definition & Foundation</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
              What Does Digital Citizenship Mean?
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Digital citizenship is the ongoing practice of navigating the online world safely, ethically, and responsibly. 
              As technology embeds itself into every facet of modern education, business, governance, and human connection, 
              the boundary between "physical reality" and "digital presence" has dissolved.
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Being a digital citizen means recognizing that digital spaces are public commons. Behind every screen is a human being; 
              every piece of data created contributes to a permanent digital footprint; and every user holds both rights to free expression 
              and responsibilities to protect the rights, privacy, and safety of others.
            </p>
          </div>

          {/* Section 2: Why Digital Responsibility Matters */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-tag">Societal Impact</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
              Why Digital Responsibility Matters Today
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              The proliferation of social media algorithms, generative AI, automated surveillance, and sophisticated cyber-crime syndicates 
              presents challenges that traditional curricula often overlook:
            </p>

            <div className="grid-2">
              <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Permanent Digital Footprints</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Careless posts, leaked credentials, or passive tracking data persist across web caches and archives, impacting academic admissions and careers years later.
                </p>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Targeted Cyber Threats</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Social engineering and spear-phishing specifically exploit psychological urgency, fear, and trust to compromise identities and financial assets.
                </p>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Online Harassment & Doxxing</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Pseudo-anonymity often emboldens harmful cyberbullying, defamation, and digital exclusion, creating severe psychological distress.
                </p>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Information Disorder & Deepfakes</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Sensationalist clickbait, viral hoaxes, and AI-generated synthetic media polarize civic discourse unless users apply lateral verification techniques.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Platform Objectives */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-tag">Our Mandate</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
              Core Platform Objectives
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={22} className="text-primary" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Universal Cyber Literacy:</strong> Provide open, high-quality, jargon-free education covering threat vectors, privacy rights, and ethical principles.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={22} className="text-primary" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Actionable Heuristic Competence:</strong> Move beyond passive reading through interactive simulators (phishing heuristics, zero-knowledge password analysis, and branching scenarios).
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={22} className="text-primary" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Cultivating Upstander Culture:</strong> Transform bystanders into proactive upstanders who support peers, document harassment securely, and maintain digital decency.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <CheckCircle2 size={22} className="text-primary" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Verifiable Accreditation:</strong> Award standardized, tamper-evident PDF Certificates of Digital Citizenship upon rigorous assessment completion.
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Who Can Benefit */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="section-tag">Target Audience</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
              Who Benefits from DigiCitizen?
            </h2>

            <div className="grid-2">
              <div className="card card-hover">
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Users size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Students & Young Adults</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Build healthy digital habits, protect personal privacy, avoid academic plagiarism, and master cyber defense before entering university or the workforce.
                </p>
              </div>

              <div className="card card-hover">
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <BookOpen size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Educators & Schools</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Incorporate a structured 6-module curriculum and 54-question assessment database into classroom digital citizenship and computer science programs.
                </p>
              </div>

              <div className="card card-hover">
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <HeartHandshake size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Parents & Families</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Learn how to guide children through online privacy dilemmas, recognize signs of cyberbullying, and debunk viral panic hoaxes.
                </p>
              </div>

              <div className="card card-hover">
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Lock size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Professionals & Organizations</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Reinforce enterprise security awareness training against business email compromise, social engineering, and unauthorized credential disclosure.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="card" style={{ backgroundColor: '#f0f7ff', borderColor: '#bfdbfe', textAlign: 'center', padding: '3rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#1e3a8a' }}>Begin Your Digital Citizenship Journey</h3>
            <p style={{ color: '#3b82f6', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              Explore our six comprehensive modules, test your cybersecurity reflexes in the simulator, and claim your verified certificate.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/register" className="btn btn-primary">Create Student Account</Link>
              <Link to="/learn" className="btn btn-secondary">Browse Modules</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
