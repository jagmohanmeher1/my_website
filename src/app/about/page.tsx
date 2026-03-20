import { Container, Paper, Stack, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Stack spacing={1.25}>
          <Typography variant="h2" sx={{ fontWeight: 900 }}>
            About
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>
            This section will hold your engineering story, values, and a timeline of your robotics journey.
            (Placeholder for now.)
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

