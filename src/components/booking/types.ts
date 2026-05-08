export interface Guest {
  name: string;
  age?: number;
  gender?: string;
  nationality?: string;
  passportNumber?: string;
  occupation?: string;
}

export interface BookingFormData {
  // Step 1: Tour & Details
  tourId?: string;
  travelersCount: number;
  arrivalDate?: Date;
  departureDate?: Date;
  flightDetails?: string;
  accommodationAddress?: string;
  pickupLocation?: string;
  preferredTourDate?: Date;
  privateTour: boolean;

  // Step 2: Personal & Traveler Info
  name: string;
  email: string;
  phone: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  guests: Guest[];

  // Step 3: Preferences & Requests
  specialInterests?: string;
  medicalConditions?: string;
  dietaryRestrictions?: string;
  physicalLimitations?: string;
  specialAssistance?: string;
  preferences?: string;

  // Step 4: Payment & Confirmation
  paymentOption: 'pay_now' | 'on_arrival';
  promoCode?: string;
  termsAgreed: boolean;
  mediaConsent: boolean;
}