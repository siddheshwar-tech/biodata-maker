import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation, TranslationKey } from '../utils/translations';
import { addressSchema } from '../schemas/biodata.schema';
import { indianStates } from '../utils/dropdownOptions';

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

const Step3Address: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updateAddress, setCurrentStep } = useBiodata();
  const t = useTranslation(formData.language);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address,
  });

  useEffect(() => {
    reset(formData.address);
  }, [formData.address, reset]);

  const onSubmit = (data: any) => {
    updateAddress(data);
    setCurrentStep(3);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          {t('fullAddress')}
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

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="fullAddress" defaultKey="fullAddress" />

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
                      placeholder={t('addressPlaceholder')}
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
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="city" defaultKey="city" />

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
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="district" defaultKey="district" />

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
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="state" defaultKey="state" />

                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.state}>
                      <Select {...field} label={t('state')}>
                        {indianStates.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.state && (
                        <FormHelperText>{errors.state?.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="pincode" defaultKey="pincode" />

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
              </Box>
            </Grid>
          </Grid>

        </Box>

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

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="mobile" defaultKey="mobile" />

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
                      helperText={errors.mobile?.message || t('mobileHelperText')}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Box className="fieldRow">
                <EditableLabel fieldKey="email" defaultKey="email" />

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
                      helperText={errors.email?.message || t('optionalLabel')}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep(1)}
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

export default Step3Address;