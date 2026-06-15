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
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 4,
        mt: 4,
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
          <Typography
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00d4ff, #8338ec)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.1rem',
            }}
          >
            Jagmohan Meher
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.82rem' }}>
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
