
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
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, EyeOff, CheckCircle2, Star, ArrowRight, User, Building2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CONFIG } from '@/lib/config';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import ConfirmOtpModal from './ConfirmOtp';


const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  organizationId: z.string().min(1, { message: 'Organization ID is required.' }),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const steps = [
  { id: 1, name: 'Personal Information', icon: User },
  { id: 2, name: 'Company Details', icon: Building2 },
  { id: 3, name: 'Security & Preferences', icon: ShieldCheck },
];

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingApp, setLoadingApp] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organizationId: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  function validateEmail() {
    const email = form.getValues('email').toLowerCase();
    const organizationId = form.getValues('organizationId');

    form.setValue('email', email);

    const orgObj = { email, org: organizationId };

    return fetch(`${CONFIG.apiUrl}validateEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orgObj)
    })
      .then(response => response.text())
      .then(response => {
        console.log('API Response:', JSON.stringify(response)); // Better debug log
        if (response.includes("Email already exists")) {
          throw new Error('Email already exists.');
        }
        if (!response.includes("Email does not exist")) {
          throw new Error(`Unexpected response: ${response}`);
        }
      });


  }



  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoadingApp(true);

    try {
      await validateEmail();
      console.log("Email validation successful");

      if (!CONFIG.userPoolId || !CONFIG.clientId) {
        throw new Error("Missing Cognito configuration");
      }

      const poolData = {
        UserPoolId: CONFIG.userPoolId,
        ClientId: CONFIG.clientId,
      };

      const UserPool = new CognitoUserPool(poolData);

      const attributeList: CognitoUserAttribute[] = [];

      attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: `${values.firstName} ${values.lastName}` }));

      if (values.phoneNumber && values.phoneNumber.length === 10) {
        attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: '+91' + values.phoneNumber }));
      }

      attributeList.push(new CognitoUserAttribute({ Name: 'custom:userType', Value: 'user' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'custom:admin_approved', Value: 'false' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'custom:org_id', Value: values.organizationId }));

      // UserPool.signUp(values.email, values.password, attributeList, [], (err, data) => {
      //   setLoadingApp(false);

      //   if (err) {
      //     const errorMessage =
      //       (err as any).code === 'UsernameExistsException'
      //         ? 'Email already exists.'
      //         : err.message || JSON.stringify(err);

      //     console.error('Signup error:', errorMessage);
      //     // Handle error state, e.g., setShowErrorMessage(true);
      //     return;
      //   }

      //   console.log("Signup success:", JSON.stringify(data));


      // });

      setOtpEmail(values.email);
      setOtpModalOpen(true);


    } catch (error: any) {
      console.error("Signup failed:", error);
      form.setError('email', { message: error.message });
      setLoadingApp(false);
    }
  }




  const featureList = [
    "Advanced analytics dashboard",
    "Seamless integrations",
    "Enterprise-grade security",
    "Dedicated support team",
  ];

  return (

    <Card className="w-full shadow-2xl rounded-xl overflow-hidden md:grid md:grid-cols-2">
      {/* Left Column */}
      <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between rounded-t-xl md:rounded-l-xl md:rounded-tr-none min-h-[600px] md:min-h-0">
        <div>
          <div className="mb-10">
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
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-3">Join Our Platform</h1>
          <p className="text-base text-primary-foreground/80 mb-8">
            Create an account to access powerful tools and streamline your workflow.
          </p>
          <ul className="space-y-3 mb-10">
            {featureList.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-ring shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase font-semibold text-primary-foreground/70 mb-3">WHAT OUR CUSTOMERS SAY</h3>
          <div className="bg-primary/70 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://placehold.co/40x40.png?text=JD" alt="John Davis" data-ai-hint="customer avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <blockquote className="text-sm italic text-primary-foreground/90 mb-2">
              "Axcess Utils has revolutionized how we manage our operations. Highly recommended for efficiency!"
            </blockquote>
            <p className="text-sm font-semibold">John Davis</p>
            <p className="text-xs text-primary-foreground/70">CEO, Innovate Solutions</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-card text-card-foreground p-8 md:p-12 flex flex-col justify-center rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-center">Create Account</h2>
          <p className="text-muted-foreground text-center text-sm">Sign up to get started with our platform.</p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center w-1/3",
                currentStep === step.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "rounded-full h-10 w-10 flex items-center justify-center border-2",
                currentStep === step.id ? "border-primary bg-primary/10" : "border-border"
              )}>
                <step.icon className={cn("h-5 w-5", currentStep === step.id ? "text-primary" : "text-muted-foreground/70")} />
              </div>
              <p className={cn("text-xs mt-2 text-center", currentStep === step.id ? "font-semibold" : "")}>{step.name}</p>
              {currentStep === step.id && <div className="w-full bg-primary mt-2 absolute bottom-[-1px] left-0 right-0 mx-auto" style={{ transform: `translateX(${index * 100 - 100}%)`, width: '33.33%'}}></div> }
            </div>
          ))}
        </div>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="organizationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Placeholder for future steps */}
            {currentStep === 2 && <p className="text-center text-muted-foreground">Company Details fields will go here.</p>}
            {currentStep === 3 && <p className="text-center text-muted-foreground">Security & Preferences fields will go here.</p>}

            <Button type="submit" className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          <span>Already have an account? </span>
          <Link href="/login" passHref>
            <Button variant="link" className="p-0 h-auto font-normal text-primary hover:text-primary/80">Sign In</Button>
          </Link>
        </div>
      </div>
      <ConfirmOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        email={otpEmail}
      />

    </Card>


  );
}