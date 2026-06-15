'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

// Load the heavy 3D canvas only on the client
const ShowcaseCanvas = dynamic(() => import('./ShowcaseCanvas'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A8A096',
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
  },
  {
    id: 'rover',
    label: 'Rover',
    title: '6-Wheel Rover',
    desc: 'An all-terrain mobile platform with rocker suspension and a panning sensor mast — designed for autonomous navigation and inspection.',
    specs: ['6WD Drivetrain', 'LiDAR Mast', 'Solar Deck'],
  },
  {
    id: 'quadruped',
    label: 'Quadruped',
    title: 'Quadruped Walker',
    desc: 'A four-legged dynamic robot using a trotting gait — agile over rough terrain where wheels cannot go.',
    specs: ['Trot Gait', '8 Actuators', 'Terrain Adaptive'],
  },
] as const;

type RobotId = (typeof ROBOTS)[number]['id'];

export default function InteractiveRobots() {
  const [active, setActive] = useState<RobotId>('humanoid');
  const current = ROBOTS.find(r => r.id === active)!;

  return (
    <Box
      component="section"
      id="robots"
      className="spSection"
      sx={{ background: '#F6F1E7' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={5}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
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
              Interactive 3D Lab
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 900, color: '#2B2620' }}
            >
              Meet the{' '}
              <Box component="span" sx={{ color: '#A67C52' }}>Robots</Box>
            </Typography>
            <Typography sx={{ color: '#6B6259', lineHeight: 1.8, fontSize: '1rem', mt: 1.5 }}>
              Drag to orbit each model and explore it from any angle. Switch between the
              platforms below — every one is a live 3D model rendered in your browser.
            </Typography>
          </Box>

          {/* Selector buttons */}
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
                    borderRadius: 3,
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? '#A67C52' : 'transparent',
                    color: isActive ? '#ffffff' : '#6B6259',
                    borderColor: isActive ? 'transparent' : 'rgba(43,38,32,0.15)',
                    '&:hover': {
                      background: isActive ? '#876140' : 'rgba(166,124,82,0.06)',
                      borderColor: isActive ? 'transparent' : '#A67C52',
                      color: isActive ? '#ffffff' : '#A67C52',
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
            {/* 3D viewer */}
            <Box
              className="robotCanvasInteractive"
              sx={{
                height: { xs: 340, sm: 420, md: 480 },
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(160deg, #FFFFFF 0%, #F1E9DA 100%)',
                border: '1px solid rgba(43,38,32,0.08)',
                boxShadow: '0 16px 48px rgba(43,38,32,0.08)',
                position: 'relative',
              }}
            >
              <Suspense fallback={null}>
                <ShowcaseCanvas active={active} />
              </Suspense>
              {/* Drag hint */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: 1.6,
                  py: 0.5,
                  borderRadius: 99,
                  background: 'rgba(43,38,32,0.55)',
                  color: '#F6F1E7',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  pointerEvents: 'none',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ✋ drag to rotate · scroll to zoom
              </Box>
            </Box>

            {/* Info panel */}
            <Stack spacing={2.5}>
              <Typography variant="h3" sx={{ fontSize: '1.7rem', fontWeight: 800, color: '#2B2620' }}>
                {current.title}
              </Typography>
              <Typography sx={{ color: '#6B6259', lineHeight: 1.8, fontSize: '1rem' }}>
                {current.desc}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {current.specs.map(s => (
                  <Box
                    key={s}
                    sx={{
                      px: 1.6,
                      py: 0.7,
                      borderRadius: 2,
                      background: '#ffffff',
                      border: '1px solid rgba(166,124,82,0.25)',
                      color: '#876140',
                      fontSize: '0.82rem',
                      fontWeight: 600,
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
