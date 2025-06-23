
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { Building, Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  selectedOrganizationId: z.string({
    required_error: "Please select an organization to continue.",
  }),
});


// Mock data for existing organizations
const existingOrganizations = [
  { id: 'org_1', name: 'Axcess Tech Systems' },
  { id: 'org_2', name: 'Amazon Web Services (AWS)' },
  { id: 'org_3', name: 'Amazon' },
];

export function ChooseOrganizationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Selected Organization ID:", values.selectedOrganizationId);
    // TODO: Implement actual logic for proceeding with the selected organization
    router.push('/dashboard');
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <Image
              src="https://raw.githubusercontent.com/hrudu-shibu-axcess/fluffy-fishstick/main/utlis-logo.png"
              alt="Platform Logo"
              width={64} 
              height={64}
              priority
              data-ai-hint="organization buildings"
            />
        </div>
        <CardTitle className="text-2xl font-headline">Choose Organization</CardTitle>
        <CardDescription>
          Select an existing organization to proceed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="selectedOrganizationId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-3"
                    >
                      {existingOrganizations.map(org => (
                        <FormItem key={org.id} className="flex items-center space-x-3 space-y-0 p-4 border rounded-md transition-colors hover:bg-ring/20 has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:border-primary">
                          <FormControl>
                            <RadioGroupItem value={org.id} id={`org-radio-${org.id}`} />
                          </FormControl>
                          <FormLabel htmlFor={`org-radio-${org.id}`} className="font-normal flex items-center gap-2 cursor-pointer w-full">
                            <Building className="h-5 w-5 text-primary" />
                            {org.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue to Dashboard
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
