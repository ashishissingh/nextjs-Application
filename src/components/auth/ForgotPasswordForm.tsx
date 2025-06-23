
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
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
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Implement actual forgot password logic
    toast({
      title: "Password Reset Email Sent",
      description: `If an account exists for ${values.email}, you will receive an email with instructions to reset your password.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-4 rounded-full inline-flex items-center justify-center">
            <Image
              src="https://raw.githubusercontent.com/hrudu-shibu-axcess/fluffy-fishstick/main/logo-white.png"
              alt="Axcess.io Logo"
              width={60}
              height={15} 
              priority
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-headline">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email to receive a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <Link href="/login" passHref>
          <Button variant="link" className="p-0 h-auto font-normal text-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4 inline-block" />
            Back to Login
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
