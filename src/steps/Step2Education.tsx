import React, { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation, TranslationKey } from '../utils/translations';
import { educationSchema } from '../schemas/biodata.schema';
import { qualificationOptions, incomeOptions, occupationOptions } from '../utils/dropdownOptions';

const EditableLabel: React.FC<{ fieldKey: string; defaultKey: TranslationKey }> = ({ fieldKey, defaultKey }) => {
  const { formData, updateCustomLabel } = useBiodata();
  const t = useTranslation(formData.language);
  const labelValue = formData?.customLabels?.[fieldKey] ?? t(defaultKey);

  return (
    <TextField
      fullWidth
      size="small"
      label={t('fieldName')}
      value={labelValue}
      onChange={(e) => updateCustomLabel(fieldKey, e.target.value)}
    />
  );
};

const Step2Education: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updateEducation, setCurrentStep } = useBiodata();
  const t = useTranslation(formData.language);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: formData.education,
  });

  const occupationValue = useWatch({
    control,
    name: 'occupation',
  });

  useEffect(() => {
    reset(formData.education);
  }, [formData.education, reset]);

  const onSubmit = (data: any) => {
    updateEducation(data);
    setCurrentStep(2);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          {t('educationCareer')}
        </Typography>

        <Divider sx={{ borderColor: theme.palette.secondary.main, mb: 3 }} />

        <Box
          sx={{
            '& .fieldRow': {
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '35% 65%' },
              alignItems: 'center',
              gap: 1,
            },
          }}
        >

        {/* Qualification */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box className="fieldRow">
              <EditableLabel fieldKey="qualification" defaultKey="qualification" />
              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.qualification}>
                    <InputLabel>{t('qualification')}</InputLabel>
                    <Select {...field} label={t('qualification')}>
                      {qualificationOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                    {errors.qualification && (
                      <FormHelperText>{errors.qualification?.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </Grid>

          {/* University */}
          <Grid item xs={12}>
            <Box className="fieldRow">
              <EditableLabel fieldKey="university" defaultKey="university" />
              <Controller
                name="university"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('university')}
                    placeholder={t('universityPlaceholder')}
                    error={!!errors.university}
                    helperText={errors.university?.message}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Certifications */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box className="fieldRow">
              <EditableLabel fieldKey="additionalCertifications" defaultKey="certifications" />
              <Controller
                name="additionalCertifications"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={2}
                    label={t('certifications')}
                    placeholder={t('certificationsPlaceholder')}
                    error={!!errors.additionalCertifications}
                    helperText={errors.additionalCertifications?.message}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Occupation */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box className="fieldRow">
              <EditableLabel fieldKey="occupation" defaultKey="occupation" />

              <FormControl fullWidth error={!!errors.occupation}>
                <FormLabel sx={{ mb: 1 }}>{t('occupationLabel')}</FormLabel>

                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {occupationOptions.map((opt) => (
                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                      ))}
                    </RadioGroup>
                  )}
                />

                {errors.occupation && (
                  <FormHelperText>{errors.occupation?.message}</FormHelperText>
                )}
              </FormControl>

            </Box>
          </Grid>
        </Grid>

        {/* Annual Income */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Box className="fieldRow">
              <EditableLabel fieldKey="annualIncome" defaultKey="annualIncome" />

              <Controller
                name="annualIncome"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select {...field} label={t('annualIncome')}>
                      {incomeOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

            </Box>
          </Grid>
        </Grid>

        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep(0)}
            sx={{ minWidth: isMobile ? 'auto' : '150px' }}
          >
            {t('back')}
          </Button>

          <Button
            variant="contained"
            type="submit"
            endIcon={<ArrowForwardIcon />}
            sx={{ minWidth: isMobile ? 'auto' : '150px' }}
          >
            {t('next')}
          </Button>
        </Box>

      </form>
    </Paper>
  );
};

export default Step2Education;