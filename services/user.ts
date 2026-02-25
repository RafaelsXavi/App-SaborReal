import {supabase} from '@/lib/supabase';
import {User, UserRole} from '@/types';

const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check environment variables.');
  }
  return supabase;
};

export const userService = {
  async getUserProfile(userId: string): Promise<User | null> {
    const client = getSupabaseClient();
    const {data, error} = await client
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      throw error;
    }

    if (data) {
      // Merge Supabase auth user data with public profile data
      const {data: {user: authUser}, error: authError} = await client.auth.getUser();
      if (authError) throw authError;

      if (authUser && authUser.id === data.id) {
        return {
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name || data.name || '',
          phone: authUser.user_metadata?.phone || data.phone || '',
          dateOfBirth: authUser.user_metadata?.dateOfBirth || data.dateOfBirth || '',
          role: authUser.user_metadata?.role || data.role || UserRole.Customer, // Default to customer
          createdAt: authUser.created_at,
        };
      }
    }
    return null;
  },

  async updateUserName(userId: string, name: string) {
    const client = getSupabaseClient();
    // Update in auth.users table
    const {data: authData, error: authError} = await client.auth.updateUser({
      data: {name},
    });
    if (authError) throw authError;

    // Update in public.users table (if it exists)
    const {data, error} = await client
      .from('users')
      .update({name})
      .eq('id', userId);
    if (error) throw error;
    return data;
  },

  async updateUserPhone(userId: string, phone: string) {
    const client = getSupabaseClient();
    // Update in auth.users table
    const {data: authData, error: authError} = await client.auth.updateUser({
      data: {phone},
    });
    if (authError) throw authError;

    // Update in public.users table (if it exists)
    const {data, error} = await client
      .from('users')
      .update({phone})
      .eq('id', userId);
    if (error) throw error;
    return data;
  },

  async updateUserDateOfBirth(userId: string, dateOfBirth: string) {
    const client = getSupabaseClient();
    // Update in auth.users table
    const {data: authData, error: authError} = await client.auth.updateUser({
      data: {dateOfBirth},
    });
    if (authError) throw authError;

    // Update in public.users table (if it exists)
    const {data, error} = await client
      .from('users')
      .update({dateOfBirth})
      .eq('id', userId);
    if (error) throw error;
    return data;
  },
};
