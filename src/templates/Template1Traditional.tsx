import React from 'react';
import { Box, Typography } from '@mui/material';
import { BiodataFormData } from '../types/biodata.types';
import { useBiodata } from '../context/BiodataContext';
import { deityOptions } from '../utils/deityOptions';
import { useTranslation } from '../utils/translations';

interface Props {
  formData: BiodataFormData;
}

// ─── Dynamic Spacing Calculator ─────────────────────────────────
/**
 * Calculates dynamic spacing to fit all biodata content on a single A4 page.
 * 
 * Algorithm:
 * 1. Count visible fields across all sections
 * 2. Calculate available space (A4 height minus fixed elements)
 * 3. Estimate required space with base values
 * 4. Calculate compression factor to fit everything
 * 5. Scale spacing proportionally while maintaining minimum readable sizes
 */
const calculateDynamicSpacing = (formData: BiodataFormData) => {
  const { personal, family, education, address, photo, fieldOrder } = formData;

  // Count visible fields in each section
  const countVisibleFields = (section: any, keys: string[]) => {
    return keys.filter(key => {
      const val = section[key];
      return val !== undefined && val !== null && val !== '' && val !== 0;
    }).length;
  };

  const personalKeys = fieldOrder?.personal || [
    'fullName', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth', 'rashi', 'nakshatra',
    'gotra', 'religion', 'caste', 'subCaste', 'height', 'complexion', 'bloodGroup', 'manglik'
  ];
  const familyKeys = fieldOrder?.family || [
    'fatherName', 'fatherOccupation', 'motherName', 'motherOccupation',
    'totalBrothers', 'marriedBrothers', 'totalSisters', 'marriedSisters', 'familyType', 'nativePlace'
  ];
  const educationKeys = fieldOrder?.education || [
    'qualification', 'university', 'additionalCertifications', 'occupation',
    'companyName', 'jobTitle', 'annualIncome'
  ];
  const addressKeys = fieldOrder?.address || [
    'fullAddress', 'city', 'district', 'state', 'pincode', 'mobile', 'whatsapp', 'email'
  ];

  const personalCount = countVisibleFields(personal, personalKeys);
  const familyCount = countVisibleFields(family, familyKeys);
  const educationCount = countVisibleFields(education, educationKeys);
  const addressCount = countVisibleFields(address, addressKeys);

  const totalFields = personalCount + familyCount + educationCount + addressCount;
  const totalSections = 4; // Always 4 sections

  // A4 page height at 96dpi: 1123px
  // Fixed space: header (200px including deity image), photo (150px if present), borders/padding (100px), footer (50px)
  const fixedSpace = 200 + (photo ? 150 : 0) + 100 + 50;
  const availableSpace = 1123 - fixedSpace;

  // Base spacing values (when content is minimal)
  const baseFieldHeight = 24; // px per field
  const baseSectionSpacing = 32; // px between sections
  const baseDividerHeight = 16; // px for dividers

  // Calculate required space with base values
  const requiredSpace = (totalFields * baseFieldHeight) + (totalSections * baseSectionSpacing) + ((totalSections - 1) * baseDividerHeight);

  // Calculate compression factor (how much we need to squeeze)
  const compressionFactor = Math.min(1, availableSpace / requiredSpace);

  // Dynamic spacing values with minimums for readability
  const fieldPadding = Math.max(2, 4 * compressionFactor); // Min 2px, max 4px
  const sectionMargin = Math.max(8, 24 * compressionFactor); // Min 8px, max 24px
  const dividerMargin = Math.max(4, 8 * compressionFactor); // Min 4px, max 8px
  const fontSize = Math.max(10, 12 * compressionFactor); // Min 10px, max 12px
  const highlightFontSize = Math.max(11, 13 * compressionFactor); // Min 11px, max 13px

  // Debug logging (remove in production)
  // console.log('Dynamic Spacing Debug:', {
  //   totalFields,
  //   availableSpace,
  //   requiredSpace,
  //   compressionFactor,
  //   spacing: { fieldPadding, sectionMargin, dividerMargin, fontSize, highlightFontSize }
  // });

  return {
    fieldPadding,
    sectionMargin,
    dividerMargin,
    fontSize,
    highlightFontSize,
    totalFields,
    compressionFactor
  };
};

