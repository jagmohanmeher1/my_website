import { Box, Button, Container, Stack, Typography } from '@mui/material';

const navItems: Array<{ label: string; href: string }> = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export default function TopNav() {
  return (
    <Box
      component="header"
      className="topNavBackdrop"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1200
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ py: 1.25 }}>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component="a"
                href={item.href}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  px: 1.25,
                  borderRadius: 2,
                  '&:hover': { backgroundColor: 'rgba(15,23,42,0.04)' }
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

