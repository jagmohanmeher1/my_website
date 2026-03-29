import Image from 'next/image';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { assetPrefix } from '../../lib/basePath';

export default function SinglePageHero() {
  return (
    <Box component="section" sx={{ pt: 10, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="spGradientBorder" sx={{ borderRadius: 3, p: 1 }}>
              <Box
                className="spGlass"
                sx={{
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 20px 70px rgba(0, 212, 255, 0.08)'
                }}
              >
                <Image
                  src={`${assetPrefix}/portfolio/cover.jpg`}
                  alt="Jagmohan Meher portfolio cover photo"
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2.25}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 950,
                  lineHeight: 1.05,
                  background: 'linear-gradient(135deg, #00d4ff, #8338ec, #ff006e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Jagmohan Meher
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(15,23,42,0.78)',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.7
                }}
              >
                Robotics Engineer and Technical Trainer. I build and teach robotics systems that turn real-world
                constraints into reliable motion, perception, and control.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
                <Button
                  component="a"
                  href="#about"
                  variant="contained"
                  sx={{
                    px: 3.2,
                    py: 1.2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                    '&:hover': { background: 'linear-gradient(135deg, #00d4ff, #8338ec)' }
                  }}
                >
                  About
                </Button>
                <Button
                  component="a"
                  href="#projects"
                  variant="outlined"
                  sx={{
                    px: 3.2,
                    py: 1.2,
                    borderRadius: 2,
                    borderColor: 'rgba(29,143,232,0.55)',
                    color: 'rgba(15,23,42,0.88)',
                    '&:hover': { borderColor: '#1D8FE8', backgroundColor: 'rgba(29,143,232,0.10)' }
                  }}
                >
                  Projects
                </Button>
                <Button
                  component="a"
                  href="#contact"
                  variant="text"
                  sx={{
                    px: 1.8,
                    py: 1.2,
                    borderRadius: 2,
                    color: 'rgba(15,23,42,0.86)',
                    '&:hover': { backgroundColor: 'rgba(15,23,42,0.04)' }
                  }}
                >
                  Contact
                </Button>
              </Stack>

              <Box
                sx={{
                  mt: 1.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                <Typography sx={{ color: 'rgba(15,23,42,0.72)' }}>Highlights:</Typography>
                <Typography
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: 2,
                    border: '1px solid rgba(15,23,42,0.10)',
                    background: 'linear-gradient(135deg, rgba(29,143,232,0.16), rgba(139,92,246,0.12))'
                  }}
                >
                  Robotics + Software
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: 2,
                    border: '1px solid rgba(15,23,42,0.10)',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.16), rgba(255,0,110,0.10))'
                  }}
                >
                  Training & Teaching
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: 2,
                    border: '1px solid rgba(15,23,42,0.10)',
                    background: 'linear-gradient(135deg, rgba(255,0,110,0.10), rgba(29,143,232,0.10))'
                  }}
                >
                  Mechatronics & IoT
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

