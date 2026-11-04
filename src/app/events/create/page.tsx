
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  HandHeart,
  User,
  Mail,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Users,
} from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-[#e8d5c3] bg-white px-4 py-3 text-sm text-[#702b1e] placeholder:text-[#b99b89] outline-none transition focus:border-[#84301f] focus:ring-2 focus:ring-[#84301f]/10";

export default function CreateEventPage() {
  const router = useRouter();
  const [created, setCreated] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newEvent = {
      id: "custom-" + Date.now(),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      participants: 0,
      spots: Number(formData.get("volunteers")),
      tag: formData.get("category") as string,
      tagClassName: "bg-orange-100 text-orange-800 border-orange-200",
      joinedLabel: "volunteers joined",
      image:
        (formData.get("image") as string) ||
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=60",
      description: formData.get("description") as string,
      organizer: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      },
    };

    const existingEvents = JSON.parse(
      localStorage.getItem("myCustomEvents") || "[]"
    );

    localStorage.setItem(
      "myCustomEvents",
      JSON.stringify([newEvent, ...existingEvents])
    );

    setCreated(true);
  };

  return (
    <section className="min-h-screen bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#eadfd7] bg-[#fffdfa] p-6 shadow-sm sm:p-10">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e8e2]">
          <HandHeart className="h-6 w-6 text-[#84301f]" />
        </div>

        {!created ? (
          <>
            <div className="mb-10 mt-3 text-center">
              <h1 className="text-3xl font-bold text-[#84301f]">
                Create an Event
              </h1>
              <p className="mt-3 text-sm text-[#98705f]">
                Share your initiative with the WinterCare community.
                Fill in the details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Event title
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. Winter Blanket Distribution"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Organizer name
                  </label>
                  <input
                    name="organizer"
                    required
                    placeholder="Your organization or name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className={inputClassName}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Winter Relief">Winter Relief</option>
                    <option value="Blanket Distribution">Blanket Distribution</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Charity Campaign">Charity Campaign</option>
                    <option value="Volunteer Activity">Volunteer Activity</option>
                    <option value="Other">Others</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Volunteers needed
                  </label>
                  <input
                    name="volunteers"
                    type="number"
                    min="1"
                    required
                    placeholder="Enter volunteers"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Event date
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Event time
                  </label>
                  <input
                    name="time"
                    type="time"
                    required
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#84301f]">
                  Event location
                </label>
                <input
                  name="location"
                  required
                  placeholder="Enter event location"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#84301f]">
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#84301f]">
                  Short description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe your event..."
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 rounded-xl border border-[#eadfd7] bg-[#fcf7f1] p-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Your name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-[#a88775]" />
                    <input
                      name="name"
                      required
                      placeholder="Enter your name"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#84301f]">
                    Your email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-[#a88775]" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#84301f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#682416]"
              >
                Create Event
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-bold text-[#84301f]">
              Event Created Successfully!
            </h2>
            <p className="mt-3 text-sm text-[#98705f]">
              Your event has been saved successfully.
            </p>

            <button
              onClick={() => router.push("/eventss")}
              className="mt-6 rounded-xl bg-[#84301f] px-6 py-3 text-sm font-bold text-white hover:bg-[#682416]"
            >
              View Upcoming Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
