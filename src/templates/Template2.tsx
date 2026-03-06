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
  if (!value) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: "1px",
        borderBottom: "1px dotted rgba(0,0,0,0.15)",
      }}
    >
      <Typography
        sx={{
          width: "45%",
          fontWeight: 600,
          fontSize: highlight ? "0.9rem" : "0.82rem",
          color: "#8B0000",
          textAlign: "left",
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
          textAlign: "left",
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

const Template2: React.FC<Props> = ({ formData }) => {
  const { personal, family, education, address, photo, selectedDeity, shlokaText } = formData;
  const { fieldOrder } = useBiodata();
  const { language } = formData;
  const t = useTranslation(language);

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
        minHeight: 1123,

        /* --- BORDER FRAME IMAGE --- */

        backgroundImage: "url('/templates/template_1.jpg')",
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

        {/* Deity SVG or fallback Om */}
        {selectedDeity && selectedDeity !== 'none' ? (
          <Box sx={{ mb: 0, mt: 2 }}>
            {(() => {
              const selectedDeityData = deityOptions.find((d) => d.id === selectedDeity);
              return selectedDeityData?.imagePath ? (
                <img
                  src={selectedDeityData.imagePath}
                  alt={selectedDeity}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : null;
            })()}
          </Box>
        ) : (
          <Typography sx={{
            fontSize: '1.5rem',
            color: '#8B0000',
            lineHeight: 1,
            mb: 1
          }}>
            ॐ
          </Typography>
        )}

        {/* Shloka line */}
        {shlokaText && (
          <Typography sx={{
            fontSize: '0.7rem',
            color: '#8B0000',
            fontWeight: 600,
            fontFamily: '"Noto Sans Devanagari", sans-serif',
            letterSpacing: '0.5px',
            mb: 1,
          }}>
            {shlokaText}
          </Typography>
        )}

        {/* <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#8B0000",
            letterSpacing: "2px",
          }}
        >
          {t('biodataTitle')}
        </Typography> */}
      </Box>

      {/* PHOTO */}

      {photo && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Box
            sx={{
              width: 120,
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

      <Section title={t('personalDetails')}>
        {(() => {
          const labelMap: Record<string, string> = {
            fullName: t('fullName'),
            dateOfBirth: t('dateOfBirth'),
            timeOfBirth: t('timeOfBirth'),
            placeOfBirth: t('placeOfBirth'),
            rashi: t('rashi'),
            nakshatra: t('nakshatra'),
            gotra: t('gotra'),
            religion: t('religion'),
            caste: t('caste'),
            subCaste: t('subCaste'),
            height: t('height'),
            complexion: t('complexion'),
            bloodGroup: t('bloodGroup'),
            manglik: t('manglik'),
          };

          // combine religion and caste when both exist
          const keys = fieldOrder?.personal || Object.keys(labelMap);
          const seen = new Set<string>();
          return keys.reduce<React.ReactNode[]>((acc, key) => {
            if (seen.has(key)) return acc;
            if (key === 'religion' || key === 'caste') {
              seen.add('religion');
              seen.add('caste');
              const rel = personal.religion;
              const cast = personal.caste;
              if (rel && cast) {
                acc.push(
                  <FieldRow
                    key="religion-caste"
                    label={t('religion')}
                    value={`${rel} (${cast})`}
                  />
                );
              } else if (rel) {
                acc.push(
                  <FieldRow key="religion" label={t('religion')} value={rel} />
                );
              } else if (cast) {
                acc.push(
                  <FieldRow key="caste" label={t('caste')} value={cast} />
                );
              }
              return acc;
            }
            seen.add(key);
            const val = (personal as any)[key];
            acc.push(
              <FieldRow
                key={key}
                label={labelMap[key] || key}
                value={val}
                highlight={key === "fullName"}
              />
            );
            return acc;
          }, []);
        })()}
      </Section>

      {/* FAMILY */}

      <Section title={t('familyDetails')}>
        {(() => {
          const fatherDisplay =
            family.fatherName && family.fatherOccupation
              ? `${family.fatherName} (${family.fatherOccupation})`
              : family.fatherName || family.fatherOccupation;

          const motherDisplay =
            family.motherName && family.motherOccupation
              ? `${family.motherName} (${family.motherOccupation})`
              : family.motherName || family.motherOccupation;

          return [
            fatherDisplay ? (
              <FieldRow
                key="father"
                label={t('fatherName')}
                value={fatherDisplay}
              />
            ) : null,
            motherDisplay ? (
              <FieldRow
                key="mother"
                label={t('motherName')}
                value={motherDisplay}
              />
            ) : null,
            family.totalBrothers > 0 ? (
              <FieldRow
                key="brothers"
                label={t('brothers')}
                value={brotherText}
              />
            ) : null,
            family.totalSisters > 0 ? (
              <FieldRow
                key="sisters"
                label={t('sisters')}
                value={sisterText}
              />
            ) : null,
            family.familyType ? (
              <FieldRow
                key="familyType"
                label={t('familyType')}
                value={family.familyType}
              />
            ) : null,
            family.nativePlace ? (
              <FieldRow
                key="nativePlace"
                label={t('nativePlace')}
                value={family.nativePlace}
              />
            ) : null,
          ].filter(Boolean);
        })()}
      </Section>

      {/* EDUCATION */}

      <Section title={t('educationCareer')}>
        {(() => {
          const labelMap: Record<string, string> = {
            qualification: t('qualification'),
            university: t('university'),
            occupation: t('occupation'),
            companyName: t('companyName'),
            jobTitle: t('jobTitle'),
            annualIncome: t('annualIncome'),
          };

          // compute combined display for qualification + university
          const qualDisplay = education.qualification
            ? education.university
              ? `${education.qualification} (${education.university})`
              : education.qualification
            : '';

          return (fieldOrder?.education || Object.keys(labelMap)).map((key) => {
            if (key === 'qualification') {
              return (
                <FieldRow
                  key="qualification"
                  label={labelMap.qualification}
                  value={qualDisplay}
                  highlight
                />
              );
            }
            if (key === 'university') {
              return null;
            }
            const val = (education as any)[key];
            return (
              <FieldRow
                key={key}
                label={labelMap[key]}
                value={val}
                highlight={false}
              />
            );
          });
        })()}
      </Section>

      {/* ADDRESS */}

      <Section title={t('addressContact')}>
        {(() => {
          // Combine address fields into a single line
          const addressParts = [];
          if (address.fullAddress) addressParts.push(address.fullAddress);
          if (address.city) addressParts.push(address.city);
          if (address.state) addressParts.push(address.state);
          if (address.pincode) addressParts.push(address.pincode);
          const combinedAddress = addressParts.join(", ");

          const rows = [address.district, address.mobile, address.email].filter(Boolean).length;

          return [
            combinedAddress ? (
              <FieldRow
                key="address"
                label={t('fullAddress')}
                value={combinedAddress}
              />
            ) : null,
            address.district ? (
              <FieldRow
                key="district"
                label={t('district')}
                value={address.district}
              />
            ) : null,
            address.mobile ? (
              <FieldRow
                key="mobile"
                label={t('mobile')}
                value={`+91 ${address.mobile}`}
              />
            ) : null,
            address.email ? (
              <FieldRow
                key="email"
                label={t('email')}
                value={address.email}
              />
            ) : null,
          ].filter(Boolean);
        })()}
      </Section>
    </Box>
  );
};

export default Template2;