// ─── SVG Ornaments ────────────────────────────────────────────

const TopOrnament: React.FC = () => (
  <svg width="100%" height="36" viewBox="0 0 500 36" preserveAspectRatio="none">
    <defs>
      <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#8B0000" stopOpacity="0" />
        <stop offset="20%"  stopColor="#D4AF37" />
        <stop offset="50%"  stopColor="#F0D060" />
        <stop offset="80%"  stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8B0000" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y="16" width="500" height="2" fill="url(#goldLine)" />
    <ellipse cx="60"  cy="17" rx="12" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <ellipse cx="60"  cy="17" rx="6"  ry="9" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <circle  cx="60"  cy="17" r="2.5" fill="#D4AF37" />
    <polygon points="250,6 258,17 250,28 242,17" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
    <circle  cx="250" cy="17" r="2.5" fill="#8B0000" />
    <line x1="200" y1="17" x2="238" y2="17" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,3" />
    <line x1="262" y1="17" x2="300" y2="17" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,3" />
    <ellipse cx="440" cy="17" rx="12" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <ellipse cx="440" cy="17" rx="6"  ry="9" fill="none" stroke="#D4AF37" strokeWidth="1" />
    <circle  cx="440" cy="17" r="2.5" fill="#D4AF37" />
  </svg>
);

const BottomOrnament: React.FC = () => (
  <svg width="100%" height="30" viewBox="0 0 500 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="goldLine2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#8B0000" stopOpacity="0" />
        <stop offset="25%"  stopColor="#D4AF37" />
        <stop offset="50%"  stopColor="#F0D060" />
        <stop offset="75%"  stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8B0000" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y="15" width="500" height="1.5" fill="url(#goldLine2)" />
    {[100, 180, 250, 320, 400].map((x, i) => (
      <polygon key={i}
        points={`${x},8 ${x + 5},15 ${x},22 ${x - 5},15`}
        fill={i === 2 ? '#D4AF37' : 'none'}
        stroke="#D4AF37" strokeWidth="0.8"
      />
    ))}
    <circle cx="250" cy="15" r="3" fill="#8B0000" />
  </svg>
);

const CornerMandala: React.FC<{ rotate?: number }> = ({ rotate = 0 }) => (
  <svg width="56" height="56" viewBox="0 0 56 56"
    style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}>
    <path d="M 0 56 A 56 56 0 0 1 56 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
    <path d="M 0 44 A 44 44 0 0 1 44 0" fill="none" stroke="#8B0000" strokeWidth="0.7" />
    <path d="M 0 34 A 34 34 0 0 1 34 0" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
    <ellipse cx="11" cy="11" rx="7" ry="11" fill="none" stroke="#D4AF37" strokeWidth="0.9"
      transform="rotate(-45 11 11)" />
    <ellipse cx="11" cy="11" rx="11" ry="7" fill="none" stroke="#D4AF37" strokeWidth="0.9"
      transform="rotate(-45 11 11)" />
    <circle cx="11" cy="11" r="3"   fill="#D4AF37" opacity="0.8" />
    <circle cx="11" cy="11" r="1.2" fill="#8B0000" />
  </svg>
);

const ThinDivider: React.FC<{ spacing: { dividerMargin: number } }> = ({ spacing }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 6,
    my: `${spacing.dividerMargin}px`
  }}>
    <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
    <Typography sx={{ color: '#D4AF37', fontSize: '0.55rem', lineHeight: 1 }}>✦</Typography>
    <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
  </Box>
);

