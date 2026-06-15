import { Box, Container, Typography } from '@mui/material';
import SinglePageHero from './SinglePageHero';
import AboutSection from './AboutSection';
import InteractiveRobots from '../showcase/InteractiveRobots';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: '1px solid rgba(24,24,27,0.08)', py: 4, background: '#FFFBF5' }}
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
          <Typography sx={{ fontWeight: 950, color: '#18181B', fontSize: '1.05rem' }}>
            Jagmohan{' '}
            <Box component="span" className="gradientText">Meher</Box>
          </Typography>
          <Typography sx={{ color: '#A1A1AA', fontSize: '0.82rem' }}>
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
      <InteractiveRobots />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}
