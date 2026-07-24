import { Box, Container, Typography } from "@mui/material";
import type { Stat } from "../types";

const stats: Stat[] = [
  { value: "2000+", label: "Students Certified" },
  { value: "95%", label: "Placement Rate" },
  { value: "50+", label: "Corporate Trainings" },
  { value: "10+", label: "Years Experience" },
];

export default function Stats() {
  return (
    <Box sx={{ py: 5, borderTop: "1px solid rgba(6,182,212,0.1)", borderBottom: "1px solid rgba(6,182,212,0.1)", bgcolor: "#0a0a0a" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 4 }}>
          {stats.map((stat) => (
            <Box key={stat.value} sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(90deg, #06b6d4, #2563eb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.500", mt: 1 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
