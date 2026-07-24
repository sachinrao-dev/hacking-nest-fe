import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";

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
    <AppBar
      position="fixed"
      sx={{
        background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 1px 0 rgba(6,182,212,0.1)" : "none",
        transition: "all 0.3s",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShieldIcon sx={{ color: "primary.main", fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hacking Nest
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {links.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                sx={{
                  color: "grey.300",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  "&:hover": { color: "primary.main" },
                  display: { xs: "none", md: "block" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              href="#contact"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #06b6d4, #2563eb)",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                borderRadius: "50px",
                "&:hover": {
                  background: "linear-gradient(90deg, #0891b2, #1d4ed8)",
                },
              }}
            >
              Enroll Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