// ─── Section Heading ──────────────────────────────────────────
const SectionHeading: React.FC<{ title: string; spacing: { sectionMargin: number } }> = ({ title, spacing }) => (
  <Box sx={{
    background: 'linear-gradient(90deg, transparent, #8B0000 20%, #8B0000 80%, transparent)',
    px: 3, py: '5px', my: `${spacing.sectionMargin}px`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5,
  }}>
    <Typography sx={{ color: '#D4AF37', fontSize: '0.55rem' }}>◆</Typography>
    <Typography sx={{
      fontSize: '0.68rem', fontWeight: 700, color: '#FFF8E7',
      letterSpacing: '2px', textTransform: 'uppercase',
      fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
    }}>
      {title}
    </Typography>
    <Typography sx={{ color: '#D4AF37', fontSize: '0.55rem' }}>◆</Typography>
  </Box>
);

// ─── Field Row ────────────────────────────────────────────────
// Fix 3: returns null when value is empty — field is invisible
interface FieldRowProps {
  label: string;
  value?: string | number;
  highlight?: boolean;
  spacing: { fieldPadding: number; fontSize: number; highlightFontSize: number };
}
const FieldRow: React.FC<FieldRowProps> = ({ label, value, highlight, spacing }) => {
  if (value === undefined || value === null || value === '' || value === 0) return null;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'baseline',
      py: `${spacing.fieldPadding}px`,
      borderBottom: '1px dotted rgba(139,0,0,0.1)',
      '&:last-child': { borderBottom: 'none' },
    }}>
      <Typography sx={{
        width: '42%', flexShrink: 0,
        fontSize: `${highlight ? spacing.highlightFontSize : spacing.fontSize}px`,
        fontWeight: 600,
        color: '#8B0000',
        fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
        pr: 1,
      }}>
        {label}
      </Typography>
      <Typography sx={{
        color: '#6B3030',
        fontSize: `${spacing.fontSize}px`,
        mr: 1
      }}>:</Typography>
      <Typography sx={{
        flex: 1,
        fontSize: `${highlight ? spacing.highlightFontSize : spacing.fontSize}px`,
        fontWeight: highlight ? 700 : 400,
        color: highlight ? '#4A0000' : '#2C1810',
        fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
        wordBreak: 'break-word',
      }}>
        {value}
      </Typography>
    </Box>
  );
};

