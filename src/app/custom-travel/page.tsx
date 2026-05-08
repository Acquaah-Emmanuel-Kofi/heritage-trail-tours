import { SiteHeader } from "@/components/site/header";
import { BookingWizard } from "@/components/booking/BookingWizard";

export default function CustomTravelPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">Custom Travel Request</h1>
        <p className="mt-2 text-slate-300">
          Tell us what kind of heritage journey you want and we will tailor it for your group.
        </p>
        <div className="mt-6">
          <BookingWizard tourId="" tourName="Custom Heritage Trip" isCustom={true} />
        </div>
      </main>
    </div>
  );
}
