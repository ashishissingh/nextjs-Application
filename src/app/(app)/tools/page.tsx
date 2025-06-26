'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';
import { Footer } from '@/components/shared/Footer';
import { ToolsIcon } from '../../../../constants';

export default function ToolsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <Sidebar onNavigateHome={() => router.push('/dashboard')} />
      <div className="flex flex-1 bg-background text-foreground overflow-hidden">
        <AiStudioSidebar activeNav="tools" setActiveNav={() => {}} />
        <div className="flex-1 flex flex-col bg-background overflow-hidden h-full">
          <AiStudioSectionHeader
            title="Tools & Integrations"
            subtitle="Connect and manage your ecosystem of AI services."
            decorativeIcon={<ToolsIcon className="text-primary-foreground" />}
            backgroundColorClasses="bg-gradient-to-r from-primary to-accent"
            showSearchBar={true}
            searchPlaceholder="Search tools by name, category, or tag..."
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tools content coming soon...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}