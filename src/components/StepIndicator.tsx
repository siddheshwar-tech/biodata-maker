import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';

interface StepIndicatorProps {
  activeStep: number; // 0-indexed
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { formData } = useBiodata();
  const t = useTranslation(formData.language);

  const steps = [
    t('personalFamily'),
    t('educationCareer'),
    t('addressContact'),
    t('photoTemplate'),
  ];

  if (isMobile) {
    return (
      <Paper
        sx={{
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            marginBottom: 1,
          }}
        >
          {t('step')} {activeStep + 1} {t('of')} 4
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.main,
            marginBottom: 1.5,
          }}
        >
          {steps[activeStep]}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={((activeStep + 1) / 4) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        marginBottom: 3,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, idx) => (
          <Step key={idx} completed={idx < activeStep}>
            <StepLabel
              StepIconComponent={({ completed }) =>
                completed ? (
                  <CheckCircleIcon
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: 40,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        idx === activeStep
                          ? theme.palette.primary.main
                          : '#E0E0E0',
                      color: idx === activeStep ? 'white' : '#999',
                      fontWeight: 600,
                    }}
                  >
                    {idx + 1}
                  </Box>
                )
              }
              sx={{
                '& .MuiStepLabel-label': {
                  color:
                    idx === activeStep
                      ? theme.palette.primary.main
                      : 'inherit',
                  fontWeight: idx === activeStep ? 600 : 400,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default StepIndicator;
