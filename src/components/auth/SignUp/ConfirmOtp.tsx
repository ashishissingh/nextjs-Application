'use client';

import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { toast } from '@/hooks/use-toast';
import { CONFIG } from '@/lib/config';
import { confirmOtp } from '@/lib/confirmOtp';
import { resendOtp } from '@/lib/resendOtp';
import { useRouter, useSearchParams } from 'next/navigation';

type ConfirmOtpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

export default function ConfirmOtpModal({ isOpen, onClose, email }: ConfirmOtpModalProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleConfirm = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Error',
        description: 'OTP must be 6 digits',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await confirmOtp({
        email,
        code: otp,
        userPoolId: CONFIG.userPoolId!,
        clientId: CONFIG.clientId!,
      });

      toast({ title: 'Success', description: 'OTP confirmed successfully!' });

      const isOrgOwner = searchParams.get('isOrgOwner');
      const orgId = searchParams.get('orgid');

      if (isOrgOwner && orgId) {
        localStorage.setItem('orgid', orgId);
        localStorage.setItem('orgflag', isOrgOwner);
        toast({ title: 'Welcome!', description: 'Organization registered successfully.' });

        setTimeout(() => router.push('/'), 4000);
      } else {
        router.push('/');
      }

      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'OTP confirmation failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendOtp({
        email,
        userPoolId: CONFIG.userPoolId!,
        clientId: CONFIG.clientId!,
      });
      toast({ title: 'OTP Resent', description: 'Please check your email again.' });
    } catch (error: any) {
      toast({
        title: 'Resend Failed',
        description: error.message || 'Unable to resend OTP.',
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-2">Confirm OTP</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Enter the 6-digit OTP sent to <strong>{email}</strong>.
      </p>

      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        className="w-full text-center text-lg tracking-widest px-4 py-2 rounded-md border outline-none mb-4"
        style={{
          borderColor: 'hsl(var(--border))',
          backgroundColor: 'hsl(var(--input))',
          color: 'hsl(var(--foreground))',
        }}
        placeholder="Enter OTP"
      />

      <div className="flex justify-between gap-4 mb-3">
        <button
          onClick={onClose}
          className="w-full py-2 rounded-md font-medium bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full py-2 rounded-md font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))]"
        >
          {loading ? 'Confirming…' : 'Confirm'}
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-sm font-medium text-primary hover:underline"
        >
          {resending ? 'Resending…' : 'Resend OTP'}
        </button>
      </div>
    </Modal>
  );
}
