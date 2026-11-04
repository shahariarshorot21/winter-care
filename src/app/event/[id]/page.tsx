"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  UserIcon,
  MailIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

const defaultEvents = [
  {
    id: "1",
    title: "Winter Blanket Distribution Drive",
    date: "Dec 05",
    location: "Mirpur, Dhaka",
    participants: 42,
    spots: 58,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=60",
    description: "Join us in our annual winter blanket distribution drive.",
    organizer: { name: "WinterCare Foundation", email: "support@wintercare.org" },
  },
  {
    id: "2",
    title: "Warm Clothes Collection Campaign",
    date: "Dec 10",
    location: "Kotwali, Chattogram",
    participants: 36,
    spots: 24,
    tag: "Collection",
    tagClassName: "bg-indigo-100 text-indigo-800 border-indigo-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800&auto=format&fit=crop&q=60",
    description: "We are collecting warm clothes, jackets, and sweaters.",
    organizer: { name: "Chattogram Youth Aid", email: "ctg.aid@wintercare.org" },
  },
];

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("Dark Shorot");
  const [userEmail, setUserEmail] = useState("darkshorot@gmail.com");
  const [joined, setJoined] = useState(false);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.fullName) setUserName(parsed.fullName);
        if (parsed.email) setUserEmail(parsed.email);
      } catch {
        // fallback
      }
    }

    const eventId = params.id as string;

    const customEvents = JSON.parse(
      localStorage.getItem("myCustomEvents") || "[]"
    );

    const allCombined = [...customEvents, ...defaultEvents];

    const found = allCombined.find(
      (item) => String(item.id) === String(eventId)
    );

    setEvent(found || null);

    const joinedList = JSON.parse(
      localStorage.getItem("joinedEventsList") || "[]"
    );

    setJoined(
      joinedList.some(
        (item: any) => String(item.id) === String(eventId)
      )
    );
  }, [params.id]);

  const handleConfirmJoin = () => {
    if (!event) return;

    const existingJoined = JSON.parse(
      localStorage.getItem("joinedEventsList") || "[]"
    );

    const isAlreadyThere = existingJoined.some(
      (item: any) => String(item.id) === String(event.id)
    );

    if (!isAlreadyThere) {
      const updatedList = [event, ...existingJoined];

      localStorage.setItem(
        "joinedEventsList",
        JSON.stringify(updatedList)
      );
    }

    setJoined(true);
    setShowModal(false);
  };

  if (!event) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-6">

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Events
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">

          <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md bg-stone-100">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${event.tagClassName || ""}`}>
                  {event.tag}
                </span>

                <span className="text-xs font-bold text-teal-700 flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  {event.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                {event.title}
              </h2>

              <div className="space-y-2 text-sm text-stone-600">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-teal-600" />
                  <strong>Location:</strong> {event.location}
                </p>

                <p className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-teal-600" />
                  <strong>Participants:</strong> {event.participants} {event.joinedLabel} ({event.spots} spots left)
                </p>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                  About This Event
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={joined}
              className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 ${
                joined
                  ? "bg-emerald-600 cursor-default"
                  : "bg-teal-600 hover:bg-teal-700 cursor-pointer"
              }`}
            >
              {joined ? (
                <>
                  <CheckCircle2Icon className="w-5 h-5" />
                  Successfully Joined
                </>
              ) : (
                "Join This Event"
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">

            <h3 className="text-lg font-bold text-stone-900">
              Do you want to join this event?
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Your name
                </label>

                <div className="flex items-center gap-2 px-3 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-600">
                  <UserIcon className="w-4 h-4" />
                  <span>{userName}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Your email
                </label>

                <div className="flex items-center gap-2 px-3 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-600">
                  <MailIcon className="w-4 h-4" />
                  <span>{userEmail}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-sm font-semibold text-stone-700"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmJoin}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-sm font-semibold text-white"
              >
                Join this event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}