'use client';

import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

const HIGHLIGHTS = [
  { label: 'Robotic Arms',       color: '#00d4ff' },
  { label: 'Mechatronics',       color: '#8338ec' },
  { label: 'Embedded Systems',   color: '#00d4ff' },
  { label: 'ROS / ROS2',         color: '#8338ec' },
  { label: 'Computer Vision',    color: '#ff006e' },
  { label: 'Motion Planning',    color: '#00d4ff' },
  { label: 'IoT Automation',     color: '#8338ec' },
  { label: 'Technical Training', color: '#ff006e' },
];

const TIMELINE = [
  {
    period: '2024 – Present',
    role: 'Robotics Engineer & Technical Trainer',
    detail: 'Designing multi-DOF robotic arms, teaching robotics & embedded systems, building end-to-end automation solutions.',
  },
  {
    period: '2022 – 2024',
    role: 'Mechatronics Projects',
    detail: 'Built biped walkers, hexapod robots, and industrial sorting systems. Developed real-time control firmware in C/C++.',
  },
  {
    period: '2020 – 2022',
    role: 'Research & CV Projects',
    detail: 'rPPG heart rate estimation, CCTV-based parking systems, IoT sensor fusion. Published workshop materials.',
  },
];

export default function AboutSection() {
  return (
    <Box component="section" id="about" className="spSection">
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left column */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    color: '#00d4ff',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    mb: 1,
                  }}
                >
                  About Me
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.2rem', md: '2.8rem' },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Engineer. Builder. Educator.
                </Typography>
              </Box>

              <Typography
                sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '1.02rem' }}
              >
                I'm a robotics engineer focused on building reliable systems that turn knowledge
                into practical learning. Whether it's mechatronics, control theory, computer vision,
                or IoT automation—I design solutions that are hands-on and teachable.
              </Typography>

              <Typography
                sx={{ color: 'rgba(255,255,255,0.50)', lineHeight: 1.8, fontSize: '0.97rem' }}
              >
                Every machine I build starts with a question: <em>"How do we make this move
                reliably in the real world?"</em> That question drives everything from joint
                design to control loops to the lesson plan I use to explain it.
              </Typography>

              {/* Expertise chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 0.5 }}>
                {HIGHLIGHTS.map(h => (
                  <Chip
                    key={h.label}
                    label={h.label}
                    size="small"
                    sx={{
                      background: `${h.color}18`,
                      border: `1px solid ${h.color}38`,
                      color: h.color,
                      fontWeight: 600,
                      fontSize: '0.78rem',
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* Right column: timeline */}
          <Grid item xs={12} md={7}>
            <Stack spacing={0}>
              {TIMELINE.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    pb: 4,
                    position: 'relative',
                    '&:not(:last-child)::before': {
                      content: '""',
                      position: 'absolute',
                      left: 5,
                      top: 14,
                      bottom: 0,
                      width: 1,
                      background: 'linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(131,56,236,0.15))',
                    },
                  }}
                >
                  {/* Timeline dot */}
                  <Box sx={{ flexShrink: 0, pt: 0.5 }}>
                    <Box
                      sx={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: '#00d4ff',
                        boxShadow: '0 0 10px rgba(0,212,255,0.5)',
                        mt: 0.3,
                      }}
                    />
                  </Box>

                  <Stack spacing={0.6}>
                    <Typography
                      sx={{
                        color: '#00d4ff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.period}
                    </Typography>
                    <Typography
                      sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700, fontSize: '1rem' }}
                    >
                      {item.role}
                    </Typography>
                    <Typography
                      sx={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, fontSize: '0.93rem' }}
                    >
                      {item.detail}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
