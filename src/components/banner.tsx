import { ArrowRightIcon, HandHeart } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    value: "1,450+",
    label: "Active Volunteers",
    className: "text-teal-600 dark:text-teal-400",
  },
  {
    value: "180+",
    label: "Events Completed",
    className: "text-emerald-500",
  },
  {
    value: "24,000+",
    label: "Lives Impacted",
    className: "text-indigo-500",
  },
  {
    value: "100%",
    label: "Community Driven",
    className: "text-amber-500",
  },
];

export function Banner() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-linear-to-b from-amber-200 via-amber-300 to-transparent">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.18),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.22),rgba(0,0,0,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-black dark:text-teal-300 border border-teal-500/20 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
          <HandHeart className="w-6 h-6" />
          <span>Together We Make Winter Warmer</span>
        </div>

        <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.15] font-black">
          Spread Warmth.{" "}
          <span className="bg-linear-to-r from-gray-600 via-rose-900 to-purple-900 bg-clip-text text-transparent">
            Share Hope. Change Lives.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          Create, discover, and join winter donation campaigns anywhere. Help
          people in need by donating warm clothes, blankets, and other
          essentials. Together, we can bring warmth, hope, and happiness to
          every community.
        </p>

        {/* এখানে "Explore Upcoming Events" বাটনে ক্লিক করলে /event পেজে যাবে */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/eventss"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-red-700 text-white font-bold text-sm shadow-lg shadow-teal-500/25 hover:opacity-95 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Upcoming Events</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/events/create"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-border bg-card/80 hover:bg-muted text-foreground font-bold text-sm hover:scale-105 active:scale-95 transition-all"
          >
            <HandHeart className="w-6 h-6" />
            <span>Create an Event</span>
          </Link>
        </div>

        <div className="pt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-card/70 border border-border/80 shadow-sm"
            >
              <p
                className={`text-2xl sm:text-3xl font-black ${stat.className}`}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}