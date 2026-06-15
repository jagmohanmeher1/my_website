import { Box, Button, Container, Stack, Typography } from '@mui/material';

const navItems = [
  { label: 'About',    href: '#about' },
  { label: 'Robots',   href: '#robots' },
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
              color: '#2B2620',
            }}
          >
            Jagmohan{' '}
            <Box component="span" sx={{ color: '#A67C52' }}>Meher</Box>
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
                  color: '#6B6259',
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': {
                    color: '#A67C52',
                    backgroundColor: 'rgba(166,124,82,0.07)',
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
