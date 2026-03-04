import React from 'react';
import { Box, Typography } from '@mui/material';
import { BiodataFormData } from '../types/biodata.types';

interface Props {
  formData: BiodataFormData;
}

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

const ThinDivider: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 6, my: 0.5 }}>
    <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
    <Typography sx={{ color: '#D4AF37', fontSize: '0.55rem', lineHeight: 1 }}>✦</Typography>
    <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
  </Box>
);

// ─── Section Heading ──────────────────────────────────────────
const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <Box sx={{
    background: 'linear-gradient(90deg, transparent, #8B0000 20%, #8B0000 80%, transparent)',
    px: 3, py: '5px', my: 1.5,
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
}
const FieldRow: React.FC<FieldRowProps> = ({ label, value, highlight }) => {
  if (value === undefined || value === null || value === '' || value === 0) return null;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'baseline',
      py: '4px',
      borderBottom: '1px dotted rgba(139,0,0,0.1)',
      '&:last-child': { borderBottom: 'none' },
    }}>
      <Typography sx={{
        width: '42%', flexShrink: 0,
        fontSize: highlight ? '0.79rem' : '0.75rem',
        fontWeight: 600,
        color: '#8B0000',
        fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
        pr: 1,
      }}>
        {label}
      </Typography>
      <Typography sx={{ color: '#6B3030', fontSize: '0.75rem', mr: 1 }}>:</Typography>
      <Typography sx={{
        flex: 1,
        fontSize: highlight ? '0.79rem' : '0.75rem',
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
  // const { personal, family, education, address, photo, shlokaText, selectedDeity } = formData;
  const { personal, family, education, address, photo } = formData;

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
      <Box sx={{ px: 6, pt: 3, pb: 4, position: 'relative', zIndex: 3 }}>

        {/* ── HEADER ── */}
        <Box sx={{ textAlign: 'center', mb: 0.5 }}>

          {/* Deity SVG or fallback Om */}
          {/* {selectedDeity && selectedDeity !== 'none' ? (
            <Box sx={{ mb: 0.5 }}>
              <img
                src={`/deities/${selectedDeity}.svg`}
                alt={selectedDeity}
                style={{ width: 56, height: 56, objectFit: 'contain' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </Box>
          ) : (
            <Typography sx={{ fontSize: '2rem', color: '#8B0000', lineHeight: 1, mb: 0.5 }}>
              ॐ
            </Typography>
          )} */}

          {/* Shloka line */}
          {/* {shlokaText && (
            <Typography sx={{
              fontSize: '0.85rem', color: '#8B0000', fontWeight: 600,
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              letterSpacing: '0.5px', mb: 0.5,
            }}>
              {shlokaText}
            </Typography>
          )} */}

          <TopOrnament />

          {/* Biodata Title */}
          <Box sx={{ my: 1 }}>
            <Typography sx={{
              fontSize: '1.7rem', fontWeight: 800, color: '#8B0000',
              fontFamily: '"Noto Sans Devanagari", sans-serif',
              letterSpacing: '4px', lineHeight: 1.2,
            }}>
              विवाह बायोडेटा
            </Typography>
            <Typography sx={{
              fontSize: '0.65rem', color: '#D4AF37', fontWeight: 700,
              letterSpacing: '5px', textTransform: 'uppercase', mt: 0.3,
            }}>
              Marriage Biodata
            </Typography>
          </Box>

          <BottomOrnament />
        </Box>

        {/* ── PHOTO — only shown if uploaded ── */}
        {photo && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5, mb: 1 }}>
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
        <SectionHeading title="वैयक्तिक माहिती | Personal Details" />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <FieldRow label="पूर्ण नाव"    value={personal.fullName}    highlight />
          <FieldRow label="जन्म तारीख"   value={personal.dateOfBirth} />
          <FieldRow label="जन्म वेळ"     value={personal.timeOfBirth} />
          <FieldRow label="जन्म स्थान"   value={personal.placeOfBirth} />
          <FieldRow label="राशी"         value={personal.rashi} />
          <FieldRow label="नक्षत्र"       value={personal.nakshatra} />
          <FieldRow label="गोत्र"         value={personal.gotra} />
          <FieldRow label="धर्म"         value={personal.religion} />
          <FieldRow label="जात"          value={personal.caste} />
          <FieldRow label="पोटजात"       value={personal.subCaste} />
          <FieldRow label="उंची"         value={personal.height} />
          <FieldRow label="वर्ण"         value={personal.complexion} />
          <FieldRow label="रक्तगट"       value={personal.bloodGroup} />
          <FieldRow label="मांगलिक"      value={personal.manglik} />
        </Box>

        <ThinDivider />

        {/* FAMILY DETAILS */}
        <SectionHeading title="कौटुंबिक माहिती | Family Details" />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <FieldRow label="वडिलांचे नाव"     value={family.fatherName}       highlight />
          <FieldRow label="वडिलांचा व्यवसाय" value={family.fatherOccupation} />
          <FieldRow label="आईचे नाव"         value={family.motherName}       highlight />
          <FieldRow label="आईचा व्यवसाय"     value={family.motherOccupation} />
          <FieldRow label="भाऊ"              value={brotherText} />
          <FieldRow label="बहीण"             value={sisterText} />
          <FieldRow label="कुटुंब प्रकार"     value={family.familyType} />
          <FieldRow label="मूळ गाव"          value={family.nativePlace} />
        </Box>

        <ThinDivider />

        {/* EDUCATION & CAREER */}
        <SectionHeading title="शिक्षण व करिअर | Education & Career" />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <FieldRow label="शिक्षण"          value={education.qualification}            highlight />
          <FieldRow label="विद्यापीठ"        value={education.university} />
          <FieldRow label="इतर पदवी"        value={education.additionalCertifications} />
          <FieldRow label="व्यवसाय"         value={education.occupation}               highlight />
          <FieldRow label="कंपनी / संस्था"   value={education.companyName} />
          <FieldRow label="पद"              value={education.jobTitle} />
          <FieldRow label="वार्षिक उत्पन्न"  value={education.annualIncome} />
        </Box>

        <ThinDivider />

        {/* ADDRESS & CONTACT */}
        <SectionHeading title="पत्ता व संपर्क | Address & Contact" />
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <FieldRow label="पत्ता"     value={address.fullAddress} />
          <FieldRow label="शहर"      value={address.city} />
          <FieldRow label="जिल्हा"   value={address.district} />
          <FieldRow label="राज्य"    value={address.state} />
          <FieldRow label="पिनकोड"   value={address.pincode} />
          <FieldRow label="मोबाईल"   value={address.mobile   ? `+91 ${address.mobile}`   : ''} />
          <FieldRow label="WhatsApp" value={address.whatsapp ? `+91 ${address.whatsapp}` : ''} />
          <FieldRow label="ईमेल"     value={address.email} />
        </Box>

        {/* FOOTER */}
        <Box sx={{ mt: 3 }}>
          <TopOrnament />
          <Typography sx={{
            textAlign: 'center', fontSize: '0.62rem',
            color: '#8B0000', opacity: 0.6, mt: 0.5,
            fontFamily: '"Noto Sans Devanagari", sans-serif',
            letterSpacing: '1.5px',
          }}>
            ॐ तत्सत् • शुभं भवतु • कल्याणमस्तु
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default Template1Traditional;