import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_SCENARIOS } from './seedData';

const LOCAL_SCENARIOS_KEY = 'digicitizen_local_scenarios';
const LOCAL_SCENARIO_ATTEMPTS_KEY = 'digicitizen_local_scenario_attempts';

const getStoredScenarios = () => {
  try {
    const raw = localStorage.getItem(LOCAL_SCENARIOS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_SCENARIOS;
  } catch {
    return INITIAL_SCENARIOS;
  }
};

const saveStoredScenarios = (s) => {
  try {
    localStorage.setItem(LOCAL_SCENARIOS_KEY, JSON.stringify(s));
  } catch (e) {
    console.error(e);
  }
};

const getStoredAttempts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_SCENARIO_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredAttempts = (a) => {
  try {
    localStorage.setItem(LOCAL_SCENARIO_ATTEMPTS_KEY, JSON.stringify(a));
  } catch (e) {
    console.error(e);
  }
};

export const scenarioService = {
  /**
   * Get all interactive safety scenarios
   */
  async getAllScenarios() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('scenarios').select('*');
      if (!error && data && data.length > 0) return data;
    }
    return getStoredScenarios();
  },

  /**
   * Submit student's choice in a scenario
   */
  async submitScenarioAttempt({ userId, scenarioId, chosenOptionId, pointsEarned }) {
    const completedAt = new Date().toISOString();

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('scenario_attempts')
        .upsert(
          {
            user_id: userId,
            scenario_id: scenarioId,
            chosen_option_id: chosenOptionId,
            points_earned: pointsEarned,
            completed_at: completedAt
          },
          { onConflict: 'user_id,scenario_id' }
        )
        .select()
        .single();

      if (error) throw error;

      // Add points to profile
      if (pointsEarned > 0) {
        const { data: p } = await supabase.from('profiles').select('points').eq('id', userId).single();
        if (p) {
          await supabase.from('profiles').update({ points: (p.points || 0) + pointsEarned }).eq('id', userId);
        }
      }

      // Log activity
      await supabase.from('activity_logs').insert({
        user_id: userId,
        action: 'SCENARIO_COMPLETED',
        details: { scenario_id: scenarioId, chosen_option_id: chosenOptionId, points_earned: pointsEarned }
      });

      return data;
    } else {
      const attempts = getStoredAttempts();
      const existingIdx = attempts.findIndex((a) => a.user_id === userId && a.scenario_id === scenarioId);

      const record = {
        id: 'sa-' + Math.random().toString(36).substring(2, 9),
        user_id: userId,
        scenario_id: scenarioId,
        chosen_option_id: chosenOptionId,
        points_earned: pointsEarned,
        completed_at: completedAt
      };

      if (existingIdx !== -1) {
        attempts[existingIdx] = record;
      } else {
        attempts.push(record);
      }
      saveStoredAttempts(attempts);

      // Add points locally
      try {
        const raw = localStorage.getItem('digicitizen_local_user');
        if (raw) {
          const user = JSON.parse(raw);
          user.points = (user.points || 0) + pointsEarned;
          localStorage.setItem('digicitizen_local_user', JSON.stringify(user));
        }
      } catch (e) {
        console.error(e);
      }

      return record;
    }
  },

  /**
   * Get user's completed scenarios
   */
  async getUserScenarioAttempts(userId) {
    if (!userId) return [];

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('scenario_attempts')
        .select('*')
        .eq('user_id', userId);
      if (!error && data) return data;
    }

    const attempts = getStoredAttempts();
    return attempts.filter((a) => a.user_id === userId);
  },

  /**
   * Admin: Create new scenario
   */
  async createScenario(scenarioData) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('scenarios')
        .insert(scenarioData)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const scenarios = getStoredScenarios();
      const newScen = {
        id: 'scen-' + (scenarios.length + 1),
        ...scenarioData
      };
      scenarios.push(newScen);
      saveStoredScenarios(scenarios);
      return newScen;
    }
  },

  /**
   * Admin: Delete scenario
   */
  async deleteScenario(scenarioId) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('scenarios').delete().eq('id', scenarioId);
      if (error) throw error;
      return true;
    } else {
      let scenarios = getStoredScenarios();
      scenarios = scenarios.filter((s) => s.id !== scenarioId);
      saveStoredScenarios(scenarios);
      return true;
    }
  }
};
