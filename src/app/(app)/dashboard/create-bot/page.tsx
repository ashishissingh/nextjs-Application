'use client';

import { PlusSquare, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-8">
       <div className="flex items-center gap-4">
        <PlusSquare className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-headline font-bold">Create New Bot</h1>
          <p className="text-muted-foreground">Configure and launch a new automated agent.</p>
        </div>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
          <CardDescription>Fill in the details to set up your new bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateBotForm />
        </CardContent>
      </Card>
    </div>
  );
}
