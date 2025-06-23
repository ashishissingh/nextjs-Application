// components/App.tsx
import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AiStudioScreen from './ai_studio/AiStudioScreen';
import K8sManagementScreen from './k8s_management/K8sManagementScreen';

export type Screen = 'moduleList' | 'aiStudio' | 'k8sManagement';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('moduleList');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const navigateToSelectedModule = useCallback((moduleId: string) => {
    if (moduleId === 'ai-studio') {
      setSelectedModuleId(moduleId);
      setCurrentScreen('aiStudio');
    } else if (moduleId === 'k8s-mgmt') {
      setSelectedModuleId(moduleId);
      setCurrentScreen('k8sManagement');
    } else {
      console.log(`Navigation for module ${moduleId} not implemented yet.`);
    }
  }, []);

  const navigateToModuleList = useCallback(() => {
    setCurrentScreen('moduleList');
    setSelectedModuleId(null);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-sky-100">
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

export default App;
