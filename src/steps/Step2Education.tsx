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
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import { educationSchema } from '../schemas/biodata.schema';
import { qualificationOptions, incomeOptions, occupationOptions } from '../utils/dropdownOptions';

const Step2Education: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updateEducation, setCurrentStep } = useBiodata();
  const t = useTranslation(formData.language);

  const {
    control,
    handleSubmit,
    reset,
    watch,
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

  const showCompanyFields =
    occupationValue && !['Farmer', 'Other', 'Self-employed', 'Business'].includes(occupationValue);

  const onSubmit = (data: any) => {
    updateEducation(data);
    setCurrentStep(2);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* SECTION — Education & Career */}
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, marginBottom: 1 }}>
          {t('educationCareer')}
        </Typography>
        <Divider sx={{ borderColor: theme.palette.secondary.main, marginBottom: 3 }} />

        {/* Row 1 */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.qualification}>
                  <InputLabel>{t('qualification')}</InputLabel>
                  <Select {...field} label={t('qualification')}>
                    {qualificationOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.qualification && <FormHelperText>{errors.qualification?.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="university"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('university')}
                  placeholder="University / Board name"
                  error={!!errors.university}
                  helperText={errors.university?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
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
                  placeholder="Any extra certificates, courses..."
                  error={!!errors.additionalCertifications}
                  helperText={errors.additionalCertifications?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 3 — Occupation Radio */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.occupation}>
              <FormLabel sx={{ marginBottom: 1 }}>नोकरी / व्यवसाय प्रकार</FormLabel>
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
              {errors.occupation && <FormHelperText>{errors.occupation?.message}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Row 4 — Conditional Company Fields */}
        {/* <Collapse in={showCompanyFields}>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Company / Business Name"
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Job Title / Position"
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Collapse> */}

        {/* Row 5 */}
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="annualIncome"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('annualIncome')}</InputLabel>
                  <Select {...field} label={t('annualIncome')}>
                    {incomeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep(0)}
            sx={{ minWidth: isMobile ? 'auto' : '150px' }}
          >
            {t('back')}
          </Button>
          <Button
            variant="contained"
            color="primary"
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
