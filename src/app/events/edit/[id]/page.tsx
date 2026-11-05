"use client";

import { useEffect, useState, FormEvent, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { HandHeart, CheckCircle2, X } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-[#e8d5c3] bg-white px-4 py-3 text-sm text-[#702b1e] placeholder:text-[#b99b89] outline-none transition focus:border-[#84301f] focus:ring-2 focus:ring-[#84301f]/10";


function EiditDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    volunteers: 1,
    category: "",
    image: "",
    description: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem("myCustomEvents");
    if (savedEvents) {
      const events = JSON.parse(savedEvents);
      const currentEvent = events.find(
        (e: any) => String(e.id) === String(eventId)
      );

      if (currentEvent) {
        setFormData({
          title: currentEvent.title || "",
          date: currentEvent.date || "",
          time: currentEvent.time || "",
          location: currentEvent.location || "",
          volunteers: currentEvent.spots || 1,
          category: currentEvent.tag || "",
          image: currentEvent.image || "",
          description: currentEvent.description || "",
          name: currentEvent.organizer?.name || "",
          email: currentEvent.organizer?.email || "",
        });
      }
    }
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const savedEvents = localStorage.getItem("myCustomEvents");
    if (savedEvents) {
      let events = JSON.parse(savedEvents);

      events = events.map((event: any) => {
        if (String(event.id) === String(eventId)) {
          return {
            ...event,
            title: formData.title,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            spots: Number(formData.volunteers),
            tag: formData.category,
            image: formData.image,
            description: formData.description,
            organizer: {
              name: formData.name,
              email: formData.email,
            },
          };
        }
        return event;
      });

      localStorage.setItem("myCustomEvents", JSON.stringify(events));
      

      setToastMessage("Event updated successfully!");


      setTimeout(() => {
        router.push("/my-events");
      }, 1500);
    }
  };

  return (
    <section className="relative min-h-screen bg-white px-4 py-10 sm:px-6">

      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-4xl rounded-2xl border border-[#eadfd7] bg-[#fffdfa] p-6 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e8e2] mb-4">
          <HandHeart className="h-6 w-6 text-[#84301f]" />
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#84301f]">Edit Event</h1>
          <p className="mt-3 text-sm text-[#98705f]">
            Update your event details below.
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
                value={formData.title}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#84301f]">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="" disabled>Select a category</option>
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
                value={formData.volunteers}
                onChange={handleChange}
                required
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
                value={formData.date}
                onChange={handleChange}
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
                value={formData.time}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#84301f]">
                Event location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#84301f]">
              Image URL
            </label>
            <input
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#84301f]">
              Short description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClassName} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#84301f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#682416]"
          >
            Update Event
          </button>
        </form>
      </div>
    </section>
  );
}

export default function EditEventPage() {
  return(
    <Suspense fallback={<p>Looding...</p>}>
      <EiditDetailsContent />
    </Suspense>
    
  )
  
}