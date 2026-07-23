export default function Footer() {
  return (
    <>
      <footer className="py-12 px-6 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xs">HN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Hacking Nest
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              India&apos;s premier cybersecurity training institute. EC-Council
              certified courses with placement assistance.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  CEH — Certified Ethical Hacking
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  CHFI — Forensic Investigator
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  LPT — Penetration Tester
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">
                  ECSA — Security Analyst
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-cyan-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
                  Student Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Hyderabad, India</li>
              <li>info@hackingnest.com</li>
              <li>+91 89206 70367</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/918920670367"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-colors text-sm"
              >
                WA
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors text-sm"
              >
                YT
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-colors text-sm"
              >
                IG
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-cyan-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Hacking Nest. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            EC-Council Authorized Training Partner
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/918920670367"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition z-50 font-bold text-sm flex items-center gap-2"
      >
        💬 Chat on WhatsApp
      </a>
    </>
  );
}
