'use client';

import {useState, useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {ProductDetails} from '@/components/product/product-details';
import {Header} from '@/components/layout/header';
import {motion} from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  oldPrice?: number;
  isPopular?: boolean;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hambúrguer Sabor Real',
    description:
      'Pão de brioche selado na manteiga, blend de carne bovina angus 180g, queijo cheddar inglês derretido, bacon crocante, alface americana fresca, tomate cereja e nossa exclusiva maionese artesanal da casa.',
    price: 42.9,
    oldPrice: 48.0,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEiBQ5XLKHoY20aG8OP62TXN5q9N0tgrIl7Y08r_2WdkSM5hpZLn2pSoCqNJoqp2vCCPcHQKKzzdaGjt5quppqP42kEv0dIBbgzrH97SvvIiSKa9jIK-CUbOfkllJXnR5chJQnlZZh8JNkBXEVUKxHrzgJYnKUTvLpWfu_c4ZZqZN0sMQHN1accPB_vGJq3lcSkAXXc8c5OfA-dHpYxNTHH3nC1YiY5tMyL05HIoLwiFMJ8pvxUQHNkBv4CeMurAKN-9iYfq2tM9k',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Real Burger Clássico',
    description:
      'Dois hambúrgueres bovinos, alface americana, queijo cheddar derretido, molho especial e pão com gergelim.',
    price: 34.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWXT1qKuIUjUb-VO-umOcKy6aFiiQGxii7nQtaCMGRKoZUSb4mr4aHomp_vO9w-uzpxc5FXhyjnrU90d7xu2lLIdtUAwg5kIaysjHwU2gWzjI6wRooi0CkcF9JIyrlxVnhmL1tW8XDyhiiaJEIZJyMMpovuMZBQqn3VCOgip_nwtr9CzR6yBJ0duPdOwPnTiqLheWDKn4IflExoXdijiulAWItZ2Z7hbKd_4Tbg_lCCdyR4LXqbDYdyox7SC0x6AAhvjwKfilVUfc',
  },
  {
    id: '3',
    name: 'Combo Real Kids',
    description:
      'Cheeseburger, batata frita pequena, suco natural de laranja 300ml e um brinde surpresa.',
    price: 28.5,
    oldPrice: 32.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJg2EQSh_vmb3jgPeItWzeOTHyKn-kQU61JgfPDxdDxpfLK1vgfvBCreTIn7O_OEI514_ZcMHxssPfoZEFOnP6xtpPzPNiAtfXAQvBypvnnlZClxljCftfeYXnKaDC_T33gZaeKgXMzcLs9Nv6QwLCOW1iA-NqkBARbOL2vvgbMIfoekDRL-QJP67p3CnEW-NhRW92Lpo9UVJJ-D10NLUwyhDMHwPAMxQOmUPZalyukHE_wNg9T2B-aepRNH6k_VDq6iZtUwShRCY',
    isPopular: true,
  },
  {
    id: '4',
    name: 'Bacon Supreme',
    description:
      'Hambúrguer 180g, triplo bacon crocante, cebola caramelizada, queijo prato e maionese defumada.',
    price: 38.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeay2C3IS3sj4vwgO7jWjFNTSiNM9wXcPa5U_BZ8iSEKG-kLJmCsIzoOeRE4w2LZp3Kjt_kIpo3kI_yTVK4Yd0PhYW1fvA-5s9ozbBTC2QO0r_W-FiwQamyLWlYGGzNHWl3koqWkCZiwlq3MhOKRct6XnXpQxFv2aAeTXjAxvo9yu_z2WGdRTwZ3of13ZqzxMpt-oTq83wa8cy1ClssFyP9kYvOx8xdXEnr9Il96mJ5afx-J0VU3W3lfxnjI6AlD2HKUq8kIYZI5w',
  },
  {
    id: '5',
    name: 'Batata Rústica Grande',
    description:
      'Porção de batatas cortadas rusticamente com alecrim e sal grosso. Acompanha maionese da casa.',
    price: 19.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAI1FgEF5WYn46VIMnNcbn3Vm4s3a0mXqkget8OJCZ6Yczh-dFeNfc2Pmhlpt_pLE9FtY0KfdgAWSw-Gncm-49Vm-ZgbKM_8OMG6mPKnptadD-L7CTNjmj1sIaH1fh4ZC1htUTEctDWjnQzHAxS5nfG5i210LpMnsPfGr_ywQDGxHYawC68qud6zXcd1KijL6Cff1vUlsYcq9g0at2PevfIi1q5hfrOO58kiibZcL0S1reBfWIEGfCfZeS0GNuLb41AsOHNkTtAjZg',
  },
];

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const {id} = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find((p) => p.id === id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col min-h-screen">
      <Header title={product.name} showShareButton showBackButton />
      <ProductDetails {...product} />
    </motion.div>
  );
}
