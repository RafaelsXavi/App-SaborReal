'use client';

import {Header} from '@/components/layout/header';
import {motion} from 'motion/react';
import {Search} from 'lucide-react';

export default function SearchPage() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-col min-h-screen"
    >
      <Header title="Buscar" showBackButton={false} />
      <main className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
          <Search size={48} className="mb-4" />
          <p className="text-lg font-semibold">O que você procura?</p>
          <p className="text-sm text-center mt-2">Busque por pratos ou restaurantes.</p>
        </div>
      </main>
    </motion.div>
  );
}
