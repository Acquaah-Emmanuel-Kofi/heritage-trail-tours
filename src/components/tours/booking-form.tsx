"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBookingAction } from "@/actions/booking";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone is required"),
  travelersCount: z.number().int().min(1, "At least 1 traveler"),
  preferences: z.string().max(1000).optional(),
});

type Values = z.infer<typeof schema>;

export function BookingForm({
  tourId,
  tourName,
  isCustom = false,
}: {
  tourId: string;
  tourName: string;
  isCustom?: boolean;
}) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { travelersCount: 1 },
  });

  const onSubmit = async (data: Values) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      formData.append("tourId", tourId);
      formData.append("tourName", tourName);
      formData.append("isCustom", String(isCustom));
      formData.append("paymentOption", "on_arrival");
      formData.append("termsAgreed", "true");
      formData.append("mediaConsent", "false");
      
      await createBookingAction(formData);
      toast.success("Booking submitted! We'll contact you soon.");
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/60 p-5"
    >
      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Full Name</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white aria-invalid:border-red-500 aria-invalid:ring-red-500/20 aria-invalid:ring-1"
          {...register("name")}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Email</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white aria-invalid:border-red-500 aria-invalid:ring-red-500/20 aria-invalid:ring-1"
          {...register("email")}
          type="email"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Phone / WhatsApp</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white aria-invalid:border-red-500 aria-invalid:ring-red-500/20 aria-invalid:ring-1"
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Travelers</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white aria-invalid:border-red-500 aria-invalid:ring-red-500/20 aria-invalid:ring-1"
          {...register("travelersCount", { valueAsNumber: true })}
          type="number"
          min={1}
          defaultValue={1}
          aria-invalid={!!errors.travelersCount}
        />
        {errors.travelersCount && <p className="mt-1 text-xs text-red-400">{errors.travelersCount.message}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Preferences</span>
        <textarea
          className="h-28 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("preferences")}
        />
      </label>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
      </button>
    </form>
  );
}
