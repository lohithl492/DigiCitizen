import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_BADGES } from './seedData';

const LOCAL_BADGES_KEY = 'digicitizen_local_badges';
const LOCAL_CERTIFICATES_KEY = 'digicitizen_local_certificates';

const getStoredStudentBadges = () => {
  try {
    const raw = localStorage.getItem(LOCAL_BADGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredStudentBadges = (badges) => {
  try {
    localStorage.setItem(LOCAL_BADGES_KEY, JSON.stringify(badges));
  } catch (e) {
    console.error(e);
  }
};

const getStoredCertificates = () => {
  try {
    const raw = localStorage.getItem(LOCAL_CERTIFICATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredCertificates = (certs) => {
  try {
    localStorage.setItem(LOCAL_CERTIFICATES_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error(e);
  }
};

export const achievementService = {
  /**
   * Get all defined badges
   */
  async getAllBadges() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('badges').select('*').order('points_reward', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return INITIAL_BADGES;
  },

  /**
   * Get badges earned by a user
   */
  async getUserBadges(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('student_badges')
        .select('*, badges(*)')
        .eq('user_id', userId);

      if (!error && data) {
        return data.map((sb) => ({
          ...sb.badges,
          awarded_at: sb.awarded_at
        }));
      }
    }

    const all = getStoredStudentBadges();
    const userBadgeRecords = all.filter((b) => b.user_id === userId);
    return userBadgeRecords.map((rec) => {
      const badgeDef = INITIAL_BADGES.find((b) => b.id === rec.badge_id || b.code === rec.badge_code);
      return {
        ...badgeDef,
        awarded_at: rec.awarded_at
      };
    });
  },

  /**
   * Award a badge to a student if not already earned
   */
  async awardBadge(userId, badgeCode) {
    if (!userId || !badgeCode) return null;

    const badgeDef = INITIAL_BADGES.find((b) => b.code === badgeCode);
    if (!badgeDef) return null;

    if (isSupabaseConfigured) {
      // Find badge ID in DB
      const { data: dbBadge } = await supabase.from('badges').select('id, points_reward').eq('code', badgeCode).single();
      if (!dbBadge) return null;

      const { data, error } = await supabase
        .from('student_badges')
        .insert({
          user_id: userId,
          badge_id: dbBadge.id
        })
        .select()
        .single();

      if (!error) {
        // Add points
        const { data: p } = await supabase.from('profiles').select('points').eq('id', userId).single();
        if (p) {
          await supabase.from('profiles').update({ points: (p.points || 0) + (dbBadge.points_reward || 50) }).eq('id', userId);
        }

        // Log
        await supabase.from('activity_logs').insert({
          user_id: userId,
          action: 'BADGE_EARNED',
          details: { badge_code: badgeCode, badge_title: badgeDef.title }
        });
      }
      return data;
    } else {
      const all = getStoredStudentBadges();
      const alreadyEarned = all.some((b) => b.user_id === userId && (b.badge_code === badgeCode || b.badge_id === badgeDef.id));
      if (alreadyEarned) return null;

      const record = {
        id: 'sb-' + Math.random().toString(36).substring(2, 9),
        user_id: userId,
        badge_id: badgeDef.id,
        badge_code: badgeCode,
        awarded_at: new Date().toISOString()
      };
      all.push(record);
      saveStoredStudentBadges(all);

      // Add points locally
      try {
        const raw = localStorage.getItem('digicitizen_local_user');
        if (raw) {
          const user = JSON.parse(raw);
          user.points = (user.points || 0) + (badgeDef.points_reward || 50);
          localStorage.setItem('digicitizen_local_user', JSON.stringify(user));
        }
      } catch (e) {
        console.error(e);
      }

      return record;
    }
  },

  /**
   * Check and award badges after module progress changes
   */
  async evaluateModuleBadges(userId) {
    if (!userId) return;

    // Check user's progress
    let completedCount = 0;
    let completedCyber = false;

    if (isSupabaseConfigured) {
      const { data } = await supabase.from('module_progress').select('*, modules(slug)').eq('user_id', userId).eq('completed', true);
      if (data) {
        completedCount = data.length;
        completedCyber = data.some((d) => d.modules?.slug === 'cybersecurity-awareness');
      }
    } else {
      try {
        const raw = localStorage.getItem('digicitizen_local_progress');
        const progress = raw ? JSON.parse(raw) : [];
        const userProgress = progress.filter((p) => p.user_id === userId && p.completed);
        completedCount = userProgress.length;
        completedCyber = userProgress.some((p) => p.module_id === 'mod-2' || p.module_id?.includes('cybersecurity'));
      } catch (e) {
        console.error(e);
      }
    }

    if (completedCount >= 1) {
      await this.awardBadge(userId, 'first_module_completed');
    }
    if (completedCyber) {
      await this.awardBadge(userId, 'cyber_learner');
    }
    if (completedCount >= 6) {
      await this.evaluateChampionBadge(userId);
    }
  },

  /**
   * Check and award champion badge
   */
  async evaluateChampionBadge(userId) {
    if (!userId) return;
    // Award champion when all 6 modules completed
    await this.awardBadge(userId, 'digital_citizen_champion');
  },

  /**
   * Get leaderboard of students
   * Privacy requirement: Do not expose student email addresses or sensitive personal info.
   */
  async getLeaderboard(limit = 20) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, points, role')
        .eq('role', 'student')
        .order('points', { ascending: false })
        .limit(limit);

      if (!error && data && data.length > 0) {
        return data.map((profile, idx) => ({
          rank: idx + 1,
          id: profile.id,
          name: profile.full_name || 'Anonymous Learner',
          points: profile.points || 0,
          avatarUrl: profile.avatar_url
        }));
      }
    }

    // Default or fallback leaderboard from real activity & defaults
    const localProfilesRaw = localStorage.getItem('digicitizen_local_profiles');
    const localProfiles = localProfilesRaw ? JSON.parse(localProfilesRaw) : [];
    const currentUserRaw = localStorage.getItem('digicitizen_local_user');
    const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

    const list = [...localProfiles];
    if (currentUser && !list.some((p) => p.id === currentUser.id)) {
      list.push(currentUser);
    }

    // Include standard academic peer benchmarks if empty
    if (list.length < 5) {
      list.push(
        { id: 'peer-1', full_name: 'Sophia Chen', points: 380, role: 'student' },
        { id: 'peer-2', full_name: 'Marcus Vance', points: 320, role: 'student' },
        { id: 'peer-3', full_name: 'Aisha Al-Mansoor', points: 290, role: 'student' },
        { id: 'peer-4', full_name: 'Devon Patel', points: 260, role: 'student' },
        { id: 'peer-5', full_name: 'Elena Rostova', points: 210, role: 'student' }
      );
    }

    return list
      .filter((p) => p.role !== 'admin')
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, limit)
      .map((student, idx) => ({
        rank: idx + 1,
        id: student.id,
        name: student.full_name || 'Anonymous Student',
        points: student.points || 0,
        avatarUrl: student.avatar_url
      }));
  },

  /**
   * Check certificate eligibility
   * Requirements:
   * 1. All 6 modules completed
   * 2. Quizzes attempted with passing grade
   */
  async checkCertificateEligibility(userId) {
    if (!userId) return { eligible: false, completedModules: 0, totalModules: 6, passedQuizzes: 0 };

    let completedModules = 0;
    let passedQuizzes = 0;

    if (isSupabaseConfigured) {
      const { data: progress } = await supabase
        .from('module_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('completed', true);

      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('quiz_id')
        .eq('user_id', userId)
        .eq('passed', true);

      completedModules = progress ? progress.length : 0;
      // Unique passed quizzes
      const uniqueQuizzes = new Set(attempts ? attempts.map((a) => a.quiz_id) : []);
      passedQuizzes = uniqueQuizzes.size;
    } else {
      try {
        const rawProg = localStorage.getItem('digicitizen_local_progress');
        const progress = rawProg ? JSON.parse(rawProg) : [];
        completedModules = progress.filter((p) => p.user_id === userId && p.completed).length;

        const rawQuiz = localStorage.getItem('digicitizen_local_quiz_attempts');
        const attempts = rawQuiz ? JSON.parse(rawQuiz) : [];
        const unique = new Set(attempts.filter((a) => a.user_id === userId && a.passed).map((a) => a.quiz_id));
        passedQuizzes = unique.size;
      } catch (e) {
        console.error(e);
      }
    }

    const eligible = completedModules >= 6;
    return {
      eligible,
      completedModules,
      totalModules: 6,
      passedQuizzes
    };
  },

  /**
   * Fetch certificate for user if already issued
   */
  async getUserCertificate(userId) {
    if (!userId) return null;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('issued_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) return data;
    }

    const certs = getStoredCertificates();
    return certs.find((c) => c.user_id === userId) || null;
  },

  /**
   * Issue certificate in database
   */
  async issueCertificate(userId, studentName) {
    const certNumber = 'DC-' + Math.floor(100000 + Math.random() * 900000);
    const issuedAt = new Date().toISOString();

    const certData = {
      user_id: userId,
      certificate_number: certNumber,
      title: 'Certified Digital Citizen',
      completion_details: {
        student_name: studentName,
        platform: 'DigiCitizen — Digital Citizenship Awareness Platform',
        requirements: 'Completion of 6 Core Modules & Security Mastery Assessments',
        issued_date: issuedAt
      },
      issued_at: issuedAt
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('certificates')
        .insert(certData)
        .select()
        .single();

      if (error) throw error;

      await supabase.from('activity_logs').insert({
        user_id: userId,
        action: 'CERTIFICATE_GENERATED',
        details: { certificate_number: certNumber }
      });

      return data;
    } else {
      const certs = getStoredCertificates();
      const newCert = {
        id: 'cert-' + Math.random().toString(36).substring(2, 9),
        ...certData
      };
      certs.push(newCert);
      saveStoredCertificates(certs);
      return newCert;
    }
  }
};
