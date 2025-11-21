'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useLenis();

  return <>{children}</>;
}
