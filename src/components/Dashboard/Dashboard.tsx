// components/App.tsx
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import AiStudioScreen from '../ai_studio/AiStudioScreen';
import K8sManagementScreen from '../k8s_management/K8sManagementScreen';

export type Screen = 'moduleList' | 'aiStudio' | 'k8sManagement';

const Dashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('moduleList');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const router = useRouter();

  const navigateToSelectedModule = useCallback((moduleId: string) => {
    if (moduleId === 'ai-studio') {
      router.push('/ai-studio');
    } else if (moduleId === 'k8s-mgmt') {
      router.push('/k8s-management');
    } else {
      console.log(`Navigation for module ${moduleId} not implemented yet.`);
    }
  }, [router]);

  const navigateToModuleList = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div
      className="
        flex h-screen overflow-hidden
        bg-gradient-to-br
        from-primary/10 via-accent/10 to-background
        dark:from-primary/20 dark:via-accent/15 dark:to-background/90
      "
    >
      <Sidebar onNavigateHome={navigateToModuleList} />
      {currentScreen === 'moduleList' && (
        <MainContent onExploreModule={navigateToSelectedModule} />
      )}
      {currentScreen === 'aiStudio' && selectedModuleId === 'ai-studio' && (
        <AiStudioScreen />
      )}
      {currentScreen === 'k8sManagement' && selectedModuleId === 'k8s-mgmt' && (
        <K8sManagementScreen />
      )}
    </div>
  );
};

export default Dashboard;
