import { useEffect, useState, useRef } from "react";
import { Box, Typography, TextField, Button, Paper, Stack, Avatar, Chip, AppBar, Toolbar, Container, IconButton, MenuItem } from "@mui/material";
import type { Contact, GetContactsResponse } from "../types";
import { useToast } from "../hooks/useToast";
import { client, GET_CONTACTS } from "../lib/apollo";
import Seo from "./Seo";

const ADMIN_PASSWORD = "hackingnest2026";
const POLL_INTERVAL = 5000;

const courseColors: Record<string, string> = { CEH: "#06b6d4", CHFI: "#8b5cf6", LPT: "#ef4444", ECSA: "#22c55e" };
function getCourseColor(c: string) { return courseColors[c.split(" ")[0] ?? ""] ?? "#71717a"; }
function getInitials(n: string) { return n.split(" ").map((w) => w.charAt(0)).join("").toUpperCase().slice(0, 2); }

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newCount, setNewCount] = useState(0);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const prevCountRef = useRef(0);
  const { show, ToastComponent } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { setAuthenticated(true); setError(""); sessionStorage.setItem("admin_auth", "true"); }
    else setError("Invalid password");
  };

  useEffect(() => {
    if (!authenticated) return;

    async function fetchContacts() {
      try {
        const { data } = await client.query<GetContactsResponse>({
          query: GET_CONTACTS,
          fetchPolicy: "network-only",
        });
        const fetchedContacts = data?.contacts ?? [];
        setContacts((prev) => {
          if (prev.length > 0 && fetchedContacts.length > prev.length) {
            const diff = fetchedContacts.length - prev.length;
            setNewCount((c) => c + diff);
            show(`New enquiry from ${fetchedContacts[0]?.name ?? "a student"}`);
          }
          return fetchedContacts;
        });
      } catch { /* ignore */ }
    }

    fetchContacts();
    const interval = setInterval(fetchContacts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [authenticated, show]);

  useEffect(() => {
    if (contacts.length > prevCountRef.current) {
      setNewCount(contacts.length - prevCountRef.current);
    }
    prevCountRef.current = contacts.length;
  }, [contacts.length]);

  const filtered = contacts.filter((c) => {
    const s = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s) || (c.phone && c.phone.includes(s));
    const matchCourse = filterCourse === "all" || (c.course && c.course.toLowerCase().includes(filterCourse.toLowerCase()));
    return matchSearch && matchCourse;
  });
  const uniqueCourses = [...new Set(contacts.map((c) => c.course).filter(Boolean))];

  const renderDetails = (c: Contact) => (
    <Paper sx={{ p: { xs: 3, md: 5 }, bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.2)", position: { xs: "static", lg: "sticky" }, top: 20 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: "center", mb: { xs: 3, md: 5 }, minWidth: 0 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 }, fontWeight: 900, fontSize: { xs: "1.2rem", md: "1.5rem" }, flexShrink: 0 }}>{getInitials(c.name)}</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, fontSize: { xs: "1.1rem", md: "1.5rem" }, wordBreak: "break-word" }}>{c.name}</Typography>
          <Typography variant="caption" sx={{ color: "grey.500", wordBreak: "break-word" }}>Enquiry #{c.id} • {new Date(c.createdAt).toLocaleString()}</Typography>
        </Box>
      </Stack>

      <Stack spacing={3}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <Paper sx={{ p: 3, bgcolor: "#27272a", minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 0.5 }}>Email</Typography>
            <Typography variant="body2" component="a" href={`mailto:${c.email}`} sx={{ color: "primary.main", textDecoration: "none", wordBreak: "break-all" }}>{c.email}</Typography>
          </Paper>
          <Paper sx={{ p: 3, bgcolor: "#27272a", minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 0.5 }}>Phone</Typography>
            {c.phone ? <Typography variant="body2" component="a" href={`tel:${c.phone}`} sx={{ color: "primary.main", textDecoration: "none", wordBreak: "break-all" }}>{c.phone}</Typography> : <Typography variant="body2" sx={{ color: "grey.600" }}>Not provided</Typography>}
          </Paper>
        </Box>

        <Paper sx={{ p: 3, bgcolor: "#27272a" }}>
          <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>Interested Course</Typography>
          {c.course ? <Chip label={c.course} size="small" sx={{ bgcolor: `${getCourseColor(c.course)}20`, color: getCourseColor(c.course), border: `1px solid ${getCourseColor(c.course)}40`, maxWidth: "100%", "& .MuiChip-label": { whiteSpace: "normal" } }} /> : <Typography variant="body2" sx={{ color: "grey.600" }}>Not specified</Typography>}
        </Paper>

        <Paper sx={{ p: 3, bgcolor: "#27272a" }}>
          <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>Message</Typography>
          <Typography variant="body2" sx={{ color: "grey.300", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{c.message || "No message"}</Typography>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1.5, md: 2 }}>
          <Button href={`mailto:${c.email}?subject=Hacking Nest - Course Details&body=Hi ${c.name},%0A%0AThank you for your interest in ${c.course ?? "our courses"} at Hacking Nest.`} variant="contained" fullWidth sx={{ background: "linear-gradient(90deg, #06b6d4, #2563eb)", textTransform: "none", fontWeight: 700, py: 1.5 }}>📧 Reply via Email</Button>
          {c.phone && <Button href={`https://wa.me/91${c.phone.replace(/\D/g, "")}`} target="_blank" variant="contained" fullWidth sx={{ bgcolor: "#22c55e", textTransform: "none", fontWeight: 700, py: 1.5, "&:hover": { bgcolor: "#16a34a" } }}>💬 WhatsApp</Button>}
        </Stack>
      </Stack>
    </Paper>
  );

  if (!authenticated) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#000", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
        <Seo title="Admin Login | Hacking Nest" />
        <Paper sx={{ p: 5, maxWidth: 400, width: "100%", bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.2)", textAlign: "center" }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", mx: "auto", mb: 2, fontSize: "1.5rem", fontWeight: 900 }}>HN</Avatar>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>Teacher Dashboard</Typography>
          <Typography variant="body2" sx={{ color: "grey.500", mb: 4 }}>Enter your password to access the admin panel</Typography>
          <form onSubmit={handleLogin}>
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" fullWidth size="small" sx={{ mb: 2 }} />
            {error && <Typography variant="body2" sx={{ color: "error.main", mb: 2, bgcolor: "rgba(239,68,68,0.1)", p: 1.5, borderRadius: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ background: "linear-gradient(90deg, #06b6d4, #2563eb)", textTransform: "none", fontWeight: 700, py: 1.5 }}>Login</Button>
          </form>
          <Typography variant="caption" sx={{ color: "grey.600", mt: 3, display: "block" }}>Protected area. Unauthorized access is not allowed.</Typography>
        </Paper>
        {ToastComponent}
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000", overflowX: "hidden" }}>
      <Seo title="Teacher Dashboard | Hacking Nest" />
      <AppBar position="static" sx={{ bgcolor: "#0a0a0a", boxShadow: "0 1px 0 rgba(6,182,212,0.1)" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: "0.8rem", fontWeight: 900 }}>HN</Avatar>
              <Box><Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Teacher Dashboard</Typography><Typography variant="caption" sx={{ color: "grey.500" }}>Manage student enquiries</Typography></Box>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ alignItems: "center", flexWrap: "wrap", justifyContent: { xs: "flex-end", md: "flex-start" } }}>
              <Chip size="small" label="Live" color="success" variant="outlined" />
              <IconButton href="/" size="small" sx={{ color: "grey.500", fontSize: "0.75rem" }}>View Site</IconButton>
              <Button size="small" onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }} sx={{ color: "grey.500", textTransform: "none", fontSize: "0.75rem" }}>Logout</Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }, gap: { xs: 1.5, md: 2 }, mb: 4 }}>
          {[
            { val: contacts.length, label: "Total Enquiries", color: "#06b6d4" },
            { val: newCount, label: "New Today", color: "#22c55e" },
            { val: uniqueCourses.length, label: "Courses Enquired", color: "#8b5cf6" },
            { val: contacts.filter((c) => c.phone).length, label: "With Phone", color: "#eab308" },
          ].map((s) => (
            <Paper key={s.label} sx={{ p: { xs: 2, md: 3 }, bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.1)" }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: s.color, fontSize: { xs: "1.5rem", md: "2.125rem" } }}>{s.val}</Typography>
              <Typography variant="caption" sx={{ color: "grey.500", fontSize: { xs: "0.65rem", md: "0.75rem" } }}>{s.label}</Typography>
            </Paper>
          ))}
        </Box>

        {newCount > 0 && <Paper sx={{ p: 2, mb: 3, bgcolor: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography sx={{ color: "primary.main", fontWeight: 700 }}>{newCount} new submission{newCount > 1 ? "s" : ""} received!</Typography>
          <Button size="small" onClick={() => setNewCount(0)} sx={{ color: "primary.main", textTransform: "none", flexShrink: 0 }}>Dismiss</Button>
        </Paper>}

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
          <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." size="small" fullWidth />
          <TextField select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} size="small" sx={{ minWidth: 150 }}>
            <MenuItem value="all">All Courses</MenuItem>
            {uniqueCourses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Stack>

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}><Typography sx={{ color: "grey.600" }}>{contacts.length === 0 ? "No submissions yet" : "No matching results"}</Typography></Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 3fr" }, gap: 3 }}>
            <Stack spacing={1.5} sx={{ maxHeight: { xs: "none", lg: "70vh" }, overflow: { xs: "visible", lg: "auto" } }}>
              {filtered.map((c) => (
                <Box key={c.id}>
                  <Paper onClick={() => setSelected(selected?.id === c.id ? null : c)} sx={{ p: 2.5, cursor: "pointer", bgcolor: selected?.id === c.id ? "rgba(6,182,212,0.1)" : "#18181b", border: selected?.id === c.id ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(6,182,212,0.1)", transition: "all 0.2s", "&:hover": { borderColor: "rgba(6,182,212,0.3)" } }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, fontWeight: 700, fontSize: "0.8rem" }}>{getInitials(c.name)}</Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>{c.name}</Typography>
                        <Typography variant="caption" sx={{ color: "grey.500" }} noWrap>{c.email}</Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, alignItems: "center" }}>
                      {c.course && <Chip label={c.course.split(" ")[0]} size="small" sx={{ bgcolor: `${getCourseColor(c.course)}20`, color: getCourseColor(c.course), border: `1px solid ${getCourseColor(c.course)}40`, fontSize: "0.65rem", height: 22 }} />}
                      <Typography variant="caption" sx={{ color: "grey.600", ml: "auto" }}>{new Date(c.createdAt).toLocaleDateString()}</Typography>
                    </Stack>
                  </Paper>
                  {selected?.id === c.id && (
                    <Box sx={{ display: { xs: "block", lg: "none" }, mt: 1.5 }}>{renderDetails(selected)}</Box>
                  )}
                </Box>
              ))}
            </Stack>

            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {selected ? (
                renderDetails(selected)
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "grey.600" }}>
                  <Typography>Select a student to view details</Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
      {ToastComponent}
    </Box>
  );
}