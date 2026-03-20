'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { useMemo, useState } from 'react';
import { projects, type Project, type ProjectCategory } from '../../lib/portfolio/projects';
import { videos } from '../../lib/portfolio/videos';

const categories: Array<ProjectCategory | 'All'> = ['All', 'Mechatronics', 'IoT', 'Research'];

function categoryChipColor(category: ProjectCategory) {
  if (category === 'Mechatronics') return { bg: 'rgba(29,143,232,0.14)', fg: '#0F172A' };
  if (category === 'IoT') return { bg: 'rgba(139,92,246,0.14)', fg: '#0F172A' };
  return { bg: 'rgba(255,0,110,0.12)', fg: '#0F172A' };
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Box component="section" id="projects" className="spSection">
      <Container maxWidth="lg">
        <Stack spacing={3.5}>
          <Stack spacing={0.75}>
            <Typography
              variant="h2"
              className="spSectionTitle"
              sx={{
                fontSize: { xs: '2.1rem', md: '2.6rem' },
                background: 'linear-gradient(135deg, #00d4ff, #8338ec, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Projects
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.76)', lineHeight: 1.7 }}>
              Selected robotics, mechatronics, IoT automation, and research work from your PDF.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {categories.map((c) => {
              const isActive = c === activeCategory;
              return (
                <Button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  variant={isActive ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(0,212,255,0.95), rgba(131,56,236,0.95))'
                      : 'transparent',
                    borderColor: isActive ? 'transparent' : 'rgba(15,23,42,0.12)',
                    '&:hover': {
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0,212,255,0.95), rgba(131,56,236,0.95))'
                        : 'rgba(15,23,42,0.04)'
                    }
                  }}
                >
                  {c}
                </Button>
              );
            })}
          </Stack>

          <Grid container spacing={2.2}>
            {filtered.map((p) => {
              const { bg, fg } = categoryChipColor(p.category);
              return (
                <Grid item xs={12} sm={6} md={4} key={p.slug}>
                  <Card
                    elevation={0}
                    className="spGlass"
                    sx={{
                      borderRadius: 2.5,
                      border: '1px solid rgba(15,23,42,0.10)',
                      height: '100%',
                      transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        borderColor: 'rgba(0,212,255,0.55)',
                        boxShadow: '0 22px 70px rgba(29, 143, 232, 0.12)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.2 }}>
                      <Stack spacing={1.2}>
                        <Chip
                          label={p.category}
                          sx={{
                            backgroundColor: bg,
                            color: fg,
                            borderRadius: 1.5,
                            fontWeight: 700,
                            width: 'fit-content'
                          }}
                        />
                        <Typography sx={{ fontWeight: 950, fontSize: '1.05rem', lineHeight: 1.25 }}>{p.title}</Typography>
                        <Typography sx={{ color: 'rgba(15,23,42,0.72)', lineHeight: 1.65, minHeight: 56 }}>
                          {p.summary}
                        </Typography>
                        <Box>
                          <Button
                            onClick={() => setOpenProject(p)}
                            variant="text"
                            sx={{
                              p: 0,
                              mt: 0.6,
                              color: 'rgba(15,23,42,0.78)',
                              '&:hover': { backgroundColor: 'transparent', color: '#1D8FE8' }
                            }}
                          >
                            View details
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Dialog open={!!openProject} onClose={() => setOpenProject(null)} maxWidth="md" fullWidth>
            {openProject ? (
              <>
                <DialogTitle sx={{ fontWeight: 950 }}>{openProject.title}</DialogTitle>
                <DialogContent>
                  <Stack spacing={1.5}>
                    <Chip
                      label={openProject.category}
                      sx={{ width: 'fit-content', borderRadius: 1.5 }}
                    />
                    <Typography sx={{ color: 'rgba(15,23,42,0.76)', lineHeight: 1.7 }}>
                      {openProject.summary}
                    </Typography>
                    <Stack spacing={0.75} sx={{ pl: 1.2 }}>
                      {openProject.highlights.map((h) => (
                        <Typography key={h} component="div" sx={{ color: 'rgba(15,23,42,0.78)' }}>
                          - {h}
                        </Typography>
                      ))}
                    </Stack>
                    {openProject.links?.length ? (
                      <Stack direction="row" spacing={1.2} flexWrap="wrap" sx={{ pt: 1 }}>
                        {openProject.links.map((l) => (
                          <Button
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                              '&:hover': { background: 'linear-gradient(135deg, #00d4ff, #8338ec)' }
                            }}
                          >
                            {l.label}
                          </Button>
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
                </DialogContent>
              </>
            ) : null}
          </Dialog>

          <Box className="spGlass" sx={{ borderRadius: 2.5, p: 2.4, border: '1px solid rgba(15,23,42,0.10)' }}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontWeight: 950, fontSize: '1.25rem' }}>Videos (Vertical Scroll)</Typography>
              <Typography sx={{ color: 'rgba(15,23,42,0.72)', lineHeight: 1.7 }}>
                A quick scrollable list of your YouTube resources from the portfolio PDF + links file.
              </Typography>

              <Box
                sx={{
                  height: 440,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: '10px' },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(29,143,232,0.22)',
                    borderRadius: 999
                  }
                }}
              >
                <Stack spacing={2}>
                  {videos.map((v) => (
                    <Box key={v.slug} sx={{ borderRadius: 2.25, overflow: 'hidden', border: '1px solid rgba(15,23,42,0.10)' }}>
                      <Typography
                        sx={{
                          px: 1.4,
                          py: 1,
                          background:
                            'linear-gradient(135deg, rgba(0,212,255,0.10), rgba(131,56,236,0.10), rgba(255,0,110,0.08))',
                          borderBottom: '1px solid rgba(15,23,42,0.08)',
                          fontWeight: 900,
                          fontSize: '0.98rem'
                        }}
                      >
                        {v.title}
                      </Typography>
                      <Box sx={{ background: 'rgba(15,23,42,0.03)' }}>
                        <iframe
                          title={v.title}
                          src={v.embedUrl}
                          width="100%"
                          height="220"
                          style={{ border: 0, display: 'block' }}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

