import { Box, Container, Typography, Grid, Stack, IconButton } from "@mui/material";

const courseLinks = [
  "CEH — Certified Ethical Hacking",
  "CHFI — Forensic Investigator",
  "LPT — Penetration Tester",
  "ECSA — Security Analyst",
];

const quickLinks = ["Home", "Why Choose Us", "Student Reviews", "Contact Us"];

export default function Footer() {
  return (
    <>
      <Box component="footer" sx={{ py: 6, px: 3, borderTop: "1px solid rgba(6,182,212,0.1)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", mb: 2 }}>
                Hacking Nest
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                India&apos;s premier cybersecurity training institute. EC-Council certified courses with placement assistance.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Courses</Typography>
              <Stack spacing={1}>
                {courseLinks.map((c) => (
                  <Typography key={c} variant="body2" component="a" href="#courses" sx={{ color: "grey.500", textDecoration: "none", "&:hover": { color: "primary.main" } }}>{c}</Typography>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Quick Links</Typography>
              <Stack spacing={1}>
                {quickLinks.map((l) => (
                  <Typography key={l} variant="body2" component="a" href={`#${l.toLowerCase().replace(/\s/g, "-")}`} sx={{ color: "grey.500", textDecoration: "none", "&:hover": { color: "primary.main" } }}>{l}</Typography>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Contact</Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: "grey.500" }}>V Floor 44 Tower, Jenny Plaza,</Typography>
                <Typography variant="body2" sx={{ color: "grey.500" }}>No 7, Bharathiar Salai, NIT Trichy,</Typography>
                <Typography variant="body2" sx={{ color: "grey.500" }}>Cantonment, Tiruchirappalli Cantt - 620001</Typography>
                <Typography variant="body2" sx={{ color: "grey.500" }}>info@hackingnest.com</Typography>
                <Typography variant="body2" sx={{ color: "grey.500" }}>+91 89206 70367</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <IconButton href="https://wa.me/918920670367" target="_blank" size="small" sx={{ bgcolor: "rgba(34,197,94,0.2)", color: "#22c55e", "&:hover": { bgcolor: "rgba(34,197,94,0.3)" } }}>WA</IconButton>
                <IconButton size="small" sx={{ bgcolor: "rgba(37,99,235,0.2)", color: "#2563eb", "&:hover": { bgcolor: "rgba(37,99,235,0.3)" } }}>YT</IconButton>
                <IconButton size="small" sx={{ bgcolor: "rgba(139,92,246,0.2)", color: "#8b5cf6", "&:hover": { bgcolor: "rgba(139,92,246,0.3)" } }}>IG</IconButton>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid rgba(6,182,212,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
            <Typography variant="caption" sx={{ color: "grey.600" }}>&copy; {new Date().getFullYear()} Hacking Nest. All rights reserved.</Typography>
            <Typography variant="caption" sx={{ color: "grey.600" }}>EC-Council Authorized Training Partner</Typography>
          </Box>
        </Container>
      </Box>

      <IconButton
        href="https://wa.me/918920670367"
        target="_blank"
        sx={{
          position: "fixed", bottom: 20, right: 20, bgcolor: "#22c55e", color: "#fff",
          width: 56, height: 56, borderRadius: "50%", boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
          "&:hover": { bgcolor: "#16a34a", transform: "scale(1.1)" }, transition: "all 0.2s",
          fontSize: "0.75rem", fontWeight: 700,
        }}
      >
        💬
      </IconButton>
    </>
  );
}
