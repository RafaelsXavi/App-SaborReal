'use client';

import Image from 'next/image';
import {motion} from 'motion/react';

interface BannerProps {
  id: string;
  imageUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  tag?: string;
  tagColor?: string;
}

const banners: BannerProps[] = [
  {
    id: '1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2wjWs7zbXXiODn-A-fV1CdgPSkiRMlhGHY6RnVEYWTQL8PhPgFI_hUb_36tcyTYR5SkGN0CeH7Hok9KGbUsheHGvlTIN_YfHCOTSk_iFTpwxjnBaSaaN7JMAfX15VC8KpRpwhZfsMyautJ5rEPZ0_n0NvY4DekwjBFRTHxUPTdSldE8OCnMOt0jUkFbcN8-f-SIloNOqj8Uu3279V7zsfllYpXeqciTU15mKmVFzHv5kfyT27KxKzE6DMSkfjGEXO9KoeBlGY5C0',
    altText: 'Hambúrguer gourmet com queijo derretido e bacon',
    title: 'Festival do Burger',
    subtitle: '50% OFF', 
    tag: 'PROMOÇÃO',
    tagColor: 'bg-primary',
  },
  {
    id: '2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJPQceSIt6X4UFri4AIUIqamrDRnwdBC6G2EQM9yF6wyZyhGN62iE1Z4clavkk9Thi6YieQ4KGDBMINdr_A_Q3zwtQ35MF3NGHQ9ttFqFd8mKy-qHUMTrlJEZ-M9yrtjsPTXx_k7u8ocXNKftW6bYO2h4h48Y7OcniMlvS9szgHFjqT8192Aodc0095UpMS48H59PawFmOUedBBMV3NrXA9Kh34xNECp1xBHPo8vC1Cpa0YavmDqh6zJveOZa5s20y76UlGM91Hgw',
    altText: 'Pizza de pepperoni clássica com queijo',
    title: 'Noite da Pizza',
    subtitle: 'Entrega em 30min',
    tag: 'FRETE GRÁTIS',
    tagColor: 'bg-green-600',
  },
];

export function HeroBanner() {
  return (
    <motion.section
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="mt-4 px-4 overflow-x-auto hide-scrollbar flex gap-4 snap-x"
    >
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="min-w-[85%] snap-center rounded-xl overflow-hidden aspect-[16/7] bg-primary/10 relative"
          data-alt={banner.altText}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 text-white">
            {banner.tag && (
              <span className={`text-xs font-bold ${banner.tagColor} px-2 py-1 rounded w-fit mb-2`}>
                {banner.tag}
              </span>
            )}
            <h3 className="text-lg font-bold leading-tight">
              {banner.title}
              <br />
              {banner.subtitle}
            </h3>
            {/* <p className="text-[10px] mt-1 opacity-90">Válido para lojas selecionadas</p> */}
          </div>
          <Image
            src={banner.imageUrl}
            alt={banner.altText}
            fill
            className="w-full h-full object-cover -z-10"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </motion.section>
  );
}
