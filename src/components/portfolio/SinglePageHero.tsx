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
    accent: '#F97316',
    showMainCtas: true,
  },
  {
    eyebrow: '6+ DOF Precision Arms',
    title: 'Designed\nto Move',
    desc: 'Multi-degree-of-freedom robotic arms for industrial automation and research. Custom kinematics, smooth trajectories, repeatable motion.',
    accent: '#EC4899',
    showMainCtas: false,
  },
  {
    eyebrow: 'Motion Planning & Control',
    title: 'From IK\nto Trajectory',
    desc: 'Inverse kinematics, trajectory optimization, and real-time control loops that give robots the precision they need in the real world.',
    accent: '#F59E0B',
    showMainCtas: false,
  },
  {
    eyebrow: 'Open for Collaboration',
    title: "Let's Build\nTogether",
    desc: "Research, teaching, and engineering projects welcome. If it moves, senses, or learns — let's talk.",
    accent: '#F97316',
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
        {/* Playful blobs */}
        <Box aria-hidden className="blob" sx={{ width: 420, height: 420, top: '-8%', right: '-4%', background: '#FDBA74' }} />
        <Box aria-hidden className="blob" sx={{ width: 360, height: 360, bottom: '-10%', left: '-6%', background: '#F9A8D4' }} />
        <Box aria-hidden className="blob" sx={{ width: 280, height: 280, top: '40%', left: '38%', background: '#FCD34D', opacity: 0.35 }} />

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
              {/* Eyebrow pill */}
              <Box
                sx={{
                  alignSelf: 'flex-start',
                  px: 1.6,
                  py: 0.7,
                  borderRadius: 99,
                  background: `${stage.accent}14`,
                  border: `1px solid ${stage.accent}33`,
                  transition: 'all 0.4s ease',
                }}
              >
                <Typography
                  sx={{
                    color: stage.accent,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontSize: '0.74rem',
                  }}
                >
                  {stage.eyebrow}
                </Typography>
              </Box>

              {/* Headline with gradient */}
              <Typography
                component="h1"
                className="gradientText"
                sx={{
                  fontWeight: 950,
                  fontSize: { xs: '3rem', sm: '3.6rem', md: '4.6rem' },
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  whiteSpace: 'pre-line',
                }}
              >
                {stage.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: '#52525B',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.75,
                  maxWidth: '42ch',
                }}
              >
                {stage.desc}
              </Typography>

              {stage.showMainCtas && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    component="a"
                    href="#robots"
                    variant="contained"
                    sx={{
                      px: 3.4,
                      py: 1.4,
                      borderRadius: 99,
                      fontWeight: 800,
                      fontSize: '1rem',
                      background: 'linear-gradient(120deg, #F97316, #EC4899)',
                      '&:hover': { background: 'linear-gradient(120deg, #EA580C, #DB2777)' },
                    }}
                  >
                    Explore Robots
                  </Button>
                  <Button
                    component="a"
                    href="#projects"
                    variant="outlined"
                    sx={{
                      px: 3.4,
                      py: 1.4,
                      borderRadius: 99,
                      fontWeight: 700,
                      borderColor: 'rgba(24,24,27,0.18)',
                      color: '#18181B',
                      '&:hover': { borderColor: '#F97316', color: '#F97316', backgroundColor: 'rgba(249,115,22,0.05)' },
                    }}
                  >
                    Projects
                  </Button>
                </Stack>
              )}

              {stage.showContactCta && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    component="a"
                    href="#contact"
                    variant="contained"
                    sx={{
                      px: 3.4,
                      py: 1.4,
                      borderRadius: 99,
                      fontWeight: 800,
                      fontSize: '1rem',
                      background: 'linear-gradient(120deg, #F97316, #EC4899)',
                      '&:hover': { background: 'linear-gradient(120deg, #EA580C, #DB2777)' },
                    }}
                  >
                    Get in Touch
                  </Button>
                  <Button
                    component="a"
                    href="#projects"
                    variant="outlined"
                    sx={{
                      px: 3.4,
                      py: 1.4,
                      borderRadius: 99,
                      fontWeight: 700,
                      borderColor: 'rgba(24,24,27,0.18)',
                      color: '#18181B',
                      '&:hover': { borderColor: '#EC4899', color: '#EC4899', backgroundColor: 'rgba(236,72,153,0.05)' },
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
                        width: i === stageIdx ? 24 : 7,
                        height: 7,
                        borderRadius: 99,
                        background: i === stageIdx ? stage.accent : 'rgba(24,24,27,0.14)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </Stack>
                {stageIdx === 0 && (
                  <Typography sx={{ color: '#A1A1AA', fontSize: '0.74rem', letterSpacing: '0.06em' }}>
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
