'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {addressService} from '@/services/address';
import {Address} from '@/types';
import {motion} from 'motion/react';
import {MapPin, Edit, Trash2, CheckCircle} from 'lucide-react';
import {AddressForm} from './address-form';

interface AddressListProps {
  userId: string;
}

export function AddressList({userId}: AddressListProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await addressService.getAddresses(userId);
      setAddresses(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar endereços.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      setIsLoading(true);
      try {
        await addressService.deleteAddress(id);
        fetchAddresses();
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir endereço.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await addressService.setDefaultAddress(userId, id);
      fetchAddresses();
    } catch (err: any) {
      setError(err.message || 'Erro ao definir endereço padrão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    fetchAddresses();
  };

  if (isLoading && addresses.length === 0) {
    return <p className="text-center text-slate-500 dark:text-slate-400">Carregando endereços...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erro: {error}</p>;
  }

  if (showAddForm || editingAddress) {
    return (
      <AddressForm
        userId={userId}
        initialAddress={editingAddress}
        onSuccess={handleFormSuccess}
      />
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="w-full max-w-md p-4 space-y-4 bg-white rounded-xl shadow-lg dark:bg-slate-900"
    >
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Meus Endereços</h2>
      {addresses.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhum endereço cadastrado.</p>
      ) : (
        <ul className="space-y-3">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="flex items-start gap-3 flex-1">
                <MapPin size={20} className="text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {address.street}, {address.number} {address.complement}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {address.neighborhood} - {address.city}, {address.state} - {address.cep}
                  </p>
                  {address.isDefault && (
                    <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle size={14} className="mr-1" /> Padrão
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 shrink-0">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Definir como padrão"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
                <button
                  onClick={() => setEditingAddress(address)}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Editar"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        Adicionar Novo Endereço
      </button>
    </motion.div>
  );
}
