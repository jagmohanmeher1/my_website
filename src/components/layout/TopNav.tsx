import { Box, Button, Container, Stack, Typography } from '@mui/material';

const navItems = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function TopNav() {
  return (
    <Box
      component="header"
      className="topNavBackdrop"
      sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1200 }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.2 }}>
          {/* Brand */}
          <Typography
            component="a"
            href="#"
            sx={{
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            JM
          </Typography>

          {/* Nav links */}
          <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map(item => (
              <Button
                key={item.href}
                component="a"
                href={item.href}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  px: 1.5,
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.65)',
                  borderRadius: 2,
                  '&:hover': {
                    color: '#00d4ff',
                    backgroundColor: 'rgba(0,212,255,0.06)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
