'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AiStudioScreen from '@/components/ai_studio/AiStudioScreen';

export default function AiStudioPage() {
  const router = useRouter();

  const navigateToModuleList = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <Sidebar onNavigateHome={navigateToModuleList} />
      <AiStudioScreen />
    </div>
  );
}