// ─── Template 1 — Traditional ─────────────────────────────────
const Template1Traditional: React.FC<Props> = ({ formData }) => {
  const { personal, family, education, address, photo, shlokaText, selectedDeity, language } = formData;
  const { fieldOrder } = useBiodata();

  // Get translation function based on selected language
  const t = useTranslation(language);

  // Calculate dynamic spacing based on content
  const spacing = calculateDynamicSpacing(formData);

  const brotherText = family.totalBrothers > 0
    ? `${family.totalBrothers} (विवाहित: ${family.marriedBrothers})`
    : '';
  const sisterText = family.totalSisters > 0
    ? `${family.totalSisters} (विवाहित: ${family.marriedSisters})`
    : '';

  return (
    // Fix 4: width MUST be exactly 794px — matches A4 at 96dpi
    // html2canvas captures this at scale:2 → 1588px → jsPDF fits to A4
    <Box sx={{
      width: 794,
      minHeight: 1123,
      backgroundColor: '#FFFBF0',
      position: 'relative',
      fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
      border: '5px double #8B0000',
      boxSizing: 'border-box',
      // NO transform here — transforms break html2canvas PDF capture
    }}>

      {/* Inner gold border */}
      <Box sx={{ position: 'absolute', inset: 8,  border: '1px solid #D4AF37', pointerEvents: 'none', zIndex: 1 }} />
      <Box sx={{ position: 'absolute', inset: 12, border: '0.5px solid rgba(139,0,0,0.15)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Corner mandalas */}
      <Box sx={{ position: 'absolute', top: 2,    left: 2,   zIndex: 2 }}><CornerMandala rotate={0}   /></Box>
      <Box sx={{ position: 'absolute', top: 2,    right: 2,  zIndex: 2 }}><CornerMandala rotate={90}  /></Box>
      <Box sx={{ position: 'absolute', bottom: 2, left: 2,   zIndex: 2 }}><CornerMandala rotate={270} /></Box>
      <Box sx={{ position: 'absolute', bottom: 2, right: 2,  zIndex: 2 }}><CornerMandala rotate={180} /></Box>

      {/* Main content */}
      <Box sx={{
        px: 6,
        pt: `${Math.max(12, 18 * spacing.compressionFactor)}px`,
        pb: `${Math.max(16, 24 * spacing.compressionFactor)}px`,
        position: 'relative',
        zIndex: 3
      }}>

        {/* ── HEADER ── */}
        <Box sx={{
          textAlign: 'center',
          mb: `${Math.max(2, 4 * spacing.compressionFactor)}px`
        }}>

          {/* Deity SVG or fallback Om */}
          {selectedDeity && selectedDeity !== 'none' ? (
            <Box sx={{ mb: `${Math.max(2, 4 * spacing.compressionFactor)}px` }}>
              {(() => {
                const selectedDeityData = deityOptions.find((d) => d.id === selectedDeity);
                return selectedDeityData?.imagePath ? (
                  <img
                    src={selectedDeityData.imagePath}
                    alt={selectedDeity}
                    style={{
                      width: '56px',
                      height: '56px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : null;
              })()}
            </Box>
          ) : (
            <Typography sx={{
              fontSize: '2rem',
              color: '#8B0000',
              lineHeight: 1,
              mb: `${Math.max(2, 4 * spacing.compressionFactor)}px`
            }}>
              ॐ
            </Typography>
          )}

          {/* Shloka line */}
          {shlokaText && (
            <Typography sx={{
              fontSize: `${Math.max(0.51, 0.85 * spacing.compressionFactor)}rem`,
              color: '#8B0000',
              fontWeight: 600,
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              letterSpacing: '0.5px',
              mb: `${Math.max(2, 4 * spacing.compressionFactor)}px`,
            }}>
              {shlokaText}
            </Typography>
          )}

          {/* <TopOrnament /> */}

          {/* Biodata Title */}
          <Box sx={{ my: `${Math.max(4, 8 * spacing.compressionFactor)}px` }}>
            <Typography sx={{
              fontSize: `${Math.max(0.85, 1.7 * spacing.compressionFactor)}rem`,
              fontWeight: 800,
              color: '#8B0000',
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              letterSpacing: `${Math.max(2, 4 * spacing.compressionFactor)}px`,
              lineHeight: 1,
            }}>
              {t('biodataTitle')}
            </Typography>
          </Box>

          <BottomOrnament />
        </Box>

        {/* ── PHOTO — only shown if uploaded ── */}
        {photo && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: `${Math.max(6, 12 * spacing.compressionFactor)}px`,
            mb: `${Math.max(4, 8 * spacing.compressionFactor)}px`
          }}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                width: 110, height: 135,
                border: '3px solid #8B0000',
                outline: '1px solid #D4AF37',
                outlineOffset: '3px',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <img src={photo} alt="photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              {/* Gold corner accents */}
              {[
                { top: -1,    left: -1,   borderTop:    '2px solid #D4AF37', borderLeft:   '2px solid #D4AF37' },
                { top: -1,    right: -1,  borderTop:    '2px solid #D4AF37', borderRight:  '2px solid #D4AF37' },
                { bottom: -1, left: -1,   borderBottom: '2px solid #D4AF37', borderLeft:   '2px solid #D4AF37' },
                { bottom: -1, right: -1,  borderBottom: '2px solid #D4AF37', borderRight:  '2px solid #D4AF37' },
              ].map((s, i) => (
                <Box key={i} sx={{ position: 'absolute', width: 10, height: 10, ...s }} />
              ))}
            </Box>
          </Box>
        )}

        {/* ── Fix 1 & 2: All sections single column, centered with maxWidth ── */}

        {/* PERSONAL DETAILS */}
        <SectionHeading title={t('personalDetails')} spacing={spacing} />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {/** Use fieldOrder from context to determine rendering sequence **/}
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

            // custom logic: if both religion and caste provided, combine into one row
            const keys = fieldOrder?.personal || Object.keys(labelMap);
            const seen = new Set<string>();
            return keys.reduce<React.ReactNode[]>((acc, key) => {
              if (seen.has(key)) return acc;

              if (key === 'religion' || key === 'caste') {
                // ensure we only output one combined entry
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
                      highlight={false}
                      spacing={spacing}
                    />
                  );
                } else if (rel) {
                  acc.push(
                    <FieldRow
                      key="religion"
                      label={t('religion')}
                      value={rel}
                      highlight={false}
                      spacing={spacing}
                    />
                  );
                } else if (cast) {
                  acc.push(
                    <FieldRow
                      key="caste"
                      label={t('caste')}
                      value={cast}
                      highlight={false}
                      spacing={spacing}
                    />
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
                  highlight={key === 'fullName'}
                  spacing={spacing}
                />
              );
              return acc;
            }, []);
          })()}
        </Box>

        <ThinDivider spacing={spacing} />

        {/* FAMILY DETAILS */}
        <SectionHeading title={t('familyDetails')} spacing={spacing} />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {(() => {
            
            const labelMap: Record<string, string> = {
              fatherName: t('fatherName'),
              fatherOccupation: t('fatherOccupation'),
              motherName: t('motherName'),
              motherOccupation: t('motherOccupation'),
              totalBrothers: t('brothers'),
              marriedBrothers: t('married') + ' ' + t('brothers'),
              totalSisters: t('sisters'),
              marriedSisters: t('married') + ' ' + t('sisters'),
              familyType: t('familyType'),
              nativePlace: t('nativePlace'),
            };

            return (fieldOrder?.family || Object.keys(labelMap)).map((key) => {
              let val: any = (family as any)[key];
              if (key === 'totalBrothers') val = brotherText;
              if (key === 'totalSisters') val = sisterText;
              return <FieldRow key={key} label={labelMap[key] || key} value={val} highlight={key==='fatherName' || key==='motherName'} spacing={spacing} />;
            });
          })()}
        </Box>

        <ThinDivider spacing={spacing} />

        {/* EDUCATION & CAREER */}
        <SectionHeading title={t('educationCareer')} spacing={spacing} />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {(() => {
            
            const labelMap: Record<string, string> = {
              qualification: t('qualification'),
              university: t('university'),
              additionalCertifications: t('certifications'),
              occupation: t('occupation'),
              companyName: t('companyName'),
              jobTitle: t('jobTitle'),
              annualIncome: t('annualIncome'),
            };
            const qualDisplay = education.qualification
              ? education.university
                ? `${education.qualification} (${education.university})`
                : education.qualification
              : '';
            return (fieldOrder?.education || Object.keys(labelMap)).map((key) => {
              if (key === 'qualification') {
                return <FieldRow key="qualification" label={labelMap.qualification} value={qualDisplay} highlight spacing={spacing} />;
              }
              if (key === 'university') {
                return null;
              }
              const val = (education as any)[key];
              return <FieldRow key={key} label={labelMap[key] || key} value={val} highlight={false} spacing={spacing} />;
            });
          })()}
        </Box>

        <ThinDivider spacing={spacing} />

        {/* ADDRESS & CONTACT */}
        <SectionHeading title={t('addressContact')} spacing={spacing} />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {(() => {
            const labelMap: Record<string, string> = {
              fullAddress: t('fullAddress'),
              city: t('city'),
              district: t('district'),
              state: t('state'),
              pincode: t('pincode'),
              mobile: t('mobile'),
              email: t('email'),
            };

            return (fieldOrder?.address || Object.keys(labelMap)).map((key) => {
              let val: any = (address as any)[key];
              if (key === 'mobile') val = val ? `+91 ${val}` : '';
              return <FieldRow key={key} label={labelMap[key] || key} value={val} spacing={spacing} />;
            });
          })()}
        </Box>
      </Box>
    </Box>
  );
};

export default Template1Traditional;