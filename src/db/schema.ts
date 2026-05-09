import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", [
  "PENDING",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "PENDING",
  "PAID",
  "ON_ARRIVAL",
]);

export const tours = pgTable("tours", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  itinerary: text("itinerary").notNull(),
  price: varchar("price", { length: 100 }).notNull(),
  duration: varchar("duration", { length: 80 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  country: varchar("country", { length: 80 }).notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  tourId: uuid("tour_id").references(() => tours.id, { onDelete: "restrict" }),
  travelersCount: integer("travelers_count").notNull(),
  preferences: text("preferences"),
  isCustom: boolean("is_custom").default(false).notNull(),
  status: bookingStatusEnum("status").default("PENDING").notNull(),
  followUpNotes: text("follow_up_notes"),
  emergencyContactName: varchar("emergency_contact_name", { length: 120 }),
  emergencyContactPhone: varchar("emergency_contact_phone", { length: 40 }),
  guests: jsonb("guests").$type<{ name: string; age?: number; gender?: string; nationality?: string; passportNumber?: string; occupation?: string; }[]>(),
  arrivalDate: timestamp("arrival_date"),
  departureDate: timestamp("departure_date"),
  flightDetails: text("flight_details"),
  accommodationAddress: text("accommodation_address"),
  pickupLocation: text("pickup_location"),
  preferredTourDate: timestamp("preferred_tour_date"),
  privateTour: boolean("private_tour").default(false),
  specialInterests: text("special_interests"),
  medicalConditions: text("medical_conditions"),
  dietaryRestrictions: text("dietary_restrictions"),
  physicalLimitations: text("physical_limitations"),
  specialAssistance: text("special_assistance"),
  paymentStatus: paymentStatusEnum("payment_status").default("PENDING"),
  paymentId: varchar("payment_id", { length: 100 }),
  paymentAmount: integer("payment_amount"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  promoCode: varchar("promo_code", { length: 50 }),
  termsAgreed: boolean("terms_agreed").default(false),
  mediaConsent: boolean("media_consent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  whatsappNumber: varchar("whatsapp_number", { length: 40 }).notNull(),
  contactEmail: varchar("contact_email", { length: 200 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).unique().notNull(),
  body: text("body").notNull(),
  coverImageUrl: text("cover_image_url"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  travelerName: varchar("traveler_name", { length: 120 }).notNull(),
  quote: text("quote").notNull(),
  location: varchar("location", { length: 140 }),
  published: boolean("published").default(true).notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  caption: varchar("caption", { length: 240 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  tour: one(tours, {
    fields: [bookings.tourId],
    references: [tours.id],
  }),
}));

export type BookingStatus = (typeof bookingStatusEnum.enumValues)[number];
