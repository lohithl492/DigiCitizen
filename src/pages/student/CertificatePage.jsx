import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { achievementService } from '../../services/achievementService';
import { generateCertificatePDF } from '../../utils/certificateGenerator';
import {
  Award, CheckCircle2, Lock, Download, ShieldCheck,
  AlertCircle, ArrowRight, Sparkles, BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificatePage() {
  const { user } = useAuth();
  const [eligibility, setEligibility] = useState({ eligible: false, completedModules: 0, totalModules: 6, passedQuizzes: 0 });
  const [existingCert, setExistingCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function checkEligibility() {
      if (!user) return;
      try {
        const [elig, cert] = await Promise.all([
          achievementService.checkCertificateEligibility(user.id),
          achievementService.getUserCertificate(user.id)
        ]);
        setEligibility(elig);
        setExistingCert(cert);
      } catch (err) {
        console.error('Failed to verify certificate eligibility', err);
      } finally {
        setLoading(false);
      }
    }
    checkEligibility();
  }, [user]);

  const handleDownloadCertificate = async () => {
    if (!eligibility.eligible && !existingCert) return;

    setGenerating(true);
    try {
      let certNumber = existingCert?.certificate_number;

      if (!existingCert) {
        const newCert = await achievementService.issueCertificate(user.id, user.full_name);
        setExistingCert(newCert);
        certNumber = newCert?.certificate_number;
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Generate the PDF
      generateCertificatePDF({
        studentName: user.full_name || 'Student Learner',
        certificateNumber: certNumber || 'DC-893120',
        issuedDate: existingCert?.issued_at || new Date().toISOString()
      });
    } catch (e) {
      console.error('Error generating certificate PDF', e);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Auditing course completion and assessment requirements...</p>
      </div>
    );
  }

  const isEligible = eligibility.eligible || Boolean(existingCert);
  const certNumber = existingCert?.certificate_number || 'DC-PENDING';

  return (
    <div className="certificate-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
          Official Credential
        </span>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
          Certificate of Digital Citizenship
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Verifiable accreditation awarded to students completing the comprehensive digital citizenship curriculum.
        </p>
      </div>

      {/* ELIGIBILITY STATUS CARD */}
      <div
        className="card"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          backgroundColor: isEligible ? '#ecfdf5' : '#ffffff',
          borderColor: isEligible ? '#a7f3d0' : 'var(--border-light)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: isEligible ? '#10b981' : '#f1f5f9',
                color: isEligible ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isEligible ? <Award size={24} /> : <Lock size={22} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
                {isEligible ? 'Accreditation Status: Satisfied' : 'Accreditation Status: In Progress'}
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {isEligible
                  ? 'All core completion requirements satisfied. Your certificate is verified.'
                  : 'Complete all 6 learning modules to qualify for graduation certification.'}
              </span>
            </div>
          </div>

          {isEligible && (
            <button
              onClick={handleDownloadCertificate}
              disabled={generating}
              className="btn btn-hero"
            >
              <Download size={18} /> {generating ? 'Generating PDF...' : 'Download Official PDF Certificate'}
            </button>
          )}
        </div>

        {/* Progress Requirements Breakdown */}
        <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.75rem' }}>
            Mandatory Criteria:
          </div>
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
              {eligibility.completedModules >= 6 ? (
                <CheckCircle2 size={18} className="text-success" />
              ) : (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />
              )}
              <span>
                Complete All 6 Learning Modules ({eligibility.completedModules} / 6 finished)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
              {eligibility.passedQuizzes > 0 ? (
                <CheckCircle2 size={18} className="text-success" />
              ) : (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #cbd5e1' }} />
              )}
              <span>
                Assessment Passing Grade Record ({eligibility.passedQuizzes} quizzes passed)
              </span>
            </div>
          </div>
        </div>

        {!isEligible && (
          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <Link to="/learn" className="btn btn-primary btn-sm">
              Resume Incomplete Modules <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* LIVE CERTIFICATE VISUAL PREVIEW */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          Certificate Visual Representation
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          Official high-resolution vector PDF includes verifiable digital ID and platform seal.
        </p>

        {/* Framed Certificate Mockup */}
        <div
          className="card"
          style={{
            padding: '3rem 2.5rem',
            backgroundColor: '#ffffff',
            border: '8px double #1e3a8a',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-xl)',
            textAlign: 'center',
            position: 'relative',
            opacity: isEligible ? 1 : 0.65,
            filter: isEligible ? 'none' : 'grayscale(30%)'
          }}
        >
          {/* Top Title */}
          <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            DigiCitizen Educational Initiative
          </div>

          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', color: '#1e3a8a', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Certificate of Digital Citizenship
          </h2>

          <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            THIS ACCREDITATION IS PROUDLY CONFERRED UPON
          </div>

          {/* Student Name */}
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#0f172a',
              fontFamily: 'serif',
              borderBottom: '2px solid #2563eb',
              display: 'inline-block',
              paddingBottom: '0.35rem',
              marginBottom: '1.25rem',
              minWidth: '280px'
            }}
          >
            {user?.full_name || 'Student Learner'}
          </div>

          {/* Description */}
          <p style={{ maxWidth: '640px', margin: '0 auto 2rem auto', fontSize: '0.925rem', color: '#475569', lineHeight: 1.7 }}>
            For successfully demonstrating exemplary mastery in digital ethics, cybersecurity defense, data privacy sovereignty, 
            responsible communication, and critical media literacy across all 6 core modules and verified assessments of the DigiCitizen Platform.
          </p>

          {/* Bottom Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                Conferment Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>DigiCitizen Academic Registry</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid #bfdbfe' }}>
              <ShieldCheck size={18} className="text-primary" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af' }}>VERIFIED ACCREDITATION</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                Credential ID: {certNumber}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tamper-evident verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
