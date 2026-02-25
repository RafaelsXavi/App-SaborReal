'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Home, Search, ReceiptText, User} from 'lucide-react';
import {motion} from 'motion/react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

function NavItem({href, icon: Icon, label, isActive}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center justify-end gap-1 py-2 rounded-lg transition-colors relative
        ${isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
    >
      <motion.div
        className="flex h-6 items-center justify-center"
        whileTap={{scale: 0.9}}
      >
        <Icon size={24} className={isActive ? 'fill-primary' : ''} />
      </motion.div>
      <motion.p
        className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-text-secondary'}`}
        initial={{opacity: 0, y: 5}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.2}}
      >
        {label}
      </motion.p>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <motion.footer
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, type: 'spring', stiffness: 120}}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card shadow-lg border-t border-gray-200 pb-safe"
    >
      <div className="max-w-md mx-auto flex justify-around items-center px-4">
        <NavItem href="/" icon={Home} label="Início" isActive={pathname === '/'} />
        <NavItem href="/search" icon={Search} label="Busca" isActive={pathname === '/search'} />
        <NavItem href="/orders" icon={ReceiptText} label="Pedidos" isActive={pathname === '/orders'} />
        <NavItem href="/profile" icon={User} label="Perfil" isActive={pathname === '/profile'} />
      </div>
    </motion.footer>
  );
}
