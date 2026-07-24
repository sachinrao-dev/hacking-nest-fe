import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  { icon: "🖥", title: "Hands-On Lab Environment", desc: "Practice on real-world scenarios in our dedicated cyber range with 200+ lab exercises." },
  { icon: "👨‍🏫", title: "Expert Instructors", desc: "Learn from industry professionals with 10+ years of cybersecurity experience." },
  { icon: "📜", title: "EC-Council Certified", desc: "Official EC-Council training partner with globally recognized certifications." },
  { icon: "💼", title: "Placement Assistance", desc: "Resume building, mock interviews, and direct referrals to top cybersecurity firms." },
  { icon: "🌐", title: "Flexible Batches", desc: "Weekday & weekend batches. Online and offline modes available." },
  { icon: "🔄", title: "Lifetime Access", desc: "Get lifetime access to course materials, lab environments, and future updates." },
];

export default function WhyUs() {
  return (
    <Box id="why-us" sx={{ py: 12, px: 3, bgcolor: "#0a0a0a" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3 }}>Why Hacking Nest</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
            Why Students{" "}
            <Box component="span" sx={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Choose Us</Box>
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card sx={{ bgcolor: "#18181b", border: "1px solid rgba(6,182,212,0.1)", height: "100%", transition: "all 0.3s", "&:hover": { borderColor: "rgba(6,182,212,0.3)", transform: "translateY(-4px)" } }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>{f.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
