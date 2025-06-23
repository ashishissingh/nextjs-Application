import React, { useState } from 'react';
import K8sSidebar, { K8sNavId } from './K8sSidebar';
import K8sDashboard from './K8sDashboard';

interface K8sManagementScreenProps {
  // onNavigateBack prop removed
}

const K8sManagementScreen: React.FC<K8sManagementScreenProps> = () => { 
  const [activeNav, setActiveNav] = useState<K8sNavId>('k8sDashboard');

  return (
    <div className="flex flex-1 overflow-hidden">
      <K8sSidebar activeNav={activeNav} setActiveNav={setActiveNav} /> {/* Removed onNavigateBack */}
      <K8sDashboard activeNav={activeNav} />
    </div>
  );
};

export default K8sManagementScreen;