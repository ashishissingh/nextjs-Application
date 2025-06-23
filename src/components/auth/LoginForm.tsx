
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
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardDescription, CardFooter
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Demo login logic
    if (values.email === 'test@example.com' && values.password === 'password') {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push('/choose-organization'); 
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  }

  const featureList = [
    "Access your personalized dashboard",
    "Manage your organization",
    "View analytics and reports",
  ];

  return (
    <Card className="w-full shadow-2xl rounded-xl overflow-hidden md:grid md:grid-cols-2">
      {/* Left Column */}
      <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Image 
              src="https://raw.githubusercontent.com/hrudu-shibu-axcess/fluffy-fishstick/main/logo-white.png" 
              alt="Axcess.io Logo" 
              width={120} 
              height={30}
              priority
            />
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-3">Welcome Back</h1>
        <p className="text-base text-primary-foreground/80 mb-8">
          Sign in to access your dashboard
        </p>
        <ul className="space-y-3">
          {featureList.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-ring" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className="bg-card text-card-foreground p-8 md:p-12 flex flex-col justify-center rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between text-sm">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} id="rememberMe" />
                    </FormControl>
                    <FormLabel htmlFor="rememberMe" className="font-normal text-muted-foreground">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Link href="/forgot-password" passHref>
                <Button variant="link" className="p-0 h-auto font-normal text-primary hover:text-primary/80">Forgot password?</Button>
              </Link>
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" type="button" aria-label="Continue with Google">
                <svg className="h-5 w-5" role="img" viewBox="0 0 48 48"><title>Google</title><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.533,44,30.169,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              </Button>
              <Button variant="outline" type="button" aria-label="Continue with Microsoft">
                 <svg className="h-5 w-5" role="img" viewBox="0 0 24 24"><title>Microsoft</title><path fill="#F25022" d="M11.406 11.406H0V0h11.406v11.406z"></path><path fill="#7FBA00" d="M24 11.406H12.594V0H24v11.406z"></path><path fill="#00A4EF" d="M11.406 24H0V12.594h11.406V24z"></path><path fill="#FFB900" d="M24 24H12.594V12.594H24V24z"></path></svg>
              </Button>
              <Button variant="outline" type="button" aria-label="Continue with Amazon">
                <svg className="h-5 w-5" role="img" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <title>Amazon</title>
                    <path fill="#221F1F" fillRule="evenodd" d="M18.423 20.968c-.594.855-.891 1.885-.891 3.091h-.004c0 1.52.432 2.695 1.296 3.523.864.828 1.97 1.242 3.313 1.242.873 0 1.607-.086 2.201-.263.942-.262 1.901-.925 2.88-1.99.071.087.193.257.37.512.173.254.299.422.378.512.077.086.209.226.392.417.184.193.396.395.641.603.297.123.551.105.76-.054.122-.104.907-.783 2.358-2.043.14-.104.209-.227.209-.365 0-.123-.052-.263-.157-.42l-.6-.8c-.123-.165-.253-.435-.379-.813a3.67 3.67 0 0 1-.198-1.242v-6.337c0-.068-.007-.291-.025-.666-.018-.374-.043-.62-.08-.734a18.945 18.945 0 0 1-.158-.612c-.068-.3-.144-.526-.234-.684a4.533 4.533 0 0 0-.354-.537c-.15-.2-.31-.389-.483-.563-1.12-1.03-2.673-1.545-4.663-1.545h-.653c-1.552.086-2.91.506-4.072 1.257-1.16.75-1.889 1.902-2.186 3.456a.742.742 0 0 0-.026.184c0 .244.149.401.444.473l3.012.367c.279-.052.454-.254.526-.603.12-.558.39-.995.81-1.31.42-.317.918-.497 1.494-.551h.203c.787 0 1.363.263 1.729.788.242.382.369 1.134.369 2.25v.445a79.287 79.287 0 0 0-2.305.209c-1.379.175-2.54.463-3.481.864-1.032.438-1.842 1.084-2.436 1.939Zm4.122 4.204c-.34-.415-.509-.958-.509-1.639l-.002.002c0-1.501.767-2.47 2.304-2.905.522-.14 1.291-.211 2.305-.211v.653c0 .559-.004.962-.013 1.207a4.992 4.992 0 0 1-.156.954 4.21 4.21 0 0 1-.433 1.087c-.401.75-.97 1.22-1.7 1.413-.037 0-.103.01-.199.027-.097.016-.169.024-.223.024-.576 0-1.032-.204-1.374-.612Z" clipRule="evenodd"></path>
                    <path fill="#F90" d="M33.032 31.965a.899.899 0 0 1 .156-.21c.438-.295.857-.497 1.26-.601a8.627 8.627 0 0 1 1.936-.288 1.56 1.56 0 0 1 .497.026c.786.073 1.26.202 1.415.397.072.102.104.259.104.468v.183c0 .612-.166 1.332-.497 2.16-.333.829-.796 1.498-1.386 2.004-.09.072-.168.105-.238.105a.235.235 0 0 1-.104-.026c-.108-.054-.131-.149-.08-.288.649-1.519.97-2.574.97-3.168 0-.193-.037-.333-.105-.42-.175-.207-.663-.313-1.467-.313-.296 0-.645.018-1.044.054-.44.054-.841.105-1.207.157-.108 0-.174-.018-.21-.054-.036-.036-.043-.069-.025-.105 0-.017.007-.043.025-.077v-.004Z"></path>
                    <path fill="#F90" d="M9.654 31.521c.086-.14.225-.15.418-.027 4.363 2.531 9.112 3.798 14.245 3.798 3.42 0 6.8-.639 10.135-1.913l.378-.157c.166-.072.283-.122.353-.156.263-.105.468-.054.617.156.148.209.1.402-.143.576-.316.227-.717.49-1.207.785-1.5.891-3.175 1.58-5.026 2.07-1.849.486-3.654.733-5.419.733-2.723 0-5.298-.477-7.723-1.428a21.228 21.228 0 0 1-6.522-4.02c-.106-.084-.16-.174-.16-.26a.27.27 0 0 1 .054-.157Z"></path>
                </svg>
              </Button>
            </div>

            <div className="text-center text-sm">
              <span>Don&apos;t have an account? </span>
              <Link href="/signup" passHref>
                <Button variant="link" className="p-0 h-auto font-normal text-primary hover:text-primary/80">Sign Up</Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}
