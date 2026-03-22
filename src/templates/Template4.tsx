import React from "react";
import { Box, Typography } from "@mui/material";
import { BiodataFormData } from "../types/biodata.types";
import { useBiodata } from "../context/BiodataContext";
import { useTranslation } from "../utils/translations";
import { deityOptions } from "../utils/deityOptions";

import {
  getTranslatedValue,
  getTranslatedLabel,
  formatReligionCaste,
  formatParents,
  formatSiblings,
  formatAddress,
} from "../utils/fieldTranslation";


interface Props {
  formData: BiodataFormData;
}

/* ---------- CONFIG: field → translation prefix ---------- */

const TRANSLATABLE_FIELDS: Record<string, string> = {
  rashi: "rashi",
  nakshatra: "nakshatra",
  gotra: "gotra",
  religion: "religion",
  manglik: "manglik",
  complexion: "complexion",
  familyType: "familyType",
  occupation: "occupation",
  annualIncome: "income",
};

/* ---------- Field Row ---------- */

interface FieldRowProps {
  label: string;
  value?: string | number;
  highlight?: boolean;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, value, highlight }) => {
  if (!value) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: "2px",
        borderBottom: "1px dotted rgba(0,0,0,0.15)",
      }}
    >
      <Typography
        sx={{
          width: "45%",
          fontWeight: 500,
          fontSize: highlight ? "0.8rem" : "0.72rem",
          color: "#8B0000",
        }}
      >
        {label}
      </Typography>

      <Typography sx={{ mx: 1 }}>:</Typography>

      <Typography
        sx={{
          flex: 1,
          fontWeight: highlight ? 700 : 400,
          fontSize: highlight ? "0.9rem" : "0.82rem",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

/* ---------- Section ---------- */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Box sx={{ mt: 1 }}>
    <Typography
      sx={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: "0.85rem",
        color: "#8B0000",
        mb: 0.5,
      }}
    >
      {title}
    </Typography>

    <Box sx={{ maxWidth: 450, mx: "auto", borderTop: "2px solid #D4AF37", mb: 0.5 }} />

    {children}
  </Box>
);

/* ---------- Template ---------- */

const Template4: React.FC<Props> = ({ formData }) => {
  const {
    personal,
    family,
    education,
    address,
    photo,
    selectedDeity,
    shlokaText,
    customLabels,
    language,
  } = formData;

  const { fieldOrder } = useBiodata();
  const t = useTranslation(language);

  /* ---------- label resolver ---------- */

  const getLabel = (key: string) =>
    customLabels?.[key] || t(key as any);

  /* ---------- value resolver (SCALABLE CORE) ---------- */

  const getValue = (field: string, value: any) => {
    if (!value) return value;

    const prefix = TRANSLATABLE_FIELDS[field];
    if (!prefix) return value;

    return t(`${prefix}_${value}` as any);
  };

  /* ---------- helpers ---------- */

  const brotherText =
    family.totalBrothers > 0
      ? `${family.totalBrothers} (${family.marriedBrothers})`
      : "";

  const sisterText =
    family.totalSisters > 0
      ? `${family.totalSisters} (${family.marriedSisters})`
      : "";

  /* ---------- render ---------- */

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        backgroundImage: "url('/templates/template_4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pl: 30,
        pr: 20,
        py: 6,
        boxSizing: "border-box",
        fontFamily: "Noto Sans Devanagari, sans-serif",
      }}
    >
      {/* HEADER */}

      <Box sx={{ textAlign: "center", mb: 1 }}>
        {selectedDeity && selectedDeity !== "none" && (
          <Box sx={{ mb: 1 }}>
            {(() => {
              const d = deityOptions.find((x) => x.id === selectedDeity);
              return d?.imagePath ? (
                <img src={d.imagePath} style={{ width: 48, height: 48 }} />
              ) : null;
            })()}
          </Box>
        )}

        {shlokaText && (
          <Typography sx={{ fontSize: "0.7rem", color: "#8B0000", mb: 1 }}>
            {shlokaText}
          </Typography>
        )}

        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, color: "#8B0000" }}>
          {t("biodataTitle")}
        </Typography>
      </Box>

      {/* PHOTO */}

      {photo && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box sx={{ width: 120, height: 150, border: "3px solid #8B0000" }}>
            <img src={photo} style={{ width: "100%", height: "100%" }} />
          </Box>
        </Box>
      )}

      {/* PERSONAL */}

      <Section title={t("personalDetails")}>
        {(fieldOrder.personal || Object.keys(personal)).map((key) => {
          const val = personal[key as keyof typeof personal];

          if (key === "religion" || key === "caste") {
            if (key !== "religion") return null;

            return (
              <FieldRow
                key="religion"
                label={getTranslatedLabel(t, "religion", customLabels)}
                value={formatReligionCaste(
                  t,
                  personal.religion,
                  personal.caste
                )}
              />
            );
          }

          return (
            <FieldRow
              key={key}
              label={getTranslatedLabel(t, key, customLabels)}
              value={getTranslatedValue(t, key, val)}
            />
          );
        })}
      </Section>

      {/* FAMILY */}
      <Section title={t("familyDetails")}>
        <FieldRow
          label={getTranslatedLabel(t, "fatherName", customLabels)}
          value={formatParents(family.fatherName, family.fatherOccupation)}
        />
        <FieldRow
          label={getTranslatedLabel(t, "motherName", customLabels)}
          value={formatParents(family.motherName, family.motherOccupation)}
        />
        <FieldRow
          label={getTranslatedLabel(t, "brothers", customLabels)}
          value={formatSiblings(
            family.totalBrothers,
            family.marriedBrothers
          )}
        />
        <FieldRow
          label={getTranslatedLabel(t, "sisters", customLabels)}
          value={formatSiblings(
            family.totalSisters,
            family.marriedSisters
          )}
        />

        <FieldRow
          label={getTranslatedLabel(t, "familyType", customLabels)}
          value={getTranslatedValue(t, "familyType", family.familyType)}
        />

        <FieldRow
          label={getTranslatedLabel(t, "nativePlace", customLabels)}
          value={family.nativePlace}
        />
      </Section>


      {/* EDUCATION */}
      <Section title={t("educationCareer")}>
        {(fieldOrder.education || Object.keys(education)).map((key) => {
          const val = education[key as keyof typeof education];
          return (
            <FieldRow
              key={key}
              label={getTranslatedLabel(t, key, customLabels)}
              value={getTranslatedValue(t, key, val)}
            />
          );
        })}
      </Section>


      {/* ADDRESS */}
      <Section title={t("addressContact")}>
        <FieldRow label={t("fullAddress")} value={formatAddress(address)}/>
        <FieldRow label={t("district")} value={address.district} />
        <FieldRow
          label={t("mobile")}
          value={address.mobile ? `+91 ${address.mobile}` : ""}
        />
        <FieldRow label={t("email")} value={address.email} />
      </Section>
    </Box>
  );
};

export default Template4;