import { useState, type FormEvent } from "react";
import { Box, Container, Typography, TextField, Button, MenuItem, Paper, Stack } from "@mui/material";
import type { ContactFormData } from "../types";
import { useToast } from "../hooks/useToast";

const courseOptions = [
  "CEH - Certified Ethical Hacking",
  "CHFI - Computer Hacking Forensic Investigator",
  "LPT - Licensed Penetration Tester",
  "ECSA - EC-Council Certified Security Analyst",
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", phone: "", course: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show, ToastComponent } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Failed");
      show("Thank you for your interest! Our team will contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    } catch { show("Something went wrong. Please try again.", "error"); }
    finally { setIsSubmitting(false); }
  };

  return (<>
    <Box id="contact" sx={{ py: 12, px: 3, bgcolor: "#0a0a0a" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 8, alignItems: "start" }}>
          <Box>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3 }}>Get In Touch</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 3 }}>
              Ready to Start Your{" "}
              <Box component="span" sx={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cybersecurity Journey?</Box>
            </Typography>
            <Typography sx={{ color: "grey.400", mb: 6 }}>
              Fill out the form and our counselors will get back to you within 24 hours with all the details about the course, fees, and batch schedules.
            </Typography>

            <Stack spacing={3}>
              {[
                { icon: "📍", label: "Visit Us", value: "V Floor 44 Tower, Jenny Plaza, No 7,\nBharathiar Salai, NIT Trichy,\nTiruchirappalli - 620001" },
                { icon: "📧", label: "Email", value: "info@hackingnest.com" },
                { icon: "📞", label: "Call Us", value: "+91 89206 70367" },
              ].map((item) => (
                <Stack key={item.label} direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                  <Paper sx={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(6,182,212,0.1)", flexShrink: 0 }}>{item.icon}</Paper>
                  <Box>
                    <Typography variant="caption" sx={{ color: "grey.500" }}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{item.value}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Paper sx={{ p: 5, bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.1)" }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} required fullWidth size="small" />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required fullWidth size="small" />
                  <TextField name="phone" label="Phone" type="tel" value={formData.phone} onChange={handleChange} required fullWidth size="small" />
                </Stack>
                <TextField name="course" label="Interested Course" value={formData.course} onChange={handleChange} required select fullWidth size="small">
                  <MenuItem value="">Select a course</MenuItem>
                  {courseOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </TextField>
                <TextField name="message" label="Message (Optional)" value={formData.message} onChange={handleChange} multiline rows={4} fullWidth size="small" />
                <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ background: "linear-gradient(90deg, #06b6d4, #2563eb)", textTransform: "none", fontWeight: 700, py: 1.5, borderRadius: 2, "&:hover": { background: "linear-gradient(90deg, #0891b2, #1d4ed8)" } }}>
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </Button>
                <Typography variant="caption" sx={{ color: "grey.600", textAlign: "center" }}>By submitting, you agree to our privacy policy. No spam, ever.</Typography>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
    {ToastComponent}
    </>);
}
