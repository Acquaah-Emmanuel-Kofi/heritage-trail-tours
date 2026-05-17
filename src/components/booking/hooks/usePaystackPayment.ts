'use client';

import { PaystackResponse } from '@/types/common';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function usePaystackPayment() {
  const router = useRouter();

  const initiatePayment = (
    email: string,
    amount: number,
    metadata: unknown
  ) => {
    if (!window.PaystackPop) {
      toast.error(
        'Paystack SDK not loaded. Please refresh the page and try again.'
      );
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      toast.error(
        'Payment configuration error. Please contact support if this persists.'
      );
      console.error('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not configured');
      return;
    }

    if (!email || !amount || amount <= 0) {
      toast.error('Invalid payment details. Please check your information.');
      return;
    }

    try {
      // Ensure we're in a form context
      const form = document.getElementById('checkout-form') as HTMLFormElement;
      if (!form) {
        toast.error('Form not found. Please refresh the page and try again.');
        return;
      }

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: Math.round(Number(amount) * 100),
        currency: 'GHS',
        metadata,
        callback: (response: PaystackResponse) => {
          if (response.reference) {
            router.push(`/api/paystack/verify?reference=${response.reference}`);
          } else {
            toast.error(
              'Payment reference not received. Please contact support.'
            );
          }
        },
        onClose: () => {
          toast.error('Transaction was not completed.');
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  return { initiatePayment };
}