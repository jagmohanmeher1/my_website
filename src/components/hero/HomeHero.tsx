import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import ParticleBackground from './ParticleBackground';
import RobotVisual from './RobotVisual';

export default function HomeHero() {
  return (
    <Box component="section" className="heroRoot">
      <ParticleBackground />

      <div className="heroContent">
        <div className="heroGrid">
          <Stack spacing={2.25}>
            <Typography variant="h1" className="heroTitle">
              Robotics Engineer
            </Typography>

            <Typography variant="h6" className="heroSubtitle">
              Building the future, one robot at a time.
            </Typography>

            <Paper elevation={0} sx={{ p: 2.2 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>
                I design and build robotics systems that turn real-world constraints into reliable motion, perception,
                and control. Explore my work and let’s connect.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2.2 }}>
                <Button
                  component={Link}
                  href="/projects"
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.25,
                    background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                    '&:hover': { background: 'linear-gradient(135deg, #00d4ff, #8338ec)' }
                  }}
                >
                  View My Work
                </Button>

                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  sx={{
                    px: 3,
                    py: 1.25,
                    borderColor: 'rgba(0,212,255,0.7)',
                    color: '#EAFBFF',
                    '&:hover': { borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.08)' }
                  }}
                >
                  Get In Touch
                </Button>
              </Stack>
            </Paper>
          </Stack>

          <RobotVisual />
        </div>
      </div>
    </Box>
  );
}

