import {supabase} from '@/lib/supabase';
import {UserRole} from '@/types';

const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check environment variables.');
  }
  return supabase;
};

export const authService = {
  async signUp(email: string, password: string, name: string, phone?: string) {
    const client = getSupabaseClient();
    const {data, error} = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: UserRole.Customer, // Default role for new sign-ups
        } as any, // Cast to any to avoid type issues with user_metadata
      },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const client = getSupabaseClient();
    const {data, error} = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const client = getSupabaseClient();
    const {error} = await client.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const client = getSupabaseClient();
    const {data: {session}, error} = await client.auth.getSession();
    if (error) throw error;
    return session?.user || null;
  },

  async updateProfile(updates: {
    name?: string;
    phone?: string;
    dateOfBirth?: string;
  }) {
    const client = getSupabaseClient();
    const {data, error} = await client.auth.updateUser({
      data: updates,
    });
    if (error) throw error;
    return data;
  },

  async updateEmail(email: string) {
    const client = getSupabaseClient();
    const {data, error} = await client.auth.updateUser({
      email,
    });
    if (error) throw error;
    return data;
  },
};
