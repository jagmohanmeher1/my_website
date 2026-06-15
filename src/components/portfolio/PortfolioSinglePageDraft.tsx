import { Box, Container, Typography } from '@mui/material';
import SinglePageHero from './SinglePageHero';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        py: 4,
        background: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { sm: 'center' },
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: 900, color: '#111827', fontSize: '1rem' }}>
            Jagmohan{' '}
            <Box component="span" sx={{ color: '#2563eb' }}>Meher</Box>
          </Typography>
          <Typography sx={{ color: '#9ca3af', fontSize: '0.82rem' }}>
            Robotics Engineer & Technical Trainer · {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default function PortfolioSinglePageDraft() {
  return (
    <Box component="div">
      <SinglePageHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}
