import { motion } from "framer-motion";

const features = [
  {
    icon: "🖥",
    title: "Hands-On Lab Environment",
    desc: "Practice on real-world scenarios in our dedicated cyber range with 200+ lab exercises.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Instructors",
    desc: "Learn from industry professionals with 10+ years of cybersecurity experience.",
  },
  {
    icon: "📜",
    title: "EC-Council Certified",
    desc: "Official EC-Council training partner with globally recognized certifications.",
  },
  {
    icon: "💼",
    title: "Placement Assistance",
    desc: "Resume building, mock interviews, and direct referrals to top cybersecurity firms.",
  },
  {
    icon: "🌐",
    title: "Flexible Batches",
    desc: "Weekday & weekend batches. Online and offline modes available.",
  },
  {
    icon: "lifetime",
    title: "Lifetime Access",
    desc: "Get lifetime access to course materials, lab environments, and future updates.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
            Why Hacking Nest
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Why Students{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-cyan-500/10 rounded-2xl p-8 hover:border-cyan-500/30 hover:-translate-y-1 transition-all"
            >
              <span className="text-4xl block mb-4">
                {feature.icon === "lifetime" ? "🔄" : feature.icon}
              </span>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
