"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, MapPinIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

export default function JoinedEventsPage() {
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadJoinedEvents = () => {
      try {
        const savedEvents = localStorage.getItem("joinedEventsList");
        setJoinedEvents(savedEvents ? JSON.parse(savedEvents) : []);
      } catch {
        setJoinedEvents([]);
      }
    };

    loadJoinedEvents();

    window.addEventListener("storage", loadJoinedEvents);

    return () => {
      window.removeEventListener("storage", loadJoinedEvents);
    };
  }, []);

  const handleDelete = (eventId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to leave this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = joinedEvents.filter(
      (event) => event.id !== eventId
    );

    localStorage.setItem(
      "joinedEventsList",
      JSON.stringify(updatedEvents)
    );

    setJoinedEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              Joined Events
            </h1>

            <p className="text-stone-600 mt-2">
              Events you have successfully joined.
            </p>
          </div>

          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-teal-700"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Events
          </Link>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-bold text-stone-800 mb-3">
              No Joined Events
            </h2>

            <p className="text-stone-500 mb-6">
              You haven't joined any events yet.
            </p>

            <Link
              href="/events"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {joinedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm"
              >
                <div className="relative w-full h-52 bg-stone-100">
                  <Image
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800"
                    }
                    alt={event.title || "Event"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">

                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                    {event.tag || "Joined Event"}
                  </span>

                  <h2 className="text-xl font-bold text-stone-900">
                    {event.title}
                  </h2>

                  <p className="flex items-center gap-2 text-sm text-stone-600">
                    <CalendarDaysIcon className="w-4 h-4 text-teal-600" />
                    {event.date}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-stone-600">
                    <MapPinIcon className="w-4 h-4 text-teal-600" />
                    {event.location}
                  </p>

                  <div className="flex gap-3 pt-3">

                    <Link
                      href={`/event/${event.id}`}
                      className="flex-1 text-center py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold cursor-pointer"
                    >
                      <Trash2Icon className="w-4 h-4" />
                      Leave
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}