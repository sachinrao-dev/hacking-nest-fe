import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaCode,
  FaRobot,
  FaCloud,
} from "react-icons/fa";

export default function App() {
  const services = [
    {
      title: "Cyber Security",
      icon: <FaShieldAlt size={40} />,
      desc: "Enterprise grade security solutions.",
    },
    {
      title: "Web Development",
      icon: <FaCode size={40} />,
      desc: "Modern React & Node.js applications.",
    },
    {
      title: "AI Solutions",
      icon: <FaRobot size={40} />,
      desc: "Next generation AI integrations.",
    },
    {
      title: "Cloud Services",
      icon: <FaCloud size={40} />,
      desc: "Deploy and scale globally.",
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Hacking Nest
          </h1>

          <div className="hidden md:flex gap-8 text-lg">
            <a href="#">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-5"
        >
          <p className="text-cyan-400 tracking-[8px] mb-5">
            CYBER • AI • WEB
          </p>

          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            HACKING NEST
          </h1>

          <h2 className="text-3xl md:text-5xl mt-8 font-bold">
            Modern Web Developers
          </h2>

          <p className="max-w-3xl mx-auto text-gray-300 mt-6 text-xl">
            We build secure digital experiences, scalable applications,
            and next-generation AI products.
          </p>

          <div className="mt-10 flex flex-wrap gap-5 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-cyan-500 px-8 py-4 rounded-full font-bold hover:scale-110 transition"
            >
              Get Started
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://github.com",
                  "_blank"
                )
              }
              className="border border-cyan-500 px-8 py-4 rounded-full font-bold hover:bg-cyan-500 transition"
            >
              View Projects
            </button>
          </div>
        </motion.div>
      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            ["50+", "Projects"],
            ["20+", "Clients"],
            ["99%", "Success"],
            ["24/7", "Support"],
          ].map((item) => (
            <div
              key={item[0]}
              className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-10 text-center hover:-translate-y-3 transition"
            >
              <h1 className="text-5xl text-cyan-400 font-bold">
                {item[0]}
              </h1>

              <p className="text-gray-400 mt-3">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section
        id="services"
        className="py-24 px-5"
      >
        <h1 className="text-center text-5xl font-bold mb-20">
          Our Services
        </h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -15 }}
              className="bg-gradient-to-b from-zinc-900 to-black border border-cyan-500/20 rounded-3xl p-10 text-center shadow-lg shadow-cyan-500/10"
            >
              <div className="text-cyan-400 flex justify-center mb-6">
                {service.icon}
              </div>

              <h2 className="text-2xl font-bold">
                {service.title}
              </h2>

              <p className="text-gray-400 mt-4">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    
          {/* PROJECTS */}

      <section
        id="projects"
        className="py-24 px-5 bg-zinc-950"
      >
        <h1 className="text-center text-5xl font-bold mb-20">
          Featured Projects
        </h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Weather App",
            "Voting App",
            "Hotel Management",
          ].map((project) => (
            <div
              key={project}
              className="rounded-3xl overflow-hidden bg-zinc-900 border border-cyan-500/20 hover:scale-105 transition"
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
                alt={project}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {project}
                </h2>

                <p className="text-gray-400 mt-4">
                  Built using React, Node.js and
                  modern technologies.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}

      <section
        id="team"
        className="py-24 px-5"
      >
        <h1 className="text-center text-5xl font-bold mb-20">
          Meet The Founder
        </h1>

        <div className="max-w-4xl mx-auto bg-zinc-900 rounded-3xl p-10 border border-cyan-500/20 text-center">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            className="w-40 h-40 rounded-full mx-auto border-4 border-cyan-500"
          />

          <h2 className="text-4xl font-bold mt-6">
            Grishh Bajaj
          </h2>

          <p className="text-cyan-400 mt-2">
            Founder & Full Stack Developer
          </p>

          <p className="text-gray-400 mt-6 text-lg">
            Passionate about React, Cyber Security,
            Node.js and building scalable products.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="py-24 px-5 bg-zinc-950">
        <h1 className="text-center text-5xl font-bold mb-20">
          What Clients Say
        </h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Amazing work and timely delivery.",
            "Highly professional team.",
            "Best experience working with Hacking Nest.",
          ].map((text, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-8 rounded-3xl border border-cyan-500/20"
            >
              <p className="text-gray-300">
                "{text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="py-24 px-5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold">
            Let's Build Something Great
          </h1>

          <p className="text-gray-400 mt-5 text-xl">
            Ready to take your business online?
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Thank you! We'll contact you soon."
              );
            }}
            className="mt-10 flex flex-col gap-5"
          >
            <input
              placeholder="Your Name"
              className="p-5 rounded-xl bg-zinc-900 border border-cyan-500/20"
            />

            <input
              placeholder="Email Address"
              className="p-5 rounded-xl bg-zinc-900 border border-cyan-500/20"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="p-5 rounded-xl bg-zinc-900 border border-cyan-500/20"
            />

            <button className="bg-cyan-500 py-5 rounded-xl font-bold hover:scale-105 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="py-10 text-center border-t border-cyan-500/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Hacking Nest
        </h1>

        <p className="text-gray-500 mt-4">
          © 2026 Hacking Nest. All Rights Reserved.
        </p>
      </footer>

      {/* WHATSAPP BUTTON */}

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        className="
        fixed
        bottom-5
        right-5
        bg-green-500
        p-4
        rounded-full
        shadow-2xl
        hover:scale-110
        transition
        z-50"
      >
        WhatsApp
      </a>
    </div>
  );
}