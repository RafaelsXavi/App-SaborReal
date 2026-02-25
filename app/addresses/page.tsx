'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authService} from '@/services/auth';
import {AddressList} from '@/components/address/address-list';
import {motion} from 'motion/react';

export default function AddressesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const authUser = await authService.getCurrentUser();
        if (!authUser) {
          router.push('/login');
          return;
        }
        setUserId(authUser.id);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar usuário.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserId();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <p className="text-slate-500 dark:text-slate-400">Carregando endereços...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <p className="text-slate-500 dark:text-slate-400">Usuário não autenticado.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4"
    >
      <AddressList userId={userId} />
    </motion.div>
  );
}
