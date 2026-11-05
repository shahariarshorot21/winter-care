"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock4Icon,
  CompassIcon,
  FlameIcon,
  HelpingHandIcon,
  HandHeart,
  ImageIcon,
  MapPinIcon,
  MegaphoneIcon,
  SnowflakeIcon,
  SparklesIcon,
  UsersIcon,
  X,
} from "lucide-react";

const eventTypes = [
  {
    icon: SnowflakeIcon,
    title: "Create a Winter Relief Event",
    description: "Distribute blankets and warm kits to those suffering in the cold.",
  },
  {
    icon: MegaphoneIcon,
    title: "Organize a Charity Campaign",
    description: "Run a neighborhood-wide drive to raise funds and essentials.",
  },
  {
    icon: CompassIcon,
    title: "Start a Journey of Kindness",
    description: "Begin an ongoing initiative that keeps giving back to society.",
  },
  {
    icon: FlameIcon,
    title: "Bring Warmth to Those in Need",
    description: "Deliver firewood, candles, and food to vulnerable families.",
  },
  {
    icon: HelpingHandIcon,
    title: "Create a Helping Hands Initiative",
    description: "Gather volunteers to support elderly and disadvantaged people.",
  },
  {
    icon: SparklesIcon,
    title: "Spread Warmth, Share Hope",
    description: "A flexible open event — bring your own idea of kindness.",
  },
];

const inputClassName =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/60";

export default function CreateEventPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [created, setCreated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedType = selected !== null ? eventTypes[selected] : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputEmail = formData.get("email") as string;
    const inputImage = formData.get("image") as string;

    const existingEvents = JSON.parse(localStorage.getItem("myCustomEvents") || "[]");

    const isEmailUsed = existingEvents.some(
      (event: any) => event.organizer?.email?.toLowerCase() === inputEmail?.toLowerCase()
    );

    if (isEmailUsed) {
      setToastMessage("You have already created an event with this email address!");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const newEvent = {
      id: "custom-" + Date.now(),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      participants: 1,
      spots: Number(formData.get("volunteers") || 50),
      tag: "Winter Drive",
      tagClassName: "bg-teal-100 text-teal-800 border-teal-200",
      joinedLabel: "volunteers joined",
      image: inputImage.trim() !== "" ? inputImage : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=60",
      description: formData.get("description") as string,
      organizer: { 
        name: formData.get("name") as string, 
        email: inputEmail 
      },
    };

    localStorage.setItem("myCustomEvents", JSON.stringify([newEvent, ...existingEvents]));

    setCreated(true);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 shadow-xl transition-all">
          <X className="h-4 w-4 text-red-500" />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-gray-400 hover:text-gray-600">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
          Create Event
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          Create a Winter Relief Event
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick the type of initiative you want to organize, fill in the details,
          and bring your community together for a cause.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {eventTypes.map((type, index) => {
          const isSelected = selected === index;
          return (
            <button
              key={type.title}
              type="button"
              onClick={() => {
                setSelected(index);
                setCreated(false);
              }}
              className={`relative text-left p-6 rounded-2xl border shadow-sm transition-all duration-300 space-y-3 cursor-pointer ${
                isSelected
                  ? "border-teal-500 bg-teal-500/5 ring-2 ring-teal-500/30 shadow-md"
                  : "border-border bg-card/60 hover:bg-card hover:border-teal-500/40"
              }`}
            >
              {isSelected ? (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center shadow-sm">
                  <CheckCircle2Icon className="w-4 h-4 text-white" />
                </div>
              ) : null}
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <type.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-bold text-base text-foreground leading-snug">
                {type.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {type.description}
              </p>
            </button>
          );
        })}
      </div>

      {selectedType && !created ? (
        <form
          key={selected}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto rounded-3xl border border-border bg-card/60 shadow-sm p-6 sm:p-10 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-black text-foreground">
              {selectedType.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Fill in the event details below. Volunteers will see this on the
              events page once created.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="event-title" className="text-sm font-bold text-foreground">
              Event Title
            </label>
            <input
              id="event-title"
              name="title"
              type="text"
              required
              defaultValue={selectedType.title}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="event-date" className="text-sm font-bold text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDaysIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Event Date
                </span>
              </label>
              <input id="event-date" name="date" type="date" required className={inputClassName} />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-time" className="text-sm font-bold text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock4Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Start Time
                </span>
              </label>
              <input id="event-time" name="time" type="time" required className={inputClassName} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="event-location" className="text-sm font-bold text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Location
                </span>
              </label>
              <input id="event-location" name="location" type="text" required placeholder="e.g. Mirpur, Dhaka" className={inputClassName} />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-volunteers" className="text-sm font-bold text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <UsersIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Volunteers Needed
                </span>
              </label>
              <input id="event-volunteers" name="volunteers" type="number" min="1" required placeholder="e.g. 50" className={inputClassName} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="event-image" className="text-sm font-bold text-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Event Image URL
              </span>
            </label>
            <input
              id="event-image"
              name="image"
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="organizer-name" className="text-sm font-bold text-foreground">
                Your Name
              </label>
              <input
                id="organizer-name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="organizer-email" className="text-sm font-bold text-foreground">
                Your Email
              </label>
              <input
                id="organizer-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="event-description" className="text-sm font-bold text-foreground">
              Description
            </label>
            <textarea
              id="event-description"
              name="description"
              required
              rows={4}
              placeholder="Describe your initiative..."
              className={`${inputClassName} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25 hover:bg-teal-700 cursor-pointer transition-all"
          >
            {/* <HeartHandshakeIcon className="w-4 h-4" /> */}
            <HandHeart className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        </form>
      ) : null}

      {selectedType && created ? (
        <div className="max-w-3xl mx-auto rounded-3xl border border-teal-500/30 bg-teal-500/5 shadow-sm p-10 sm:p-14 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-teal-600/10 flex items-center justify-center">
            <CheckCircle2Icon className="w-9 h-9 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            Event Created Successfully
          </h2>
          <p className="text-sm text-muted-foreground">
            Your initiative has been added to the event list. Volunteers in your
            community can now discover and join it.
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/eventss")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 cursor-pointer"
            >
              View Upcoming Events
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setCreated(false);
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-bold text-sm hover:bg-muted cursor-pointer"
            >
              Create Another
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}