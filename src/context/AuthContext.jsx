import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (currentSession?.user && mounted) {
            setSession(currentSession);
            const profile = await authService.getProfile(currentSession.user.id);
            setUser({ ...currentSession.user, ...profile });
          }
        } else {
          const currentUser = await authService.getCurrentUser();
          if (currentUser && mounted) {
            setUser(currentUser);
            setSession({ user: currentUser });
          }
        }
      } catch (err) {
        console.error('Failed to initialize auth', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    // Listen to Supabase Auth state changes if configured
    let subscription = null;
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        if (newSession?.user) {
          const profile = await authService.getProfile(newSession.user.id);
          setUser({ ...newSession.user, ...profile });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      subscription = data.subscription;
    }

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user: authedUser, session: newSession } = await authService.signIn({ email, password });
      setUser(authedUser);
      setSession(newSession);
      return authedUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, fullName }) => {
    setLoading(true);
    try {
      const res = await authService.signUp({ email, password, fullName });
      if (res?.user) {
        setUser(res.user);
        setSession(res.session || { user: res.user });
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const updatedProfile = await authService.getProfile(user.id);
      if (updatedProfile) {
        setUser((prev) => ({ ...prev, ...updatedProfile }));
      }
    } catch (e) {
      console.error('Failed to refresh user profile', e);
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const res = await authService.updateProfile(user.id, updates);
    await refreshUser();
    return res;
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    session,
    loading,
    isAdmin,
    login,
    register,
    logout,
    refreshUser,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
