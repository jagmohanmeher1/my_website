'use client';

import { Box, Container, Stack, Typography } from '@mui/material';

export default function AboutSection() {
  return (
    <Box component="section" id="about" className="spSection">
      <Container maxWidth="lg">
        <Stack spacing={2.25}>
          <Typography
            variant="h2"
            className="spSectionTitle"
            sx={{
              fontSize: { xs: '2.1rem', md: '2.6rem' },
              background: 'linear-gradient(135deg, #00d4ff, #8338ec, #ff006e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            About
          </Typography>

          <Stack spacing={1.4}>
            <Typography sx={{ color: 'rgba(15,23,42,0.78)', lineHeight: 1.75, fontSize: '1.05rem' }}>
              I’m a robotics engineer focused on building reliable systems and turning knowledge into practical
              learning experiences. Whether it’s mechatronics, control, computer vision, or IoT automation, I design
              solutions that are hands-on and teachable.
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.70)', mt: 0.25, lineHeight: 1.75 }}>
              This draft page is structured to grow later into blogs and teaching lessons—while already showcasing your
              projects and the way you teach.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

