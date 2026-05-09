'use client';

import { FormProvider } from 'react-hook-form';
import { createBookingAction } from '@/actions/booking';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBookingForm } from './hooks/useBookingForm';
import { Step1TourDetails } from './steps/Step1TourDetails';
import { Step2PersonalInfo } from './steps/Step2PersonalInfo';
import { Step3Preferences } from './steps/Step3Preferences';
import { Step4Payment } from './steps/Step4Payment';

const steps = [
  { component: Step1TourDetails, title: 'Tour Details' },
  { component: Step2PersonalInfo, title: 'Personal Info' },
  { component: Step3Preferences, title: 'Preferences' },
  { component: Step4Payment, title: 'Payment' },
];

interface BookingWizardProps {
  tourId?: string;
  tourName?: string;
  isCustom?: boolean;
}

export const BookingWizard = ({ tourId, tourName = "Custom Heritage Trip", isCustom = false }: BookingWizardProps) => {
  const { form, currentStep, totalSteps, nextStep, prevStep } = useBookingForm(tourId);

  const CurrentStepComponent = steps[currentStep - 1].component;

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    formData.append("tourId", tourId ?? "");
    formData.append("tourName", tourName);
    formData.append("isCustom", String(isCustom));
    await createBookingAction(formData);
  });

  return (
    <FormProvider {...form}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Book Your Tour</h2>
          <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <CurrentStepComponent />

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit Booking</Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};