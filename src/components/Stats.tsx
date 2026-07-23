import type { Stat } from "../types";

const stats: Stat[] = [
  { value: "2000+", label: "Students Certified" },
  { value: "95%", label: "Placement Rate" },
  { value: "50+", label: "Corporate Trainings" },
  { value: "10+", label: "Years Experience" },
];

export default function Stats() {
  return (
    <section className="py-16 border-y border-cyan-500/10 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-500 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
