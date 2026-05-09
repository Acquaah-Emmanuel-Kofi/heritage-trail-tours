'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingFormData } from '../types';

type PaystackSetupArgs = {
  key: string | undefined;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  onClose: () => void;
  callback: (_response: unknown) => void;
};

type PaystackHandler = {
  openIframe: () => void;
};

type PaystackPopType = {
  setup: (args: PaystackSetupArgs) => PaystackHandler;
};

type WindowWithPaystack = Window & {
  PaystackPop?: PaystackPopType;
};

export const PaymentForm = () => {
  const { register, setValue, watch } = useFormContext<BookingFormData>();
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentOption = watch('paymentOption');

  const handlePayment = async () => {
    if (paymentOption === 'pay_now') {
      setIsProcessing(true);
      // Paystack integration
      const PaystackPop = (window as WindowWithPaystack).PaystackPop;
      if (PaystackPop) {
        const handler = PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: watch('email'),
          amount: 50000, // Example amount in kobo (500 NGN)
          currency: 'NGN',
          ref: `ref_${Date.now()}`,
          onClose: () => {
            setIsProcessing(false);
          },
          callback: () => {
            // setValue('paymentId', response.reference);
            // setValue('paymentAmount', 50000);
            // setValue('paymentMethod', 'card');
            // Submit form
            setIsProcessing(false);
          },
        });
        handler.openIframe();
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment & Confirmation</h3>

      <div>
        <Label>Payment Option</Label>
        <RadioGroup
          value={paymentOption}
          onValueChange={(value) => setValue('paymentOption', value as 'pay_now' | 'on_arrival')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="on_arrival" id="on_arrival" />
            <Label htmlFor="on_arrival">Pay on Arrival</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pay_now" id="pay_now" />
            <Label htmlFor="pay_now">Pay Instantly (Deposit)</Label>
          </div>
        </RadioGroup>
      </div>

      {paymentOption === 'pay_now' && (
        <Button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Deposit'}
        </Button>
      )}

      <Input {...register('promoCode')} placeholder="Promo Code (optional)" />

      <div className="flex items-center space-x-2">
        <Checkbox {...register('termsAgreed')} />
        <Label>I agree to the Terms & Conditions</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox {...register('mediaConsent')} />
        <Label>I consent to media usage</Label>
      </div>
    </div>
  );
}