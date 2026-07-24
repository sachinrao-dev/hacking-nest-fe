import { useState } from "react";
import { Box, Container, Typography, Card, CardContent, Chip, Button, Collapse } from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShieldIcon from "@mui/icons-material/Shield";
import SearchIcon from "@mui/icons-material/Search";
import BugReportIcon from "@mui/icons-material/BugReport";
import SecurityIcon from "@mui/icons-material/Security";
import type { Course } from "../types";

const courses: Course[] = [
  {
    id: "ceh", title: "Certified Ethical Hacking", abbreviation: "CEH",
    tagline: "Think Like a Hacker, Defend Like an Expert",
    description: "The world's most recognized ethical hacking certification. Learn to think and act like a hacker with 20 modules covering 340+ attack technologies.",
    icon: <ShieldIcon />, topics: ["Footprinting & Reconnaissance", "Scanning Networks", "Enumeration", "Vulnerability Analysis", "System Hacking", "Malware Threats", "Sniffing & Social Engineering", "DoS & Session Hijacking"],
    duration: "5 Days / 40 Hours", level: "Beginner to Advanced", color: "#06b6d4",
  },
  {
    id: "chfi", title: "Computer Hacking Forensic Investigator", abbreviation: "CHFI",
    tagline: "Uncover Evidence, Track Attackers",
    description: "Master the art of detecting, investigating, and presenting cybercrime evidence. Essential for law enforcement and corporate security teams.",
    icon: <SearchIcon />, topics: ["Digital Evidence Collection", "Disk Forensics", "Network Forensics", "Web Forensics", "Database Forensics", "Mobile Forensics", "Cloud Forensics", "Report Writing & Expert Testimony"],
    duration: "5 Days / 40 Hours", level: "Intermediate", color: "#8b5cf6",
  },
  {
    id: "lpt", title: "Licensed Penetration Tester", abbreviation: "LPT",
    tagline: "The Ultimate Penetration Testing Credential",
    description: "EC-Council's most prestigious penetration testing certification. Prove your ability to perform advanced penetration tests across enterprise networks.",
    icon: <BugReportIcon />, topics: ["Advanced Scanning & Enumeration", "Exploitation Techniques", "Post Exploitation", "Advanced Social Engineering", "Web App Penetration Testing", "Cloud Penetration Testing", "IoT & OT Penetration Testing", "Report Writing & Methodology"],
    duration: "5 Days / 40 Hours", level: "Advanced", color: "#ef4444",
  },
  {
    id: "ecsa", title: "EC-Council Certified Security Analyst", abbreviation: "ECSA",
    tagline: "Bridge the Gap Between Theory and Practice",
    description: "A hands-on penetration testing course that covers realistic attack vectors. Practice on real-world networks in EC-Council's Cyber Range.",
    icon: <SecurityIcon />, topics: ["Modular Penetration Testing", "Network Penetration Testing", "Web Application Pen Testing", "Social Engineering Pen Testing", "Cloud Penetration Testing", "IoT Penetration Testing", "OTT Penetration Testing", "Advanced Testing Methodologies"],
    duration: "5 Days / 40 Hours", level: "Intermediate to Advanced", color: "#22c55e",
  },
];

export default function Courses() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Box id="courses" sx={{ py: 12, px: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3 }}>
            Our Programs
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
            Industry-Recognized{" "}
            <Box component="span" sx={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Certifications
            </Box>
          </Typography>
          <Typography sx={{ color: "grey.400", mt: 2, maxWidth: 600, mx: "auto" }}>
            EC-Council certified courses designed to transform you into a cybersecurity professional
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
          {courses.map((course) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card sx={{ bgcolor: "#18181b", border: expanded === course.id ? `1px solid ${course.color}40` : "1px solid rgba(6,182,212,0.1)", height: "100%", transition: "all 0.3s" }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: `${course.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: course.color }}>
                      {course.icon}
                    </Box>
                    <Box>
                      <Typography variant="overline" sx={{ color: course.color, fontWeight: 700, fontSize: "0.7rem" }}>{course.abbreviation}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{course.title}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: course.color, fontStyle: "italic", mb: 1 }}>&ldquo;{course.tagline}&rdquo;</Typography>
                  <Typography variant="body2" sx={{ color: "grey.400", mb: 2 }}>{course.description}</Typography>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip label={`⏱ ${course.duration}`} size="small" sx={{ bgcolor: "#27272a", color: "grey.400" }} />
                    <Chip label={`📊 ${course.level}`} size="small" sx={{ bgcolor: "#27272a", color: "grey.400" }} />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Button size="small" endIcon={<ExpandMoreIcon sx={{ transform: expanded === course.id ? "rotate(180deg)" : "none", transition: "0.3s" }} />} onClick={() => setExpanded(expanded === course.id ? null : course.id)} sx={{ color: "primary.main", textTransform: "none" }}>
                      {expanded === course.id ? "Hide Topics" : "View Topics"}
                    </Button>
                    <Button href="#contact" variant="contained" size="small" sx={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`, textTransform: "none", fontWeight: 700, borderRadius: "50px", px: 3 }}>
                      Enroll Now
                    </Button>
                  </Box>

                  <Collapse in={expanded === course.id}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, mt: 3, pt: 2, borderTop: "1px solid rgba(6,182,212,0.1)" }}>
                      {course.topics.map((topic) => (
                        <Box key={topic} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: course.color, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: "grey.300", fontSize: "0.8rem" }}>{topic}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
