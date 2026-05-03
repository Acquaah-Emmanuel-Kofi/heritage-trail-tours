# Heritage Trail Tours - MVP

Production-ready startup MVP focused on a single conversion loop:

1. Discover tour
2. Submit booking request
3. Continue on WhatsApp
4. Admin follows up and updates booking status

## 1) Architecture

- **Runtime**: Next.js App Router (single app, no separate backend service)
- **Data access**: Drizzle ORM + PostgreSQL (Neon-ready)
- **Validation**: Zod (server + form contracts)
- **Forms**: React Hook Form + Server Actions
- **Animations**: Framer Motion (progressive reveal)
- **Admin protection**: Middleware gate using `ADMIN_SECRET`
- **API surface**: Route Handlers for headless reads (`/api/tours`, `/api/bookings`)

### Request flow

- User opens `tours/[tourId]`
- `BookingForm` posts to `createBookingAction`
- Action validates and writes booking with status `PENDING`
- Action builds WhatsApp deep link with booking reference
- User lands on success page and taps WhatsApp CTA

## 2) Folder Structure

```txt
src/
  actions/
    admin.ts
    booking.ts
  app/
    about/page.tsx
    admin/bookings/page.tsx
    api/
      bookings/route.ts
      tours/route.ts
    booking/success/page.tsx
    custom-travel/page.tsx
    tours/
      [tourId]/page.tsx
      page.tsx
    layout.tsx
    page.tsx
  components/
    motion/fade-in.tsx
    site/header.tsx
    tours/booking-form.tsx
  db/
    client.ts
    schema.ts
  lib/
    bookings.ts
    env.ts
    tours.ts
    whatsapp.ts
  middleware.ts
drizzle.config.ts
```

## 3) Database Schema

Implemented in `src/db/schema.ts`:

- **tours**
  - `id`, `title`, `description`, `itinerary`, `price`, `duration`, `category`, `country`, `imageUrl`, `featured`, `createdAt`
- **bookings**
  - `id`, `name`, `email`, `phone`, `tourId` (nullable for custom requests), `travelersCount`, `preferences`, `isCustom`, `status`, `followUpNotes`, `createdAt`
  - `status` enum: `PENDING | CONTACTED | CONFIRMED | CANCELLED`
- **site_settings**
  - `whatsappNumber`, `contactEmail`, `updatedAt`
- **blog_posts** (post-MVP content readiness)
  - `title`, `slug`, `body`, `coverImageUrl`, `published`
- **testimonials**
  - `travelerName`, `quote`, `location`, `published`

## 4) API Endpoints

- `GET /api/tours?country=&category=`
  - Returns filtered tour list
- `GET /api/bookings`
  - Returns booking rows for admin integrations

Primary write operations are handled by **Server Actions**:

- `createBookingAction` in `src/actions/booking.ts`
- `updateBookingStatusAction` in `src/actions/admin.ts`

## 5) UI Structure

- `/` homepage with value prop + featured tours
- `/tours` filter-ready listing
- `/tours/[tourId]` detail + booking request form
- `/booking/success` submission confirmation + WhatsApp deep link
- `/custom-travel` bespoke trip intake
- `/admin/bookings` CRM-lite booking dashboard with status updates
- `/about` trust/storytelling page

## 6) Environment Variables

Create `.env.local`:

```bash
DATABASE_URL=postgres://...
WHATSAPP_NUMBER=233200000000
SITE_EMAIL=hello@heritagetrailtours.com
ADMIN_SECRET=replace-with-strong-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 7) Run Locally

```bash
npm install
npm run dev
```

Optional DB migration flow:

```bash
npm run db:generate
npm run db:migrate
```

Open:

- Public app: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/bookings?adminKey=YOUR_ADMIN_SECRET`

## 8) Scalability Notes

- Keep writes in Server Actions for low-latency vertical slices.
- Split `lib/*` read models from write actions to ease future service extraction.
- Route Handlers already provide a lightweight API layer for mobile or partner channels.
- Schema includes CMS-related tables (`blog_posts`, `testimonials`, `site_settings`) to ship post-MVP features without redesigning data contracts.
