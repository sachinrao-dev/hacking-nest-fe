import { useState, type FormEvent } from "react";
import type { ContactFormData } from "../types";

const courseOptions = [
  "CEH - Certified Ethical Hacking",
  "CHFI - Computer Hacking Forensic Investigator",
  "LPT - Licensed Penetration Tester",
  "ECSA - EC-Council Certified Security Analyst",
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      alert(
        "Thank you for your interest! Our team will contact you within 24 hours."
      );
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Cybersecurity Journey?
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Fill out the form and our counselors will get back to you within
              24 hours with all the details about the course, fees, and batch
              schedules.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <span>📍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Us</p>
                  <p className="text-sm">Hyderabad, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <span>📧</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm">info@hackingnest.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <span>📞</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <p className="text-sm">+91 89206 70367</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-cyan-500/10 rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Full Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 89206 70367"
                  required
                  className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Interested Course *
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm text-gray-300"
              >
                <option value="">Select a course</option>
                {courseOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Message (Optional)
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Any questions? Tell us about your background..."
                className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to our privacy policy. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
