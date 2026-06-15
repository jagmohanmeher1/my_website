'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const SKILL_GROUPS = [
  {
    category: 'Robotics & Hardware',
    accent: '#F97316',
    bg: 'rgba(249,115,22,0.05)',
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
    accent: '#8B5CF6',
    bg: 'rgba(139,92,246,0.05)',
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
    accent: '#EC4899',
    bg: 'rgba(236,72,153,0.05)',
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
        <Typography sx={{ color: '#3F3F46', fontSize: '0.87rem', fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography sx={{ color: accent, fontSize: '0.8rem', fontWeight: 800 }}>
          {level}%
        </Typography>
      </Stack>
      <Box sx={{ height: 6, borderRadius: 99, background: 'rgba(24,24,27,0.07)', overflow: 'hidden' }}>
        <Box
          className="skillBarFill"
          sx={{
            height: '100%',
            borderRadius: 99,
            background: `linear-gradient(90deg, ${accent}cc, ${accent})`,
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
    <Box component="section" id="skills" className="spSection" ref={ref} sx={{ background: '#ffffff' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={6}>
          <Box>
            <Box
              sx={{
                display: 'inline-block', px: 1.6, py: 0.7, borderRadius: 99, mb: 2,
                background: 'rgba(139,92,246,0.10)',
                border: '1px solid rgba(139,92,246,0.28)',
              }}
            >
              <Typography sx={{ color: '#8B5CF6', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                Expertise
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, fontWeight: 950, color: '#18181B' }}>
              Skills &{' '}
              <Box component="span" sx={{ color: '#8B5CF6' }}>Tools</Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {SKILL_GROUPS.map(group => (
              <Grid item xs={12} md={4} key={group.category}>
                <Box
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    height: '100%',
                    background: group.bg,
                    border: `1px solid ${group.accent}22`,
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                    '&:hover': {
                      boxShadow: `0 14px 40px ${group.accent}20`,
                      borderColor: `${group.accent}44`,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <Stack spacing={2.5}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.98rem',
                        color: group.accent,
                        letterSpacing: '0.02em',
                        pb: 1.5,
                        borderBottom: `2px solid ${group.accent}28`,
                      }}
                    >
                      {group.category}
                    </Typography>
                    <Stack spacing={2.2}>
                      {group.skills.map(skill => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} accent={group.accent} animate={animate} />
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
