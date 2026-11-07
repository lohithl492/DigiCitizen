import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_QUIZZES, INITIAL_QUESTIONS, INITIAL_MODULES } from './seedData';
import { achievementService } from './achievementService';

const LOCAL_ATTEMPTS_KEY = 'digicitizen_local_quiz_attempts';
const LOCAL_QUESTIONS_KEY = 'digicitizen_local_questions';

const getStoredAttempts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredAttempts = (attempts) => {
  try {
    localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error(e);
  }
};

const getStoredQuestions = () => {
  try {
    const raw = localStorage.getItem(LOCAL_QUESTIONS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_QUESTIONS;
  } catch {
    return INITIAL_QUESTIONS;
  }
};

const saveStoredQuestions = (q) => {
  try {
    localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(q));
  } catch (e) {
    console.error(e);
  }
};

export const quizService = {
  /**
   * Get Quiz details and questions by module ID or quiz ID
   */
  async getQuizByModuleId(moduleIdOrQuizId) {
    if (isSupabaseConfigured) {
      // Find quiz row
      const { data: quiz, error: qErr } = await supabase
        .from('quizzes')
        .select('*')
        .or(`id.eq.${moduleIdOrQuizId},module_id.eq.${moduleIdOrQuizId}`)
        .single();

      if (!qErr && quiz) {
        // Fetch questions and options
        const { data: questions, error: questionsErr } = await supabase
          .from('questions')
          .select('*, quiz_options(*)')
          .eq('quiz_id', quiz.id)
          .order('order_index', { ascending: true });

        if (!questionsErr && questions && questions.length > 0) {
          return {
            ...quiz,
            questions: questions.map((q) => ({
              ...q,
              options: (q.quiz_options || []).sort((a, b) => a.order_index - b.order_index)
            }))
          };
        }
      }
    }

    // Fallback: look up in seed / local data
    let quiz = INITIAL_QUIZZES.find((q) => q.id === moduleIdOrQuizId || q.module_id === moduleIdOrQuizId);
    if (!quiz) {
      // Create a virtual quiz mapped to this module
      const module = INITIAL_MODULES.find((m) => m.id === moduleIdOrQuizId || m.slug === moduleIdOrQuizId);
      const modId = module ? module.id : moduleIdOrQuizId;
      quiz = INITIAL_QUIZZES.find((q) => q.module_id === modId) || INITIAL_QUIZZES[0];
    }

    const allQuestions = getStoredQuestions();
    const quizQuestions = allQuestions.filter((q) => q.quiz_id === quiz.id);

    return {
      ...quiz,
      questions: quizQuestions.length > 0 ? quizQuestions : allQuestions.slice(0, 9)
    };
  },

  /**
   * Submit a student's quiz attempt
   * Calculates score, saves in DB, awards points, triggers badges
   */
  async submitQuizAttempt({ userId, quizId, answers, score, totalQuestions, percentage, passed }) {
    const completedAt = new Date().toISOString();

    const attemptData = {
      user_id: userId,
      quiz_id: quizId,
      score,
      total_questions: totalQuestions,
      percentage: Number(percentage.toFixed(2)),
      passed,
      answers,
      completed_at: completedAt
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert(attemptData)
        .select()
        .single();

      if (error) throw error;

      // Award points (e.g., 10 points per correct answer + 20 bonus for passing)
      const pointsToAward = score * 10 + (passed ? 20 : 0);
      const { data: p } = await supabase.from('profiles').select('points').eq('id', userId).single();
      if (p) {
        await supabase.from('profiles').update({ points: (p.points || 0) + pointsToAward }).eq('id', userId);
      }

      // Log activity
      await supabase.from('activity_logs').insert({
        user_id: userId,
        action: 'QUIZ_SUBMITTED',
        details: { quiz_id: quizId, score, percentage, passed }
      });

      // Check quiz-related badges
      await this.evaluateQuizBadges(userId, quizId, percentage);

      return data;
    } else {
      const attempts = getStoredAttempts();
      const newAttempt = {
        id: 'attempt-' + Math.random().toString(36).substring(2, 9),
        ...attemptData
      };
      attempts.push(newAttempt);
      saveStoredAttempts(attempts);

      // Award points locally
      try {
        const raw = localStorage.getItem('digicitizen_local_user');
        if (raw) {
          const user = JSON.parse(raw);
          const pointsToAward = score * 10 + (passed ? 20 : 0);
          user.points = (user.points || 0) + pointsToAward;
          localStorage.setItem('digicitizen_local_user', JSON.stringify(user));
        }
      } catch (e) {
        console.error(e);
      }

      await this.evaluateQuizBadges(userId, quizId, percentage);
      return newAttempt;
    }
  },

  /**
   * Evaluate quiz badges
   */
  async evaluateQuizBadges(userId, quizId, percentage) {
    if (!userId) return;

    // Check if privacy quiz passed with >= 80%
    if ((quizId === 'quiz-3' || quizId?.includes('3')) && percentage >= 80) {
      await achievementService.awardBadge(userId, 'privacy_protector');
    }

    // Check if user passed all 6 quizzes
    let userAttempts = [];
    if (isSupabaseConfigured) {
      const { data } = await supabase.from('quiz_attempts').select('quiz_id, passed').eq('user_id', userId).eq('passed', true);
      userAttempts = data || [];
    } else {
      const all = getStoredAttempts();
      userAttempts = all.filter((a) => a.user_id === userId && a.passed);
    }

    const uniquePassedQuizzes = new Set(userAttempts.map((a) => a.quiz_id));
    if (uniquePassedQuizzes.size >= 6) {
      await achievementService.awardBadge(userId, 'quiz_master');
    }
  },

  /**
   * Fetch all previous attempts of a user
   */
  async getUserAttempts(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*, quizzes(title, module_id)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (!error && data) return data;
    }

    const all = getStoredAttempts();
    return all
      .filter((a) => a.user_id === userId)
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
  },

  /**
   * Admin: Get all quizzes and questions
   */
  async getAllQuizzesWithQuestions() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*, modules(title), questions(*, quiz_options(*))');

      if (!error && data && data.length > 0) return data;
    }

    const questions = getStoredQuestions();
    return INITIAL_QUIZZES.map((quiz) => {
      const mod = INITIAL_MODULES.find((m) => m.id === quiz.module_id);
      return {
        ...quiz,
        modules: { title: mod?.title || 'Learning Module' },
        questions: questions.filter((q) => q.quiz_id === quiz.id)
      };
    });
  },

  /**
   * Admin: Add new question
   */
  async addQuestion(questionData) {
    if (isSupabaseConfigured) {
      const { data: q, error: qErr } = await supabase
        .from('questions')
        .insert({
          quiz_id: questionData.quiz_id,
          question_text: questionData.question_text,
          explanation: questionData.explanation,
          order_index: questionData.order_index || 1,
          points: 10
        })
        .select()
        .single();

      if (qErr) throw qErr;

      // Insert options
      if (questionData.options && questionData.options.length > 0) {
        const optionRows = questionData.options.map((opt, i) => ({
          question_id: q.id,
          option_text: opt.text,
          is_correct: Boolean(opt.is_correct),
          order_index: i + 1
        }));
        await supabase.from('quiz_options').insert(optionRows);
      }

      return q;
    } else {
      const allQ = getStoredQuestions();
      const newQ = {
        id: 'q-' + Math.random().toString(36).substring(2, 9),
        ...questionData
      };
      allQ.push(newQ);
      saveStoredQuestions(allQ);
      return newQ;
    }
  },

  /**
   * Admin: Delete question
   */
  async deleteQuestion(questionId) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('questions').delete().eq('id', questionId);
      if (error) throw error;
      return true;
    } else {
      let allQ = getStoredQuestions();
      allQ = allQ.filter((q) => q.id !== questionId);
      saveStoredQuestions(allQ);
      return true;
    }
  }
};
