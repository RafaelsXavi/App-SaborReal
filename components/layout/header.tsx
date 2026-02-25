'use client';

import {useRouter} from 'next/navigation';
import {motion} from 'motion/react';
import {ArrowLeft, Share, Search} from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  showSearchButton?: boolean;
  onShare?: () => void;
  onSearch?: () => void;
}

export function Header({
  title,
  showBackButton = true,
  showShareButton = false,
  showSearchButton = false,
  onShare,
  onSearch,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.div
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}
      className="fixed top-0 z-10 flex w-full max-w-md items-center justify-between bg-card p-4 shadow-sm"
    >
      {showBackButton ? (
        <button
          onClick={handleBack}
          className="flex size-10 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white"
        >
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="size-10" /> // Placeholder to maintain spacing
      )}
      <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
        {title}
      </h2>
      <div className="flex items-center space-x-2">
        {showSearchButton && (
          <button
            onClick={onSearch}
            className="flex size-10 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white"
          >
            <Search size={20} />
          </button>
        )}
        {showShareButton && (
          <button
            onClick={onShare}
            className="flex size-10 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white"
          >
            <Share size={20} />
          </button>
        )}
        {(!showSearchButton && !showShareButton) && <div className="size-10" /> // Placeholder
}
      </div>
    </motion.div>
  );
}
