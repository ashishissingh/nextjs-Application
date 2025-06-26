'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import K8sManagementScreen from '@/components/k8s_management/K8sManagementScreen';

export default function K8sManagementPage() {
  const router = useRouter();

  const navigateToModuleList = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <Sidebar onNavigateHome={navigateToModuleList} />
      <K8sManagementScreen />
    </div>
  );
}