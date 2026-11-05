"use client";

import { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  HandHeart,
  PlusCircleIcon,
  FolderHeartIcon,
  CheckCheckIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserType = {
  fullName: string;
  email: string;
  photoURL: string;
};

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      try {
        const savedUser = localStorage.getItem("user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    setMobileMenu(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-900 bg-slate-400 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-foreground group"
            href="/"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-950 to-orange-900 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HandHeart className="w-6 h-6" />
            </div>

            <div className="flex flex-col">
              <span className="leading-none text-lg font-black bg-linear-to-r from-gray-700 to-red-950 dark:from-teal-400 dark:to-green-900 bg-clip-text text-transparent">
                WinterCare
              </span>

              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Warm Hearts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-black text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors"
              href="/eventss"
            >
              <CalendarDaysIcon className="w-4 h-4" />
              Upcoming Events
            </Link>

            <Link
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors"
              href="/events/create"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Add Event
            </Link>

            <Link
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors"
              href="/my-events"
            >
              <FolderHeartIcon className="w-4 h-4" />
              My Events
            </Link>

            <Link
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors"
              href="/joined-events"
            >
              <CheckCheckIcon className="w-4 h-4" />
              Joined Events
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm flex items-center justify-center focus:outline-none cursor-pointer"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-white bg-slate-700 w-full h-full flex items-center justify-center">
                      {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white p-4 shadow-xl border border-stone-100 space-y-3 z-50">
                    <div className="text-center border-b border-stone-100 pb-3">
                      <h4 className="font-serif font-bold text-lg text-stone-900">
                        {user.fullName}
                      </h4>

                      <p className="text-xs text-stone-500 break-all">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center justify-center py-2 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-colors"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 rounded-xl bg-rose-50 text-rose-600 font-medium text-sm hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-700 text-white text-sm font-bold hover:bg-amber-950 transition-colors"
              >
                <LogInIcon className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-stone-300 py-4 space-y-3 bg-white px-4 rounded-b-2xl shadow-lg">
            <Link
              href="/eventss"
              onClick={() => setMobileMenu(false)}
              className="block text-sm font-semibold text-black py-1"
            >
              Upcoming Events
            </Link>

            <Link
              href="/events/create"
              onClick={() => setMobileMenu(false)}
              className="block text-sm font-semibold text-black py-1"
            >
              Add Event
            </Link>

            <Link
              href="/my-events"
              onClick={() => setMobileMenu(false)}
              className="block text-sm font-semibold text-black py-1"
            >
              My Events
            </Link>

            <Link
              href="/joined-events"
              onClick={() => setMobileMenu(false)}
              className="block text-sm font-semibold text-black py-1"
            >
              Joined Events
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
