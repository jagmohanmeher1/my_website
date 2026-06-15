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
  if (cat === 'Mechatronics') return { bg: 'rgba(166,124,82,0.10)', color: '#A67C52' };
  if (cat === 'IoT')          return { bg: 'rgba(124,111,95,0.10)', color: '#7C6F5F' };
  return                             { bg: 'rgba(135,97,64,0.10)',  color: '#876140' };
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <Box component="section" id="projects" className="spSection" sx={{ background: '#F6F1E7' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Typography
              sx={{
                color: '#876140',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.78rem',
                mb: 1,
              }}
            >
              Portfolio
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 900, color: '#2B2620' }}>
              Selected{' '}
              <Box component="span" sx={{ color: '#876140' }}>Projects</Box>
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
                    borderRadius: 2,
                    px: 2.2,
                    py: 0.9,
                    fontWeight: active ? 700 : 500,
                    borderColor: active ? 'transparent' : 'rgba(43,38,32,0.14)',
                    color: active ? '#ffffff' : '#6B6259',
                    background: active ? '#A67C52' : 'transparent',
                    '&:hover': {
                      background: active ? '#876140' : 'rgba(166,124,82,0.06)',
                      borderColor: active ? 'transparent' : '#A67C52',
                      color: active ? '#ffffff' : '#A67C52',
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
                      border: '1px solid rgba(43,38,32,0.08)',
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
                            border: `1px solid ${color}28`,
                            fontWeight: 700,
                            fontSize: '0.73rem',
                            width: 'fit-content',
                            borderRadius: 1.5,
                          }}
                        />
                        <Typography sx={{ fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.3, color: '#2B2620' }}>
                          {p.title}
                        </Typography>
                        <Typography sx={{ color: '#8A8178', lineHeight: 1.7, fontSize: '0.88rem', minHeight: 52 }}>
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
          <Dialog open={!!openProject} onClose={() => setOpenProject(null)} maxWidth="md" fullWidth>
            {openProject && (
              <>
                <DialogTitle sx={{ fontWeight: 900, color: '#2B2620', pb: 1 }}>
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
                          sx={{ background: bg, color, border: `1px solid ${color}28`, fontWeight: 700, width: 'fit-content' }}
                        />
                      );
                    })()}
                    <Typography sx={{ color: '#6B6259', lineHeight: 1.75 }}>
                      {openProject.summary}
                    </Typography>
                    <Stack spacing={0.9} sx={{ pl: 1 }}>
                      {openProject.highlights.map(h => (
                        <Typography key={h} sx={{ color: '#8A8178', fontSize: '0.92rem' }}>
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
          <Box sx={{ borderRadius: 3, p: 3, border: '1px solid rgba(43,38,32,0.08)', background: '#ffffff' }}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#2B2620' }}>
                Workshop Videos
              </Typography>
              <Typography sx={{ color: '#8A8178', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Teaching sessions and technical demonstrations.
              </Typography>
              <Box
                sx={{
                  height: 460,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': { background: 'rgba(166,124,82,0.25)', borderRadius: 999 },
                }}
              >
                <Stack spacing={2}>
                  {videos.map(v => (
                    <Box
                      key={v.slug}
                      sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(43,38,32,0.08)', background: '#FBF8F2' }}
                    >
                      <Typography
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: 'rgba(166,124,82,0.06)',
                          borderBottom: '1px solid rgba(43,38,32,0.06)',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: '#2B2620',
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
