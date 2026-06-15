'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const ShowcaseCanvas = dynamic(() => import('./ShowcaseCanvas'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A1A1AA',
        fontSize: '0.9rem',
      }}
    >
      Loading 3D model…
    </Box>
  ),
});

const ROBOTS = [
  {
    id: 'humanoid',
    label: 'Humanoid',
    title: 'Bipedal Humanoid',
    desc: 'A two-legged assistant robot with articulated arms and a sensor head — built for human-centric environments and interaction research.',
    specs: ['12 DOF', 'Vision + IMU', 'Balance Control'],
    accent: '#F97316',
  },
  {
    id: 'rover',
    label: 'Rover',
    title: '6-Wheel Rover',
    desc: 'An all-terrain mobile platform with rocker suspension and a panning sensor mast — designed for autonomous navigation and inspection.',
    specs: ['6WD Drivetrain', 'LiDAR Mast', 'Solar Deck'],
    accent: '#F59E0B',
  },
  {
    id: 'quadruped',
    label: 'Quadruped',
    title: 'Quadruped Walker',
    desc: 'A four-legged dynamic robot using a trotting gait — agile over rough terrain where wheels cannot go.',
    specs: ['Trot Gait', '8 Actuators', 'Terrain Adaptive'],
    accent: '#EC4899',
  },
] as const;

type RobotId = (typeof ROBOTS)[number]['id'];

export default function InteractiveRobots() {
  const [active, setActive] = useState<RobotId>('humanoid');
  const current = ROBOTS.find(r => r.id === active)!;

  return (
    <Box component="section" id="robots" className="spSection" sx={{ background: '#FFFBF5' }}>
      {/* Playful blobs */}
      <Box aria-hidden className="blob" sx={{ width: 360, height: 360, top: '-6%', left: '-4%', background: '#FDBA74' }} />
      <Box aria-hidden className="blob" sx={{ width: 320, height: 320, bottom: '-8%', right: '-4%', background: '#F9A8D4' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={5}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
            <Box
              sx={{
                display: 'inline-block',
                px: 1.6,
                py: 0.7,
                borderRadius: 99,
                background: 'rgba(236,72,153,0.10)',
                border: '1px solid rgba(236,72,153,0.28)',
                mb: 2,
              }}
            >
              <Typography
                sx={{ color: '#EC4899', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem' }}
              >
                Interactive 3D Lab
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, fontWeight: 950, color: '#18181B' }}>
              Meet the{' '}
              <Box component="span" className="gradientText">Robots</Box>
            </Typography>
            <Typography sx={{ color: '#52525B', lineHeight: 1.8, fontSize: '1.05rem', mt: 1.5 }}>
              Drag to orbit each model and explore it from any angle. Switch between the
              platforms below — every one is a live 3D model rendered right in your browser.
            </Typography>
          </Box>

          {/* Selector */}
          <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
            {ROBOTS.map(r => {
              const isActive = r.id === active;
              return (
                <Button
                  key={r.id}
                  onClick={() => setActive(r.id)}
                  variant={isActive ? 'contained' : 'outlined'}
                  sx={{
                    px: 3,
                    py: 1.1,
                    borderRadius: 99,
                    fontWeight: isActive ? 800 : 600,
                    background: isActive ? r.accent : 'transparent',
                    color: isActive ? '#ffffff' : '#52525B',
                    borderColor: isActive ? 'transparent' : 'rgba(24,24,27,0.16)',
                    '&:hover': {
                      background: isActive ? r.accent : `${r.accent}12`,
                      borderColor: isActive ? 'transparent' : r.accent,
                      color: isActive ? '#ffffff' : r.accent,
                      opacity: isActive ? 0.92 : 1,
                    },
                  }}
                >
                  {r.label}
                </Button>
              );
            })}
          </Stack>

          {/* Canvas + info */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
              gap: { xs: 3, md: 5 },
              alignItems: 'center',
            }}
          >
            <Box
              className="robotCanvasInteractive"
              sx={{
                height: { xs: 340, sm: 420, md: 480 },
                borderRadius: 5,
                overflow: 'hidden',
                background: `linear-gradient(160deg, #FFFFFF 0%, ${current.accent}14 100%)`,
                border: '1px solid rgba(24,24,27,0.07)',
                boxShadow: '0 20px 56px rgba(24,24,27,0.10)',
                position: 'relative',
                transition: 'background 0.4s ease',
              }}
            >
              <Suspense fallback={null}>
                <ShowcaseCanvas active={active} />
              </Suspense>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: 1.6,
                  py: 0.5,
                  borderRadius: 99,
                  background: 'rgba(24,24,27,0.6)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  pointerEvents: 'none',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ✋ drag to rotate · scroll to zoom
              </Box>
            </Box>

            <Stack spacing={2.5}>
              <Typography variant="h3" sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#18181B' }}>
                {current.title}
              </Typography>
              <Typography sx={{ color: '#52525B', lineHeight: 1.8, fontSize: '1.02rem' }}>
                {current.desc}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {current.specs.map(s => (
                  <Box
                    key={s}
                    sx={{
                      px: 1.8,
                      py: 0.8,
                      borderRadius: 99,
                      background: `${current.accent}12`,
                      border: `1px solid ${current.accent}33`,
                      color: current.accent,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
