import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_BADGES } from './seedData';

// Local storage fallback key for resilience when running without configured Supabase
const LOCAL_USER_KEY = 'digicitizen_local_user';
const LOCAL_PROFILES_KEY = 'digicitizen_local_profiles';

const getLocalProfiles = () => {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalProfiles = (profiles) => {
  try {
    localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error('Error saving local profiles', e);
  }
};

export const authService = {
  /**
   * Register a new student account
   * Security requirement: New registrations must always receive the 'student' role.
   */
  async signUp({ email, password, fullName }) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student' // Enforced role
          }
        }
      });

      if (error) throw error;

      // Ensure profile row exists
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role: 'student',
            points: 20
          });
        if (profileError) console.warn('Profile upsert notice:', profileError.message);
      }

      return data;
    } else {
      // Local development resilience fallback
      const profiles = getLocalProfiles();
      const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        throw new Error('An account with this email already exists.');
      }

      const mockId = 'user-' + Math.random().toString(36).substring(2, 9);
      const newProfile = {
        id: mockId,
        email,
        full_name: fullName,
        role: 'student',
        points: 20,
        avatar_url: null,
        created_at: new Date().toISOString()
      };

      profiles.push(newProfile);
      saveLocalProfiles(profiles);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newProfile));

      return { user: newProfile, session: { user: newProfile } };
    }
  },

  /**
   * Student / Admin Login
   */
  async signIn({ email, password }) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Fetch actual role from database
      const profile = await this.getProfile(data.user.id);
      return { session: data.session, user: { ...data.user, ...profile } };
    } else {
      // Local resilience fallback
      // Check for default demo accounts
      if (email === 'admin@digicitizen.edu') {
        const adminProfile = {
          id: 'admin-master-id',
          email: 'admin@digicitizen.edu',
          full_name: 'Admin Director',
          role: 'admin',
          points: 500,
          created_at: new Date().toISOString()
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminProfile));
        return { user: adminProfile, session: { user: adminProfile } };
      }

      const profiles = getLocalProfiles();
      let profile = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());

      if (!profile) {
        // Create student profile on the fly for demo if not existing
        profile = {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          email,
          full_name: email.split('@')[0],
          role: 'student',
          points: 50,
          created_at: new Date().toISOString()
        };
        profiles.push(profile);
        saveLocalProfiles(profiles);
      }

      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
      return { user: profile, session: { user: profile } };
    }
  },

  /**
   * Log out
   */
  async signOut() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_USER_KEY);
  },

  /**
   * Get current session and profile
   */
  async getCurrentUser() {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const profile = await this.getProfile(session.user.id);
      return { ...session.user, ...profile };
    } else {
      try {
        const raw = localStorage.getItem(LOCAL_USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }
  },

  /**
   * Fetch profile from database
   */
  async getProfile(userId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) {
        console.warn('Error fetching profile:', error.message);
        return null;
      }
      return data;
    } else {
      const profiles = getLocalProfiles();
      const current = localStorage.getItem(LOCAL_USER_KEY);
      const parsedCurrent = current ? JSON.parse(current) : null;
      if (parsedCurrent && parsedCurrent.id === userId) return parsedCurrent;
      return profiles.find((p) => p.id === userId) || null;
    }
  },

  /**
   * Update profile details (full_name, avatar_url)
   */
  async updateProfile(userId, updates) {
    // Sanitize: do not allow role alteration from frontend
    const safeUpdates = { ...updates };
    delete safeUpdates.role;
    delete safeUpdates.id;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('profiles')
        .update(safeUpdates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const profiles = getLocalProfiles();
      const idx = profiles.findIndex((p) => p.id === userId);
      if (idx !== -1) {
        profiles[idx] = { ...profiles[idx], ...safeUpdates };
        saveLocalProfiles(profiles);
      }
      const rawCurrent = localStorage.getItem(LOCAL_USER_KEY);
      if (rawCurrent) {
        const parsed = JSON.parse(rawCurrent);
        if (parsed.id === userId) {
          const updated = { ...parsed, ...safeUpdates };
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
          return updated;
        }
      }
      return safeUpdates;
    }
  },

  /**
   * Request password reset email
   */
  async resetPasswordForEmail(email) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
      return data;
    } else {
      return { message: 'Password reset link sent (simulated for local preview).' };
    }
  },

  /**
   * Update password
   */
  async updatePassword(newPassword) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      return data;
    } else {
      return { message: 'Password updated successfully.' };
    }
  }
};
