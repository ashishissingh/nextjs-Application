
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AppHeader() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  // Placeholder for current organization name - in a real app, this would come from context or auth state
  const [currentOrganizationName, setCurrentOrganizationName] = useState("Axcess Tech Systems");

  const handleSwitchOrganization = () => {
    router.push('/choose-organization');
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
      {isMobile && <SidebarTrigger />}
      {!isMobile && (
         <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground">{currentOrganizationName}</span>
            <Button variant="outline" size="sm" onClick={handleSwitchOrganization}>
              Switch Org
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
         </div>
      )}
      <div className="flex-1">
        {/* Optional: Breadcrumbs or page title can go here */}
      </div>
      {/* User profile dropdown has been moved to AppSidebar */}
    </header>
  );
}
