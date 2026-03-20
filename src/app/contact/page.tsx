import { Container, Paper, Stack, Typography } from '@mui/material';

export default function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Stack spacing={1.25}>
          <Typography variant="h2" sx={{ fontWeight: 900 }}>
            Contact
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>
            This will contain your Material-style contact form (to be implemented in a later feature).
            (Placeholder for now.)
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

