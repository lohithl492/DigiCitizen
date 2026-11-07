import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { scenarioService } from '../../services/scenarioService';
import {
  HeartHandshake, CheckCircle2, AlertTriangle, ArrowRight,
  Sparkles, Award, RotateCcw, ShieldCheck, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScenariosPage() {
  const { user, refreshUser } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [userAttempts, setUserAttempts] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadScenarios() {
      try {
        const [scenList, attemptsList] = await Promise.all([
          scenarioService.getAllScenarios(),
          user ? scenarioService.getUserScenarioAttempts(user.id) : []
        ]);
        setScenarios(scenList || []);
        setUserAttempts(attemptsList || []);
        if (scenList && scenList.length > 0 && !activeScenarioId) {
          setActiveScenarioId(scenList[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadScenarios();
  }, [user]);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
  const userAttemptForActive = userAttempts.find((a) => a.scenario_id === activeScenario?.id);

  // Completed scenario IDs set
  const completedScenarioIds = new Set(userAttempts.map((a) => a.scenario_id));

  const handleSelectOption = (optId) => {
    if (userAttemptForActive || outcome) return; // Already resolved
    setSelectedOptionId(optId);
  };

  const handleConfirmChoice = async () => {
    if (!selectedOptionId || !activeScenario || !user) return;

    const chosenOption = (activeScenario.options || []).find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;

    setSubmitting(true);
    try {
      await scenarioService.submitScenarioAttempt({
        userId: user.id,
        scenarioId: activeScenario.id,
        chosenOptionId: selectedOptionId,
        pointsEarned: chosenOption.points || 0
      });

      setOutcome(chosenOption);

      // Refresh attempts and user points
      const updatedAttempts = await scenarioService.getUserScenarioAttempts(user.id);
      setUserAttempts(updatedAttempts);

      if (chosenOption.is_recommended) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      await refreshUser();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchScenario = (scenId) => {
    setActiveScenarioId(scenId);
    setSelectedOptionId(null);
    setOutcome(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Loading interactive dilemmas...</p>
      </div>
    );
  }

  const currentOutcome = outcome || (userAttemptForActive ? (activeScenario.options || []).find((o) => o.id === userAttemptForActive.chosen_option_id) : null);

  return (
    <div className="scenarios-page" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
          Decision-Making Lab
        </span>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
          Real-World Online Safety Scenarios
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Navigate high-stakes digital situations. Your choices dictate outcomes and test whether you act as a bystander or an active upstander.
        </p>
      </div>

      {/* Scenario Selector Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {scenarios.map((scen, idx) => {
          const isDone = completedScenarioIds.has(scen.id);
          const isCurrent = scen.id === activeScenario?.id;

          return (
            <div
              key={scen.id}
              onClick={() => handleSwitchScenario(scen.id)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: `2px solid ${isCurrent ? '#2563eb' : isDone ? '#a7f3d0' : 'var(--border-light)'}`,
                backgroundColor: isCurrent ? '#eff6ff' : isDone ? '#f0fdf4' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: isCurrent ? '#1d4ed8' : '#64748b' }}>
                  Case 0{idx + 1}
                </span>
                {isDone && <CheckCircle2 size={16} className="text-success" />}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>
                {scen.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE SCENARIO CARD */}
      {activeScenario && (
        <div className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary">{activeScenario.category}</span>
            {userAttemptForActive && (
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> Completed (+{userAttemptForActive.points_earned} pts)
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '1.45rem', color: '#0f172a', marginBottom: '1rem' }}>
            {activeScenario.title}
          </h2>

          {/* Context Story */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '1.5rem',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#334155',
              marginBottom: '2rem',
              whiteSpace: 'pre-line'
            }}
          >
            {activeScenario.context_story}
          </div>

          {/* Options Choice List */}
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>
            What is your decision?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            {(activeScenario.options || []).map((opt) => {
              const isSelected = selectedOptionId === opt.id || (userAttemptForActive && userAttemptForActive.chosen_option_id === opt.id);
              const isResolved = Boolean(currentOutcome);

              let borderColor = 'var(--border-light)';
              let bgColor = '#ffffff';

              if (isResolved) {
                if (opt.is_recommended) {
                  borderColor = '#10b981';
                  bgColor = '#ecfdf5';
                } else if (isSelected && !opt.is_recommended) {
                  borderColor = '#ef4444';
                  bgColor = '#fef2f2';
                }
              } else if (isSelected) {
                borderColor = '#2563eb';
                bgColor = '#eff6ff';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    border: `2px solid ${borderColor}`,
                    backgroundColor: bgColor,
                    cursor: isResolved ? 'default' : 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      backgroundColor: isSelected ? '#2563eb' : 'transparent',
                      color: '#ffffff'
                    }}
                  >
                    {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.5 }}>
                      {opt.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button if not yet completed */}
          {!currentOutcome && (
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleConfirmChoice}
                disabled={!selectedOptionId || submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Recording Decision...' : 'Confirm Decision & View Consequences'}
              </button>
            </div>
          )}

          {/* OUTCOME CONSEQUENCES & EDUCATIONAL LESSON */}
          {currentOutcome && (
            <div
              className="card animate-fade-in"
              style={{
                marginTop: '1.5rem',
                backgroundColor: currentOutcome.is_recommended ? '#f0fdf4' : '#fffbeb',
                borderColor: currentOutcome.is_recommended ? '#a7f3d0' : '#fde68a',
                padding: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                {currentOutcome.is_recommended ? (
                  <CheckCircle2 size={24} className="text-success" />
                ) : (
                  <AlertTriangle size={24} className="text-warning" />
                )}
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', margin: 0 }}>
                  Consequence of Your Decision:
                </h4>
              </div>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#334155', marginBottom: '1.25rem' }}>
                {currentOutcome.consequence}
              </p>

              <div style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2563eb', marginBottom: '4px' }}>
                  Key Educational Takeaway:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                  {currentOutcome.safety_lesson}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
