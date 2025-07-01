'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ConfirmOtpModal from '@/components/auth/SignUp/ConfirmOtp';

export default function ConfirmOtpPage() {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams, router]);

  return (
    <ConfirmOtpModal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      email={email}
    />
  );
}
