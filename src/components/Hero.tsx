import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Certified Ethical Hackers",
  "Penetration Testers",
  "Security Analysts",
  "Forensic Investigators",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex] ?? "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,255,255,0.03) 50px, rgba(0,255,255,0.03) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,255,255,0.03) 50px, rgba(0,255,255,0.03) 51px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">
            Admissions Open 2026 — Limited Seats
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
          <span className="text-white">Become a</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
          India&apos;s premier institute for cybersecurity certifications.
          Master ethical hacking, penetration testing, and digital forensics
          with hands-on lab experience.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="#courses"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            Explore Courses
          </a>
          <a
            href="#contact"
            className="border border-cyan-500/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-500/10 transition-all"
          >
            Talk to Advisor
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { icon: "🎓", text: "EC-Council Certified" },
            { icon: "💻", text: "100% Practical Labs" },
            { icon: "placement", text: "Placement Assistance" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-gray-400">
              <span className="text-xl">{item.icon === "placement" ? "💼" : item.icon}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
