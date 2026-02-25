'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authService} from '@/services/auth';
import {userService} from '@/services/user';
import {User} from '@/types';
import {ProfileForm} from '@/components/profile/profile-form';
import {motion} from 'motion/react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await authService.getCurrentUser();
        if (!authUser) {
          router.push('/login');
          return;
        }
        const userProfile = await userService.getUserProfile(authUser.id);
        setUser(userProfile);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar perfil do usuário.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <p className="text-slate-500 dark:text-slate-400">Carregando perfil...</p>
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

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <p className="text-slate-500 dark:text-slate-400">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4"
    >
      <ProfileForm initialUser={user} />
    </motion.div>
  );
}
