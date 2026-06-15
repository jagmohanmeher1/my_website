'use client';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const EMAIL = 'jagmohanmeher1@gmail.com';

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jagmohan-meher/',
    color: '#00d4ff',
    icon: '💼',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jagmohanmeher1',
    color: '#8338ec',
    icon: '⚙️',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    color: '#ff006e',
    icon: '🎬',
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback: ignore clipboard error
    }
  };

  return (
    <Box component="section" id="contact" className="spSection">
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left: headline */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
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
                  Get in Touch
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.2rem', md: '2.8rem' },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Let's build something that moves.
                </Typography>
              </Box>

              <Typography sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '1rem' }}>
                Open to robotics engineering collaborations, technical training partnerships,
                research projects, and educational content creation.
              </Typography>

              {/* Social links */}
              <Stack spacing={1.5} sx={{ pt: 1 }}>
                {CONTACT_LINKS.map(link => (
                  <Box
                    key={link.label}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      p: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${link.color}22`,
                      transition: 'all 0.22s ease',
                      '&:hover': {
                        color: link.color,
                        borderColor: `${link.color}55`,
                        background: `${link.color}0a`,
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Typography component="span" sx={{ fontSize: '1.1rem' }}>{link.icon}</Typography>
                    {link.label}
                    <Typography
                      component="span"
                      sx={{ ml: 'auto', fontSize: '0.78rem', opacity: 0.45, letterSpacing: '0.04em' }}
                    >
                      ↗
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Right: email card */}
          <Grid item xs={12} md={7}>
            <Box
              className="spGlass"
              sx={{
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                border: '1px solid rgba(255,0,110,0.18)',
                background: 'linear-gradient(135deg, rgba(255,0,110,0.05), rgba(131,56,236,0.05))',
              }}
            >
              <Stack spacing={3}>
                <Typography
                  sx={{ fontWeight: 800, fontSize: '1.3rem', color: 'rgba(255,255,255,0.88)' }}
                >
                  Drop me a line
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(0,212,255,0.06)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: '#00d4ff',
                    wordBreak: 'break-all',
                  }}
                >
                  {EMAIL}
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button
                    variant="contained"
                    onClick={copyEmail}
                    sx={{
                      px: 3,
                      py: 1.3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                      color: '#050810',
                      fontWeight: 700,
                      '&:hover': { opacity: 0.88, background: 'linear-gradient(135deg, #00d4ff, #8338ec)' },
                    }}
                  >
                    {copied ? '✓ Copied!' : 'Copy Email'}
                  </Button>

                  <Button
                    component="a"
                    href={`mailto:${EMAIL}?subject=Robotics%20Collaboration`}
                    variant="outlined"
                    sx={{
                      px: 3,
                      py: 1.3,
                      borderRadius: 2,
                      borderColor: 'rgba(0,212,255,0.35)',
                      color: 'rgba(255,255,255,0.75)',
                      '&:hover': { borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.06)' },
                    }}
                  >
                    Open in Mail
                  </Button>
                </Stack>

                <Typography sx={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Typical response time: 1–2 business days.
                  Based in India, available for remote and on-site engagements.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
