'use client';

import { useFormContext } from 'react-hook-form';
import { FieldPath } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { BookingFormData } from '../types';

export const Step1TourDetails = () => {
  const form = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Tour & Travel Details</h3>

      <FormField
        control={form.control}
        name="travelersCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Guests <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                placeholder="Enter number of guests"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="arrivalDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arrival Date <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="departureDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Departure Date <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="flightDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flight Details</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter flight details (optional)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accommodationAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accommodation Address</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter accommodation address if already booked (optional)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pickupLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pickup Location</FormLabel>
            <FormControl>
              <Input
                placeholder="Where should we pick you up?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredTourDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Tour Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="privateTour"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="cursor-pointer">Private Tour (higher cost)</FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};