'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'motion/react';
import {Plus} from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  oldPrice?: number;
  isPopular?: boolean;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  oldPrice,
  isPopular,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3}}
        className="flex justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 group"
      >
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center gap-2">
            {isPopular && (
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                Popular
              </span>
            )}
            <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
              {name}
            </h4>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-primary font-bold">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            {oldPrice && (
              <span className="text-slate-400 line-through text-xs font-medium">
                R$ {oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>
        <div className="relative w-32 h-32 shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
          />
          <button className="absolute bottom-1 right-1 bg-white dark:bg-slate-900 rounded-full p-1 shadow-md text-primary group-hover:scale-110 transition-transform">
            <Plus size={16} />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
