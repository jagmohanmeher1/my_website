'use client';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const EMAIL = 'jagmohanmeher1@gmail.com';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jagmohan-meher/', color: '#A67C52' },
  { label: 'GitHub',   href: 'https://github.com/jagmohanmeher1',            color: '#7C6F5F' },
  { label: 'YouTube',  href: 'https://www.youtube.com/',                     color: '#876140' },
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
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    color: '#7C6F5F',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.78rem',
                    mb: 1,
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 900, lineHeight: 1.1, color: '#2B2620' }}
                >
                  Let's build something{' '}
                  <Box component="span" sx={{ color: '#A67C52' }}>that moves.</Box>
                </Typography>
              </Box>

              <Typography sx={{ color: '#6B6259', lineHeight: 1.8, fontSize: '1rem' }}>
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
                      color: '#6B6259',
                      fontSize: '0.94rem',
                      fontWeight: 500,
                      p: 1.4,
                      borderRadius: 2,
                      border: '1px solid rgba(43,38,32,0.08)',
                      background: '#FBF8F2',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: link.color,
                        borderColor: `${link.color}3a`,
                        background: `${link.color}0a`,
                        transform: 'translateX(3px)',
                        boxShadow: `0 4px 16px ${link.color}16`,
                      },
                    }}
                  >
                    {link.label}
                    <Typography component="span" sx={{ ml: 'auto', fontSize: '0.8rem', opacity: 0.45 }}>
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
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                background: '#F6F1E7',
                border: '1px solid rgba(43,38,32,0.08)',
                boxShadow: '0 4px 24px rgba(43,38,32,0.06)',
              }}
            >
              <Stack spacing={3}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#2B2620' }}>
                  Drop me a line
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: '#ffffff',
                    border: '1px solid rgba(166,124,82,0.25)',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: '#876140',
                    fontWeight: 600,
                    wordBreak: 'break-all',
                  }}
                >
                  {EMAIL}
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={copyEmail}
                    sx={{ px: 3, py: 1.3, borderRadius: 2, fontWeight: 700 }}
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
                      borderColor: 'rgba(166,124,82,0.4)',
                      color: '#876140',
                      '&:hover': { borderColor: '#A67C52', backgroundColor: 'rgba(166,124,82,0.06)' },
                    }}
                  >
                    Open in Mail
                  </Button>
                </Stack>

                <Typography sx={{ color: '#A8A096', fontSize: '0.82rem', lineHeight: 1.65 }}>
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
