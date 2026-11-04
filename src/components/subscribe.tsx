
import { SendIcon } from "lucide-react"

export function Subscribe() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-300 bg-linear-to-br from-slate-100 via-gray-100 to-slate-200 p-8 sm:p-12 md:p-16 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
            Stay Connected
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Subscribe to Local Cause Alerts
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Get notified when new winter drives, blanket distributions, or
            emergency cleanups are organized in your neighborhood.
          </p>
        </div>

        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 shadow-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-bold text-sm shadow-md hover:bg-gray-800 transition-all cursor-pointer"
          >
            <SendIcon className="w-4 h-4" />
            <span>Subscribe</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-700">
          No spam guaranteed. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
