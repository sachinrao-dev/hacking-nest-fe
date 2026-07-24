import { useEffect, useState } from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import ComputerIcon from "@mui/icons-material/Computer";
import WorkIcon from "@mui/icons-material/Work";

const roles = [
  "Certified Ethical Hackers",
  "Penetration Testers",
  "Security Analysts",
  "Forensic Investigators",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex] ?? "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 20% 20%, rgba(6,182,212,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 50%), #000",
      }}
    >
      {/* Grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(6,182,212,0.5) 50px, rgba(6,182,212,0.5) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(6,182,212,0.5) 50px, rgba(6,182,212,0.5) 51px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 900 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Chip
            icon={<VerifiedIcon sx={{ fontSize: 16, color: "#4ade80 !important" }} />}
            label="Admissions Open 2026 — Limited Seats"
            sx={{
              mb: 4,
              bgcolor: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
              color: "primary.main",
              fontWeight: 500,
              fontSize: "0.8rem",
              px: 1,
            }}
          />
        </motion.div>

        <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
          Become a
          <br />
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #06b6d4, #2563eb, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayText}
            <Box component="span" sx={{ animation: "pulse 1s infinite" }}>
              |
            </Box>
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "grey.400", mt: 4, maxWidth: 600, mx: "auto", fontWeight: 400, lineHeight: 1.7 }}
        >
          India&apos;s premier institute for cybersecurity certifications.
          Master ethical hacking, penetration testing, and digital forensics
          with hands-on lab experience.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mt: 5 }}>
          <Button
            href="#courses"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #06b6d4, #2563eb)",
              textTransform: "none",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(90deg, #0891b2, #1d4ed8)",
                boxShadow: "0 8px 30px rgba(6,182,212,0.3)",
              },
            }}
          >
            Explore Courses
          </Button>
          <Button
            href="#contact"
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(6,182,212,0.5)",
              color: "primary.main",
              textTransform: "none",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              fontSize: "1rem",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(6,182,212,0.1)",
              },
            }}
          >
            Talk to Advisor
          </Button>
        </Stack>

        <Stack direction="row" spacing={4} sx={{ justifyContent: "center", mt: 8 }}>
          {[
            { icon: <VerifiedIcon sx={{ fontSize: 20 }} />, text: "EC-Council Certified" },
            { icon: <ComputerIcon sx={{ fontSize: 20 }} />, text: "100% Practical Labs" },
            { icon: <WorkIcon sx={{ fontSize: 20 }} />, text: "Placement Assistance" },
          ].map((item) => (
            <Stack key={item.text} direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box sx={{ color: "primary.main" }}>{item.icon}</Box>
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                {item.text}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </motion.div>
    </Box>
  );
}
