'use client';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const EMAIL = 'jagmohanmeher1@gmail.com';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jagmohan-meher/', color: '#F97316' },
  { label: 'GitHub',   href: 'https://github.com/jagmohanmeher1',            color: '#8B5CF6' },
  { label: 'YouTube',  href: 'https://www.youtube.com/',                     color: '#EC4899' },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  return (
    <Box component="section" id="contact" className="spSection" sx={{ background: '#ffffff' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Box
                  sx={{
                    display: 'inline-block', px: 1.6, py: 0.7, borderRadius: 99, mb: 2,
                    background: 'rgba(236,72,153,0.10)',
                    border: '1px solid rgba(236,72,153,0.28)',
                  }}
                >
                  <Typography sx={{ color: '#EC4899', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                    Get in Touch
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, fontWeight: 950, lineHeight: 1.05, color: '#18181B' }}>
                  Let's build something{' '}
                  <Box component="span" className="gradientText">that moves.</Box>
                </Typography>
              </Box>

              <Typography sx={{ color: '#52525B', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Open to robotics engineering collaborations, technical training partnerships,
                research projects, and educational content creation.
              </Typography>

              <Stack spacing={1.2} sx={{ pt: 1 }}>
                {SOCIAL.map(link => (
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
                      color: '#52525B',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      p: 1.5,
                      borderRadius: 99,
                      border: '1px solid rgba(24,24,27,0.08)',
                      background: '#FAFAFA',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: link.color,
                        borderColor: `${link.color}44`,
                        background: `${link.color}0d`,
                        transform: 'translateX(4px)',
                        boxShadow: `0 6px 20px ${link.color}1c`,
                      },
                    }}
                  >
                    {link.label}
                    <Typography component="span" sx={{ ml: 'auto', fontSize: '0.8rem', opacity: 0.5 }}>
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
              sx={{
                borderRadius: 5,
                p: { xs: 3, md: 4 },
                background: 'linear-gradient(150deg, #FFF7ED 0%, #FDF2F8 100%)',
                border: '1px solid rgba(24,24,27,0.07)',
                boxShadow: '0 8px 32px rgba(24,24,27,0.07)',
              }}
            >
              <Stack spacing={3}>
                <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', color: '#18181B' }}>
                  Drop me a line
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: '#ffffff',
                    border: '1px solid rgba(249,115,22,0.28)',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: '#EA580C',
                    fontWeight: 700,
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
                      px: 3, py: 1.3, borderRadius: 99, fontWeight: 800,
                      background: 'linear-gradient(120deg, #F97316, #EC4899)',
                      '&:hover': { background: 'linear-gradient(120deg, #EA580C, #DB2777)' },
                    }}
                  >
                    {copied ? '✓ Copied!' : 'Copy Email'}
                  </Button>

                  <Button
                    component="a"
                    href={`mailto:${EMAIL}?subject=Robotics%20Collaboration`}
                    variant="outlined"
                    sx={{
                      px: 3, py: 1.3, borderRadius: 99,
                      borderColor: 'rgba(249,115,22,0.4)',
                      color: '#EA580C',
                      '&:hover': { borderColor: '#F97316', backgroundColor: 'rgba(249,115,22,0.06)' },
                    }}
                  >
                    Open in Mail
                  </Button>
                </Stack>

                <Typography sx={{ color: '#A1A1AA', fontSize: '0.82rem', lineHeight: 1.65 }}>
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
