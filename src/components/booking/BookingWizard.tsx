'use client';

import { FormProvider } from 'react-hook-form';
import { createBookingAction } from '@/actions/booking';
import { Button } from '@/components/ui/button';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { useBookingForm } from './hooks/useBookingForm';
import { Step1TourDetails } from './steps/Step1TourDetails';
import { Step2PersonalInfo } from './steps/Step2PersonalInfo';
import { Step3Preferences } from './steps/Step3Preferences';
import { Step4Payment } from './steps/Step4Payment';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

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
  const { form, currentStep, totalSteps, nextStep, prevStep, isSubmitting, setIsSubmitting } = useBookingForm(tourId);

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progressPercent = (currentStep / totalSteps) * 100;

  const onSubmit = form.handleSubmit(
    async (data) => {
      try {
        setIsSubmitting(true);
        
        // If pay_now is selected, payment is handled by Paystack
        // The booking will be saved by the verify endpoint after successful payment
        // For on_arrival, save the booking directly
        if (data.paymentOption === 'on_arrival') {
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
        }
      } catch (error) {
        console.error("Booking submission error:", error);
        toast.error("An error occurred while submitting your booking. Please try again.");
        setIsSubmitting(false);
      }
    },
    (errors) => {
      console.log("FORM ERRORS", errors);
    }
  );

  return (
    <FormProvider {...form}>
      <div className="w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-foreground">
              {steps[currentStep - 1].title}
            </h3>
            <span className="text-xs text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progressPercent}>
            <ProgressTrack className="bg-muted">
              <ProgressIndicator className="bg-gradient-to-r from-primary to-secondary" />
            </ProgressTrack>
          </Progress>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <div key={stepNum} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isCompleted
                      ? 'bg-primary/30 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                  {step.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="min-h-[300px] animate-in fade-in duration-300">
            <CurrentStepComponent />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="ml-auto"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Booking'}
              </Button>
            )}
          </div>
        </form>

        {/* Help Text */}
        <p className="mt-4 text-xs text-muted-foreground text-center">
          We&apos;ll follow up via WhatsApp within 24 hours to confirm your booking details.
        </p>
      </div>
    </FormProvider>
  );
};