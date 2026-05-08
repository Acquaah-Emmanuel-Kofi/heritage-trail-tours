import { z } from 'zod';

export const step1Schema = z.object({
  tourId: z.string().optional(),
  travelersCount: z.number().min(1, 'At least 1 traveler required'),
  arrivalDate: z.date().optional(),
  departureDate: z.date().optional(),
  flightDetails: z.string().optional(),
  accommodationAddress: z.string().optional(),
  pickupLocation: z.string().optional(),
  preferredTourDate: z.date().optional(),
  privateTour: z.boolean(),
});

export const step2Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Phone is required'),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  guests: z.array(z.object({
    name: z.string().min(1, 'Guest name required'),
    age: z.number().optional(),
    gender: z.string().optional(),
    nationality: z.string().optional(),
    passportNumber: z.string().optional(),
    occupation: z.string().optional(),
  })).min(0),
});

export const step3Schema = z.object({
  specialInterests: z.string().optional(),
  medicalConditions: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  physicalLimitations: z.string().optional(),
  specialAssistance: z.string().optional(),
  preferences: z.string().optional(),
});

export const step4Schema = z.object({
  paymentOption: z.enum(['pay_now', 'on_arrival']),
  promoCode: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val, 'Terms must be agreed'),
  mediaConsent: z.boolean(),
});

export const fullBookingSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);