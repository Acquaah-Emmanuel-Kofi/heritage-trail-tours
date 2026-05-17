'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { BookingFormData } from '../types';

export const Step3Preferences = () => {
  const form = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Preferences & Special Requirements</h3>

      <FormField
        control={form.control}
        name="specialInterests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Interests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., History & Heritage, Culture & Traditions, Photography"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Conditions (if any)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Let us know about any health conditions we should be aware of"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dietaryRestrictions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dietary Restrictions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Vegetarian, Vegan, Allergies, Gluten-free"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="physicalLimitations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Physical Limitations</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., walking distance preferences, mobility issues"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specialAssistance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Assistance Required</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special assistance you may need during the tour"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes or Questions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Anything else we should know about your trip?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};