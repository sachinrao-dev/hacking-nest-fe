import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";
import type { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  { name: "Rahul Sharma", role: "CEH Certified — Now at TCS", text: "Hacking Nest transformed my career. The hands-on labs were incredible. I cracked my CEH exam in the first attempt and landed a cybersecurity role at TCS.", rating: 5 },
  { name: "Priya Mehta", role: "CHFI Certified — Now at Infosys", text: "The forensic investigation course was top-notch. Real-world scenarios, expert guidance, and excellent placement support. Highly recommended!", rating: 5 },
  { name: "Arjun Patel", role: "ECSA Certified — Freelance Pentester", text: "After completing ECSA, I started freelancing as a penetration tester. The practical skills I learned here are directly applicable to real engagements.", rating: 5 },
  { name: "Sneha Reddy", role: "LPT Certified — Security Consultant", text: "The LPT course was intense and thorough. The instructors don't just teach — they mentor you. Best investment in my cybersecurity career.", rating: 5 },
  { name: "Vikram Singh", role: "CEH Certified — SOC Analyst at Wipro", text: "Coming from a non-IT background, I was nervous. But the structured curriculum and supportive faculty made it easy. Now I'm a SOC analyst!", rating: 5 },
  { name: "Ananya Iyer", role: "CHFI Certified — Cyber Forensics Lab", text: "The digital forensics labs were phenomenal. I got hands-on experience with tools I now use daily at work. Thank you, Hacking Nest!", rating: 5 },
];

export default function Testimonials() {
  return (
    <Box id="testimonials" sx={{ py: 12, px: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3 }}>Success Stories</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
            What Our{" "}
            <Box component="span" sx={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Students Say</Box>
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card sx={{ bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.1)", height: "100%", transition: "all 0.3s", "&:hover": { borderColor: "rgba(6,182,212,0.3)" } }}>
                <CardContent sx={{ p: 4 }}>
                  <Rating value={t.rating} readOnly size="small" sx={{ mb: 2, color: "#facc15" }} />
                  <Typography variant="body2" sx={{ color: "grey.300", fontStyle: "italic", mb: 3 }}>&ldquo;{t.text}&rdquo;</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, fontWeight: 700, fontSize: "0.85rem" }}>{t.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: "primary.main" }}>{t.role}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
