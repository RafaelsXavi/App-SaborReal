'use client';

import {Header} from '@/components/layout/header';
import {motion} from 'motion/react';
import {ReceiptText} from 'lucide-react';

export default function OrdersPage() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-col min-h-screen"
    >
      <Header title="Meus Pedidos" showBackButton={false} />
      <main className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
          <ReceiptText size={48} className="mb-4" />
          <p className="text-lg font-semibold">Você ainda não fez nenhum pedido.</p>
          <p className="text-sm text-center mt-2">Que tal explorar nossos restaurantes?</p>
        </div>
      </main>
    </motion.div>
  );
}
