'use client';

import {Header} from '@/components/layout/header';
import {motion} from 'motion/react';
import {ShoppingCart} from 'lucide-react';

export default function CartPage() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-col min-h-screen"
    >
      <Header title="Meu Carrinho" />
      <main className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
          <ShoppingCart size={48} className="mb-4" />
          <p className="text-lg font-semibold">Seu carrinho está vazio.</p>
          <p className="text-sm text-center mt-2">Adicione itens para fazer seu pedido!</p>
        </div>
      </main>
    </motion.div>
  );
}
