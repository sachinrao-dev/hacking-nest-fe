import { motion } from "framer-motion";
import type { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "CEH Certified — Now at TCS",
    text: "Hacking Nest transformed my career. The hands-on labs were incredible. I cracked my CEH exam in the first attempt and landed a cybersecurity role at TCS.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "CHFI Certified — Now at Infosys",
    text: "The forensic investigation course was top-notch. Real-world scenarios, expert guidance, and excellent placement support. Highly recommended!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "ECSA Certified — Freelance Pentester",
    text: "After completing ECSA, I started freelancing as a penetration tester. The practical skills I learned here are directly applicable to real engagements.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "LPT Certified — Security Consultant",
    text: "The LPT course was intense and thorough. The instructors don't just teach — they mentor you. Best investment in my cybersecurity career.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "CEH Certified — SOC Analyst at Wipro",
    text: "Coming from a non-IT background, I was nervous. But the structured curriculum and supportive faculty made it easy. Now I'm a SOC analyst!",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "CHFI Certified — Cyber Forensics Lab",
    text: "The digital forensics labs were phenomenal. I got hands-on experience with tools I now use daily at work. Thank you, Hacking Nest!",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-cyan-500/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all"
            >
              <Stars count={t.rating} />
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-cyan-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
