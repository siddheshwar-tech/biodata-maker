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

// ─── Step Renderer ────────────────────────────────────────────
// Renders the correct step component based on currentStep index
const renderStep = (step: number): React.ReactNode => {
  switch (step) {
    case 0:  return <Step1PersonalFamily />;
    case 1:  return <Step2Education />;
    case 2:  return <Step3Address />;
    case 3:  return <Step4PhotoTemplate />;
    default: return <Step1PersonalFamily />;
  }
};

// ─── Live Preview Panel ───────────────────────────────────────
// Shows filled data in real time on the right side
// id="biodata-preview-container" is required by pdfGenerator.ts
const LivePreview: React.FC = () => {
  const { formData } = useBiodata();
  const theme = useTheme();

  const hasData = !!formData.personal.fullName;

  return (
    <Paper
      id="biodata-preview-container"
      elevation={3}
      sx={{
        p: 3,
        minHeight: 500,
        border: `2px dashed ${theme.palette.secondary.main}`,
        borderRadius: 4,
        backgroundColor: '#FFF8F0',
        position: 'sticky',
        top: 80, // stays visible while user scrolls form
      }}
    >
      {/* Preview Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
        >
          || श्री गणेशाय नमः ||
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Live Preview — बायोडेटा पूर्वावलोकन
        </Typography>
      </Box>

      {hasData ? (
        // ── Filled Data Preview ──
        <Box sx={{ mt: 1 }}>
          {formData.personal.fullName && (
            <Typography variant="body1" fontWeight={700} color="primary">
              {formData.personal.fullName}
            </Typography>
          )}
          {formData.personal.dateOfBirth && (
            <Typography variant="body2">
              📅 जन्म तारीख: {formData.personal.dateOfBirth}
            </Typography>
          )}
          {formData.personal.rashi && (
            <Typography variant="body2">
              ⭐ राशी: {formData.personal.rashi}
            </Typography>
          )}
          {formData.personal.religion && (
            <Typography variant="body2">
              🙏 धर्म: {formData.personal.religion}
            </Typography>
          )}
          {formData.personal.height && (
            <Typography variant="body2">
              📏 उंची: {formData.personal.height}
            </Typography>
          )}
          {formData.family.fatherName && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              👨 वडील: {formData.family.fatherName}
            </Typography>
          )}
          {formData.family.motherName && (
            <Typography variant="body2">
              👩 आई: {formData.family.motherName}
            </Typography>
          )}
          {formData.education.qualification && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              🎓 शिक्षण: {formData.education.qualification}
            </Typography>
          )}
          {formData.education.occupation && (
            <Typography variant="body2">
              💼 नोकरी: {formData.education.occupation}
            </Typography>
          )}
          {formData.address.city && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              📍 शहर: {formData.address.city}, {formData.address.state}
            </Typography>
          )}
          {formData.address.mobile && (
            <Typography variant="body2">
              📱 मोबाईल: +91 {formData.address.mobile}
            </Typography>
          )}
        </Box>
      ) : (
        // ── Empty State ──
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            opacity: 0.4,
          }}
        >
          <Typography variant="h2">📄</Typography>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            फॉर्म भरल्यावर येथे
            <br />
            बायोडेटा दिसेल
          </Typography>
        </Box>
      )}

      {/* Template Badge */}
      <Box
        sx={{
          mt: 3,
          p: 1,
          borderRadius: 2,
          backgroundColor: theme.palette.primary.main,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
          {formData.selectedTemplate === 1 && 'Template 1 — पारंपारिक'}
          {formData.selectedTemplate === 2 && 'Template 2 — धार्मिक'}
          {formData.selectedTemplate === 3 && 'Template 3 — आधुनिक'}
        </Typography>
      </Box>
    </Paper>
  );
};

// ─── Create Page ──────────────────────────────────────────────
const Create: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentStep } = useBiodata();

  // Mobile only: toggle preview panel visibility
  const [showPreview, setShowPreview] = React.useState<boolean>(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* ── Navbar ── */}
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 3 }}>

        {/* ── Step Indicator ── */}
        <StepIndicator activeStep={currentStep} />

        {/* ── Main Content ── */}
        <Grid container spacing={3}>

          {/* ── Left: Form Column ── */}
          <Grid item xs={12} md={7}>

            {/* Mobile: Preview toggle button */}
            {isMobile && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                startIcon={
                  showPreview ? <VisibilityOffIcon /> : <VisibilityIcon />
                }
                onClick={() => setShowPreview((prev) => !prev)}
                sx={{ mb: 2 }}
              >
                {showPreview ? 'Preview लपवा' : 'Preview पहा'}
              </Button>
            )}

            {/* Mobile: Collapsible preview above the form */}
            {isMobile && (
              <Collapse in={showPreview}>
                <Box sx={{ mb: 3 }}>
                  <LivePreview />
                </Box>
              </Collapse>
            )}

            {/* ── Active Step Component ── */}
            {renderStep(currentStep)}

          </Grid>

          {/* ── Right: Live Preview (desktop only) ── */}
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