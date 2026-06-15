'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

interface Skill {
  name: string;
  level: number;
  accent: string;
}

const SKILL_GROUPS: Array<{ category: string; accent: string; skills: Skill[] }> = [
  {
    category: 'Robotics & Hardware',
    accent: '#00d4ff',
    skills: [
      { name: 'Robotic Arm Design',  level: 95, accent: '#00d4ff' },
      { name: 'Kinematics & Control',level: 90, accent: '#00d4ff' },
      { name: 'Embedded Systems',    level: 88, accent: '#00d4ff' },
      { name: 'ROS / ROS2',          level: 80, accent: '#00d4ff' },
      { name: 'Sensors & Actuators', level: 85, accent: '#00d4ff' },
    ],
  },
  {
    category: 'Software & Algorithms',
    accent: '#8338ec',
    skills: [
      { name: 'Python',              level: 92, accent: '#8338ec' },
      { name: 'C / C++',             level: 85, accent: '#8338ec' },
      { name: 'Motion Planning',     level: 88, accent: '#8338ec' },
      { name: 'Computer Vision',     level: 78, accent: '#8338ec' },
      { name: 'MATLAB / Simulink',   level: 74, accent: '#8338ec' },
    ],
  },
  {
    category: 'Teaching & Communication',
    accent: '#ff006e',
    skills: [
      { name: 'Technical Training',  level: 95, accent: '#ff006e' },
      { name: 'Workshop Design',     level: 90, accent: '#ff006e' },
      { name: 'Documentation',       level: 85, accent: '#ff006e' },
      { name: 'Project Management',  level: 80, accent: '#ff006e' },
    ],
  },
];

function SkillBar({ name, level, accent, animate }: Skill & { animate: boolean }) {
  return (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.88rem', fontWeight: 500 }}>
          {name}
        </Typography>
        <Typography sx={{ color: accent, fontSize: '0.82rem', fontWeight: 700 }}>
          {level}%
        </Typography>
      </Stack>
      <Box
        sx={{
          height: 5,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <Box
          className="skillBarFill"
          sx={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${accent}cc, ${accent})`,
            boxShadow: `0 0 8px ${accent}66`,
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
    <Box component="section" id="skills" className="spSection" ref={ref}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box>
            <Typography
              sx={{
                color: '#8338ec',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
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
                background: 'linear-gradient(135deg, #8338ec, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Skills & Tools
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {SKILL_GROUPS.map(group => (
              <Grid item xs={12} md={4} key={group.category}>
                <Box
                  className="spGlass"
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    border: `1px solid ${group.accent}22`,
                    '&:hover': { borderColor: `${group.accent}44` },
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <Stack spacing={2.5}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: group.accent,
                        letterSpacing: '0.04em',
                        pb: 1,
                        borderBottom: `1px solid ${group.accent}22`,
                      }}
                    >
                      {group.category}
                    </Typography>

                    <Stack spacing={2}>
                      {group.skills.map(skill => (
                        <SkillBar key={skill.name} {...skill} animate={animate} />
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
