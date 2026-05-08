import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingFormData } from '../types';
import { fullBookingSchema } from '../utils/validation';

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
  mediaConsent: false
}

export const useBookingForm = (tourId?: string, tourName?: string, isCustom?: boolean) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(fullBookingSchema),
    defaultValues: initialFormData
  });

  const nextStep = async () => {
    // const isValid = await form.trigger(); // Trigger validation for current step
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return {
    form,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
  };
};