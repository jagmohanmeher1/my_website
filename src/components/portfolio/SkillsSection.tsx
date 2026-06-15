'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const SKILL_GROUPS = [
  {
    category: 'Robotics & Hardware',
    accent: '#2563eb',
    bg: 'rgba(37,99,235,0.04)',
    skills: [
      { name: 'Robotic Arm Design',   level: 95 },
      { name: 'Kinematics & Control', level: 90 },
      { name: 'Embedded Systems',     level: 88 },
      { name: 'ROS / ROS2',           level: 80 },
      { name: 'Sensors & Actuators',  level: 85 },
    ],
  },
  {
    category: 'Software & Algorithms',
    accent: '#7c3aed',
    bg: 'rgba(124,58,237,0.04)',
    skills: [
      { name: 'Python',             level: 92 },
      { name: 'C / C++',            level: 85 },
      { name: 'Motion Planning',    level: 88 },
      { name: 'Computer Vision',    level: 78 },
      { name: 'MATLAB / Simulink',  level: 74 },
    ],
  },
  {
    category: 'Teaching & Communication',
    accent: '#0891b2',
    bg: 'rgba(8,145,178,0.04)',
    skills: [
      { name: 'Technical Training', level: 95 },
      { name: 'Workshop Design',    level: 90 },
      { name: 'Documentation',      level: 85 },
      { name: 'Project Management', level: 80 },
    ],
  },
];

function SkillBar({ name, level, accent, animate }: { name: string; level: number; accent: string; animate: boolean }) {
  return (
    <Stack spacing={0.6}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography sx={{ color: '#374151', fontSize: '0.87rem', fontWeight: 500 }}>
          {name}
        </Typography>
        <Typography sx={{ color: accent, fontSize: '0.8rem', fontWeight: 700 }}>
          {level}%
        </Typography>
      </Stack>
      <Box
        sx={{
          height: 5,
          borderRadius: 3,
          background: 'rgba(0,0,0,0.07)',
          overflow: 'hidden',
        }}
      >
        <Box
          className="skillBarFill"
          sx={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${accent}aa, ${accent})`,
            width: animate ? `${level}%` : '0%',
          }}
        />
      </Box>
    </Stack>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      id="skills"
      className="spSection"
      ref={ref}
      sx={{ background: '#f9fafb' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box>
            <Typography
              sx={{
                color: '#7c3aed',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.78rem',
                mb: 1,
              }}
            >
              Expertise
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                fontWeight: 900,
                color: '#111827',
              }}
            >
              Skills &{' '}
              <Box component="span" sx={{ color: '#7c3aed' }}>Tools</Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {SKILL_GROUPS.map(group => (
              <Grid item xs={12} md={4} key={group.category}>
                <Box
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    background: group.bg,
                    border: `1px solid ${group.accent}18`,
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                    '&:hover': {
                      boxShadow: `0 8px 32px ${group.accent}15`,
                      borderColor: `${group.accent}35`,
                    },
                  }}
                >
                  <Stack spacing={2.5}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: group.accent,
                        letterSpacing: '0.02em',
                        pb: 1.5,
                        borderBottom: `2px solid ${group.accent}20`,
                      }}
                    >
                      {group.category}
                    </Typography>
                    <Stack spacing={2.2}>
                      {group.skills.map(skill => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          accent={group.accent}
                          animate={animate}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
