'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookingFormData } from '../types';

export const Step3Preferences = () => {
  const { register } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Preferences & Special Requirements</h3>

      <div>
        <Label htmlFor="specialInterests">Special Interests</Label>
        <Textarea
          id="specialInterests"
          placeholder="e.g., History & Heritage, Culture & Traditions"
          {...register('specialInterests')}
        />
      </div>

      <div>
        <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
        <Textarea id="medicalConditions" {...register('medicalConditions')} />
      </div>

      <div>
        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
        <Textarea
          id="dietaryRestrictions"
          placeholder="e.g., Vegetarian, Vegan, Allergies"
          {...register('dietaryRestrictions')}
        />
      </div>

      <div>
        <Label htmlFor="physicalLimitations">Physical Limitations</Label>
        <Textarea
          id="physicalLimitations"
          placeholder="e.g., walking distance, mobility issues"
          {...register('physicalLimitations')}
        />
      </div>

      <div>
        <Label htmlFor="specialAssistance">Special Assistance Required</Label>
        <Textarea id="specialAssistance" {...register('specialAssistance')} />
      </div>

      <div>
        <Label htmlFor="preferences">Additional Notes or Questions</Label>
        <Textarea id="preferences" {...register('preferences')} />
      </div>
    </div>
  );
};