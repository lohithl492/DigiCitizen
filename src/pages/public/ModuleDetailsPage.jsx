import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  BookOpen,
  AlertCircle,
  Award
} from 'lucide-react';

import { moduleService } from '../../services/moduleService';
import { useAuth } from '../../context/AuthContext';

export default function ModuleDetailsPage() {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError('');
      setSuccessMessage('');

      try {
        const [modList, currentMod] = await Promise.all([
          moduleService.getAllModules(),
          moduleService.getModuleBySlugOrId(id)
        ]);

        if (cancelled) return;

        setAllModules(modList || []);
        setModule(currentMod);

        if (user && currentMod) {
          const userProg = await moduleService.getUserProgress(user.id);

          if (cancelled) return;

          const found = (userProg || []).some(
            (p) =>
              p.module_id === currentMod.id &&
              p.completed
          );

          setIsCompleted(found);
        } else {
          setIsCompleted(false);
        }
      } catch (error) {
        console.error('Error loading module details:', error);

        if (!cancelled) {
          setLoadError(
            'Unable to load this learning module. Please refresh and try again.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id, user]);

  const handleMarkAsCompleted = async () => {
    if (!user) {
      navigate('/login', {
        state: { from: { pathname: `/learn/${id}` } }
      });
      return;
    }

    if (isCompleted || marking) return;

    setMarking(true);
    setSuccessMessage('');

    try {
      await moduleService.markModuleCompleted(user.id, module.id);

      setIsCompleted(true);

      setSuccessMessage(
        'Module marked as completed! You earned +50 Digital Citizenship Points.'
      );

      if (refreshUser) {
        await refreshUser();
      }
    } catch (error) {
      console.error('Error completing module:', error);

      setSuccessMessage('');
      setLoadError(
        error.message || 'Unable to update your progress. Please try again.'
      );
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>
          Loading educational content...
        </p>
      </div>
    );
  }

  if (loadError && !module) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <AlertCircle size={32} color="#dc2626" />

        <h2>Unable to Load Module</h2>

        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          {loadError}
        </p>

        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <h2>Module Not Found</h2>

        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          The requested learning module could not be located.
        </p>

        <Link to="/learn" className="btn btn-primary">
          Return to All Modules
        </Link>
      </div>
    );
  }

  const currentIndex = allModules.findIndex(
    (m) => m.id === module.id || m.slug === module.slug
  );

  const prevModule =
    currentIndex > 0
      ? allModules[currentIndex - 1]
      : null;

  const nextModule =
    currentIndex >= 0 && currentIndex < allModules.length - 1
      ? allModules[currentIndex + 1]
      : null;

  const objectives = Array.isArray(module.learning_objectives)
    ? module.learning_objectives
    : [];

  return (
    <div className="module-details-page">

      {/* Hero Banner */}
      <section
        className="hero-navy"
        style={{ padding: '3rem 0' }}
      >
        <div className="container">

          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/learn"
              style={{
                color: '#93c5fd',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} />
              Back to Curriculum
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <span
                className="hero-badge"
                style={{ marginBottom: '0.75rem' }}
              >
                Module {String(currentIndex + 1).padStart(2, '0')} of 06
              </span>

              <h1
                style={{
                  color: '#ffffff',
                  fontSize: '2.4rem',
                  marginBottom: '0.5rem'
                }}
              >
                {module.title}
              </h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  color: '#cbd5e1',
                  fontSize: '0.9rem',
                  flexWrap: 'wrap'
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Clock size={16} />
                  Estimated Time: {module.estimated_time || '25 mins'}
                </span>

                <span>•</span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <HelpCircle size={16} />
                  9 Assessment Questions
                </span>
              </div>
            </div>

            <Link
              to={`/quiz/${module.id}`}
              className="btn btn-hero"
            >
              Take Module Quiz
              <HelpCircle size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Educational Content */}
      <section
        className="section-py"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div
          className="container"
          style={{ maxWidth: '920px' }}
        >

          {/* Success Message */}
          {successMessage && (
            <div
              className="alert alert-success animate-fade-in"
              style={{ marginBottom: '2rem' }}
            >
              <CheckCircle2 size={20} />

              <div>
                <strong>Congratulations!</strong>
                {' '}
                {successMessage}
              </div>
            </div>
          )}

          {/* Error Message */}
          {loadError && (
            <div
              className="alert alert-danger"
              style={{ marginBottom: '2rem' }}
            >
              <AlertCircle size={20} />
              <div>{loadError}</div>
            </div>
          )}

          {/* Learning Objectives */}
          {objectives.length > 0 && (
            <div
              className="card"
              style={{
                backgroundColor: '#f0f7ff',
                borderColor: '#bfdbfe',
                marginBottom: '2.5rem',
                padding: '1.75rem'
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  color: '#1e3a8a',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <BookOpen size={20} />
                Learning Objectives
              </h3>

              <ul
                style={{
                  paddingLeft: '1.25rem',
                  color: '#334155',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                  margin: 0
                }}
              >
                {objectives.map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Markdown Educational Content */}
          <article className="educational-content">
            {module.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  )
                }}
              >
                {module.content}
              </ReactMarkdown>
            ) : (
              <p>Module content is currently unavailable.</p>
            )}
          </article>

          {/* Completion Card */}
          <div
            className="card"
            style={{
              marginTop: '3.5rem',
              backgroundColor: '#f8fafc',
              borderColor: '#e2e8f0',
              padding: '2rem',
              textAlign: 'center'
            }}
          >
            <h3
              style={{
                fontSize: '1.35rem',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}
            >
              Completed Reading This Module?
            </h3>

            <p
              style={{
                color: '#64748b',
                marginBottom: '1.5rem',
                maxWidth: '600px',
                margin: '0 auto 1.5rem auto'
              }}
            >
              Verify your comprehension by marking this unit
              as finished to log your progress, or proceed
              directly to the assessment quiz.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={handleMarkAsCompleted}
                disabled={marking || isCompleted}
                className={`btn ${
                  isCompleted ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                <CheckCircle2 size={16} />

                {marking
                  ? 'Saving Progress...'
                  : isCompleted
                    ? 'Completed'
                    : 'Mark as Completed (+50 Pts)'}
              </button>

              <Link
                to={`/quiz/${module.id}`}
                className="btn btn-hero"
              >
                Start Module Quiz
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Previous / Next Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '2rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            {prevModule ? (
              <Link
                to={`/learn/${prevModule.slug}`}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ArrowLeft size={16} />
                Previous: {prevModule.title}
              </Link>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Link
                to={`/learn/${nextModule.slug}`}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Next: {nextModule.title}
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                to="/certificate"
                className="btn btn-primary btn-sm"
              >
                View Certificate Requirements
                <Award size={16} />
              </Link>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
