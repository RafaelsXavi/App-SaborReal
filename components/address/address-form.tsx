'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useRouter} from 'next/navigation';
import {addressService} from '@/services/address';
import {Address} from '@/types';
import {motion} from 'motion/react';

const formSchema = z.object({
  cep: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  street: z.string().min(2, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  reference: z.string().optional(),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
  neighborhood: z.string().optional(),
  isDefault: z.boolean(),
});

type AddressFormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  userId: string;
  initialAddress?: Address | null;
  onSuccess: () => void;
}

export function AddressForm({userId, initialAddress, onSuccess}: AddressFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: initialAddress?.cep || '',
      street: initialAddress?.street || '',
      number: initialAddress?.number || '',
      complement: initialAddress?.complement || '',
      reference: initialAddress?.reference || '',
      city: initialAddress?.city || '',
      state: initialAddress?.state || '',
      neighborhood: initialAddress?.neighborhood || '',
      isDefault: initialAddress?.isDefault ?? false,
    },
  });

  useEffect(() => {
    if (initialAddress) {
      form.reset({
        cep: initialAddress.cep || '',
        street: initialAddress.street || '',
        number: initialAddress.number || '',
        complement: initialAddress.complement || '',
        reference: initialAddress.reference || '',
        city: initialAddress.city || '',
        state: initialAddress.state || '',
        neighborhood: initialAddress.neighborhood || '',
        isDefault: initialAddress.isDefault ?? false,
      });
    }
  }, [initialAddress, form]);

  const handleCepLookup = async () => {
    const cep = form.getValues('cep');
    if (cep.length >= 8) {
      setIsLoading(true);
      try {
        const data = await addressService.lookupCep(cep);
        form.setValue('street', data.street || '');
        form.setValue('city', data.city || '');
        form.setValue('state', data.state || '');
        form.setValue('neighborhood', data.neighborhood || '');
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar CEP.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmit = async (values: AddressFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const addressData = {
        ...values,
        userId,
      };

      if (initialAddress) {
        await addressService.updateAddress(initialAddress.id, addressData);
      } else {
        await addressService.addAddress(addressData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar endereço. Tente novamente.');
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
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
        {initialAddress ? 'Editar Endereço' : 'Adicionar Endereço'}
      </h2>
      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="cep" className="block text-sm font-medium text-slate-700 dark:text-slate-300">CEP</label>
          <div className="flex gap-2 mt-1">
            <input
              id="cep"
              type="text"
              {...form.register('cep')}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              disabled={isLoading}
              onBlur={handleCepLookup}
            />
            <button
              type="button"
              onClick={handleCepLookup}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
              disabled={isLoading}
            >
              Buscar
            </button>
          </div>
          {form.formState.errors.cep && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.cep.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rua</label>
          <input
            id="street"
            type="text"
            {...form.register('street')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.street && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.street.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Número</label>
          <input
            id="number"
            type="text"
            {...form.register('number')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.number && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.number.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="complement" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Complemento (Opcional)</label>
          <input
            id="complement"
            type="text"
            {...form.register('complement')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Referência (Opcional)</label>
          <input
            id="reference"
            type="text"
            {...form.register('reference')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bairro</label>
          <input
            id="neighborhood"
            type="text"
            {...form.register('neighborhood')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.neighborhood && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.neighborhood.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cidade</label>
          <input
            id="city"
            type="text"
            {...form.register('city')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.city && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Estado</label>
          <input
            id="state"
            type="text"
            {...form.register('state')}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            disabled={isLoading}
          />
          {form.formState.errors.state && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.state.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="isDefault"
            type="checkbox"
            {...form.register('isDefault')}
            className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded dark:bg-slate-800 dark:border-slate-700"
            disabled={isLoading}
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Definir como endereço padrão</label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : (initialAddress ? 'Salvar Alterações' : 'Adicionar Endereço')}
        </button>
      </form>
    </motion.div>
  );
}
