'use client';

import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

const HIGHLIGHTS = [
  { label: 'Robotic Arms',       color: '#2563eb' },
  { label: 'Mechatronics',       color: '#7c3aed' },
  { label: 'Embedded Systems',   color: '#2563eb' },
  { label: 'ROS / ROS2',         color: '#7c3aed' },
  { label: 'Computer Vision',    color: '#0891b2' },
  { label: 'Motion Planning',    color: '#2563eb' },
  { label: 'IoT Automation',     color: '#7c3aed' },
  { label: 'Technical Training', color: '#0891b2' },
];

const TIMELINE = [
  {
    period: '2024 – Present',
    role: 'Robotics Engineer & Technical Trainer',
    detail:
      'Designing multi-DOF robotic arms, teaching robotics & embedded systems, and building end-to-end automation solutions for industry and education.',
    accent: '#2563eb',
  },
  {
    period: '2022 – 2024',
    role: 'Mechatronics Projects',
    detail:
      'Built biped walkers, hexapod robots, and industrial sorting systems. Developed real-time control firmware in C/C++ and Python.',
    accent: '#7c3aed',
  },
  {
    period: '2020 – 2022',
    role: 'Research & Computer Vision',
    detail:
      'rPPG heart rate estimation, CCTV-based smart parking systems, IoT sensor fusion. Published workshop materials and video courses.',
    accent: '#0891b2',
  },
];

export default function AboutSection() {
  return (
    <Box
      component="section"
      id="about"
      className="spSection"
      sx={{ background: '#ffffff' }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    color: '#2563eb',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.78rem',
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
                    color: '#111827',
                  }}
                >
                  Engineer.{' '}
                  <Box component="span" sx={{ color: '#2563eb' }}>Builder.</Box>
                  {' '}Educator.
                </Typography>
              </Box>

              <Typography sx={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.02rem' }}>
                I'm a robotics engineer focused on building reliable systems and turning knowledge
                into practical learning experiences. Whether it's mechatronics, control theory,
                computer vision, or IoT automation — I design solutions that are hands-on and teachable.
              </Typography>

              <Typography sx={{ color: '#6b7280', lineHeight: 1.8, fontSize: '0.97rem' }}>
                Every machine I build starts with a question:{' '}
                <em style={{ color: '#2563eb' }}>
                  "How do we make this move reliably in the real world?"
                </em>{' '}
                That question drives everything from joint design to the lesson plan I use to explain it.
              </Typography>

              {/* Chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 0.5 }}>
                {HIGHLIGHTS.map(h => (
                  <Chip
                    key={h.label}
                    label={h.label}
                    size="small"
                    sx={{
                      background: `${h.color}0f`,
                      border: `1px solid ${h.color}30`,
                      color: h.color,
                      fontWeight: 600,
                      fontSize: '0.76rem',
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* Right: Timeline */}
          <Grid item xs={12} md={7}>
            <Stack>
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
                      background: 'linear-gradient(to bottom, rgba(37,99,235,0.3), rgba(0,0,0,0.04))',
                    },
                  }}
                >
                  <Box sx={{ flexShrink: 0, pt: 0.4 }}>
                    <Box
                      sx={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: item.accent,
                        boxShadow: `0 0 0 3px ${item.accent}20`,
                        mt: 0.3,
                      }}
                    />
                  </Box>
                  <Stack spacing={0.6}>
                    <Typography
                      sx={{
                        color: item.accent,
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.period}
                    </Typography>
                    <Typography sx={{ color: '#111827', fontWeight: 700, fontSize: '1rem' }}>
                      {item.role}
                    </Typography>
                    <Typography sx={{ color: '#6b7280', lineHeight: 1.75, fontSize: '0.92rem' }}>
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
