'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { BookingFormData } from '../types';
import { usePaystackPayment } from '../hooks/usePaystackPayment';
import { toast } from 'sonner';

export const PaymentForm = () => {
  const form = useFormContext<BookingFormData>();
  const { initiatePayment } = usePaystackPayment();
  const paymentOption = form.watch('paymentOption');
  const email = form.watch('email');
  const termsAgreed = form.watch('termsAgreed');

  const handlePayment = async () => {
    if (paymentOption === 'pay_now') {
      if (!termsAgreed) {
        toast.error('Please agree to terms and conditions');
        return;
      }
      
      if (!email) {
        toast.error('Email is required for payment');
        return;
      }
            
      const metadata = {
        email,
        bookingRef: `BKG-${Date.now()}`,
      };
      
      // Amount has to come from the the tour price, change it!!!
      initiatePayment(email, 500, metadata);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment & Confirmation</h3>

      <FormField
        control={form.control}
        name="paymentOption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Option <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on_arrival" id="on_arrival" />
                  <label htmlFor="on_arrival" className="text-sm cursor-pointer">
                    Pay on Arrival
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pay_now" id="pay_now" />
                  <label htmlFor="pay_now" className="text-sm cursor-pointer">
                    Pay Instantly (Deposit - GHS 50)
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {paymentOption === 'pay_now' && (
        <div className="bg-muted p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Secure deposit of GHS 50 via Paystack. The remaining balance will be paid upon arrival.
          </p>
          <Button onClick={handlePayment} className="w-full">
            Proceed to Secure Payment
          </Button>
        </div>
      )}

      <FormField
        control={form.control}
        name="promoCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Promo Code</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter promo code (if you have one)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="termsAgreed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                I agree to the Terms & Conditions <span className="text-red-500">*</span>
              </FormLabel>
              <p className="text-xs text-muted-foreground">
                By proceeding, you agree to our booking terms and cancellation policy.
              </p>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mediaConsent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                I consent to media usage
              </FormLabel>
              <p className="text-xs text-muted-foreground">
                You allow us to use photos from your tour for promotional purposes.
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}