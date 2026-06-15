'use client';

import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

const HIGHLIGHTS = [
  { label: 'Robotic Arms',       color: '#A67C52' },
  { label: 'Mechatronics',       color: '#7C6F5F' },
  { label: 'Embedded Systems',   color: '#A67C52' },
  { label: 'ROS / ROS2',         color: '#7C6F5F' },
  { label: 'Computer Vision',    color: '#876140' },
  { label: 'Motion Planning',    color: '#A67C52' },
  { label: 'IoT Automation',     color: '#7C6F5F' },
  { label: 'Technical Training', color: '#876140' },
];

const TIMELINE = [
  {
    period: '2024 – Present',
    role: 'Robotics Engineer & Technical Trainer',
    detail:
      'Designing multi-DOF robotic arms, teaching robotics & embedded systems, and building end-to-end automation solutions for industry and education.',
    accent: '#A67C52',
  },
  {
    period: '2022 – 2024',
    role: 'Mechatronics Projects',
    detail:
      'Built biped walkers, hexapod robots, and industrial sorting systems. Developed real-time control firmware in C/C++ and Python.',
    accent: '#7C6F5F',
  },
  {
    period: '2020 – 2022',
    role: 'Research & Computer Vision',
    detail:
      'rPPG heart rate estimation, CCTV-based smart parking systems, IoT sensor fusion. Published workshop materials and video courses.',
    accent: '#876140',
  },
];

export default function AboutSection() {
  return (
    <Box component="section" id="about" className="spSection" sx={{ background: '#ffffff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    color: '#A67C52',
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
                  sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 900, lineHeight: 1.1, color: '#2B2620' }}
                >
                  Engineer.{' '}
                  <Box component="span" sx={{ color: '#A67C52' }}>Builder.</Box>
                  {' '}Educator.
                </Typography>
              </Box>

              <Typography sx={{ color: '#6B6259', lineHeight: 1.8, fontSize: '1.02rem' }}>
                I'm a robotics engineer focused on building reliable systems and turning knowledge
                into practical learning experiences. Whether it's mechatronics, control theory,
                computer vision, or IoT automation — I design solutions that are hands-on and teachable.
              </Typography>

              <Typography sx={{ color: '#8A8178', lineHeight: 1.8, fontSize: '0.97rem' }}>
                Every machine I build starts with a question:{' '}
                <em style={{ color: '#A67C52' }}>
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
                      background: `${h.color}12`,
                      border: `1px solid ${h.color}33`,
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
                      background: 'linear-gradient(to bottom, rgba(166,124,82,0.35), rgba(43,38,32,0.05))',
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
                        boxShadow: `0 0 0 3px ${item.accent}22`,
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
                    <Typography sx={{ color: '#2B2620', fontWeight: 700, fontSize: '1rem' }}>
                      {item.role}
                    </Typography>
                    <Typography sx={{ color: '#8A8178', lineHeight: 1.75, fontSize: '0.92rem' }}>
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
