import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_MODULES } from './seedData';
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
  } catch (error) {
    console.error('Failed to save modules locally:', error);
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
  } catch (error) {
    console.error('Failed to save progress locally:', error);
  }
};

export const moduleService = {
  // Fetch all modules
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

  // Get a single module by slug or ID
  async getModuleBySlugOrId(idOrSlug) {
    if (isSupabaseConfigured) {
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          idOrSlug
        );

      const query = supabase
        .from('modules')
        .select('*, categories(*)');

      const { data, error } = isUUID
        ? await query.eq('id', idOrSlug).single()
        : await query.eq('slug', idOrSlug).single();

      if (!error && data) return data;
    }

    const modules = getStoredModules();

    return (
      modules.find(
        (module) =>
          module.id === idOrSlug || module.slug === idOrSlug
      ) || null
    );
  },

  // Get user's progress for all modules
  async getUserProgress(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', userId);

      if (!error && data) return data;
    }

    return getStoredProgress().filter(
      (progress) => progress.user_id === userId
    );
  },

  // Mark a module as completed
  async markModuleCompleted(userId, moduleId) {
    if (!userId || !moduleId) return null;

    const completedAt = new Date().toISOString();

    if (isSupabaseConfigured) {
      // Check existing completion status
      const {
        data: existingProgress,
        error: checkError
      } = await supabase
        .from('module_progress')
        .select('completed')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();

      if (checkError) throw checkError;

      const wasAlreadyCompleted =
        existingProgress?.completed === true;

      // Save completion status
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
          {
            onConflict: 'user_id,module_id'
          }
        )
        .select()
        .single();

      if (error) throw error;

      // Award 50 points only on first completion
      if (!wasAlreadyCompleted) {
        let pointsUpdated = false;

        try {
          const { error: rpcError } = await supabase.rpc(
            'increment_profile_points',
            {
              user_uuid: userId,
              point_amount: 50
            }
          );

          if (!rpcError) {
            pointsUpdated = true;
          } else {
            console.error('Points RPC failed:', rpcError);
          }
        } catch (rpcError) {
          console.error('Points RPC error:', rpcError);
        }

        // Fallback if RPC is unavailable
        if (!pointsUpdated) {
          const { data: profile, error: profileError } =
            await supabase
              .from('profiles')
              .select('points')
              .eq('id', userId)
              .single();

          if (!profileError && profile) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                points: (profile.points || 0) + 50
              })
              .eq('id', userId);

            if (updateError) {
              console.error(
                'Could not update profile points:',
                updateError
              );
            }
          }
        }
      }

      // Record activity
      const { error: activityError } = await supabase
        .from('activity_logs')
        .insert({
          user_id: userId,
          action: 'MODULE_COMPLETED',
          details: {
            module_id: moduleId,
            timestamp: completedAt
          }
        });

      if (activityError) {
        console.error('Activity log error:', activityError);
      }

      // Evaluate badge eligibility
      await achievementService.evaluateModuleBadges(userId);

      return data;
    }

    // Local storage fallback
    const allProgress = getStoredProgress();

    const existingIndex = allProgress.findIndex(
      (progress) =>
        progress.user_id === userId &&
        progress.module_id === moduleId
    );

    const wasAlreadyCompleted =
      existingIndex !== -1 &&
      allProgress[existingIndex].completed === true;

    const record = {
      id:
        existingIndex !== -1
          ? allProgress[existingIndex].id
          : 'prog-' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      module_id: moduleId,
      completed: true,
      completed_at: completedAt,
      last_accessed_at: completedAt
    };

    if (existingIndex !== -1) {
      allProgress[existingIndex] = {
        ...allProgress[existingIndex],
        ...record
      };
    } else {
      allProgress.push(record);
    }

    saveStoredProgress(allProgress);

    // Award local points only once
    if (!wasAlreadyCompleted) {
      try {
        const raw = localStorage.getItem('digicitizen_local_user');

        if (raw) {
          const user = JSON.parse(raw);
          user.points = (user.points || 0) + 50;

          localStorage.setItem(
            'digicitizen_local_user',
            JSON.stringify(user)
          );
        }
      } catch (error) {
        console.error('Local points update failed:', error);
      }
    }

    await achievementService.evaluateModuleBadges(userId);

    return record;
  },

  // Admin: Add a new module
  async createModule(moduleData) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('modules')
        .insert(moduleData)
        .select()
        .single();

      if (error) throw error;

      return data;
    }

    const modules = getStoredModules();

    const newModule = {
      ...moduleData,
      id: 'mod-' + (modules.length + 1),
      created_at: new Date().toISOString()
    };

    modules.push(newModule);
    saveStoredModules(modules);

    return newModule;
  },

  // Admin: Update a module
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
    }

    const modules = getStoredModules();

    const index = modules.findIndex(
      (module) => module.id === moduleId
    );

    if (index !== -1) {
      modules[index] = {
        ...modules[index],
        ...updates
      };

      saveStoredModules(modules);

      return modules[index];
    }

    return null;
  },

  // Admin: Delete a module
  async deleteModule(moduleId) {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      return true;
    }

    const modules = getStoredModules().filter(
      (module) => module.id !== moduleId
    );

    saveStoredModules(modules);

    return true;
  }
};