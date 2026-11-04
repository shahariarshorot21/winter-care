// import { Events } from "@/components/events";
// import { Footer } from "@/components/footer";
// import { Navbar } from "@/components/navbar";

// export default function EventsPage() {
//   return (
//     <main className="min-h-screen flex flex-col bg-background">
//       <Navbar />
//       <div className="flog-grow pt-8">
//         <Events />
//       </div>
//       <Footer />
//     </main>
//   );
// }

// import { Footer } from "@/components/footer";
// import { Navbar } from "@/components/navbar";

// export default function EventsPage() {
//   return (
//     <main className="min-h-screen flex flex-col bg-background">
//       <Navbar />

//       <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center space-y-2 mb-10">
//           <span className="text-xs font-bold tracking-widest uppercase text-teal-600">
//             STAY UPDATED
//           </span>
//           <h1 className="text-3xl md:text-4xl font-black text-foreground">
//             Recent Upcoming Events
//           </h1>
//           <p className="text-sm text-muted-foreground max-w-md mx-auto">
//             Recently created initiatives happening across communities — join the
//             next one before spots fill up.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
//       </div>

//       <Footer />
//     </main>
//   );
// }

import { Events } from "@/components/events";

export default function EventsPage() {
  return (
    <div className="py-8">
      <Events />
    </div>
  );
}