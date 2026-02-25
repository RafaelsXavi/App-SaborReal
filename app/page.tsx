'use client';

'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {motion} from 'motion/react';
import {Header} from '@/components/layout/header';
import {HeroBanner} from '@/components/home/hero-banner';
import {CategoryGrid} from '@/components/home/category-grid';
import RestaurantList from '@/components/home/restaurant-list';
import {PromotionBanner} from '@/components/home/promotion-banner';
import {MapPin, ChevronDown, Bell, Search} from 'lucide-react';
import {authService} from '@/services/auth';
import {userService} from '@/services/user';
import {addressService} from '@/services/address';
import {User, Address} from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = await authService.getCurrentUser();
        if (authUser) {
          const userProfile = await userService.getUserProfile(authUser.id);
          setUser(userProfile);
          const addresses = await addressService.getAddresses(authUser.id);
          setCurrentAddress(addresses.find(addr => addr.isDefault) || addresses[0] || null);
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados do usuário.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="flex min-h-screen flex-col items-center justify-center p-4"
      >
        <h1 className="text-4xl font-bold text-primary">Sabor Real Delivery</h1>
        <p className="mt-2 text-lg text-gray-600">Seu pedido, do seu jeito.</p>
        <div className="mt-6 flex space-x-4">
          <a
            href="/login"
            className="btn-primary shadow-sm"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="rounded-xl border border-primary px-6 py-3 text-primary font-semibold shadow-sm hover:bg-primary/5 transition-colors"
          >
            Registrar
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-col min-h-screen pb-24"
    >
      {/* Header / Address Selector */}
      <header className="sticky top-0 z-50 bg-background pt-4 pb-2 border-b border-gray-200 shadow-sm px-4">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Entregar em</span>
            <button onClick={() => router.push('/addresses')} className="flex items-center gap-1 text-left">
              <span className="text-sm font-bold truncate">
                {currentAddress ? `${currentAddress.street}, ${currentAddress.number}` : 'Adicionar Endereço'}
              </span>
              <ChevronDown size={18} className="text-primary" />
            </button>
          </div>
          <button className="p-2 text-primary">
            <Bell size={24} />
          </button>
        </div>
        {/* Search Bar */}
        <div className="mt-3 max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-primary" />
            </div>
            <input
              className="block w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm placeholder-slate-500 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Prato ou restaurante"
              type="text"
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <RestaurantList />
        <PromotionBanner />
        {/* Placeholder for Highlights */}
        <section className="mt-8 px-4 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Destaques</h2>
          <p className="text-slate-500 dark:text-slate-400">Em breve...</p>
        </section>
      </main>
    </motion.div>
  );
}
