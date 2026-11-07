import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_MODULES, INITIAL_CATEGORIES } from './seedData';
import { achievementService } from './achievementService';

const LOCAL_MODULES_KEY = 'digicitizen_local_modules';
const LOCAL_PROGRESS_KEY = 'digicitizen_local_progress';

const getStoredModules = () => {
  try {
    const raw = localStorage.getItem(LOCAL_MODULES_KEY);
    return raw ? JSON.parse(raw) : INITIAL_MODULES;
  } catch {
    return INITIAL_MODULES;
  }
};

const saveStoredModules = (modules) => {
  try {
    localStorage.setItem(LOCAL_MODULES_KEY, JSON.stringify(modules));
  } catch (e) {
    console.error('Failed to save modules locally', e);
  }
};

const getStoredProgress = () => {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredProgress = (progress) => {
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress locally', e);
  }
};

export const moduleService = {
  /**
   * Fetch all 6 modules
   */
  async getAllModules() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('modules')
        .select('*, categories(*)')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
    return getStoredModules();
  },

  /**
   * Get single module by slug or ID
   */
  async getModuleBySlugOrId(idOrSlug) {
    if (isSupabaseConfigured) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      const query = supabase
        .from('modules')
        .select('*, categories(*)');

      const { data, error } = isUUID
        ? await query.eq('id', idOrSlug).single()
        : await query.eq('slug', idOrSlug).single();

      if (!error && data) return data;
    }

    const all = getStoredModules();
    return all.find((m) => m.id === idOrSlug || m.slug === idOrSlug) || null;
  },

  /**
   * Get user's progress for all modules
   */
  async getUserProgress(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', userId);

      if (!error && data) return data;
    }

    const allProgress = getStoredProgress();
    return allProgress.filter((p) => p.user_id === userId);
  },

  /**
   * Mark a module as completed
   */
  async markModuleCompleted(userId, moduleId) {
    if (!userId || !moduleId) return null;

    const completedAt = new Date().toISOString();

    if (isSupabaseConfigured) {
      // Upsert into module_progress
      const { data, error } = await supabase
        .from('module_progress')
        .upsert(
          {
            user_id: userId,
            module_id: moduleId,
            completed: true,
            completed_at: completedAt,
            last_accessed_at: completedAt
          },
          { onConflict: 'user_id,module_id' }
        )
        .select()
        .single();

      if (error) throw error;

      // Increment points on profile (+50 points)
      await supabase.rpc('increment_profile_points', {
        user_uuid: userId,
        point_amount: 50
      }).catch(async () => {
        // Fallback direct update
        const { data: p } = await supabase.from('profiles').select('points').eq('id', userId).single();
        if (p) {
          await supabase.from('profiles').update({ points: (p.points || 0) + 50 }).eq('id', userId);
        }
      });

      // Record activity log
      await supabase.from('activity_logs').insert({
        user_id: userId,
        action: 'MODULE_COMPLETED',
        details: { module_id: moduleId, timestamp: completedAt }
      });

      // Check for badge awards
      await achievementService.evaluateModuleBadges(userId);

      return data;
    } else {
      const allProgress = getStoredProgress();
      const existingIdx = allProgress.findIndex((p) => p.user_id === userId && p.module_id === moduleId);

      const record = {
        id: 'prog-' + Math.random().toString(36).substring(2, 9),
        user_id: userId,
        module_id: moduleId,
        completed: true,
        completed_at: completedAt,
        last_accessed_at: completedAt
      };

      if (existingIdx !== -1) {
        allProgress[existingIdx] = record;
      } else {
        allProgress.push(record);
      }
      saveStoredProgress(allProgress);

      // Award points locally
      try {
        const raw = localStorage.getItem('digicitizen_local_user');
        if (raw) {
          const user = JSON.parse(raw);
          user.points = (user.points || 0) + 50;
          localStorage.setItem('digicitizen_local_user', JSON.stringify(user));
        }
      } catch (e) {
        console.error(e);
      }

      await achievementService.evaluateModuleBadges(userId);
      return record;
    }
  },

  /**
   * Admin: Add new module
   */
  async createModule(moduleData) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('modules')
        .insert(moduleData)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const modules = getStoredModules();
      const newMod = {
        ...moduleData,
        id: 'mod-' + (modules.length + 1),
        created_at: new Date().toISOString()
      };
      modules.push(newMod);
      saveStoredModules(modules);
      return newMod;
    }
  },

  /**
   * Admin: Update module
   */
  async updateModule(moduleId, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('modules')
        .update(updates)
        .eq('id', moduleId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const modules = getStoredModules();
      const idx = modules.findIndex((m) => m.id === moduleId);
      if (idx !== -1) {
        modules[idx] = { ...modules[idx], ...updates };
        saveStoredModules(modules);
        return modules[idx];
      }
      return null;
    }
  },

  /**
   * Admin: Delete module
   */
  async deleteModule(moduleId) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('modules').delete().eq('id', moduleId);
      if (error) throw error;
      return true;
    } else {
      let modules = getStoredModules();
      modules = modules.filter((m) => m.id !== moduleId);
      saveStoredModules(modules);
      return true;
    }
  }
};
