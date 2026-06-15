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
  if (cat === 'Mechatronics') return { bg: 'rgba(37,99,235,0.09)',  color: '#2563eb' };
  if (cat === 'IoT')          return { bg: 'rgba(124,58,237,0.09)', color: '#7c3aed' };
  return                             { bg: 'rgba(8,145,178,0.09)',  color: '#0891b2' };
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <Box component="section" id="projects" className="spSection" sx={{ background: '#ffffff' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Typography
              sx={{
                color: '#0891b2',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.78rem',
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
                color: '#111827',
              }}
            >
              Selected{' '}
              <Box component="span" sx={{ color: '#0891b2' }}>Projects</Box>
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
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    px: 2.2,
                    py: 0.9,
                    fontWeight: active ? 700 : 500,
                    borderColor: active ? 'transparent' : 'rgba(0,0,0,0.12)',
                    color: active ? '#ffffff' : '#4b5563',
                    background: active ? '#2563eb' : 'transparent',
                    '&:hover': {
                      background: active ? '#1d4ed8' : 'rgba(37,99,235,0.05)',
                      borderColor: active ? 'transparent' : '#2563eb',
                      color: active ? '#ffffff' : '#2563eb',
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
                    sx={{
                      borderRadius: 2.5,
                      border: '1px solid rgba(0,0,0,0.07)',
                      height: '100%',
                      background: '#ffffff',
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack spacing={1.5}>
                        <Chip
                          label={p.category}
                          size="small"
                          sx={{
                            background: bg,
                            color,
                            border: `1px solid ${color}25`,
                            fontWeight: 700,
                            fontSize: '0.73rem',
                            width: 'fit-content',
                            borderRadius: 1.5,
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.3, color: '#111827' }}
                        >
                          {p.title}
                        </Typography>
                        <Typography
                          sx={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.88rem', minHeight: 52 }}
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
                            color,
                            fontWeight: 600,
                            fontSize: '0.85rem',
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
          <Dialog
            open={!!openProject}
            onClose={() => setOpenProject(null)}
            maxWidth="md"
            fullWidth
          >
            {openProject && (
              <>
                <DialogTitle sx={{ fontWeight: 900, color: '#111827', pb: 1 }}>
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
                          sx={{ background: bg, color, border: `1px solid ${color}25`, fontWeight: 700, width: 'fit-content' }}
                        />
                      );
                    })()}
                    <Typography sx={{ color: '#4b5563', lineHeight: 1.75 }}>
                      {openProject.summary}
                    </Typography>
                    <Stack spacing={0.9} sx={{ pl: 1 }}>
                      {openProject.highlights.map(h => (
                        <Typography key={h} sx={{ color: '#6b7280', fontSize: '0.92rem' }}>
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
                            color="primary"
                            sx={{ fontWeight: 700 }}
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
          <Box
            sx={{
              borderRadius: 3,
              p: 3,
              border: '1px solid rgba(0,0,0,0.07)',
              background: '#f9fafb',
            }}
          >
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#111827' }}>
                Workshop Videos
              </Typography>
              <Typography sx={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Teaching sessions and technical demonstrations.
              </Typography>
              <Box
                sx={{
                  height: 460,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(37,99,235,0.2)',
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
                        border: '1px solid rgba(0,0,0,0.07)',
                        background: '#ffffff',
                      }}
                    >
                      <Typography
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: 'rgba(37,99,235,0.04)',
                          borderBottom: '1px solid rgba(0,0,0,0.06)',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: '#111827',
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
