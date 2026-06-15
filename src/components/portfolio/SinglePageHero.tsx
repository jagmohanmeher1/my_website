'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const RobotScene = dynamic(() => import('../hero/RobotScene'), { ssr: false });

const STAGES = [
  {
    eyebrow: 'Robotics Engineer & Technical Trainer',
    title: 'Jagmohan\nMeher',
    desc: 'Building intelligent machines that interact with the physical world. From robotic arms to embedded control — turning real constraints into reliable motion.',
    accent: '#2563eb',
    showMainCtas: true,
  },
  {
    eyebrow: '6+ DOF Precision Arms',
    title: 'Designed\nto Move',
    desc: 'Multi-degree-of-freedom robotic arms for industrial automation and research. Custom kinematics, smooth trajectories, repeatable motion.',
    accent: '#7c3aed',
    showMainCtas: false,
  },
  {
    eyebrow: 'Motion Planning & Control',
    title: 'From IK\nto Trajectory',
    desc: 'Inverse kinematics, trajectory optimization, and real-time control loops that give robots the precision they need in the real world.',
    accent: '#2563eb',
    showMainCtas: false,
  },
  {
    eyebrow: 'Open for Collaboration',
    title: "Let's Build\nTogether",
    desc: "Research, teaching, and engineering projects welcome. If it moves, senses, or learns — let's talk.",
    accent: '#7c3aed',
    showMainCtas: false,
    showContactCta: true,
  },
];

export default function SinglePageHero() {
  const [stageIdx, setStageIdx] = useState(0);
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
          setVisible(false);
          setTimeout(() => setVisible(true), 180);
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
      sx={{ height: { md: '260vh', xs: 'auto' }, position: 'relative' }}
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
          background: '#ffffff',
        }}
      >
        {/* Subtle background accent behind the arm area */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            background:
              'radial-gradient(800px 700px at 80% 45%, rgba(37,99,235,0.05) 0%, transparent 65%)',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 2, md: 6 },
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* ── Left: text ── */}
            <Stack
              spacing={3}
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Eyebrow */}
              <Typography
                sx={{
                  color: stage.accent,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  transition: 'color 0.4s ease',
                }}
              >
                {stage.eyebrow}
              </Typography>

              {/* Headline */}
              <Typography
                component="h1"
                sx={{
                  fontWeight: 950,
                  fontSize: { xs: '2.8rem', sm: '3.4rem', md: '4.2rem' },
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  whiteSpace: 'pre-line',
                }}
              >
                {stage.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '1rem', md: '1.08rem' },
                  lineHeight: 1.78,
                  maxWidth: '42ch',
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
                    color="primary"
                    sx={{ px: 3.2, py: 1.3, borderRadius: 2, fontWeight: 700 }}
                  >
                    About Me
                  </Button>
                  <Button
                    component="a"
                    href="#projects"
                    variant="outlined"
                    color="primary"
                    sx={{ px: 3.2, py: 1.3, borderRadius: 2 }}
                  >
                    Projects
                  </Button>
                  <Button
                    component="a"
                    href="#contact"
                    variant="text"
                    sx={{ px: 2, py: 1.3, color: '#6b7280', '&:hover': { color: '#2563eb', backgroundColor: 'transparent' } }}
                  >
                    Contact →
                  </Button>
                </Stack>
              )}

              {/* Stage 3 CTA */}
              {stage.showContactCta && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    component="a"
                    href="#contact"
                    variant="contained"
                    color="secondary"
                    sx={{ px: 3.2, py: 1.3, borderRadius: 2, fontWeight: 700 }}
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
                      borderColor: 'rgba(0,0,0,0.15)',
                      color: '#374151',
                      '&:hover': { borderColor: '#7c3aed', color: '#7c3aed', backgroundColor: 'transparent' },
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              )}

              {/* Progress dots */}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 0.5 }}>
                <Stack direction="row" spacing={0.75}>
                  {STAGES.map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: i === stageIdx ? 22 : 6,
                        height: 6,
                        borderRadius: 3,
                        background: i === stageIdx ? stage.accent : 'rgba(0,0,0,0.14)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </Stack>
                {stageIdx === 0 && (
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.74rem', letterSpacing: '0.06em' }}>
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
