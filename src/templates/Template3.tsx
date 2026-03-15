import React from "react";
import { Box, Typography } from "@mui/material";
import { BiodataFormData } from "../types/biodata.types";
import { useBiodata } from "../context/BiodataContext";
import { useTranslation } from "../utils/translations";
import { deityOptions } from "../utils/deityOptions";

interface Props {
  formData: BiodataFormData;
}

/* ---------- Field Row ---------- */

interface FieldRowProps {
  label: string;
  value?: string | number;
  highlight?: boolean;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, value, highlight }) => {
  if (value === undefined || value === null || value === "") return null;

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
          fontWeight: 600,
          fontSize: highlight ? "0.9rem" : "0.82rem",
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
        fontSize: "0.55rem",
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

const Template3: React.FC<Props> = ({ formData }) => {

  const { personal, family, education, address, photo, selectedDeity, shlokaText, customLabels } = formData;
  const { fieldOrder } = useBiodata();
  const { language } = formData;

  const t = useTranslation(language);

  const getLabel = (key: string) => customLabels?.[key] || t(key as any);

  const brotherText =
    family.totalBrothers > 0
      ? `${family.totalBrothers} (विवाहित: ${family.marriedBrothers})`
      : "";

  const sisterText =
    family.totalSisters > 0
      ? `${family.totalSisters} (विवाहित: ${family.marriedSisters})`
      : "";

  return (
    <Box
      sx={{
        width: 794,
        maxHeight: 1123,
        backgroundImage: "url('/templates/template_3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pl: 20,
        pr: 20,
        py: 5,
        fontFamily: "Noto Sans Devanagari, sans-serif",
      }}
    >

      {/* HEADER */}

      <Box sx={{ textAlign: "center", mb: 1 }}>

        {selectedDeity && selectedDeity !== "none" && (
          <Box sx={{ mb: 0, mt: 10 }}>
            {(() => {
              const deity = deityOptions.find(d => d.id === selectedDeity);
              return deity?.imagePath ? (
                <img
                  src={deity.imagePath}
                  alt={selectedDeity}
                  style={{ width: 48, height: 48, objectFit: "contain" }}
                />
              ) : null;
            })()}
          </Box>
        )}

        {shlokaText && (
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "#8B0000",
              fontWeight: 600,
              mb: 1,
            }}
          >
            {shlokaText}
          </Typography>
        )}

      </Box>

      {/* PHOTO */}

      {photo && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box
            sx={{
              width: 140,
              height: 150,
              border: "3px solid #8B0000",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={photo}
              alt="photo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
      )}

      {/* PERSONAL */}

      <Section title={t("personalDetails")}>

        {fieldOrder.personal.map(key => {

          const value = (personal as any)[key];

          if (key === "religion" && personal.religion && personal.caste) {
            return (
              <FieldRow
                key="religion-caste"
                label={getLabel("religion")}
                value={`${personal.religion} (${personal.caste})`}
              />
            );
          }

          if (key === "caste") return null;

          return (
            <FieldRow
              key={key}
              label={getLabel(key)}
              value={value}
              highlight={key === "fullName"}
            />
          );

        })}

      </Section>

      {/* FAMILY */}

      <Section title={t("familyDetails")}>

        {family.fatherName && (
          <FieldRow
            label={getLabel("fatherName")}
            value={`${family.fatherName} (${family.fatherOccupation || ""})`}
          />
        )}

        {family.motherName && (
          <FieldRow
            label={getLabel("motherName")}
            value={`${family.motherName} (${family.motherOccupation || ""})`}
          />
        )}

        {brotherText && (
          <FieldRow
            label={getLabel("totalBrothers")}
            value={brotherText}
          />
        )}

        {sisterText && (
          <FieldRow
            label={getLabel("totalSisters")}
            value={sisterText}
          />
        )}

        {family.familyType && (
          <FieldRow
            label={getLabel("familyType")}
            value={family.familyType}
          />
        )}

        {family.nativePlace && (
          <FieldRow
            label={getLabel("nativePlace")}
            value={family.nativePlace}
          />
        )}

      </Section>

      {/* EDUCATION */}

      <Section title={t("educationCareer")}>

        {fieldOrder.education.map(key => {

          const value = (education as any)[key];

          return (
            <FieldRow
              key={key}
              label={getLabel(key)}
              value={value}
              highlight={key === "qualification"}
            />
          );

        })}

      </Section>

      {/* ADDRESS */}

      <Section title={t("addressContact")}>

        {address.fullAddress && (
          <FieldRow
            label={getLabel("fullAddress")}
            value={`${address.fullAddress}, ${address.city}, ${address.state} ${address.pincode}`}
          />
        )}

        {address.district && (
          <FieldRow
            label={getLabel("district")}
            value={address.district}
          />
        )}

        {address.mobile && (
          <FieldRow
            label={getLabel("mobile")}
            value={`+91 ${address.mobile}`}
          />
        )}

        {address.email && (
          <FieldRow
            label={getLabel("email")}
            value={address.email}
          />
        )}

      </Section>

    </Box>
  );
};

export default Template3;