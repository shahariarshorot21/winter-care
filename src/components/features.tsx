import {
  CalendarCheck2Icon,
  CompassIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"

const features = [
  {
    icon: UsersIcon,
    iconClassName: "text-teal-600 dark:text-teal-400",
    title: "Community Support",
    description:
      "People come together to support helpless families by donating warm clothes, blankets, and essential winter items.",
  },
  {
    icon: CalendarCheck2Icon,
    iconClassName: "text-indigo-600 dark:text-indigo-400",
    title: "Easy Participation",
    description:
      "Join winter relief campaigns with just one click and help bring warmth to people in need.",
  },
  {
    icon: ShieldCheckIcon,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    title: "Event Management",
    description:
      "Create, manage, and track your own winter donation events while making a difference in the community.",
  },
  {
    icon: CompassIcon,
    iconClassName: "text-amber-600 dark:text-amber-400",
    title: "Upcoming Events",
    description:
      "Discover upcoming winter relief campaigns and find opportunities to help people throughout the winter season.",
  },
]

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
          Platform Features
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Explore What WinterNest Offers
        </h2>
        <p className="text-sm text-muted-foreground">
          A frictionless platform connecting compassionate citizens with direct
          local community initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-teal-500/40 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <feature.icon className={`w-6 h-6 ${feature.iconClassName}`} />
            </div>
            <h3 className="font-bold text-base text-foreground">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
