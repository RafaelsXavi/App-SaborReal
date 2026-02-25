'use client';

import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'motion/react';

interface PromotionBannerProps {
  id: string;
  imageUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  linkHref: string;
}

const mockPromotion: PromotionBannerProps = {
  id: 'promo-1',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2wjWs7zbXXiODn-A-fV1CdgPSkiRMlhGHY6RnVEYWTQL8PhPgFI_hUb_36tcyTYR5SkGN0CeH7Hok9KGbUsheHGvlTIN_YfHCOTSk_iFTpwxjnBaSaaN7JMAfX15VC8KpRpwhZfsMyautJ5rEPZ0_n0NvY4DekwjBFRTHxUPTdSldE8OCnMOt0jUkFbcN8-f-SIloNOqj8Uu3279V7zsfllYpXeqciTU15mKmVFzHv5kfyT27KxKzE6DMSkfjGEXO9KoeBlGY5C0',
  altText: 'Oferta especial de hambúrguer com refrigerante',
  title: 'Combo Família',
  subtitle: 'Aproveite 2 hambúrgueres + fritas + refri por R$ 69,90',
  linkHref: '/promotion/combo-familia',
};

export function PromotionBanner() {
  return (
    <motion.section
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.3}}
      className="mt-8 px-4"
    >
      <Link href={mockPromotion.linkHref} className="block">
        <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-primary/10">
          <Image
            src={mockPromotion.imageUrl}
            alt={mockPromotion.altText}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 text-white">
            <h3 className="text-lg font-bold leading-tight mb-1">
              {mockPromotion.title}
            </h3>
            <p className="text-sm opacity-90">
              {mockPromotion.subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
