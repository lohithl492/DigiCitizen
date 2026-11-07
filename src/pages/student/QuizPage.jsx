import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { quizService } from '../../services/quizService';
import confetti from 'canvas-confetti';
import {
  HelpCircle, ArrowLeft, ArrowRight, CheckCircle2,
  XCircle, Award, RotateCcw, ShieldCheck, Sparkles
} from 'lucide-react';

export default function QuizPage() {
  const { id } = useParams(); // module ID or quiz ID
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionId }
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      try {
        const data = await quizService.getQuizByModuleId(id);
        if (data) {
          setQuiz(data);
          setQuestions(data.questions || []);
        }
      } catch (err) {
        console.error('Failed to load quiz data', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  const handleSelectOption = (questionId, optionId) => {
    if (submitted) return; // Prevent change after submission
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      // Grade quiz
      let correctCount = 0;
      questions.forEach((q) => {
        const chosenId = answers[q.id];
        const correctOpt = (q.options || []).find((opt) => opt.is_correct);
        if (correctOpt && chosenId === correctOpt.id) {
          correctCount++;
        }
      });

      const totalQuestions = questions.length || 9;
      const percentage = (correctCount / totalQuestions) * 100;
      const passed = percentage >= (quiz?.passing_score || 70);

      // Save to Supabase
      const savedAttempt = await quizService.submitQuizAttempt({
        userId: user.id,
        quizId: quiz.id,
        answers,
        score: correctCount,
        totalQuestions,
        percentage,
        passed
      });

      setResult({
        score: correctCount,
        totalQuestions,
        percentage: Number(percentage.toFixed(1)),
        passed
      });
      setSubmitted(true);

      if (passed) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      await refreshUser();
    } catch (e) {
      console.error('Failed to submit quiz attempt', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Loading assessment questions from database...</p>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
        <HelpCircle size={40} style={{ color: '#64748b', margin: '0 auto 1rem auto' }} />
        <h2>Quiz Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>No assessment questions found for this module.</p>
        <Link to="/learn" className="btn btn-primary">Return to Modules</Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="quiz-page" style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Quiz Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link to={`/learn/${quiz.module_id}`} style={{ color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', marginBottom: '4px' }}>
            <ArrowLeft size={14} /> Back to Module
          </Link>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a', margin: 0 }}>
            {quiz.title}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.35rem 0.75rem', borderRadius: '999px', border: '1px solid #bfdbfe' }}>
            Passing Score: {quiz.passing_score}%
          </span>
        </div>
      </div>

      {/* Progress Bar & Indicators */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: '#64748b', marginBottom: '0.4rem' }}>
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{answeredCount} of {questions.length} Answered</span>
        </div>
        <div className="progress-container" style={{ height: '6px' }}>
          <div
            className="progress-bar"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* RESULT BANNER (After Submission) */}
      {submitted && result && (
        <div
          className={`card animate-fade-in ${result.passed ? 'border-success' : 'border-danger'}`}
          style={{
            marginBottom: '2rem',
            backgroundColor: result.passed ? '#ecfdf5' : '#fef2f2',
            borderColor: result.passed ? '#a7f3d0' : '#fecaca',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: result.passed ? '#10b981' : '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            {result.passed ? <Award size={32} /> : <RotateCcw size={32} />}
          </div>

          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            {result.passed ? 'Assessment Passed!' : 'Assessment Incomplete'}
          </h2>

          <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
            You scored <strong>{result.score} out of {result.totalQuestions}</strong> ({result.percentage}%).
            {result.passed
              ? ' Outstanding job! Your passing attempt has been permanently archived in your academic profile.'
              : ` You need ${quiz.passing_score}% or higher to satisfy module accreditation requirements.`}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleRetake} className="btn btn-secondary btn-sm">
              <RotateCcw size={16} /> Retake Assessment
            </button>
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Return to Student Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="card" style={{ padding: '2.25rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="badge badge-primary">Question {currentIndex + 1}</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Single Choice • 10 Points</span>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#0f172a', lineHeight: 1.5, marginBottom: '1.75rem' }}>
          {currentQuestion.question_text}
        </h2>

        {/* 4 Options Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {(currentQuestion.options || []).map((opt) => {
            const isSelected = answers[currentQuestion.id] === opt.id;
            const isCorrectOption = Boolean(opt.is_correct);

            // Styling states after submission
            let optBorder = 'var(--border-light)';
            let optBg = '#ffffff';
            let optColor = '#0f172a';

            if (submitted) {
              if (isCorrectOption) {
                optBorder = '#10b981';
                optBg = '#ecfdf5';
              } else if (isSelected && !isCorrectOption) {
                optBorder = '#ef4444';
                optBg = '#fef2f2';
              }
            } else if (isSelected) {
              optBorder = '#2563eb';
              optBg = '#eff6ff';
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  border: `2px solid ${optBorder}`,
                  backgroundColor: optBg,
                  color: optColor,
                  cursor: submitted ? 'default' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: isSelected ? '#2563eb' : 'transparent',
                    color: '#ffffff'
                  }}
                >
                  {submitted && isCorrectOption ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : submitted && isSelected && !isCorrectOption ? (
                    <XCircle size={16} className="text-danger" />
                  ) : isSelected ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                  ) : null}
                </div>

                <span style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.4 }}>
                  {opt.option_text || opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Post-submission Educational Explanation */}
        {submitted && currentQuestion.explanation && (
          <div
            className="alert alert-info animate-fade-in"
            style={{ marginTop: '1.75rem', marginBottom: 0 }}
          >
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Educational Explanation:</strong>
              <div style={{ marginTop: '4px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {currentQuestion.explanation}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={16} /> Previous Question
        </button>

        {isLastQuestion ? (
          !submitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={submitting || answeredCount === 0}
              className="btn btn-hero btn-sm"
            >
              {submitting ? 'Submitting...' : `Submit Assessment (${answeredCount}/${questions.length})`}
            </button>
          ) : (
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Finish & Return to Dashboard
            </Link>
          )
        ) : (
          <button
            onClick={handleNext}
            className="btn btn-primary btn-sm"
          >
            Next Question <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
