import { Container, Paper, Stack, Typography } from '@mui/material';

export default function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Stack spacing={1.25}>
          <Typography variant="h2" sx={{ fontWeight: 900 }}>
            Projects
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>
            This is a placeholder for your featured robotics/software projects list.
            (F01 implemented: Home hero.)
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

