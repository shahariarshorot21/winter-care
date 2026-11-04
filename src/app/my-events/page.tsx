
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyEventsPage() {
  const [myEvents, setMyEvents] = useState<any[]>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("myCustomEvents");

    if (savedEvents) {
      setMyEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleDeleteEvent = (eventId: string | number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = myEvents.filter(
      (event) => String(event.id) !== String(eventId)
    );

    localStorage.setItem(
      "myCustomEvents",
      JSON.stringify(updatedEvents)
    );

    setMyEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Events
        </h1>

        <p className="text-gray-600 mb-8">
          Events you have created.
        </p>

        {myEvents.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              No events found
            </h2>

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
                className="bg-white rounded-xl shadow-sm p-5"
              >
                <h2 className="text-xl font-bold mb-2">
                  {event.title}
                </h2>

                <p className="text-gray-600 mb-2">
                  📅 {event.date}
                </p>

                <p className="text-gray-600 mb-2">
                  📍 {event.location}
                </p>

                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>

                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition"
                >
                  Delete Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
