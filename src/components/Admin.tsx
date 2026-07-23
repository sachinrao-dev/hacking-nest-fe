import { useEffect, useState, useRef } from "react";
import type { ContactFormData } from "../types";

interface Contact extends ContactFormData {
  id: number;
  createdAt: string;
}

const ADMIN_PASSWORD = "hackingnest2026";

const courseColors: Record<string, string> = {
  "CEH": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "CHFI": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "LPT": "bg-red-500/20 text-red-400 border-red-500/30",
  "ECSA": "bg-green-500/20 text-green-400 border-green-500/30",
};

function getCourseColor(course: string): string {
  const abbr = course.split(" ")[0] ?? "";
  return courseColors[abbr] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [connected, setConnected] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const wsRef = useRef<WebSocket | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Invalid password");
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data: Contact[]) => setContacts(data))
      .catch(console.error);

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(
      `${protocol}//${window.location.hostname}:3001/ws`
    );
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data as string) as {
        type: string;
        contact: Contact;
      };
      if (data.type === "NEW_CONTACT") {
        setContacts((prev) => [data.contact, ...prev]);
        setNewCount((prev) => prev + 1);
      }
    };

    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, [authenticated]);

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search));
    const matchCourse =
      filterCourse === "all" ||
      (c.course && c.course.toLowerCase().includes(filterCourse.toLowerCase()));
    return matchSearch && matchCourse;
  });

  const uniqueCourses = [
    ...new Set(contacts.map((c) => c.course).filter(Boolean)),
  ];

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-black text-2xl">HN</span>
            </div>
            <h1 className="text-3xl font-black text-white">Teacher Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Enter your password to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-8"
          >
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-4 rounded-xl bg-zinc-800 border border-cyan-500/20 text-white placeholder-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-base mb-4"
            />
            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-bold text-white text-base hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            Protected area. Unauthorized access is not allowed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-cyan-500/10 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">HN</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Teacher Dashboard</h1>
              <p className="text-xs text-gray-500">
                Manage student enquiries
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-xs text-gray-400">
                {connected ? "Live" : "Offline"}
              </span>
            </div>
            <a
              href="/"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
            >
              View Site
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_auth");
                setAuthenticated(false);
              }}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-cyan-500/10 rounded-xl p-5">
            <p className="text-3xl font-black text-cyan-400">
              {contacts.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Enquiries</p>
          </div>
          <div className="bg-zinc-900 border border-cyan-500/10 rounded-xl p-5">
            <p className="text-3xl font-black text-green-400">{newCount}</p>
            <p className="text-xs text-gray-500 mt-1">New Today</p>
          </div>
          <div className="bg-zinc-900 border border-cyan-500/10 rounded-xl p-5">
            <p className="text-3xl font-black text-purple-400">
              {uniqueCourses.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Courses Enquired</p>
          </div>
          <div className="bg-zinc-900 border border-cyan-500/10 rounded-xl p-5">
            <p className="text-3xl font-black text-yellow-400">
              {contacts.filter((c) => c.phone).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">With Phone Number</p>
          </div>
        </div>

        {/* New submissions alert */}
        {newCount > 0 && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <p className="text-cyan-400 font-bold">
              {newCount} new submission{newCount > 1 ? "s" : ""} received!
            </p>
            <button
              onClick={() => setNewCount(0)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="flex-1 p-3 rounded-xl bg-zinc-900 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm"
          />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="p-3 rounded-xl bg-zinc-900 border border-cyan-500/10 focus:border-cyan-400 outline-none transition text-sm text-gray-300"
          >
            <option value="all">All Courses</option>
            {uniqueCourses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-2xl">
              {contacts.length === 0
                ? "No submissions yet"
                : "No matching results"}
            </p>
            <p className="mt-2">
              {contacts.length === 0
                ? "Waiting for students to fill the form..."
                : "Try a different search or filter"}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Student List */}
            <div
              className={`${selected ? "hidden lg:block" : ""} lg:col-span-2 space-y-2`}
            >
              {filtered.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelected(contact)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected?.id === contact.id
                      ? "bg-cyan-500/10 border-cyan-500/40"
                      : "bg-zinc-900 border-cyan-500/10 hover:border-cyan-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {getInitials(contact.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {contact.course && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${getCourseColor(contact.course)}`}
                      >
                        {contact.course.split(" ")[0]}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Student Detail */}
            <div
              className={`${selected ? "" : "hidden lg:block"} lg:col-span-3`}
            >
              {selected ? (
                <div className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-8 sticky top-8">
                  <button
                    onClick={() => setSelected(null)}
                    className="lg:hidden text-sm text-gray-500 hover:text-cyan-400 mb-4"
                  >
                    ← Back to list
                  </button>

                  {/* Profile Header */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl">
                      {getInitials(selected.name)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selected.name}</h2>
                      <p className="text-xs text-gray-500">
                        Enquiry #{selected.id} •{" "}
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-sm text-cyan-400 hover:underline break-all"
                        >
                          {selected.email}
                        </a>
                      </div>
                      <div className="bg-zinc-800 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        {selected.phone ? (
                          <a
                            href={`tel:${selected.phone}`}
                            className="text-sm text-cyan-400 hover:underline"
                          >
                            {selected.phone}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600">Not provided</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-zinc-800 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Interested Course
                      </p>
                      {selected.course ? (
                        <span
                          className={`inline-block text-xs px-3 py-1.5 rounded-full border font-medium ${getCourseColor(selected.course)}`}
                        >
                          {selected.course}
                        </span>
                      ) : (
                        <p className="text-sm text-gray-600">Not specified</p>
                      )}
                    </div>

                    <div className="bg-zinc-800 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">Message</p>
                      {selected.message ? (
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selected.message}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">No message</p>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={`mailto:${selected.email}?subject=Hacking Nest - Course Details&body=Hi ${selected.name},%0A%0AThank you for your interest in ${selected.course ?? "our courses"} at Hacking Nest.%0A%0AHere are the course details...`}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-bold text-sm text-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                      >
                        📧 Reply via Email
                      </a>
                      {selected.phone && (
                        <a
                          href={`https://wa.me/91${selected.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-500/20 border border-green-500/30 py-3 rounded-xl font-bold text-sm text-center text-green-400 hover:bg-green-500/30 transition-all"
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex items-center justify-center h-64 text-gray-600">
                  <p>Select a student to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
