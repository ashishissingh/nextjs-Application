import React, { useState } from 'react';
import AiStudioSidebar, { AiStudioNavId } from './AiStudioSidebar';
import AiStudioDashboard from './AiStudioDashboard';

interface AiStudioScreenProps {
  // onNavigateBack prop removed
}

const AiStudioScreen: React.FC<AiStudioScreenProps> = () => {
  const [activeNav, setActiveNav] = useState<AiStudioNavId>('dashboard');

  return (
    <div className="flex flex-1 bg-background text-foreground overflow-hidden">
      <AiStudioSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <AiStudioDashboard activeNav={activeNav} />
    </div>
  );
};

export default AiStudioScreen;
