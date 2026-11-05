"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import Image from "next/image";

export default function MyEventsPage() {
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem("myCustomEvents");

    if (savedEvents) {
      setMyEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleDeleteEvent = (eventId: string | number) => {
    // ইভেন্ট ফিল্টার করে ডিলিট করা
    const updatedEvents = myEvents.filter(
      (event) => String(event.id) !== String(eventId),
    );

    localStorage.setItem("myCustomEvents", JSON.stringify(updatedEvents));
    setMyEvents(updatedEvents);

    // ২য় ছবির মতো টোস্ট নোটিফিকেশন সেট করা
    setToastMessage("Event deleted successfully!");

    // ৩ সেকেন্ড পর নোটিফিকেশন গায়েব করা
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 px-4 py-12">
      {/* ২য় ছবির মতো কাস্টম টোস্ট নোটিফিকেশন UI */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 shadow-xl transition-all duration-300">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">
            <X className="h-3.5 w-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>

        <p className="text-gray-600 mb-8">Events you have created.</p>

        {myEvents.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">No events found</h2>

            <p className="text-gray-500 mb-5">
              You haven't created any events yet.
            </p>

            <Link
              href="/events/create"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-5 flex flex-col justify-between"
              >
                <div>
                  {event.image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      {event.image && (
                        <div className="mb-4 overflow-hidden rounded-xl">
                          <Image
                            src={event.image}
                            alt={event.title}
                            width={600}
                            height={300}
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>

                  <p className="text-gray-600 mb-2">📅 {event.date}</p>

                  <p className="text-gray-600 mb-2">📍 {event.location}</p>

                  <p className="text-gray-600 mb-4">{event.description}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/events/edit/${event.id}`}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center font-semibold py-2.5 px-4 rounded-lg transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
