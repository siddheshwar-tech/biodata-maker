import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button,
  Card, CardContent, useTheme, Chip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PaletteIcon from '@mui/icons-material/Palette';
import Navbar from '../components/Navbar';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';

interface FeatureCardProps { icon: React.ReactNode; title: string; description: string; }
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%', textAlign: 'center', p: 1, border: `1px solid ${theme.palette.divider}`, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(139,0,0,0.12)' } }}>
      <CardContent>
        <Box sx={{ color: theme.palette.primary.main, fontSize: 40, mb: 1 }}>{icon}</Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

interface HowItWorksStepProps { step: number; icon: React.ReactNode; label: string; }
const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ step, icon, label }) => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', px: 2 }}>
      <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: theme.palette.primary.main, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, mx: 'auto', mb: 1, boxShadow: '0 4px 12px rgba(139,0,0,0.3)' }}>{icon}</Box>
      <Chip label={`Step ${step}`} size="small" color="secondary" sx={{ mb: 1, fontWeight: 600 }} />
      <Typography variant="body1" fontWeight={500}>{label}</Typography>
    </Box>
  );
};

interface TemplateCardProps { name: string; gradient: string; tag: string; }
const TemplateCard: React.FC<TemplateCardProps> = ({ name, gradient, tag }) => (
  <Card sx={{ overflow: 'hidden', height: '100%' }}>
    <Box sx={{ height: 120, background: gradient }} />
    <CardContent sx={{ py: 1.5 }}>
      <Typography variant="body1" fontWeight={600}>{name}</Typography>
      <Chip label={tag} size="small" sx={{ mt: 0.5 }} />
    </CardContent>
  </Card>
);

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formData } = useBiodata();
  const t = useTranslation(formData.language);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Navbar />
      <Box sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, #C0392B 100%)`, color: 'white', py: { xs: 6, md: 10 }, textAlign: 'center', px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' } }}>|| Sri Ganeshaya Namah ||</Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>{t('appName')}</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, fontSize: { xs: '1rem', md: '1.2rem' } }}>
            Free Marathi / Hindi Marriage Biodata Maker<br />Choose Beautiful Template — Download PDF
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={() => navigate('/create')} sx={{ backgroundColor: theme.palette.secondary.main, color: '#2C1810', fontWeight: 700, fontSize: '1.1rem', px: 4, py: 1.5, '&:hover': { backgroundColor: theme.palette.secondary.light } }}>
              {t('createBiodata')}
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/create')} sx={{ borderColor: 'white', color: 'white', fontWeight: 600, px: 4, py: 1.5, '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              View Templates
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>Why Use Our App?</Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={4}><FeatureCard icon={<CheckCircleOutlineIcon fontSize="large" />} title="100% Free" description="No charges. No watermark. Use anytime, unlimited times." /></Grid>
          <Grid item xs={12} sm={4}><FeatureCard icon={<LockOpenIcon fontSize="large" />} title="No Login" description="No account needed. Fill the form and download PDF directly." /></Grid>
          <Grid item xs={12} sm={4}><FeatureCard icon={<AutoAwesomeIcon fontSize="large" />} title="Beautiful Designs" description="3 professional templates — Traditional, Religious, Modern. Mobile friendly." /></Grid>
        </Grid>

        <Box sx={{ backgroundColor: '#FFF0E8', borderRadius: 4, p: { xs: 3, md: 5 }, mb: 8 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>How It Works — 3 Easy Steps</Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}><HowItWorksStep step={1} icon={<EditNoteIcon />} label="Fill Your Details" /></Grid>
            <Grid item xs={12} sm={4}><HowItWorksStep step={2} icon={<PaletteIcon />} label="Choose Template" /></Grid>
            <Grid item xs={12} sm={4}><HowItWorksStep step={3} icon={<DownloadIcon />} label="Download PDF" /></Grid>
          </Grid>
        </Box>

        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>Available Templates</Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={4}><TemplateCard name="Traditional | Paramparik" gradient="linear-gradient(135deg, #8B0000, #D4AF37)" tag="Most Popular" /></Grid>
          <Grid item xs={12} sm={4}><TemplateCard name="Religious | Dharmik" gradient="linear-gradient(135deg, #FF6B00, #8B0000)" tag="Traditional" /></Grid>
          <Grid item xs={12} sm={4}><TemplateCard name="Modern | Adhunik" gradient="linear-gradient(135deg, #1A237E, #D4AF37)" tag="Professional" /></Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', py: 5, backgroundColor: theme.palette.primary.main, borderRadius: 4, color: 'white' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Create Your Biodata Today — Free!</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>Ready in 2 minutes • Download PDF</Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/create')} sx={{ backgroundColor: theme.palette.secondary.main, color: '#2C1810', fontWeight: 700, fontSize: '1.1rem', px: 5, py: 1.5, '&:hover': { backgroundColor: theme.palette.secondary.light } }}>
            {t('createBiodata')} --&gt;
          </Button>
        </Box>
      </Container>

      <Box sx={{ backgroundColor: theme.palette.primary.dark, color: 'white', textAlign: 'center', py: 3, mt: 4 }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>2025 Vivah Biodata Maker -- 100% Free | No Login | No Watermark</Typography>
      </Box>
    </Box>
  );
};

export default Home;