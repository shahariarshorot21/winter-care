import {
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { HandHeart } from "lucide-react";

const causes = [
  { dot: "bg-teal-500", label: "Winter Clothes & Blanket Relief" },
  { dot: "bg-emerald-500", label: "City Clean-up & Waste Segregation" },
  { dot: "bg-green-500", label: "Urban Tree Plantation Drives" },
  { dot: "bg-amber-500", label: "Underprivileged Meal Sharing" },
  { dot: "bg-indigo-500", label: "Free Medical & Health Camps" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1 space-y-4">
            <Link
              className="flex items-center gap-2.5 font-bold text-xl group"
              href="/"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-950 to-orange-900 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <HandHeart className="w-6 h-6" />
              </div>
              <span className="leading-none text-lg font-black bg-linear-to-r from-gray-700 to-red-950 dark:from-teal-400 dark:to-green-900 bg-clip-text text-transparent">
                WinterCare
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              A community-driven event management platform empowering everyday
              citizens to create, join, and track impactful social development
              drives.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPinIcon className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Dhaka, Bangladesh • Nationwide Impact</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Explore Platform
            </h4>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>

                <Link
                  className="hover:text-teal-600 transition-colors flex items-center gap-1.5"
                  href="/eventss"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Upcoming Events
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-teal-600 transition-colors flex items-center gap-1.5"
                  href="/events/create"
                >
                  <HandHeart className="w-3.5 h-3.5 text-teal-500" />
                  Create an Event
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-teal-600 transition-colors"
                  href="/deshbord/my-booking"
                >
                  Manage My Events
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-teal-600 transition-colors"
                  href="/deshbord/my-fasility"
                >
                  My Joined Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Active Causes
            </h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {causes.map((cause) => (
                <li key={cause.label} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${cause.dot}`} />
                  {cause.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Community Spirit
            </h4>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Every small action counts. Connect with local volunteers, turn
              compassion into direct community aid, and be the change your city
              needs.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-semibold">
                <GlobeIcon className="w-3.5 h-3.5" />
                100% Volunteer Driven
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © 2026 GoodGather. Built with care for
            community service and social development.
          </p>

          <div className="flex items-center gap-1 text-xs">
            <span>Made with</span>
            <HeartIcon className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for a better tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}