import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
  Collapse,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useBiodata } from '../context/BiodataContext';
import Navbar from '../components/Navbar';
import StepIndicator from '../components/StepIndicator';
import Step1PersonalFamily from '../steps/Step1PersonalFamily';
import Step2Education from '../steps/Step2Education';
import Step3Address from '../steps/Step3Address';
import Step4PhotoTemplate from '../steps/Step4PhotoTemplate';
import Template1Traditional from '../templates/Template1Traditional';

// ─── Step Renderer ────────────────────────────────────────────
const renderStep = (step: number): React.ReactNode => {
  switch (step) {
    case 0:  return <Step1PersonalFamily />;
    case 1:  return <Step2Education />;
    case 2:  return <Step3Address />;
    case 3:  return <Step4PhotoTemplate />;
    default: return <Step1PersonalFamily />;
  }
};

// ─── Template Renderer ───────────────────────────────────────
// Add Template2 and Template3 imports + cases when ready
const renderTemplate = (formData: ReturnType<typeof useBiodata>['formData']): React.ReactNode => {
  switch (formData.selectedTemplate) {
    case 1:  return <Template1Traditional formData={formData} />;
    // case 2: return <Template2Religious formData={formData} />;
    // case 3: return <Template3Modern formData={formData} />;
    default: return <Template1Traditional formData={formData} />;
  }
};

// ─── Empty State ──────────────────────────────────────────────
const EmptyPreviewState: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, opacity: 0.45, gap: 1 }}>
    <Typography sx={{ fontSize: '3rem', lineHeight: 1 }}>📄</Typography>
    <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: '"Noto Sans Devanagari", sans-serif', color: '#8B0000', lineHeight: 1.8 }}>
      फॉर्म भरल्यावर येथे<br />बायोडेटा दिसेल
    </Typography>
    <Typography variant="caption" color="text.secondary">Fill the form to see live preview</Typography>
  </Box>
);

// ─── Live Preview Panel ───────────────────────────────────────
const LivePreview: React.FC = () => {
  const { formData } = useBiodata();
  const theme = useTheme();
  const hasData = !!formData.personal.fullName;

  return (
    <Box>
      {/* Preview label + template badge row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, px: 0.5 }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.65rem' }}>
          Live Preview
        </Typography>
        <Box sx={{ px: 1.5, py: '2px', borderRadius: 10, backgroundColor: theme.palette.primary.main }}>
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, fontSize: '0.65rem' }}>
            {formData.selectedTemplate === 1 && 'Template 1 — पारंपारिक'}
            {formData.selectedTemplate === 2 && 'Template 2 — धार्मिक'}
            {formData.selectedTemplate === 3 && 'Template 3 — आधुनिक'}
          </Typography>
        </Box>
      </Box>

      {/* Scrollable container — sticky so it follows scroll */}
      <Paper
        elevation={4}
        sx={{
          position: 'sticky',
          top: 80,
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: 3,
          border: `1.5px solid ${theme.palette.secondary.main}`,
          backgroundColor: '#F5F0E8',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-track': { backgroundColor: '#F5F0E8' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '3px' },
        }}
      >
        {/* id="biodata-preview-container" is captured by pdfGenerator.ts */}
        <Box
          id="biodata-preview-container"
          sx={{
            transformOrigin: 'top center',
            transform: { xs: 'scale(0.45)', sm: 'scale(0.55)', md: 'scale(0.60)', lg: 'scale(0.65)' },
            // Negative margin compensates for scale so container height is correct
            mb: { xs: '-54%', sm: '-45%', md: '-40%', lg: '-35%' },
          }}
        >
          {hasData ? renderTemplate(formData) : (
            <Box sx={{ transform: { xs: 'scale(2.2)', sm: 'scale(1.8)', md: 'scale(1.65)', lg: 'scale(1.54)' }, transformOrigin: 'top center' }}>
              <EmptyPreviewState />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

// ─── Create Page ──────────────────────────────────────────────
const Create: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentStep } = useBiodata();
  const [showPreview, setShowPreview] = React.useState<boolean>(false);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <StepIndicator activeStep={currentStep} />
        <Grid container spacing={3}>

          {/* Left: Form */}
          <Grid item xs={12} md={7}>
            {isMobile && (
              <Button variant="outlined" color="primary" size="small" fullWidth
                startIcon={showPreview ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={() => setShowPreview((prev) => !prev)}
                sx={{ mb: 2 }}
              >
                {showPreview ? 'Preview लपवा' : 'Preview पहा'}
              </Button>
            )}
            {isMobile && (
              <Collapse in={showPreview}>
                <Box sx={{ mb: 3 }}><LivePreview /></Box>
              </Collapse>
            )}
            {renderStep(currentStep)}
          </Grid>

          {/* Right: Live Preview (desktop only) */}
          {!isMobile && (
            <Grid item md={5}>
              <LivePreview />
            </Grid>
          )}

        </Grid>
      </Container>
    </Box>
  );
};

export default Create;