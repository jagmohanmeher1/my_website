import { Box } from '@mui/material';
import SinglePageHero from './SinglePageHero';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

export default function PortfolioSinglePageDraft() {
  return (
    <Box component="div">
      <SinglePageHero />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

