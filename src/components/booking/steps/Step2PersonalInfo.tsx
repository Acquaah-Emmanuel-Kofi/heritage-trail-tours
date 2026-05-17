'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { GuestForm } from '../forms/GuestForm';
import { BookingFormData } from '../types';

export const Step2PersonalInfo = () => {
  const form = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personal & Traveler Information</h3>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Enter your phone (WhatsApp preferred)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emergencyContactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Name</FormLabel>
            <FormControl>
              <Input placeholder="Emergency contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emergencyContactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Phone</FormLabel>
            <FormControl>
              <Input placeholder="Emergency contact phone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <GuestForm control={form.control} />
    </div>
  );
};