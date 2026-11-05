"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDaysIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { useState, useEffect } from "react";

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  spots?: number;
  tag: string;
  tagClassName: string;
  joinedLabel: string;
  image: string;
};

const defaultUpcomingEvents: EventItem[] = [
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
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=60",
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
    image:
      "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=500&auto=format&fit=crop&q=60",
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
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60",
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
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60",
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
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60",
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
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    title: "Warm Jacket Distribution for Street Children",
    date: "Jan 02",
    location: "Dhanmondi, Dhaka",
    participants: 50,
    spots: 30,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    title: "Emergency Sweater & Blanket Drive",
    date: "Jan 05",
    location: "Srimangal, Moulvibazar",
    participants: 62,
    spots: 18,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "9",
    title: "Warm Meal & Soup Kitchen for Elderly",
    date: "Jan 08",
    location: "Sadargate, Barishal",
    participants: 45,
    spots: 15,
    tag: "Food Drive",
    tagClassName: "bg-emerald-100 text-emerald-800 border-emerald-200",
    joinedLabel: "volunteers joined",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFIQ-tCbzAAMpoo2NyM7gUlxbvzPHzV4CGkmYMsPGUA&s",
  },
  {
    id: "10",
    title: "Youth Winter Clothing Donation",
    date: "Jan 12",
    location: "Agrabad, Chattogram",
    participants: 30,
    spots: 40,
    tag: "Collection",
    tagClassName: "bg-indigo-100 text-indigo-800 border-indigo-200",
    joinedLabel: "volunteers joined",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRckKuK_xVxkmrJ8iLagTaoyxbcY4s0wypO7NviB_jzSg&s=10",
  },
  {
    id: "11",
    title: "Mobile Medical Unit for Cold Diseases",
    date: "Jan 15",
    location: "Kurigram, Rangpur",
    participants: 28,
    spots: 22,
    tag: "Health Camp",
    tagClassName: "bg-rose-100 text-rose-800 border-rose-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "12",
    title: "Charity Cricket Cup for Winter Shelter",
    date: "Jan 18",
    location: "Zilla Stadium, Cumilla",
    participants: 80,
    spots: 20,
    tag: "Fundraiser",
    tagClassName: "bg-amber-100 text-amber-800 border-amber-200",
    joinedLabel: "supporters joined",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "13",
    title: "Rural Blanket & Shawl Support Drive",
    date: "Jan 21",
    location: "Tetulia, Panchagarh",
    participants: 55,
    spots: 25,
    tag: "Winter Drive",
    tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "14",
    title: "School Students Clothes Collection",
    date: "Jan 24",
    location: "Uttara, Dhaka",
    participants: 40,
    spots: 60,
    tag: "Collection",
    tagClassName: "bg-indigo-100 text-indigo-800 border-indigo-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "15",
    title: "Dry Food & Winter Survival Kit Drive",
    date: "Jan 27",
    location: "Sunamganj Sadar, Sunamganj",
    participants: 67,
    spots: 13,
    tag: "Food Drive",
    tagClassName: "bg-emerald-100 text-emerald-800 border-emerald-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "16",
    title: "Child & Maternal Health Checkup",
    date: "Jan 30",
    location: "Gaibandha Sadar, Gaibandha",
    participants: 22,
    spots: 28,
    tag: "Health Camp",
    tagClassName: "bg-rose-100 text-rose-800 border-rose-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "17",
    title: "Winter Art Exhibition & Charity Auction",
    date: "Feb 03",
    location: "Shilpakala Academy, Dhaka",
    participants: 90,
    spots: 10,
    tag: "Fundraiser",
    tagClassName: "bg-amber-100 text-amber-800 border-amber-200",
    joinedLabel: "supporters joined",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "18",
    title: "Temporary Shelter & Tarpaulin Distribution",
    date: "Feb 06",
    location: "Bogra Sadar, Bogra",
    participants: 33,
    spots: 37,
    tag: "Relief",
    tagClassName: "bg-sky-100 text-sky-800 border-sky-200",
    joinedLabel: "volunteers joined",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60",
  },
];

function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      router.push(`/event/${event.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="bg-stone-100 p-6 flex justify-center items-center min-h-[220px]">
        <div className="relative w-full h-48 shadow-md rounded overflow-hidden">
          <Image
            src={event.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1">
              <CalendarDaysIcon className="w-3.5 h-3.5" /> {event.date}
            </span>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${event.tagClassName || "bg-teal-100 text-teal-800 border-teal-200"}`}
            >
              {event.tag || "Event"}
            </span>
          </div>

          <h3 className="font-bold text-base text-stone-800 leading-snug">
            {event.title}
          </h3>

          <div className="mt-3 space-y-1 text-xs text-stone-500">
            <p className="flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5" /> {event.location}
            </p>
            <p className="flex items-center gap-1.5">
              <UsersIcon className="w-3.5 h-3.5" /> {event.participants || 0}{" "}
              {event.joinedLabel || "volunteers joined"}
            </p>
          </div>
        </div>

        <button
          onClick={handleViewDetails}
          className="w-full mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-teal-700 text-white text-sm font-semibold transition-all text-center cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export function Events({
  limit,
  showSeeAll,
}: {
  limit?: number;
  showSeeAll?: boolean;
}) {
  const [allEvents, setAllEvents] = useState<EventItem[]>(defaultUpcomingEvents);

  useEffect(() => {
    try {
      const customEvents = JSON.parse(
        localStorage.getItem("myCustomEvents") || "[]"
      );

      const formattedCustomEvents = customEvents.map((item: any) => ({
        id: String(item.id),
        title: item.title || "Untitled Event",
        date: item.date || "Upcoming",
        location: item.location || "N/A",
        participants: item.participants || 0,
        spots: item.spots || 0,
        tag: item.tag || "Custom Event",
        tagClassName: item.tagClassName || "bg-teal-100 text-teal-800 border-teal-200",
        joinedLabel: item.joinedLabel || "volunteers joined",
        image: item.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500",
      }));

      setAllEvents([...formattedCustomEvents, ...defaultUpcomingEvents]);
    } catch {
      // fallback
    }
  }, []);

  const displayedEvents = limit
    ? allEvents.slice(0, limit)
    : allEvents;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
          STAY UPDATED
        </span>
        <h2 className="text-3xl sm:text-4xl text-stone-800 font-bold">
          Recent Upcoming Events
        </h2>
        <p className="text-sm text-stone-500">
          Recently created initiatives happening across communities — join the
          next one before spots fill up.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {showSeeAll && (
        <div className="text-center mt-10">
          <Link
            href="/eventss"
            className="inline-block px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-all"
          >
            See All Events
          </Link>
        </div>
      )}
    </section>
  );
}