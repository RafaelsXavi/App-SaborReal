import {supabase} from '@/lib/supabase';
import {Address} from '@/types';

const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check environment variables.');
  }
  return supabase;
};

export const addressService = {
  async getAddresses(userId: string): Promise<Address[]> {
    const client = getSupabaseClient();
    const {data, error} = await client
      .from('addresses')
      .select('*')
      .eq('userId', userId)
      .order('isDefault', {ascending: false});

    if (error) throw error;
    return data as Address[];
  },

  async addAddress(address: Omit<Address, 'id' | 'createdAt'>): Promise<Address> {
    const client = getSupabaseClient();
    const {data, error} = await client
      .from('addresses')
      .insert(address)
      .select()
      .single();

    if (error) throw error;
    return data as Address;
  },

  async updateAddress(id: string, updates: Partial<Omit<Address, 'id' | 'userId' | 'createdAt'>>): Promise<Address> {
    const client = getSupabaseClient();
    const {data, error} = await client
      .from('addresses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Address;
  },

  async deleteAddress(id: string) {
    const client = getSupabaseClient();
    const {error} = await client
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async setDefaultAddress(userId: string, addressId: string) {
    const client = getSupabaseClient();

    // First, set all addresses for the user to not default
    const {error: resetError} = await client
      .from('addresses')
      .update({isDefault: false})
      .eq('userId', userId);
    if (resetError) throw resetError;

    // Then, set the selected address as default
    const {data, error} = await client
      .from('addresses')
      .update({isDefault: true})
      .eq('id', addressId)
      .select()
      .single();

    if (error) throw error;
    return data as Address;
  },

  async lookupCep(cep: string) {
    // This would typically call an external API like ViaCEP
    // For now, we'll mock a response.
    console.log(`Looking up CEP: ${cep}`);
    return {
      street: 'Rua Exemplo',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Bairro Exemplo',
    };
  },
};
