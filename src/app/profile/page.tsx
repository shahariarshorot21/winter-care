
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

type UserType = {
  fullName: string;
  email: string;
  photoURL: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12">

      <div className="max-w-xl mx-auto">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-teal-700 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-stone-900 mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8">

          {/* User Image and Name */}
          <div className="flex flex-col items-center mb-8">

            <Image
              src={user.photoURL}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover border-4 border-teal-100 shadow-sm"
            />

            <h2 className="mt-4 text-xl font-bold text-stone-900">
              {user.fullName}
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              WinterCare Member
            </p>

          </div>

          <div className="border-t border-stone-100 pt-6 space-y-6">

            {/* Full Name */}
            <div>
              <p className="text-sm text-stone-500 flex items-center gap-2">
                <User size={16} />
                Full Name
              </p>

              <p className="mt-2 font-semibold text-stone-900">
                {user.fullName}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-stone-500 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </p>

              <p className="mt-2 font-semibold text-stone-900 break-all">
                {user.email}
              </p>
            </div>

          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-rose-50 text-rose-600 py-3 font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
