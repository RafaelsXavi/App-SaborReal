'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {authService} from '@/services/auth';
import {motion} from 'motion/react';
import {LucideIcon, Eye, EyeOff} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUp(values.email, values.password, values.name, values.phone);
      router.push('/login'); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar. Tente novamente.');
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
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Criar Conta</h2>
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
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input
            id="email"
            type="email"
            {...form.register('email')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone (Opcional)</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...form.register('password')}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary pr-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Já tem uma conta?{' '}
        <a href="/login" className="font-medium text-primary hover:text-primary/90">
          Entrar
        </a>
      </p>
    </motion.div>
  );
}
