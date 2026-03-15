import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useBiodata } from "../context/BiodataContext";
import { useTranslation, TranslationKey } from "../utils/translations";

import FieldRow from "../components/form/FieldRow";
import DeitySelector from "../components/DeitySelector";
import ShlokaEditor from "../components/ShlokaEditor";

import {
  personalFamilySchema,
  PersonalFamilyFormValues,
} from "../schemas/biodata.schema";

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
} from "../utils/dropdownOptions";

const EditableLabel: React.FC<{
  fieldKey: string;
  defaultKey: TranslationKey;
}> = ({ fieldKey, defaultKey }) => {
  const { formData, updateCustomLabel } = useBiodata();
  const t = useTranslation(formData.language);

  const labelValue =
    formData?.customLabels?.[fieldKey] ?? t(defaultKey);

  return (
    <TextField
      fullWidth
      size="small"
      label={t("fieldName")}
      value={labelValue}
      onChange={(e) =>
        updateCustomLabel(fieldKey, e.target.value)
      }
    />
  );
};

const Step1PersonalFamily: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    formData,
    updatePersonal,
    updateFamily,
    setCurrentStep,
    updateDeity,
    updateShlokaText,
    fieldOrder,
    removeField,
  } = useBiodata();

  const t = useTranslation(formData.language);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalFamilyFormValues>({
    resolver: zodResolver(personalFamilySchema),
    defaultValues: {
      ...formData.personal,
      ...formData.family,
    },
  });

  useEffect(() => {
    reset({
      ...formData.personal,
      ...formData.family,
    });
  }, [formData, reset]);

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

  const renderPersonalField = (field: string) => {
    switch (field) {
      case "fullName":
        return (
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />
        );

      case "dateOfBirth":
        return (
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label={t("dateOfBirth")}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        );

      case "timeOfBirth":
      return (
        <Controller
          name="timeOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="time"
              fullWidth
              label={t("timeOfBirth")}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      );

      case "placeOfBirth":
        return (
          <Controller
            name="placeOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t("placeOfBirth")}
              />
            )}
          />
        );

      case "rashi":
        return (
          <Controller
            name="rashi"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>{t("rashi")}</InputLabel>
                <Select {...field} label={t("rashi")}>
                  {rashiOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );

      case "nakshatra":
        return (
          <Controller
            name="nakshatra"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>{t("nakshatra")}</InputLabel>
                <Select {...field} label={t("nakshatra")}>
                  {nakshatraOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );

      case "height":
        return (
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>{t("height")}</InputLabel>
                <Select {...field} label={t("height")}>
                  {heightOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );

      case "bloodGroup":
        return (
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>{t("bloodGroup")}</InputLabel>
                <Select {...field} label={t("bloodGroup")}>
                  {bloodGroupOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );

        case "gotra":
      return (
        <Controller
          name="gotra"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("gotra")}</InputLabel>
              <Select {...field} label={t("gotra")}>
                {gotraOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );

    case "religion":
      return (
        <Controller
          name="religion"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("religion")}</InputLabel>
              <Select {...field} label={t("religion")}>
                {religionOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );

    case "caste":
      return (
        <Controller
          name="caste"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label={t("caste")} />
          )}
        />
      );

    case "subCaste":
      return (
        <Controller
          name="subCaste"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label={t("subCaste")} />
          )}
        />
      );

        case "height":
      return (
        <Controller
          name="height"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("height")}</InputLabel>
              <Select {...field} label={t("height")}>
                {heightOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );

    case "complexion":
      return (
        <Controller
          name="complexion"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("complexion")}</InputLabel>
              <Select {...field} label={t("complexion")}>
                {complexionOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );

    case "bloodGroup":
      return (
        <Controller
          name="bloodGroup"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("bloodGroup")}</InputLabel>
              <Select {...field} label={t("bloodGroup")}>
                {bloodGroupOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );

    case "manglik":
      return (
        <Controller
          name="manglik"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>{t("manglik")}</InputLabel>
              <Select {...field} label={t("manglik")}>
                {manglikOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Paper sx={{ p: 2, mb: 3 }}>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <DeitySelector
              selectedDeity={formData.selectedDeity}
              onSelectDeity={(id) => updateDeity(id)}
              language={formData.language}
            />

            {/* <Divider sx={{ my: 2 }} /> */}

            <ShlokaEditor
              shlokaText={formData.shlokaText}
              onUpdateShloka={(text) =>
                updateShlokaText(text)
              }
              language={formData.language}
            />
          </Box>
        </Paper>

        <Typography variant="h6">
          {t("personalDetails")}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {fieldOrder.personal.map((field) => (
          <FieldRow
            key={field}
            label={
              <EditableLabel
                fieldKey={field}
                defaultKey={field as TranslationKey}
              />
            }
            onDelete={() => removeField("personal", field)}
          >
            {renderPersonalField(field)}
          </FieldRow>
        ))}

        <Typography variant="h6" sx={{ mt: 4 }}>
          {t("familyDetails")}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {fieldOrder.family.map((field) => (
          <FieldRow
            key={field}
            label={
              <EditableLabel
                fieldKey={field}
                defaultKey={field as TranslationKey}
              />
            }
            onDelete={() => removeField("family", field)}
          >
            <Controller
              name={field as any}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t(field as TranslationKey)}
                />
              )}
            />
          </FieldRow>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile
              ? "center"
              : "flex-end",
            mt: 3,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{ minWidth: 200 }}
          >
            {t("next")}
          </Button>
        </Box>

      </form>
    </Paper>
  );
};

export default Step1PersonalFamily;