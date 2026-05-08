'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GuestForm } from '../forms/GuestForm';
import { BookingFormData } from '../types';

export const Step2PersonalInfo = () => {
  const { register, control } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personal & Traveler Information</h3>

      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register('name')} />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register('email')} />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number (WhatsApp preferred)</Label>
        <Input id="phone" {...register('phone')} />
      </div>

      <div>
        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
        <Input id="emergencyContactName" {...register('emergencyContactName')} />
      </div>

      <div>
        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
        <Input id="emergencyContactPhone" {...register('emergencyContactPhone')} />
      </div>

      <GuestForm control={control} />
    </div>
  );
};