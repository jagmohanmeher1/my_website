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

function categoryStyle(cat: ProjectCategory): { bg: string; color: string } {
  if (cat === 'Mechatronics') return { bg: 'rgba(249,115,22,0.10)', color: '#F97316' };
  if (cat === 'IoT')          return { bg: 'rgba(139,92,246,0.10)', color: '#8B5CF6' };
  return                             { bg: 'rgba(236,72,153,0.10)', color: '#EC4899' };
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <Box component="section" id="projects" className="spSection" sx={{ background: '#FFFBF5' }}>
      {/* Playful blobs */}
      <Box aria-hidden className="blob" sx={{ width: 340, height: 340, top: '4%', right: '-5%', background: '#FCD34D', opacity: 0.4 }} />
      <Box aria-hidden className="blob" sx={{ width: 300, height: 300, bottom: '-6%', left: '-5%', background: '#FDBA74' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Box
              sx={{
                display: 'inline-block', px: 1.6, py: 0.7, borderRadius: 99, mb: 2,
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.30)',
              }}
            >
              <Typography sx={{ color: '#D97706', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                Portfolio
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, fontWeight: 950, color: '#18181B' }}>
              Selected{' '}
              <Box component="span" className="gradientText">Projects</Box>
            </Typography>
          </Box>

          {/* Filter tabs */}
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
                    borderRadius: 99,
                    px: 2.4,
                    py: 0.9,
                    fontWeight: active ? 800 : 600,
                    borderColor: active ? 'transparent' : 'rgba(24,24,27,0.16)',
                    color: active ? '#ffffff' : '#52525B',
                    background: active ? '#F97316' : 'transparent',
                    '&:hover': {
                      background: active ? '#EA580C' : 'rgba(249,115,22,0.08)',
                      borderColor: active ? 'transparent' : '#F97316',
                      color: active ? '#ffffff' : '#F97316',
                    },
                  }}
                >
                  {c}
                </Button>
              );
            })}
          </Stack>

          {/* Grid */}
          <Grid container spacing={2.5}>
            {filtered.map(p => {
              const { bg, color } = categoryStyle(p.category);
              return (
                <Grid item xs={12} sm={6} md={4} key={p.slug}>
                  <Card
                    elevation={0}
                    className="projectCard"
                    sx={{ borderRadius: 4, border: '1px solid rgba(24,24,27,0.08)', height: '100%', background: '#ffffff' }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack spacing={1.5}>
                        <Chip
                          label={p.category}
                          size="small"
                          sx={{
                            background: bg, color,
                            border: `1px solid ${color}2e`,
                            fontWeight: 700, fontSize: '0.73rem',
                            width: 'fit-content', borderRadius: 99,
                          }}
                        />
                        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.3, color: '#18181B' }}>
                          {p.title}
                        </Typography>
                        <Typography sx={{ color: '#71717A', lineHeight: 1.7, fontSize: '0.88rem', minHeight: 52 }}>
                          {p.summary}
                        </Typography>
                        <Button
                          onClick={() => setOpenProject(p)}
                          variant="text"
                          size="small"
                          sx={{
                            p: 0, mt: 0.5, color,
                            fontWeight: 700, fontSize: '0.85rem',
                            justifyContent: 'flex-start',
                            '&:hover': { backgroundColor: 'transparent', opacity: 0.75 },
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
          <Dialog open={!!openProject} onClose={() => setOpenProject(null)} maxWidth="md" fullWidth>
            {openProject && (
              <>
                <DialogTitle sx={{ fontWeight: 900, color: '#18181B', pb: 1 }}>
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
                          sx={{ background: bg, color, border: `1px solid ${color}2e`, fontWeight: 700, width: 'fit-content', borderRadius: 99 }}
                        />
                      );
                    })()}
                    <Typography sx={{ color: '#52525B', lineHeight: 1.75 }}>
                      {openProject.summary}
                    </Typography>
                    <Stack spacing={0.9} sx={{ pl: 1 }}>
                      {openProject.highlights.map(h => (
                        <Typography key={h} sx={{ color: '#71717A', fontSize: '0.92rem' }}>
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
                              fontWeight: 700, borderRadius: 99,
                              background: 'linear-gradient(120deg, #F97316, #EC4899)',
                              '&:hover': { background: 'linear-gradient(120deg, #EA580C, #DB2777)' },
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

          {/* Videos */}
          <Box sx={{ borderRadius: 4, p: 3, border: '1px solid rgba(24,24,27,0.08)', background: '#ffffff' }}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: '#18181B' }}>
                Workshop Videos
              </Typography>
              <Typography sx={{ color: '#71717A', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Teaching sessions and technical demonstrations.
              </Typography>
              <Box
                sx={{
                  height: 460,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': { background: 'rgba(249,115,22,0.3)', borderRadius: 999 },
                }}
              >
                <Stack spacing={2}>
                  {videos.map(v => (
                    <Box key={v.slug} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(24,24,27,0.08)', background: '#FAFAFA' }}>
                      <Typography
                        sx={{
                          px: 2, py: 1.2,
                          background: 'rgba(249,115,22,0.07)',
                          borderBottom: '1px solid rgba(24,24,27,0.06)',
                          fontWeight: 700, fontSize: '0.92rem', color: '#18181B',
                        }}
                      >
                        {v.title}
                      </Typography>
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
