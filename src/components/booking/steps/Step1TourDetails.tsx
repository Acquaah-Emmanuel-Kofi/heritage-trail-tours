'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BookingFormData } from '../types';

export const Step1TourDetails = () => {
  const { register, setValue, watch } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Tour & Travel Details</h3>

      <div>
        <Label htmlFor="travelersCount">Number of Guests</Label>
        <Input
          id="travelersCount"
          type="number"
          min="1"
          {...register('travelersCount', { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="arrivalDate">Arrival Date</Label>
        <Input
          id="arrivalDate"
          type="date"
          {...register('arrivalDate', { valueAsDate: true })}
        />
      </div>

      <div>
        <Label htmlFor="departureDate">Departure Date</Label>
        <Input
          id="departureDate"
          type="date"
          {...register('departureDate', { valueAsDate: true })}
        />
      </div>

      <div>
        <Label htmlFor="flightDetails">Flight Details (optional)</Label>
        <Textarea id="flightDetails" {...register('flightDetails')} />
      </div>

      <div>
        <Label htmlFor="accommodationAddress">Accommodation Address (if booked)</Label>
        <Textarea id="accommodationAddress" {...register('accommodationAddress')} />
      </div>

      <div>
        <Label htmlFor="pickupLocation">Pickup Location</Label>
        <Input id="pickupLocation" {...register('pickupLocation')} />
      </div>

      <div>
        <Label htmlFor="preferredTourDate">Preferred Tour Date</Label>
        <Input
          id="preferredTourDate"
          type="date"
          {...register('preferredTourDate', { valueAsDate: true })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="privateTour"
          checked={watch('privateTour')}
          onCheckedChange={(checked) => setValue('privateTour', !!checked)}
        />
        <Label htmlFor="privateTour">Private Tour</Label>
      </div>
    </div>
  );
};