import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaShieldAlt,
  FaSearch,
  FaBug,
  FaUserSecret,
} from "react-icons/fa";
import type { Course } from "../types";

const courses: Course[] = [
  {
    id: "ceh",
    title: "Certified Ethical Hacking",
    abbreviation: "CEH",
    tagline: "Think Like a Hacker, Defend Like an Expert",
    description:
      "The world's most recognized ethical hacking certification. Learn to think and act like a hacker with 20 modules covering 340+ attack technologies.",
    icon: <FaShieldAlt size={32} />,
    topics: [
      "Footprinting & Reconnaissance",
      "Scanning Networks",
      "Enumeration",
      "Vulnerability Analysis",
      "System Hacking",
      "Malware Threats",
      "Sniffing & Social Engineering",
      "DoS & Session Hijacking",
    ],
    duration: "5 Days / 40 Hours",
    level: "Beginner to Advanced",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "chfi",
    title: "Computer Hacking Forensic Investigator",
    abbreviation: "CHFI",
    tagline: "Uncover Evidence, Track Attackers",
    description:
      "Master the art of detecting, investigating, and presenting cybercrime evidence. Essential for law enforcement and corporate security teams.",
    icon: <FaSearch size={32} />,
    topics: [
      "Digital Evidence Collection",
      "Disk Forensics",
      "Network Forensics",
      "Web Forensics",
      "Database Forensics",
      "Mobile Forensics",
      "Cloud Forensics",
      "Report Writing & Expert Testimony",
    ],
    duration: "5 Days / 40 Hours",
    level: "Intermediate",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "lpt",
    title: "Licensed Penetration Tester",
    abbreviation: "LPT",
    tagline: "The Ultimate Penetration Testing Credential",
    description:
      "EC-Council's most prestigious penetration testing certification. Prove your ability to perform advanced penetration tests across enterprise networks.",
    icon: <FaBug size={32} />,
    topics: [
      "Advanced Scanning & Enumeration",
      "Exploitation Techniques",
      "Post Exploitation",
      "Advanced Social Engineering",
      "Web App Penetration Testing",
      "Cloud Penetration Testing",
      "IoT & OT Penetration Testing",
      "Report Writing & Methodology",
    ],
    duration: "5 Days / 40 Hours",
    level: "Advanced",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "ecsa",
    title: "EC-Council Certified Security Analyst",
    abbreviation: "ECSA",
    tagline: "Bridge the Gap Between Theory and Practice",
    description:
      "A hands-on penetration testing course that covers realistic attack vectors. Practice on real-world networks in EC-Council's Cyber Range.",
    icon: <FaUserSecret size={32} />,
    topics: [
      "Modular Penetration Testing",
      "Network Penetration Testing",
      "Web Application Pen Testing",
      "Social Engineering Pen Testing",
      "Cloud Penetration Testing",
      "IoT Penetration Testing",
      "OTT Penetration Testing",
      "Advanced Testing Methodologies",
    ],
    duration: "5 Days / 40 Hours",
    level: "Intermediate to Advanced",
    color: "from-green-500 to-emerald-600",
  },
];

export default function Courses() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="courses" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Industry-Recognized{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            EC-Council certified courses designed to transform you into a
            cybersecurity professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                expanded === course.id
                  ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                  : "border-cyan-500/10 hover:border-cyan-500/30"
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white`}
                    >
                      {course.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-400 tracking-wider">
                        {course.abbreviation}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-cyan-400 text-sm font-medium italic mb-3">
                  &ldquo;{course.tagline}&rdquo;
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {course.description}
                </p>

                <div className="flex gap-4 text-xs text-gray-500 mb-5">
                  <span className="bg-zinc-800 px-3 py-1 rounded-full">
                    ⏱ {course.duration}
                  </span>
                  <span className="bg-zinc-800 px-3 py-1 rounded-full">
                    📊 {course.level}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setExpanded(expanded === course.id ? null : course.id)
                  }
                  className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
                >
                  {expanded === course.id
                    ? "▲ Hide Topics"
                    : "▼ View Course Topics"}
                </button>

                {expanded === course.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 grid grid-cols-2 gap-2"
                  >
                    {course.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {topic}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="px-8 py-4 bg-zinc-950 border-t border-cyan-500/10 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Next batch starts soon
                </span>
                <a
                  href="#contact"
                  className={`bg-gradient-to-r ${course.color} px-5 py-2 rounded-full text-sm font-bold text-white hover:shadow-lg transition-all`}
                >
                  Enroll Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
