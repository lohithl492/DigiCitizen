import React, { useState, useEffect } from 'react';
import { quizService } from '../../services/quizService';
import { HelpCircle, Plus, Trash2, CheckCircle2, Search, Filter } from 'lucide-react';

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New question form state
  const [newQ, setNewQ] = useState({
    quiz_id: 'quiz-1',
    question_text: '',
    explanation: '',
    options: [
      { text: '', is_correct: true },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
      { text: '', is_correct: false }
    ]
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await quizService.getAllQuizzesWithQuestions();
      setQuizzes(data || []);
      if (data && data.length > 0 && selectedQuizId === 'ALL') {
        setNewQ((prev) => ({ ...prev, quiz_id: data[0].id }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Aggregate questions
  const allQuestions = quizzes.flatMap((q) =>
    (q.questions || []).map((quest) => ({
      ...quest,
      quizTitle: q.title
    }))
  );

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesQuiz = selectedQuizId === 'ALL' || q.quiz_id === selectedQuizId;
    const matchesSearch =
      q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuiz && matchesSearch;
  });

  const handleDelete = async (questionId) => {
    if (window.confirm('Delete this question permanently?')) {
      try {
        await quizService.deleteQuestion(questionId);
        await loadData();
      } catch (e) {
        alert('Failed to delete question: ' + e.message);
      }
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQ.question_text || !newQ.explanation) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      await quizService.addQuestion(newQ);
      setShowAddModal(false);
      setNewQ({
        quiz_id: quizzes[0]?.id || 'quiz-1',
        question_text: '',
        explanation: '',
        options: [
          { text: '', is_correct: true },
          { text: '', is_correct: false },
          { text: '', is_correct: false },
          { text: '', is_correct: false }
        ]
      });
      await loadData();
    } catch (e) {
      alert('Error creating question: ' + e.message);
    }
  };

  return (
    <div className="admin-quizzes" style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
            Question Bank Oversight
          </span>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '2px 0 6px 0' }}>
            Curriculum Assessments & 54 MCQ Bank
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem', margin: 0 }}>
            Inspect, author, and maintain educational questions and explanation rubrics.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
          <Plus size={16} /> Author Question
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            className="form-select"
            style={{ width: '280px' }}
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
          >
            <option value="ALL">All Modules ({allQuestions.length} Questions)</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title} ({(q.questions || []).length} Qs)
              </option>
            ))}
          </select>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search question keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredQuestions.map((quest, idx) => (
          <div key={quest.id} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">Q{idx + 1}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{quest.quizTitle}</span>
              </div>
              <button
                onClick={() => handleDelete(quest.id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.3rem 0.5rem', color: '#ef4444' }}
                title="Delete question"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.4 }}>
              {quest.question_text}
            </h3>

            {/* 4 Options Grid */}
            <div className="grid-2" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
              {(quest.options || []).map((opt) => (
                <div
                  key={opt.id}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: `1px solid ${opt.is_correct ? '#a7f3d0' : '#e2e8f0'}`,
                    backgroundColor: opt.is_correct ? '#ecfdf5' : '#f8fafc',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: opt.is_correct ? '#065f46' : '#334155'
                  }}
                >
                  {opt.is_correct && <CheckCircle2 size={14} className="text-success" />}
                  <span>{opt.option_text || opt.text}</span>
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div style={{ backgroundColor: '#f0f9ff', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #bae6fd', fontSize: '0.825rem', color: '#0369a1' }}>
              <strong>Pedagogical Explanation: </strong> {quest.explanation}
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#64748b' }}>No assessment questions match the current filters.</p>
        </div>
      )}

      {/* Author Question Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem', overflowY: 'auto' }}>
          <div className="card animate-fade-in" style={{ maxWidth: '640px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Author New Assessment Question</h3>
            <form onSubmit={handleAddQuestion}>
              <div className="form-group">
                <label className="form-label">Module / Quiz</label>
                <select
                  className="form-select"
                  value={newQ.quiz_id}
                  onChange={(e) => setNewQ({ ...newQ, quiz_id: e.target.value })}
                >
                  {quizzes.map((q) => (
                    <option key={q.id} value={q.id}>{q.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Question Text</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                  required
                  placeholder="Enter clear, concise question prompt..."
                  value={newQ.question_text}
                  onChange={(e) => setNewQ({ ...newQ, question_text: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">4 Answer Options (Select which one is correct)</label>
                {newQ.options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <input
                      type="radio"
                      name="correctOption"
                      checked={opt.is_correct}
                      onChange={() => {
                        const updated = newQ.options.map((o, idx) => ({ ...o, is_correct: idx === i }));
                        setNewQ({ ...newQ, options: updated });
                      }}
                      title="Mark as correct answer"
                    />
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder={`Option ${i + 1} ${i === 0 ? '(Correct by default)' : ''}`}
                      value={opt.text}
                      onChange={(e) => {
                        const updated = [...newQ.options];
                        updated[i].text = e.target.value;
                        setNewQ({ ...newQ, options: updated });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Educational Explanation</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                  required
                  placeholder="Explain why the correct answer is right and cite principles..."
                  value={newQ.explanation}
                  onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
