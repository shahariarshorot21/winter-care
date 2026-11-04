"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import Image from "next/image";

export default function CreateEventPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  const imagePresets = [
    {
      name: "Winter Clothes",
      url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a",
    },
    {
      name: "Blanket Relief",
      url: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad",
    },
    {
      name: "Cleanup",
      url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    },
    {
      name: "Tree Plantation",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-6 md:px-8">

      {/* Back Button */}
      <div className="mx-auto max-w-5xl">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600"
        >
          ← Back to Upcoming Events
        </Link>

        {/* Main Card */}
        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm md:p-10">

          {/* Heading */}
          <div className="mb-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700">
              ✨ Social Service Drive
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Create a Community Event
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
              Organize a local relief effort, environmental cleanup, or
              community support drive.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Event Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Event Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Event Type <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  defaultValue="Donation"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Winter Relief">Winter Relief</option>
                  <option value="Food Drive">Food Drive</option>
                  <option value="Health Camp">Health Camp</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Event Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  required
                  min={today || undefined}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Dates must be in the future (today or later)
                </p>
              </div>

            </div>

            {/* Event Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Event Location <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                required
                placeholder="Enter event location"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Thumbnail Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>

              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span>Quick photo presets:</span>

                {imagePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="text-teal-700 transition hover:text-teal-900 hover:underline"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Event preview"
                  width={800}
                  height={200}
                  className="mt-4 h-40 w-full rounded-xl object-cover"
                />
              )}
            </div>

            {/* Event Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Event Description <span className="text-red-500">*</span>
              </label>

              <textarea
                required
                rows={5}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Organizer Email */}
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center">
              <span className="text-xs text-gray-500">
                Organizer Email attached:
              </span>

              <span className="text-sm font-semibold text-gray-800">
                mypit@mailinator.com
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-teal-600 py-4 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 active:scale-[0.99]"
            >
              Create Community Event →
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}