import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "Why Us", href: "#why-us" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-cyan-500/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-lg">HN</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Hacking Nest
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
}
