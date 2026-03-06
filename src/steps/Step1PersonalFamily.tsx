import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler } from 'react-hook-form';
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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useBiodata } from '../context/BiodataContext';
import { useTranslation, TranslationKey } from '../utils/translations';
import DeitySelector from '../components/DeitySelector';
import ShlokaEditor from '../components/ShlokaEditor';
import { personalFamilySchema, PersonalFamilyFormValues } from '../schemas/biodata.schema';
import {
  rashiOptions,
  nakshatraOptions,
  bloodGroupOptions,
  complexionOptions,
  heightOptions,
  religionOptions,
  manglikOptions,
  familyTypeOptions,
  gotraOptions,
} from '../utils/dropdownOptions';

const Step1PersonalFamily: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { formData, updatePersonal, updateFamily, setCurrentStep, updateDeity, updateShlokaText } = useBiodata();
  const t = useTranslation(formData.language);

  type PersonalFamilyInput = z.input<typeof personalFamilySchema>;
  type PersonalFamilyOutput = z.output<typeof personalFamilySchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalFamilyFormValues>({
    resolver: zodResolver(personalFamilySchema),
    defaultValues: {
  fullName: formData.personal.fullName ?? '',
  religion: formData.personal.religion ?? '',
  dateOfBirth: formData.personal.dateOfBirth ?? '',
  timeOfBirth: formData.personal.timeOfBirth ?? '',
  placeOfBirth: formData.personal.placeOfBirth ?? '',
  rashi: formData.personal.rashi ?? '',
  nakshatra: formData.personal.nakshatra ?? '',
  gotra: formData.personal.gotra ?? '',
  caste: formData.personal.caste ?? '',
  subCaste: formData.personal.subCaste ?? '',
  height: formData.personal.height ?? '',
  complexion: formData.personal.complexion ?? '',
  bloodGroup: formData.personal.bloodGroup ?? '',
  manglik: formData.personal.manglik ?? '',
  fatherName: formData.family.fatherName ?? '',
  fatherOccupation: formData.family.fatherOccupation ?? '',
  motherName: formData.family.motherName ?? '',
  motherOccupation: formData.family.motherOccupation ?? '',
  totalBrothers: formData.family.totalBrothers ?? 0,
  marriedBrothers: formData.family.marriedBrothers ?? 0,
  totalSisters: formData.family.totalSisters ?? 0,
  marriedSisters: formData.family.marriedSisters ?? 0,
  familyType: formData.family.familyType ?? '',
  nativePlace: formData.family.nativePlace ?? '',
},
  });

  useEffect(() => {
    reset({
      fullName: formData.personal.fullName ?? '',
  dateOfBirth: formData.personal.dateOfBirth ?? '',
  timeOfBirth: formData.personal.timeOfBirth ?? '',
  placeOfBirth: formData.personal.placeOfBirth ?? '',
  rashi: formData.personal.rashi ?? '',
  nakshatra: formData.personal.nakshatra ?? '',
  gotra: formData.personal.gotra ?? '',
  religion: formData.personal.religion ?? '',
  caste: formData.personal.caste ?? '',
  subCaste: formData.personal.subCaste ?? '',
  height: formData.personal.height ?? '',
  complexion: formData.personal.complexion ?? '',
  bloodGroup: formData.personal.bloodGroup ?? '',
  manglik: formData.personal.manglik ?? '',
  fatherName: formData.family.fatherName ?? '',
  fatherOccupation: formData.family.fatherOccupation ?? '',
  motherName: formData.family.motherName ?? '',
  motherOccupation: formData.family.motherOccupation ?? '',
  totalBrothers: formData.family.totalBrothers ?? 0,
  marriedBrothers: formData.family.marriedBrothers ?? 0,
  totalSisters: formData.family.totalSisters ?? 0,
  marriedSisters: formData.family.marriedSisters ?? 0,
  familyType: formData.family.familyType ?? '',
  nativePlace: formData.family.nativePlace ?? '',
    });
  }, [formData]);

  const onSubmit: SubmitHandler<PersonalFamilyFormValues> = (data) => {
    updatePersonal({
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      timeOfBirth: data.timeOfBirth ?? '',
      placeOfBirth: data.placeOfBirth,
      rashi: data.rashi,
      nakshatra: data.nakshatra ?? '',
      gotra: data.gotra ?? '',
      religion: data.religion,
      caste: data.caste ?? '',
      subCaste: data.subCaste ?? '',
      height: data.height ?? '',
      complexion: data.complexion ?? '',
      bloodGroup: data.bloodGroup ?? '',
      manglik: data.manglik ?? '',
    });

    updateFamily({
      fatherName: data.fatherName,
      fatherOccupation: data.fatherOccupation ?? '',
      motherName: data.motherName,
      motherOccupation: data.motherOccupation ?? '',
      totalBrothers: data.totalBrothers,
      marriedBrothers: data.marriedBrothers,
      totalSisters: data.totalSisters,
      marriedSisters: data.marriedSisters,
      familyType: data.familyType ?? '',
      nativePlace: data.nativePlace ?? '',
    });

    setCurrentStep(1);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         {/* SECTION — Deity Selection & Blessing */}
        <Paper sx={{ padding: 2, mt: 2, mb: 3 }}>
          <DeitySelector
            selectedDeity={formData.selectedDeity}
            onSelectDeity={(id) => updateDeity(id)}
            language={formData.language}
          />

          <Divider sx={{ my: 2 }} />

          <ShlokaEditor
            shlokaText={formData.shlokaText}
            onUpdateShloka={(text) => updateShlokaText(text)}
            language={formData.language}
          />
        </Paper>


        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          {t('personalDetails')}
        </Typography>
        <Divider sx={{ borderColor: theme.palette.secondary.main, mb: 3 }} />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth required label={t('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth required type="date"
                  label={t('dateOfBirth')}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
          </Grid>
        </Grid>

       

        {/* Row 2 — Time of Birth + Place of Birth */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="timeOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="time"
                  label={t('timeOfBirth')}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.timeOfBirth}
                  helperText={errors.timeOfBirth?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="placeOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label={t('placeOfBirth')}
                  error={!!errors.placeOfBirth}
                  helperText={errors.placeOfBirth?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 3 — Rashi + Nakshatra */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
         <Grid item xs={12} sm={6}>
            <Controller
              name="rashi"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.rashi}>
                  <InputLabel>{t('rashi')}</InputLabel>
                  <Select {...field} label={t('rashi')}>
                    {rashiOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                  {/* ✅ Only show FormHelperText when error exists */}
                  {errors.rashi && (
                    <FormHelperText>{errors.rashi.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nakshatra"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('nakshatra')}</InputLabel>
                  <Select {...field} label={t('nakshatra')}>
                    {nakshatraOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

       
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.religion}>
                  <InputLabel>{t('religion')}</InputLabel>
                  <Select {...field} label={t('religion')}>
                    {religionOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                  {errors.religion && (
                    <FormHelperText>{errors.religion.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="gotra"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('gotra')}</InputLabel>
                  <Select {...field} label={t('gotra')}>
                    {gotraOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {t(`gotra_${opt}` as TranslationKey)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* Row 5 — Caste + Sub-Caste */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="caste"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('caste')}
                  error={!!errors.caste}
                  helperText={errors.caste?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="subCaste"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('subCaste')}
                  error={!!errors.subCaste}
                  helperText={errors.subCaste?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 6 — Height + Complexion */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('height')}</InputLabel>
                  <Select {...field} label={t('height')}>
                    {heightOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="complexion"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('complexion')}</InputLabel>
                  <Select {...field} label={t('complexion')}>
                    {complexionOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* Row 7 — Blood Group + Manglik */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('bloodGroup')}</InputLabel>
                  <Select {...field} label={t('bloodGroup')}>
                    {bloodGroupOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="manglik"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('manglik')}</InputLabel>
                  <Select {...field} label={t('manglik')}>
                    {manglikOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* ── SECTION B: Family Details ── */}
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1, mt: 4 }}>
          {t('familyDetails')}
        </Typography>
        <Divider sx={{ borderColor: theme.palette.secondary.main, mb: 3 }} />

        {/* Row 8 — Father Name + Occupation */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fatherName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label={t('fatherName')}
                  error={!!errors.fatherName}
                  helperText={errors.fatherName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fatherOccupation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('fatherOccupation')}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 9 — Mother Name + Occupation */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="motherName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label={t('motherName')}
                  error={!!errors.motherName}
                  helperText={errors.motherName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="motherOccupation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('motherOccupation')}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 10 — Brothers */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="totalBrothers"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label={t('brothers')}
                  inputProps={{ min: 0, max: 10 }}
                  // ✅ onChange converts to number for z.coerce compatibility
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.totalBrothers}
                  helperText={errors.totalBrothers?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="marriedBrothers"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label={`${t('married')} ${t('brothers').toLowerCase()}`}
                  inputProps={{ min: 0, max: 10 }}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.marriedBrothers}
                  helperText={errors.marriedBrothers?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 11 — Sisters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="totalSisters"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label={t('sisters')}
                  inputProps={{ min: 0, max: 10 }}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.totalSisters}
                  helperText={errors.totalSisters?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="marriedSisters"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label={`${t('married')} ${t('sisters').toLowerCase()}`}
                  inputProps={{ min: 0, max: 10 }}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.marriedSisters}
                  helperText={errors.marriedSisters?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 12 — Family Type + Native Place */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="familyType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t('familyType')}</InputLabel>
                  <Select {...field} label={t('familyType')}>
                    {familyTypeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nativePlace"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('nativePlace')}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ── Submit Button ── */}
        <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{ minWidth: isMobile ? '100%' : '200px' }}
          >
            {t('next')}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Step1PersonalFamily;