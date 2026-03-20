import { Container, Paper, Stack, Typography } from '@mui/material';

export default function SkillsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Stack spacing={1.25}>
          <Typography variant="h2" sx={{ fontWeight: 900 }}>
            Skills
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>
            This section will include your robotics capabilities and proficiency bars.
            (Placeholder for now.)
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

