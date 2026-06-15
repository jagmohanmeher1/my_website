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
      sx={{ borderTop: '1px solid rgba(43,38,32,0.08)', py: 4, background: '#F6F1E7' }}
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
          <Typography sx={{ fontWeight: 900, color: '#2B2620', fontSize: '1rem' }}>
            Jagmohan{' '}
            <Box component="span" sx={{ color: '#A67C52' }}>Meher</Box>
          </Typography>
          <Typography sx={{ color: '#A8A096', fontSize: '0.82rem' }}>
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
