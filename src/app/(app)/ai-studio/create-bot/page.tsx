'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlusSquare, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import dynamic from 'next/dynamic';

const CreateBotForm = dynamic(
  () => import('@/components/ai_studio/CreateBotForm').then(mod => mod.CreateBotForm),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading Bot Configuration Form...</p>
      </div>
    )
  }
);

export default function CreateBotPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <Sidebar onNavigateHome={() => router.push('/dashboard')} />
      <div className="flex flex-1 bg-background text-foreground overflow-hidden">
        <AiStudioSidebar activeNav="dashboard" setActiveNav={() => {}} />
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8 mt-8 p-6">
            <div className="flex items-center gap-4">
              <PlusSquare className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-3xl font-headline font-bold">Create New Bot</h1>
                <p className="text-form-description">Configure and launch a new automated agent.</p>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Bot Configuration</CardTitle>
                <CardDescription className='text-form-description'>Fill in the details to set up your new bot.</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateBotForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
