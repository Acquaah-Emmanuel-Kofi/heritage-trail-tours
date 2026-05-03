"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBookingAction } from "@/actions/booking";

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
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { travelersCount: 1 },
  });

  return (
    <form
      action={createBookingAction}
      className="space-y-4 rounded-xl border border-slate-700 bg-slate-900/60 p-5"
    >
      <input type="hidden" name="tourId" value={tourId} />
      <input type="hidden" name="tourName" value={tourName} />
      <input type="hidden" name="isCustom" value={String(isCustom)} />

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Full Name</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Email</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("email")}
          type="email"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Phone / WhatsApp</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("phone")}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Travelers</span>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("travelersCount", { valueAsNumber: true })}
          type="number"
          min={1}
          defaultValue={1}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-slate-200">Preferences</span>
        <textarea
          className="h-28 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
          {...register("preferences")}
        />
      </label>

      <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
        Submit Booking Request
      </button>
    </form>
  );
}
