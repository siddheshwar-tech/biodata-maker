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
  FormControlLabel,
  Checkbox,
  Collapse,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation } from '../utils/translations';
import { addressSchema } from '../schemas/biodata.schema';
import { indianStates } from '../utils/dropdownOptions';

const Step3Address: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updateAddress, setCurrentStep } = useBiodata();
  const t = useTranslation(formData.language);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address,
  });

  const whatsappSameAsMobile = useWatch({
    control,
    name: 'whatsappSameAsMobile',
  });

  const mobileValue = useWatch({
    control,
    name: 'mobile',
  });

  useEffect(() => {
    reset(formData.address);
  }, [formData.address, reset]);

  useEffect(() => {
    if (whatsappSameAsMobile && mobileValue) {
      setValue('whatsapp', mobileValue);
    }
  }, [whatsappSameAsMobile, mobileValue, setValue]);

  const onSubmit = (data: any) => {
    updateAddress(data);
    setCurrentStep(3);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, marginBottom: 1 }}>
          {t('fullAddress')}
        </Typography>
        <Divider sx={{ borderColor: theme.palette.secondary.main, marginBottom: 3 }} />

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <Controller
              name="fullAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label={t('fullAddress')}
                  placeholder="घर नंबर, बिल्डिंग, रस्त्याचे नाव..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.fullAddress}
                  helperText={errors.fullAddress?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('city')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('district')}
                  error={!!errors.district}
                  helperText={errors.district?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel>{t('state')}</InputLabel>
                  <Select {...field} label={t('state')}>
                    {indianStates.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && <FormHelperText>{errors.state?.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('pincode')}
                  type="tel"
                  inputProps={{ maxLength: 6 }}
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main, marginBottom: 1, marginTop: 4 }}>
          {t('addressContact')}
        </Typography>
        <Divider sx={{ borderColor: theme.palette.secondary.main, marginBottom: 3 }} />

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('mobile')}
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon /> +91
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message || '10 अंकी मोबाईल नंबर'}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="whatsappSameAsMobile"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={t('sameAsMobile')}
            />
          </Grid>
        </Grid>

        <Collapse in={!whatsappSameAsMobile}>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12}>
              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('whatsapp')}
                    type="tel"
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WhatsAppIcon sx={{ color: '#25D366' }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.whatsapp}
                    helperText={errors.whatsapp?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Collapse>

        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={8}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('email')}
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message || 'Optional / ऐच्छिक'}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep(1)}
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

export default Step3Address;
