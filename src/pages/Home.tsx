import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button,
  Card, CardContent, useTheme, Chip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import { TemplateId } from '../types/biodata.types';

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

interface TemplateCardProps { id: number; name: string; imgSrc: string; tag: string; onClick: () => void; }
const TemplateCard: React.FC<TemplateCardProps> = ({ id, name, imgSrc, tag, onClick }) => (
  <Card
    onClick={onClick}
    sx={{ overflow: 'hidden', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
  >
    <Box component="img" src={imgSrc} alt={`template-${id}`} sx={{ height: 120, width: '100%', objectFit: 'cover' }} />
    <CardContent sx={{ py: 1.5 }}>
      <Typography variant="body1" fontWeight={600}>{name}</Typography>
      <Chip label={tag} size="small" sx={{ mt: 0.5 }} />
    </CardContent>
  </Card>
);

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formData, setCurrentStep, updateTemplate } = useBiodata();
  const t = useTranslation(formData.language);

  const goToCreate = (templateId?: number) => {
    // always reset to first step when coming from homepage
    setCurrentStep(0);
    if (templateId) {
      updateTemplate(templateId as TemplateId);
    }
    navigate('/create');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <SEOHead />
      <Navbar />
      <Box sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, #C0392B 100%)`, color: 'white', py: { xs: 6, md: 10 }, textAlign: 'center', px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' } }}>|| Sri Ganeshaya Namah ||</Typography>
          <Typography variant="h1" component="h1" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>Free Marathi Marriage Biodata Maker — मराठी बायोडेटा</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, fontSize: { xs: '1rem', md: '1.2rem' } }}>
            Free Marathi / Hindi Marriage Biodata Maker<br />Choose Beautiful Template — Download PDF
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={() => goToCreate()} sx={{ backgroundColor: theme.palette.secondary.main, color: '#2C1810', fontWeight: 700, fontSize: '1.1rem', px: 4, py: 1.5, '&:hover': { backgroundColor: theme.palette.secondary.light } }}>
              {t('createBiodata')}
            </Button>
            <Button variant="outlined" size="large" onClick={() => goToCreate()} sx={{ borderColor: 'white', color: 'white', fontWeight: 600, px: 4, py: 1.5, '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              View Templates
            </Button>
          </Box>
          <Typography variant="body1" sx={{ mt: 3, textAlign: 'center', fontSize: '1.1rem', fontWeight: 500 }}>
            आमच्या वेबसाइटवर मराठीत बायोडेटा बनवा — मोफत, कोणतीही नोंदणी नाही. सुंदर पारंपरिक टेम्पलेट निवडा आणि PDF डाउनलोड करा.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" component="h2" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>How to Create Your Marathi Biodata</Typography>
        <Grid container spacing={3} sx={{ mb: 8, justifyContent: 'center' }}>
          <Grid item xs={12} sm={4}><HowItWorksStep step={1} icon={<EditIcon />} label="Fill in your personal, family, education and contact details" /></Grid>
          <Grid item xs={12} sm={4}><HowItWorksStep step={2} icon={<PaletteIcon />} label="Choose from beautiful traditional Marathi templates" /></Grid>
          <Grid item xs={12} sm={4}><HowItWorksStep step={3} icon={<DownloadIcon />} label="Download your biodata as a high-quality PDF" /></Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>Why Use Our App?</Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={4}><FeatureCard icon={<CheckCircleOutlineIcon fontSize="large" />} title="100% Free" description="No charges. No watermark. Use anytime, unlimited times." /></Grid>
          <Grid item xs={12} sm={4}><FeatureCard icon={<LockOpenIcon fontSize="large" />} title="No Login" description="No account needed. Fill the form and download PDF directly." /></Grid>
          <Grid item xs={12} sm={4}><FeatureCard icon={<LockIcon fontSize="large" />} title="Your Data Stays Private" description="Nothing is stored on our servers. Your biodata is built and saved entirely on your device." /></Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1rem', color: 'text.secondary' }}>
          Vivah Biodata Maker is a free online tool to create marriage biodata in Marathi (मराठी बायोडेटा), Hindi, and English. No signup required. Download your marriage biodata as a PDF instantly. Perfect for Maharashtrian families looking for a quick, beautiful, and traditional biodata format.
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3, textAlign: 'center' }}>Free Marathi Biodata Maker — Why Choose Us?</Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
          Looking for a <strong>free Marathi biodata maker</strong>? Our <strong>online biodata maker</strong> lets you create professional marriage biodata in just 2 minutes — completely free, with no signup required. Whether you're searching for a "free marathi biodata maker" or an "online biodata maker," we've got you covered.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
          Our <strong>free Marathi biodata maker</strong> provides beautiful, traditional templates that are perfect for Marathi marriage alliances. Unlike other online biodata makers that charge fees or require lengthy registrations, our tool is 100% free and works instantly right in your browser.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Whether you need to create a biodata for yourself or a family member, our <strong>online biodata maker</strong> simplifies the process with intuitive forms and stunning professional designs. Download your biodata as a PDF and share it via WhatsApp, email, or print it — all within minutes using the best free Marathi biodata maker available.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;