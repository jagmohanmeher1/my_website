'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const RobotScene = dynamic(() => import('../hero/RobotScene'), { ssr: false });

const STAGES = [
  {
    eyebrow: 'Robotics Engineer & Technical Trainer',
    title: 'Jagmohan\nMeher',
    desc: 'Building intelligent machines that interact with the physical world. From robotic arms to embedded control—turning real constraints into reliable motion.',
    accent: '#00d4ff',
    showMainCtas: true,
  },
  {
    eyebrow: '6+ DOF Precision Arms',
    title: 'Designed\nto Move',
    desc: 'Multi-degree-of-freedom robotic arms for industrial automation and research. Custom kinematics, smooth trajectories, repeatable motion.',
    accent: '#8338ec',
    showMainCtas: false,
  },
  {
    eyebrow: 'Motion Planning & Control',
    title: 'From IK\nto Trajectory',
    desc: 'Inverse kinematics, trajectory optimization, and real-time control loops that give robots the precision and reliability they need.',
    accent: '#00d4ff',
    showMainCtas: false,
  },
  {
    eyebrow: "Open for Collaboration",
    title: "Let's Build\nTogether",
    desc: 'Research, teaching, and engineering projects welcome. If it moves, senses, or learns—let\'s talk.',
    accent: '#ff006e',
    showMainCtas: false,
    showContactCta: true,
  },
];

export default function SinglePageHero() {
  const [stageIdx, setStageIdx] = useState(0);
  const [prevIdx, setPrevIdx]   = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById('hero-section');
    if (!heroEl) return;

    const onScroll = () => {
      const scrollRange = heroEl.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
      const idx = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
      setStageIdx(prev => {
        if (prev !== idx) {
          setPrevIdx(prev);
          setVisible(false);
          setTimeout(() => setVisible(true), 200);
        }
        return idx;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stage = STAGES[stageIdx];

  return (
    <Box
      component="section"
      id="hero-section"
      sx={{
        height: { md: '260vh', xs: 'auto' },
        position: 'relative',
      }}
    >
      {/* Sticky viewport */}
      <Box
        sx={{
          position: { md: 'sticky', xs: 'relative' },
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          pt: { xs: 10, md: 0 },
        }}
      >
        {/* Radial glow blobs */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-15%',
              right: '5%',
              width: 650,
              height: 650,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.13) 0%, transparent 65%)',
              transition: 'opacity 0.6s ease',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              width: 550,
              height: 550,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(131,56,236,0.15) 0%, transparent 65%)',
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 2, md: 4 },
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* ── Left: text ── */}
            <Stack
              spacing={2.5}
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {/* Eyebrow */}
              <Typography
                sx={{
                  color: stage.accent,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '0.82rem',
                  transition: 'color 0.5s ease',
                }}
              >
                {stage.eyebrow}
              </Typography>

              {/* Main headline */}
              <Typography
                component="h1"
                sx={{
                  fontWeight: 950,
                  fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' },
                  lineHeight: 1.0,
                  color: 'rgba(255,255,255,0.96)',
                  whiteSpace: 'pre-line',
                  letterSpacing: '-0.02em',
                }}
              >
                {stage.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.60)',
                  fontSize: { xs: '0.98rem', md: '1.08rem' },
                  lineHeight: 1.78,
                  maxWidth: '40ch',
                }}
              >
                {stage.desc}
              </Typography>

              {/* Stage 0 CTAs */}
              {stage.showMainCtas && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    component="a"
                    href="#about"
                    variant="contained"
                    sx={{
                      px: 3.2,
                      py: 1.3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                      fontWeight: 700,
                      color: '#050810',
                      '&:hover': { opacity: 0.88, background: 'linear-gradient(135deg, #00d4ff, #8338ec)' },
                    }}
                  >
                    About Me
                  </Button>
                  <Button
                    component="a"
                    href="#projects"
                    variant="outlined"
                    sx={{
                      px: 3.2,
                      py: 1.3,
                      borderRadius: 2,
                      borderColor: 'rgba(0,212,255,0.38)',
                      color: 'rgba(255,255,255,0.82)',
                      '&:hover': { borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.07)' },
                    }}
                  >
                    Projects
                  </Button>
                  <Button
                    component="a"
                    href="#contact"
                    variant="text"
                    sx={{
                      px: 2,
                      py: 1.3,
                      color: 'rgba(255,255,255,0.55)',
                      '&:hover': { color: '#00d4ff', backgroundColor: 'transparent' },
                    }}
                  >
                    Contact →
                  </Button>
                </Stack>
              )}

              {/* Stage 3 CTA */}
              {stage.showContactCta && (
                <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    component="a"
                    href="#contact"
                    variant="contained"
                    sx={{
                      px: 3.2,
                      py: 1.3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      fontWeight: 700,
                      color: '#fff',
                      '&:hover': { opacity: 0.88, background: 'linear-gradient(135deg, #ff006e, #8338ec)' },
                    }}
                  >
                    Get in Touch
                  </Button>
                  <Button
                    component="a"
                    href="#projects"
                    variant="outlined"
                    sx={{
                      px: 3.2,
                      py: 1.3,
                      borderRadius: 2,
                      borderColor: 'rgba(255,0,110,0.35)',
                      color: 'rgba(255,255,255,0.75)',
                      '&:hover': { borderColor: '#ff006e', backgroundColor: 'rgba(255,0,110,0.06)' },
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              )}

              {/* Stage dots + scroll hint */}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 0.5 }}>
                <Stack direction="row" spacing={0.75}>
                  {STAGES.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: i === stageIdx ? 22 : 6,
                        height: 6,
                        borderRadius: 3,
                        background: i === stageIdx ? stage.accent : 'rgba(255,255,255,0.18)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </Stack>

                {stageIdx === 0 && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.76rem', letterSpacing: '0.06em' }}>
                    scroll to explore
                  </Typography>
                )}
              </Stack>
            </Stack>

            {/* ── Right: 3D Scene ── */}
            <Box
              sx={{
                height: { xs: '52vw', sm: '45vw', md: '72vh' },
                maxHeight: { xs: 320, sm: 400, md: '72vh' },
                minHeight: { md: 480 },
                position: 'relative',
              }}
            >
              <RobotScene style={{ width: '100%', height: '100%' }} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
