'use client';

import {LoginForm} from '@/components/auth/login-form';
import {motion} from 'motion/react';

export default function LoginPage() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4"
    >
      <LoginForm />
    </motion.div>
  );
}
