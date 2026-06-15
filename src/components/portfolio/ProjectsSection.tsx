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
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { projects, type Project, type ProjectCategory } from '../../lib/portfolio/projects';
import { videos } from '../../lib/portfolio/videos';

const categories: Array<ProjectCategory | 'All'> = ['All', 'Mechatronics', 'IoT', 'Research'];

function categoryStyle(category: ProjectCategory): { bg: string; color: string } {
  if (category === 'Mechatronics') return { bg: 'rgba(0,212,255,0.14)', color: '#00d4ff' };
  if (category === 'IoT')          return { bg: 'rgba(131,56,236,0.14)', color: '#8338ec' };
  return                                  { bg: 'rgba(255,0,110,0.14)',  color: '#ff006e' };
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Box component="section" id="projects" className="spSection">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Typography
              sx={{
                color: '#ff006e',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                mb: 1,
              }}
            >
              Portfolio
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #00d4ff, #8338ec, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Projects
            </Typography>
          </Box>

          {/* Category filter */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {categories.map(c => {
              const active = c === activeCategory;
              return (
                <Button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  variant={active ? 'contained' : 'outlined'}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 0.8,
                    background: active ? 'linear-gradient(135deg, #00d4ff, #8338ec)' : 'transparent',
                    color: active ? '#050810' : 'rgba(255,255,255,0.60)',
                    borderColor: active ? 'transparent' : 'rgba(255,255,255,0.14)',
                    fontWeight: active ? 700 : 500,
                    '&:hover': {
                      background: active
                        ? 'linear-gradient(135deg, #00d4ff, #8338ec)'
                        : 'rgba(255,255,255,0.06)',
                      borderColor: active ? 'transparent' : 'rgba(255,255,255,0.25)',
                    },
                  }}
                >
                  {c}
                </Button>
              );
            })}
          </Stack>

          {/* Project grid */}
          <Grid container spacing={2.5}>
            {filtered.map(p => {
              const { bg, color } = categoryStyle(p.category);
              return (
                <Grid item xs={12} sm={6} md={4} key={p.slug}>
                  <Card
                    elevation={0}
                    className="projectCard"
                    sx={{
                      borderRadius: 2.5,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(10px)',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack spacing={1.4}>
                        <Chip
                          label={p.category}
                          size="small"
                          sx={{
                            background: bg,
                            color,
                            border: `1px solid ${color}30`,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            width: 'fit-content',
                            borderRadius: 1.5,
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            lineHeight: 1.3,
                            color: 'rgba(255,255,255,0.92)',
                          }}
                        >
                          {p.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.52)',
                            lineHeight: 1.7,
                            fontSize: '0.9rem',
                            minHeight: 52,
                          }}
                        >
                          {p.summary}
                        </Typography>
                        <Button
                          onClick={() => setOpenProject(p)}
                          variant="text"
                          size="small"
                          sx={{
                            p: 0,
                            mt: 0.5,
                            color: color,
                            fontWeight: 600,
                            justifyContent: 'flex-start',
                            '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
                          }}
                        >
                          View details →
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Detail dialog */}
          <Dialog
            open={!!openProject}
            onClose={() => setOpenProject(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                background: '#0d1b2a',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: 3,
              },
            }}
          >
            {openProject && (
              <>
                <DialogTitle sx={{ fontWeight: 900, color: 'rgba(255,255,255,0.92)', pb: 1 }}>
                  {openProject.title}
                </DialogTitle>
                <DialogContent>
                  <Stack spacing={2}>
                    {(() => {
                      const { bg, color } = categoryStyle(openProject.category);
                      return (
                        <Chip
                          label={openProject.category}
                          size="small"
                          sx={{
                            background: bg,
                            color,
                            border: `1px solid ${color}30`,
                            fontWeight: 700,
                            width: 'fit-content',
                          }}
                        />
                      );
                    })()}
                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
                      {openProject.summary}
                    </Typography>
                    <Stack spacing={0.9} sx={{ pl: 1 }}>
                      {openProject.highlights.map(h => (
                        <Typography key={h} sx={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.93rem' }}>
                          — {h}
                        </Typography>
                      ))}
                    </Stack>
                    {openProject.links?.length ? (
                      <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ pt: 1 }}>
                        {openProject.links.map(l => (
                          <Button
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                              color: '#050810',
                              fontWeight: 700,
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
            )}
          </Dialog>

          {/* Video section */}
          <Box
            className="spGlass"
            sx={{ borderRadius: 2.5, p: 3, border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'rgba(255,255,255,0.88)' }}>
                Workshop Videos
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.50)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                Teaching sessions and technical demonstrations from YouTube.
              </Typography>
              <Box
                sx={{
                  height: 460,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,212,255,0.25)',
                    borderRadius: 999,
                  },
                }}
              >
                <Stack spacing={2}>
                  {videos.map(v => (
                    <Box
                      key={v.slug}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <Typography
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: 'linear-gradient(135deg, rgba(0,212,255,0.10), rgba(131,56,236,0.10))',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: 'rgba(255,255,255,0.82)',
                        }}
                      >
                        {v.title}
                      </Typography>
                      <Box>
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
