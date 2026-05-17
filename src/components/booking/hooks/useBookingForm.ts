import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BookingFormData } from '../types';
import { fullBookingSchema } from '../utils/validation';

type Step = 1 | 2 | 3 | 4;

const stepFieldMap: Record<Step, Array<keyof BookingFormData>> = {
  1: [
    'travelersCount',
    'arrivalDate',
    'departureDate',
    'flightDetails',
    'accommodationAddress',
    'pickupLocation',
    'preferredTourDate',
    'privateTour',
  ],

  2: [
    'name',
    'email',
    'phone',
    'emergencyContactName',
    'emergencyContactPhone',
    'guests',
  ],

  3: [
    'specialInterests',
    'medicalConditions',
    'dietaryRestrictions',
    'physicalLimitations',
    'specialAssistance',
    'preferences',
  ],

  4: [
    'paymentOption',
    'promoCode',
    'termsAgreed',
    'mediaConsent',
  ],
};

export const initialFormData: BookingFormData = {
  // Step 1: Tour & Details
  tourId: '',
  travelersCount: 1,
  arrivalDate: undefined,
  departureDate: undefined,
  flightDetails: '',
  accommodationAddress: '',
  pickupLocation: '',
  preferredTourDate: undefined,
  privateTour: false,

  // Step 2: Personal & Traveler Info
  name: '',
  email: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  guests: [],

  // Step 3: Preferences & Requests
  specialInterests: '',
  medicalConditions: '',
  dietaryRestrictions: '',
  physicalLimitations: '',
  specialAssistance: '',
  preferences: '',

  // Step 4: Payment & Confirmation
  paymentOption: 'pay_now',
  promoCode: '',
  termsAgreed: false,
  mediaConsent: false,
};

export const useBookingForm = (tourId?: string) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps: Step = 4;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(fullBookingSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',

    defaultValues: {
      ...initialFormData,
      tourId: tourId ?? '',
    },
  });

  const nextStep = async () => {
    const currentFields = stepFieldMap[currentStep];

    const isValid = await form.trigger(currentFields);

    if (!isValid) {
      return false;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }

    return true;
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  return {
    form,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isSubmitting,
    setIsSubmitting,
  };
};