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
  {
    id: "3",
    title: "Food & Essentials Distribution",
    date: "Dec 14",
    location: "Amberkhana, Sylhet",
    participants: 58,
    spots: 12,
    tag: "Food Drive",
    tagClassName: "bg-emerald-100 text-emerald-800 border-emerald-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60",
    description: "Providing dry food packages and winter essentials to vulnerable families.",
  },
  {
    id: "4",
    title: "Free Winter Health Checkup Camp",
    date: "Dec 18",
    location: "Dinajpur, Rangpur",
    participants: 25,
    spots: 35,
    tag: "Health Camp",
    tagClassName: "bg-rose-100 text-rose-800 border-rose-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=60",
    description: "Free medical consultation and cold-weather medicine distribution.",
  },
  {
    id: "5",
    title: "Charity Football Match for Winter Relief",
    date: "Dec 22",
    location: "Sholakia Ground, Khulna",
    participants: 74,
    spots: 26,
    tag: "Fundraiser",
    tagClassName: "bg-amber-100 text-amber-800 border-amber-200",
    joinedLabel: "supporters joined",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60",
    description: "A friendly charity match to raise funds for buying blankets and heavy clothing.",
  },
  {
    id: "6",
    title: "Firewood & Candle Relief Drive",
    date: "Dec 28",
    location: "Puthia, Rajshahi",
    participants: 19,
    spots: 41,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=60",
    description: "Distributing firewood and essentials for cold nights in rural areas.",
  },
  {
    id: "7",
    title: "Warm Jacket Distribution for Kids",
    date: "Jan 02",
    location: "Sylhet Sadar",
    participants: 50,
    spots: 20,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60",
    description: "Helping under-privileged children stay warm during cold winter school days.",
  },
  {
    id: "8",
    title: "Hot Soup & Tea Distribution",
    date: "Jan 05",
    location: "Rajshahi University",
    participants: 30,
    spots: 15,
    tag: "Food Drive",
    tagClassName: "bg-emerald-100 text-emerald-800 border-emerald-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60",
    description: "Serving hot tea and homemade warm soup to night workers and dwellers.",
  },
  {
    id: "9",
    title: "Winter Clothes Collection Drive",
    date: "Jan 08",
    location: "GEC Circle, Chattogram",
    participants: 45,
    spots: 25,
    tag: "Collection",
    tagClassName: "bg-indigo-100 text-indigo-800 border-indigo-200",
    joinedLabel: "volunteers joined",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ylzz_xqpfN8OxZBwOHw4ZER97DsoMYQ5DXP1XF4oGw&s=10",
    description: "Collecting unused gently-worn clothes for distribution across Chattogram.",
  },
  {
    id: "10",
    title: "Elderly Winter Care Kit Drive",
    date: "Jan 12",
    location: "Bogura Sadar",
    participants: 60,
    spots: 40,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=60",
    description: "Special winter care packages tailored for senior citizens.",
  },
  {
    id: "11",
    title: "Street Children Blanket Distribution",
    date: "Jan 15",
    location: "Kamalapur, Dhaka",
    participants: 80,
    spots: 20,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format&fit=crop&q=60",
    description: "Providing warm heavy blankets to children living on railway platforms.",
  },
  {
    id: "12",
    title: "Warm Sweater Drive for Schools",
    date: "Jan 18",
    location: "Sreemangal, Moulvibazar",
    participants: 35,
    spots: 15,
    tag: "Collection",
    tagClassName: "bg-indigo-100 text-indigo-800 border-indigo-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format&fit=crop&q=60",
    description: "Distributing school uniform sweaters to cold Tea Garden primary schools.",
  },
  {
    id: "13",
    title: "Winter Emergency Medical Camp",
    date: "Jan 22",
    location: "Kurigram Sadar",
    participants: 40,
    spots: 30,
    tag: "Health Camp",
    tagClassName: "bg-rose-100 text-rose-800 border-rose-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=60",
    description: "Emergency health checkup camp for respiratory infections during peak winter.",
  },
  {
    id: "14",
    title: "Winter Shelter Support Campaign",
    date: "Jan 25",
    location: "Cox's Bazar Sadar",
    participants: 55,
    spots: 45,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "supporters joined",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60",
    description: "Setting up temporary wind-breakers and tarps for outdoor winter shelters.",
  },
  {
    id: "15",
    title: "Hot Meal Distribution for Homeless",
    date: "Jan 28",
    location: "Farmgate, Dhaka",
    participants: 90,
    spots: 10,
    tag: "Food Drive",
    tagClassName: "bg-emerald-100 text-emerald-800 border-emerald-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60",
    description: "Serving fresh cooked hot rice meals to street dwellers during cold nights.",
  },
  {
    id: "16",
    title: "Youth Charity Marathon for Warmth",
    date: "Feb 01",
    location: "Hatirjheel, Dhaka",
    participants: 120,
    spots: 80,
    tag: "Fundraiser",
    tagClassName: "bg-amber-100 text-amber-800 border-amber-200",
    joinedLabel: "supporters joined",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60",
    description: "5K Charity Run event to build public awareness and collect clothing funds.",
  },
  {
    id: "17",
    title: "Remote Village Blanket Drive",
    date: "Feb 05",
    location: "Bandarban Sadar",
    participants: 28,
    spots: 22,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60",
    description: "Reaching remote hill tracks villages with warm clothes and blankets.",
  },
  {
    id: "18",
    title: "Winter Survival Kit Distribution",
    date: "Feb 10",
    location: "Panchagarh Sadar",
    participants: 65,
    spots: 35,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "volunteers joined",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&auto=format&fit=crop&q=60",
    description: "Providing complete winter kits including thermal socks, vaseline, and blankets.",
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
                  <strong>Participants:</strong> {event.participants} {event.joinedLabel} {event.spots ? `(${event.spots} spots left)` : ""}
                </p>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                  About This Event
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {event.description || "Join us and make a difference in our community drive."}
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