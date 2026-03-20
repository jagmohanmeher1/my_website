'use client';

import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const EMAIL = 'your.email@example.com';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  return (
    <Box component="section" id="contact" className="spSection">
      <Container maxWidth="lg">
        <Stack spacing={2.5}>
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
            Contact
          </Typography>

          <Card
            elevation={0}
            className="spGlass"
            sx={{
              borderRadius: 2.5,
              p: 1.2,
              border: '1px solid rgba(15,23,42,0.10)',
              background:
                'linear-gradient(135deg, rgba(29,143,232,0.10), rgba(139,92,246,0.10), rgba(255,0,110,0.06))'
            }}
          >
            <CardContent sx={{ p: { xs: 1.8, md: 3 } }}>
              <Stack spacing={1.6}>
                <Typography sx={{ fontWeight: 950, fontSize: '1.4rem' }}>
                  Let’s build something that moves.
                </Typography>
                <Typography sx={{ color: 'rgba(15,23,42,0.76)', lineHeight: 1.7 }}>
                  For collaborations, teaching, or robotics projects, send me a message.
                  (Draft contact UI for now.)
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.4} flexWrap="wrap" sx={{ pt: 0.5 }}>
                  <Button
                    variant="contained"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(EMAIL);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1600);
                      } catch {
                        // no-op: clipboard might be blocked
                      }
                    }}
                    sx={{
                      background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
                      '&:hover': { background: 'linear-gradient(135deg, #00d4ff, #8338ec)' }
                    }}
                  >
                    {copied ? 'Email copied' : 'Copy email'}
                  </Button>

                  <Button
                    href={`mailto:${EMAIL}`}
                    variant="outlined"
                    sx={{ borderColor: 'rgba(29,143,232,0.55)', color: 'rgba(15,23,42,0.88)' }}
                  >
                    Email now
                  </Button>

                  <Button
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    variant="text"
                    sx={{ color: 'rgba(15,23,42,0.88)' }}
                  >
                    LinkedIn
                  </Button>
                </Stack>

                <Box sx={{ pt: 0.5, color: 'rgba(15,23,42,0.65)', fontSize: '0.95rem' }}>
                  Tip: Replace `your.email@example.com` and the LinkedIn URL with your real details.
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

