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
              fontWeight: 900,
              fontSize: '1.05rem',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              color: '#111827',
            }}
          >
            Jagmohan{' '}
            <Box component="span" sx={{ color: '#2563eb' }}>Meher</Box>
          </Typography>

          {/* Nav links */}
          <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map(item => (
              <Button
                key={item.href}
                component="a"
                href={item.href}
                sx={{
                  textTransform: 'none',
                  px: 1.5,
                  fontSize: '0.88rem',
                  color: '#4b5563',
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': {
                    color: '#2563eb',
                    backgroundColor: 'rgba(37,99,235,0.05)',
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
