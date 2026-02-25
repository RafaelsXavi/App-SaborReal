'use client';

import Image from 'next/image';
import {motion} from 'motion/react';
import Link from 'next/link';
import {PlusCircle} from 'lucide-react';

interface CategoryProps {
  id: string;
  name: string;
  imageUrl: string;
}

const categories: CategoryProps[] = [
  {
    id: '1',
    name: 'Lanches',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4tcgSTxeDzi6zdfMrdIbHXPk4y5vCvdMdMYYJd9V4UNJYcpgPBckYnzruXI0h70csLPWCHEnu1g2ZU-wLJxNKpe7uM1llXnE-HYy4MM-zJqg80-GPVK-MbPbI_6eCjHli-W2LESwp1cGFMRlO9QT2TjeyMW3oTF3FOso80kWpSq-obheY5JlahbMHgG32eNecd36un2Iw99E4c1va6HhbrihKFxnXBo-mJYtuJstxbmH6XC8i7yukd8Muy5zEWxZtDhhMEZIZYQ',
  },
  {
    id: '2',
    name: 'Pizzas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvmgVgeroup7IzArVOaRRG-dvnEmwsQG-YLGi4bugN-WeiXWKcsfiRmsQbvV_IzKof2KWVUpnvgcExKrheyMTEgUsbzRXXYZ0Kc_znkHuZGB4lrB0LA0-X9icOBLYezGRFSwSCRJTmt-t5499uRqCTMrmIR6fDaxboSFONOAcXj0a3tkkLAbvtLwcaPce1xZnOjJzEiSbj3qdMe-hTzEkG69L9hFI-ggQoBzNwqABi-7As9T-5JEMVQVrERkh7MbREODVDOCfG1SQ',
  },
  {
    id: '3',
    name: 'Japonesa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApFvcJeJh4UF2vl_-Yy--FKgm1kPUkX-ZO14Hx3E_A8adq0shJHHqhU2ZB5APAVl-N4sQqwELz7Ni1QNgoDU0P4qHk400Phe5DxUPSwCIMY7j84-wHrOe9KlJyZq7oC4KaeAjaqq-MIXKVQITjnCFEuucjlMhEcZxfEa12oMBuAp7fRuansqHSPtS_7eyiPA72RtnlqGvangaUS_ilvbrQKyPdh_4nMSAwnKtKLsIifn61ycUuE_TCJ7qjUontKa2KrLORhdXd20w',
  },
  {
    id: '4',
    name: 'Brasileira',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBinvoNT-ZYKvv8aKHIyj7fYkvRKLCn9M5goVkm6KDengBykAO1fFFPRq7ZGSLmFhQJZRUrsXYuTKbP4nhr-YgAcd-e6-VX7wyDvTWdeAhgnnvZUOLwOqkGrEzh-asBkEtmqF6O18tYL4iK9ZCL8QkP621WAkfSB4e2uRTEI7IasXDM7e6ThxY_MRSa_f1XRnVWKbldLzDaYwiyZUY4791U05BkqDpFI9_aEL4NrnN-oD16uuf0GtfBqZXx7NFv2oh-T0lnDbQNjyg',
  },
  {
    id: '5',
    name: 'Doces',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Zhfmcy2aOKv0PKcEe8mrz4F_InT9LpERDs9fOm_frZTICq36jixfqcEnUw9uc4xiIu8suvxT1M-tFnDASBcV_6SnmRUAlfEGyaVP5FuPrWZDwO8oci3e803hp0lq4dVidVE8PNYdT_0zElpYp6rrYjj3CCCTZz7KwNi9JtbKu4U4wsg2ZYL1R439mZvVky6jRqq2cDV1h9Ojc1ka4ajMoxP9VZaXi3tbmBMfIYfpgLYygg0uZTWiQfO5jVVzeVSeU53CzNEzGk',
  },
  {
    id: '6',
    name: 'Saudável',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYpmYECz_9qlq6zTsWQH_qE3BV-tE_Njs-0v9FDfRcgKtdq3lrwKts5DfwJjNSAWnrHoyC-YDFvziy65F1FfWAk8aKhS_sEGSjO5uWzAd6Z1wxBRAqDOcjX6QHRL-bVOzOBfWSmdsPkDxea4VBGJILmkwL-VdvnYrumGq1rDwZ-8nfP27SnB0jyz6D-yT7vg2-K73P3COK_XGEIfnE68VEiokhhJIfyZ8CY3nDpuUUftY7OeYvveWujJULuOrodRoDoHlFJEQbsw',
  },
  {
    id: '7',
    name: 'Marmita',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmpoz4uLs_1c5PnAkB5LxrbOVlpnmV-kFOQoMRTvLiZD5iAoBYW-BMkoZfBQZBdWWsN4w5mV5mU4lOP7XXbU_E116GdcpyKRvTYfqcLRN8XA_0qQZcmp3LVs3I0PSiamhr67Gl3GeWqfh9fp_bG3SQcMyoPJHDuL4RENQr1dToYmdw6b7dLrVIfQ3EAk3lhovXbbGhBy9DIk-7uvp1zYpd4BDIIWnGW44zEv8Azpv4LLiOWYCkCOOU6l7eY-kiq0x3NZdnxwRSE',
  },
  {
    id: '8',
    name: 'Mais',
    imageUrl: '', // No image for 'Mais'
  },
];

export function CategoryGrid() {
  return (
    <motion.section
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.1}}
      className="mt-8 px-4"
    >
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link href={`/category/${category.id}`} key={category.id} className="flex flex-col items-center gap-1 group">
            <div className="w-full aspect-square rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <PlusCircle size={24} className="text-primary" />
              )}
            </div>
            <span className="text-[11px] font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
