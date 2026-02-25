'use client';

import {useState} from 'react';
import Image from 'next/image';
import {motion} from 'motion/react';
import {FileText} from 'lucide-react';

interface ProductDetailsProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  oldPrice?: number;
  isPopular?: boolean;
}

export function ProductDetails({
  id,
  name,
  description,
  price,
  imageUrl,
  oldPrice,
  isPopular,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    // TODO: Implement actual add to cart logic
    console.log({
      productId: id,
      name,
      price,
      quantity,
      observations,
    });
    setTimeout(() => {
      setIsLoading(false);
      alert(`Adicionado ${quantity}x ${name} ao carrinho!`);
    }, 1000);
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Image */}
      <div className="@container">
        <div
          className="w-full aspect-square bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden"
          style={{backgroundImage: `url("${imageUrl}")`}}
          data-alt={name}
        ></div>
      </div>

      {/* Product Info */}
      <div className="px-4 pt-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
            {name}
          </h1>
          {isPopular && (
            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
              Popular
            </span>
          )}
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-primary text-2xl font-bold">
            R$ {(price * quantity).toFixed(2).replace('.', ',')}
          </span>
          {oldPrice && (
            <span className="text-slate-400 line-through text-sm">
              R$ {oldPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-6"></div>

        {/* Observations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-slate-400" />
            <h3 className="text-slate-900 dark:text-white font-bold">Observações</h3>
          </div>
          <textarea
            className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-28 resize-none text-sm placeholder:text-slate-400"
            placeholder="Ex: Sem cebola, ponto da carne mal passado, etc."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            disabled={isLoading}
          ></textarea>
        </div>
      </div>

      {/* Bottom Actions (Floating) */}
      <div className="sticky bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-32 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="flex size-9 items-center justify-center rounded-lg text-primary hover:bg-white dark:hover:bg-slate-700 transition-colors"
              disabled={isLoading}
            >
              -
            </button>
            <span className="font-bold text-slate-900 dark:text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="flex size-9 items-center justify-center rounded-lg text-primary hover:bg-white dark:hover:bg-slate-700 transition-colors"
              disabled={isLoading}
            >
              +
            </button>
          </div>
          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-xl flex items-center justify-between px-6 font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <span>Adicionar</span>
            <span>R$ {(price * quantity).toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
        {/* Safe Area Bottom for Mobile */}
        <div className="h-2"></div>
      </div>
    </motion.div>
  );
}
