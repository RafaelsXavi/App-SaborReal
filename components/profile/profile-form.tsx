'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {userService} from '@/services/user';
import {authService} from '@/services/auth';
import {User} from '@/types';
import {motion} from 'motion/react';

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialUser: User | null;
}

export function ProfileForm({initialUser}: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(initialUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }
      // Update name
      if (values.name !== user.name) {
        await userService.updateUserName(user.id, values.name);
      }
      // Update phone
      if (values.phone !== user.phone) {
        await userService.updateUserPhone(user.id, values.phone || '');
      }
      // Update dateOfBirth
      if (values.dateOfBirth !== user.dateOfBirth) {
        await userService.updateUserDateOfBirth(user.id, values.dateOfBirth || '');
      }

      // Re-fetch user to get updated data
      const updatedAuthUser = await authService.getCurrentUser();
      if (updatedAuthUser) {
        const updatedProfile = await userService.getUserProfile(updatedAuthUser.id);
        setUser(updatedProfile);
      }

      alert('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-slate-900"
    >
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Meu Perfil</h2>
      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
          <input
            id="name"
            type="text"
            {...form.register('name')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</label>
          <input
            id="phone"
            type="tel"
            {...form.register('phone')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Data de Nascimento</label>
          <input
            id="dateOfBirth"
            type="date"
            {...form.register('dateOfBirth')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.dateOfBirth.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </motion.div>
  );
}
