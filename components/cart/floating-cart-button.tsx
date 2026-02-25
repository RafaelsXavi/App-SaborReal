'use client';

import Link from 'next/link';
import {motion} from 'motion/react';
import {ShoppingCart} from 'lucide-react';
import {useState, useEffect} from 'react';

interface FloatingCartButtonProps {
  itemCount: number;
}

export function FloatingCartButton({itemCount}: FloatingCartButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [itemCount]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 100}}
      transition={{type: 'spring', stiffness: 120, damping: 20}}
      className="fixed bottom-20 right-4 z-40"
    >
      <Link
        href="/cart"
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-white font-bold shadow-lg hover:bg-primary/90 transition-colors"
      >
        <ShoppingCart size={20} />
        <span>{itemCount} Itens</span>
      </Link>
    </motion.div>
  );
}
