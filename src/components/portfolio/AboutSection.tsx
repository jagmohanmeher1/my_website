'use client';

import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

const HIGHLIGHTS = [
  { label: 'Robotic Arms',       color: '#F97316' },
  { label: 'Mechatronics',       color: '#EC4899' },
  { label: 'Embedded Systems',   color: '#8B5CF6' },
  { label: 'ROS / ROS2',         color: '#F59E0B' },
  { label: 'Computer Vision',    color: '#06B6D4' },
  { label: 'Motion Planning',    color: '#F97316' },
  { label: 'IoT Automation',     color: '#EC4899' },
  { label: 'Technical Training', color: '#8B5CF6' },
];

const TIMELINE = [
  {
    period: '2024 – Present',
    role: 'Robotics Engineer & Technical Trainer',
    detail:
      'Designing multi-DOF robotic arms, teaching robotics & embedded systems, and building end-to-end automation solutions for industry and education.',
    accent: '#F97316',
  },
  {
    period: '2022 – 2024',
    role: 'Mechatronics Projects',
    detail:
      'Built biped walkers, hexapod robots, and industrial sorting systems. Developed real-time control firmware in C/C++ and Python.',
    accent: '#EC4899',
  },
  {
    period: '2020 – 2022',
    role: 'Research & Computer Vision',
    detail:
      'rPPG heart rate estimation, CCTV-based smart parking systems, IoT sensor fusion. Published workshop materials and video courses.',
    accent: '#8B5CF6',
  },
];

export default function AboutSection() {
  return (
    <Box component="section" id="about" className="spSection" sx={{ background: '#ffffff' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.6, py: 0.7, borderRadius: 99, mb: 2,
                    background: 'rgba(249,115,22,0.10)',
                    border: '1px solid rgba(249,115,22,0.28)',
                  }}
                >
                  <Typography sx={{ color: '#F97316', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                    About Me
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, fontWeight: 950, lineHeight: 1.05, color: '#18181B' }}>
                  Engineer.{' '}
                  <Box component="span" className="gradientText">Builder.</Box>
                  {' '}Educator.
                </Typography>
              </Box>

              <Typography sx={{ color: '#52525B', lineHeight: 1.8, fontSize: '1.05rem' }}>
                I'm a robotics engineer focused on building reliable systems and turning knowledge
                into practical learning experiences. Whether it's mechatronics, control theory,
                computer vision, or IoT automation — I design solutions that are hands-on and teachable.
              </Typography>

              <Typography sx={{ color: '#71717A', lineHeight: 1.8, fontSize: '0.97rem' }}>
                Every machine I build starts with a question:{' '}
                <em style={{ color: '#F97316', fontWeight: 600 }}>
                  "How do we make this move reliably in the real world?"
                </em>{' '}
                That question drives everything from joint design to the lesson plan I use to explain it.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 0.5 }}>
                {HIGHLIGHTS.map(h => (
                  <Chip
                    key={h.label}
                    label={h.label}
                    size="small"
                    sx={{
                      background: `${h.color}14`,
                      border: `1px solid ${h.color}38`,
                      color: h.color,
                      fontWeight: 700,
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
                      left: 6,
                      top: 16,
                      bottom: 0,
                      width: 2,
                      background: `linear-gradient(to bottom, ${item.accent}55, rgba(24,24,27,0.04))`,
                    },
                  }}
                >
                  <Box sx={{ flexShrink: 0, pt: 0.4 }}>
                    <Box
                      sx={{
                        width: 14, height: 14, borderRadius: '50%',
                        background: item.accent,
                        boxShadow: `0 0 0 4px ${item.accent}22`,
                        mt: 0.3,
                      }}
                    />
                  </Box>
                  <Stack spacing={0.6}>
                    <Typography sx={{ color: item.accent, fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {item.period}
                    </Typography>
                    <Typography sx={{ color: '#18181B', fontWeight: 800, fontSize: '1.05rem' }}>
                      {item.role}
                    </Typography>
                    <Typography sx={{ color: '#71717A', lineHeight: 1.75, fontSize: '0.92rem' }}>
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
