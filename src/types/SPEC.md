 📋 Project Specification — Marathi/Hindi Marriage Biodata Maker
> Give this entire file to GitHub Copilot as context before writing any code.
> Prompt: "Read this SPEC.md and help me build this project accordingly."

---

## 🎯 Project Overview

**App Name:** Vivah Biodata Maker (विवाह बायोडेटा मेकर)  
**Type:** Free web application  
**Purpose:** Let users fill a simple form with their marriage biodata details, choose a template design, preview it live, and download a professionally designed PDF — completely free, no login required.  
**Target Users:** Marathi and Hindi speaking families in India looking to create marriage biodata.  
**Unique Value:** Mobile-first, beautiful modern templates, real-time preview, WhatsApp-ready PDF, pure Marathi/Hindi UI option, truly 100% free with no watermark.

---

## 🧰 Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | React | 18+ | with Vite |
| Language | TypeScript | 5+ | strict mode on |
| UI Library | MUI (Material UI) | v5 | FREE tier only |
| Form Library | React Hook Form | v7 | primary form handler |
| Validation | Zod | v3 | schema validation |
| RHF + Zod bridge | @hookform/resolvers | v3 | zodResolver |
| Routing | React Router DOM | v6 | |
| PDF Generation | jsPDF + html2canvas | latest | browser-side only |
| State Management | React Context API | built-in | no Redux needed |
| Icons | @mui/icons-material | v5 | |
| Fonts | Google Fonts | — | Noto Sans Devanagari |
| Hosting | Vercel | — | free tier |
| Dev Environment | GitHub Codespaces | — | |

---

## 📦 Package Installation

```bash
npm create vite@latest . -- --template react-ts
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-hook-form zod @hookform/resolvers
npm install react-router-dom
npm install jspdf html2canvas
npm install -D @types/react-router-dom
```

---

## 🗂️ Complete Folder Structure

```
src/
├── components/
│   ├── Navbar.tsx                  ← top app bar with logo
│   ├── StepIndicator.tsx           ← MUI Stepper (4 steps)
│   ├── DownloadButton.tsx          ← triggers PDF generation
│   ├── LivePreview.tsx             ← real-time biodata preview panel
│   └── LanguageToggle.tsx          ← Marathi / Hindi / English switch
│
├── steps/
│   ├── Step1PersonalFamily.tsx     ← personal + family details
│   ├── Step2Education.tsx          ← education + career
│   ├── Step3Address.tsx            ← address + contact info
│   └── Step4PhotoTemplate.tsx      ← photo upload + template selection
│
├── templates/
│   ├── Template1Traditional.tsx    ← maroon/gold traditional Marathi style
│   ├── Template2Religious.tsx      ← Om/Ganesh top, shloka border
│   └── Template3Modern.tsx         ← clean minimal professional style
│
├── pages/
│   ├── Home.tsx                    ← landing page with CTA
│   └── Create.tsx                  ← main multi-step form page
│
├── context/
│   └── BiodataContext.tsx          ← global state for all form data
│
├── types/
│   └── biodata.types.ts            ← all TypeScript interfaces
│
├── schemas/
│   └── biodata.schema.ts           ← Zod validation schemas per step
│
├── utils/
│   ├── pdfGenerator.ts             ← html2canvas + jsPDF logic
│   ├── dropdownOptions.ts          ← all dropdown data (rashi, states etc.)
│   └── translations.ts             ← Marathi/Hindi/English label strings
│
├── theme/
│   └── muiTheme.ts                 ← custom MUI theme (colors, fonts)
│
├── App.tsx
└── main.tsx
```

---

## 📐 TypeScript Interfaces

```typescript
// src/types/biodata.types.ts

export type Language = 'marathi' | 'hindi' | 'english';
export type TemplateId = 1 | 2 | 3;

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;         // format: YYYY-MM-DD
  timeOfBirth: string;         // format: HH:mm
  placeOfBirth: string;
  rashi: string;               // from dropdown
  nakshatra: string;           // from dropdown
  gotra: string;
  religion: string;
  caste: string;
  subCaste: string;
  height: string;              // e.g. "5'6\""
  complexion: string;          // from dropdown
  bloodGroup: string;          // from dropdown
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  totalBrothers: number;
  marriedBrothers: number;
  totalSisters: number;
  marriedSisters: number;
  familyType: string;          // Joint / Nuclear
  nativePlace: string;
}

export interface EducationDetails {
  qualification: string;       // from dropdown
  university: string;
  additionalCertifications: string;
  occupation: string;          // from dropdown: Job/Business/Self-employed
  companyName: string;
  jobTitle: string;
  annualIncome: string;        // from dropdown range
}

export interface AddressDetails {
  fullAddress: string;
  city: string;
  district: string;
  state: string;               // from dropdown
  pincode: string;
  mobile: string;
  whatsappSameAsMobile: boolean;
  whatsapp: string;
  email: string;
}

export interface BiodataFormData {
  personal: PersonalDetails;
  family: FamilyDetails;
  education: EducationDetails;
  address: AddressDetails;
  photo: string | null;        // base64 encoded image string
  selectedTemplate: TemplateId;
  language: Language;
}

// Context type
export interface BiodataContextType {
  formData: BiodataFormData;
  updatePersonal: (data: PersonalDetails) => void;
  updateFamily: (data: FamilyDetails) => void;
  updateEducation: (data: EducationDetails) => void;
  updateAddress: (data: AddressDetails) => void;
  updatePhoto: (photo: string | null) => void;
  updateTemplate: (id: TemplateId) => void;
  updateLanguage: (lang: Language) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}
```

---

## 🧪 Zod Validation Schemas

```typescript
// src/schemas/biodata.schema.ts
import { z } from 'zod';

export const personalFamilySchema = z.object({
  // Personal
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().optional(),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
  rashi: z.string().min(1, 'Rashi is required'),
  nakshatra: z.string().optional(),
  gotra: z.string().optional(),
  religion: z.string().min(1, 'Religion is required'),
  caste: z.string().optional(),
  subCaste: z.string().optional(),
  height: z.string().min(1, 'Height is required'),
  complexion: z.string().optional(),
  bloodGroup: z.string().optional(),
  // Family
  fatherName: z.string().min(2, 'Father name is required'),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(2, 'Mother name is required'),
  motherOccupation: z.string().optional(),
  totalBrothers: z.number().min(0).max(10),
  marriedBrothers: z.number().min(0).max(10),
  totalSisters: z.number().min(0).max(10),
  marriedSisters: z.number().min(0).max(10),
  familyType: z.string().optional(),
  nativePlace: z.string().optional(),
});

export const educationSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  university: z.string().optional(),
  additionalCertifications: z.string().optional(),
  occupation: z.string().min(1, 'Occupation is required'),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  annualIncome: z.string().optional(),
});

export const addressSchema = z.object({
  fullAddress: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  mobile: z.string().length(10, 'Mobile must be 10 digits'),
  whatsappSameAsMobile: z.boolean(),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export type PersonalFamilyFormValues = z.infer;
export type EducationFormValues = z.infer;
export type AddressFormValues = z.infer;
```

---

## 🎨 MUI Theme

```typescript
// src/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#8B0000',        // deep maroon — traditional wedding color
      light: '#B22222',
      dark: '#5C0000',
    },
    secondary: {
      main: '#D4AF37',        // gold
      light: '#F0D060',
      dark: '#A07D10',
    },
    background: {
      default: '#FFF8F0',     // warm cream background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Noto Sans", "Noto Sans Devanagari", "Roboto", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});
```

---

## 🌐 Routing Structure

```typescript
// src/App.tsx routing
// Route: "/"         → Home page (landing)
// Route: "/create"   → Create page (multi-step form + live preview)
// Route: "*"         → redirect to "/"
```

---

## 📄 Page: Home.tsx

**Purpose:** Landing page that explains the app and drives users to start.

**Sections:**
1. **Hero** — headline in Marathi + English, subtitle, "बायोडेटा बनवा" (Create Biodata) CTA button
2. **Features row** — 3 cards: Free, No Login, Beautiful Templates
3. **How it works** — 3 steps with icons: Fill Form → Choose Template → Download PDF
4. **Template Preview** — show thumbnails of 3 template designs
5. **CTA bottom** — repeat the main button

**Key UI decisions:**
- MUI `Container` max width 1200px
- Primary color (maroon) for CTA buttons
- Fully responsive — mobile stacked, desktop side-by-side

---

## 📄 Page: Create.tsx

**Purpose:** The core app page — multi-step form with live preview.

**Layout:**
```
Desktop (lg+):
┌─────────────────────┬──────────────────────┐
│   Form (left 55%)   │  Live Preview (45%)  │
│                     │                      │
│  [StepIndicator]    │  [Biodata Template]  │
│  [Current Step]     │  updates in realtime │
│  [Back] [Next]      │                      │
└─────────────────────┴──────────────────────┘

Mobile (sm and below):
┌──────────────────────┐
│    [StepIndicator]   │
│    [Current Step]    │
│    [Back] [Next]     │
│                      │
│  [Preview Toggle]    │ ← button to show/hide preview
│  [Live Preview]      │
└──────────────────────┘
```

---

## 📋 Step Components Detail

### Step1PersonalFamily.tsx
- Use MUI `Grid` container with 2 columns on desktop, 1 on mobile
- Section heading: "वैयक्तिक माहिती" (Personal Info) + "कौटुंबिक माहिती" (Family Info)
- Use MUI `Divider` between Personal and Family sections
- All dropdowns use MUI `Select` with `MenuItem`
- All text inputs use MUI `TextField`
- Number fields (brothers/sisters) use MUI `TextField` type="number" with min=0 max=10

### Step2Education.tsx
- Qualification: MUI Select dropdown
- Occupation type: MUI `RadioGroup` with 3 options (Job / Business / Self-employed)
- Show/hide Company Name based on occupation selection
- Annual Income: MUI Select with predefined ranges

### Step3Address.tsx
- Full Address: MUI `TextField` multiline rows=3
- State: MUI Select with all Indian states
- WhatsApp same as mobile: MUI `Checkbox` — when checked, hide WhatsApp field
- Mobile + Pincode: type="tel" with numeric validation

### Step4PhotoTemplate.tsx
- Photo upload: hidden `<input type="file">` triggered by MUI `Button`
- Show photo preview after upload using `URL.createObjectURL`
- Store as base64 string in context
- Template selection: 3 MUI `Card` components with hover border highlight
- Selected template shows maroon border + checkmark icon

---

## 🖼️ Template Designs

### Template 1 — Traditional (मराठी पारंपारिक)
- **Colors:** Maroon (#8B0000) header, Gold (#D4AF37) accents, Cream (#FFF8E7) background
- **Header:** "|| श्री गणेशाय नमः ||" centered, then "विवाह बायोडेटा" as main heading
- **Border:** Double line maroon border around entire page
- **Font:** Noto Sans Devanagari for Marathi text
- **Layout:** Photo top-right, details in two columns, family section below
- **Footer:** Om symbol + decorative line

### Template 2 — Religious (धार्मिक)
- **Colors:** Saffron (#FF6B00) + Dark maroon, White background
- **Header:** Om/Ganesh SVG symbol at top center
- **Shloka:** "शुभ विवाह" with decorative Sanskrit border
- **Layout:** Single column, centered headings, photo centered at top
- **Border:** Decorative floral/paisley SVG border

### Template 3 — Modern Minimal
- **Colors:** Deep navy (#1A237E) + Gold accent, White background
- **Header:** Clean sans-serif, name large and bold, thin gold line underneath
- **Layout:** Two-column clean grid, photo in circle crop top-right
- **Font:** Mix of Devanagari + English for modern bilingual look
- **No borders** — uses whitespace and subtle dividers instead

---

## 📥 PDF Generation Logic

```typescript
// src/utils/pdfGenerator.ts
// Strategy: render hidden div with template → html2canvas → jsPDF

// Steps:
// 1. Get the DOM element with id="biodata-preview-container"
// 2. Temporarily make it A4 size (794px wide)
// 3. Run html2canvas on it with scale: 2 (for high quality)
// 4. Create jsPDF instance with A4 dimensions
// 5. Add the canvas image to PDF
// 6. Call pdf.save("biodata.pdf")

// Important settings for html2canvas:
// - scale: 2  (retina quality)
// - useCORS: true  (for photo if uploaded)
// - allowTaint: false
// - backgroundColor: '#ffffff'

// File name format: "Biodata_[FullName]_[Date].pdf"
```

---

## 🗃️ Dropdown Data

```typescript
// src/utils/dropdownOptions.ts

export const rashiOptions = [
  'मेष (Aries)', 'वृषभ (Taurus)', 'मिथुन (Gemini)',
  'कर्क (Cancer)', 'सिंह (Leo)', 'कन्या (Virgo)',
  'तुला (Libra)', 'वृश्चिक (Scorpio)', 'धनु (Sagittarius)',
  'मकर (Capricorn)', 'कुंभ (Aquarius)', 'मीन (Pisces)'
];

export const nakshatraOptions = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशीर्ष',
  'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा',
  'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी', 'हस्त', 'चित्रा',
  'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूळ',
  'पूर्वाषाढा', 'उत्तराषाढा', 'श्रवण', 'धनिष्ठा',
  'शतभिषा', 'पूर्वाभाद्रपदा', 'उत्तराभाद्रपदा', 'रेवती'
];

export const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const complexionOptions = ['Fair', 'Wheatish', 'Dusky', 'Dark'];

export const qualificationOptions = [
  '10th', '12th', 'Diploma', 'B.A.', 'B.Com.', 'B.Sc.',
  'B.E. / B.Tech.', 'M.A.', 'M.Com.', 'M.Sc.', 'M.E. / M.Tech.',
  'MBA', 'CA', 'MBBS', 'MD', 'LLB', 'PhD', 'Other'
];

export const incomeOptions = [
  'Below ₹2 LPA', '₹2-4 LPA', '₹4-6 LPA', '₹6-8 LPA',
  '₹8-12 LPA', '₹12-18 LPA', '₹18-25 LPA', 'Above ₹25 LPA',
  'Not Disclosed'
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh'
];

export const familyTypeOptions = ['Joint Family', 'Nuclear Family'];

export const occupationOptions = ['Private Job', 'Government Job', 'Business', 'Self-employed', 'Farmer', 'Other'];
```

---

## 🌍 Language Translations

```typescript
// src/utils/translations.ts

type TranslationKey = 
  | 'appName' | 'createBiodata' | 'personalDetails'
  | 'familyDetails' | 'education' | 'addressContact'
  | 'photoTemplate' | 'fullName' | 'dateOfBirth'
  | 'downloadPDF' | 'next' | 'back' | 'preview';

type Translations = Record;

export const translations: Record = {
  marathi: {
    appName: 'विवाह बायोडेटा मेकर',
    createBiodata: 'बायोडेटा बनवा',
    personalDetails: 'वैयक्तिक माहिती',
    familyDetails: 'कौटुंबिक माहिती',
    education: 'शिक्षण व करिअर',
    addressContact: 'पत्ता व संपर्क',
    photoTemplate: 'फोटो व डिझाईन',
    fullName: 'पूर्ण नाव',
    dateOfBirth: 'जन्म तारीख',
    downloadPDF: 'PDF डाऊनलोड करा',
    next: 'पुढे जा',
    back: 'मागे जा',
    preview: 'पूर्वावलोकन',
  },
  hindi: {
    appName: 'विवाह बायोडेटा मेकर',
    createBiodata: 'बायोडेटा बनाएं',
    personalDetails: 'व्यक्तिगत जानकारी',
    familyDetails: 'पारिवारिक जानकारी',
    education: 'शिक्षा और करियर',
    addressContact: 'पता और संपर्क',
    photoTemplate: 'फोटो और डिज़ाइन',
    fullName: 'पूरा नाम',
    dateOfBirth: 'जन्म तिथि',
    downloadPDF: 'PDF डाउनलोड करें',
    next: 'आगे जाएं',
    back: 'पीछे जाएं',
    preview: 'पूर्वावलोकन',
  },
  english: {
    appName: 'Vivah Biodata Maker',
    createBiodata: 'Create Biodata',
    personalDetails: 'Personal Details',
    familyDetails: 'Family Details',
    education: 'Education & Career',
    addressContact: 'Address & Contact',
    photoTemplate: 'Photo & Template',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    downloadPDF: 'Download PDF',
    next: 'Next',
    back: 'Back',
    preview: 'Preview',
  },
};
```

---

## ⚙️ Context Implementation Pattern

```typescript
// src/context/BiodataContext.tsx
// Use React.createContext + useReducer pattern
// Default form data should have all fields as empty strings / 0 / false
// Persist to localStorage so user doesn't lose data on refresh
// Key: 'vivah_biodata_draft'
// On mount: try to load from localStorage
// On every update: save to localStorage
```

---

## 🔑 Key Coding Rules for Copilot

1. **Always use TypeScript** — no `any` types, use proper interfaces from `biodata.types.ts`
2. **MUI only for UI** — no inline styles except for template designs, no Tailwind
3. **React Hook Form + Zod** for ALL form inputs — never use `useState` for form fields
4. **Controller pattern** for MUI inputs with RHF:
   ```tsx
   <Controller
     name="fullName"
     control={control}
     render={({ field }) => (
       <TextField {...field} label="Full Name" error={!!errors.fullName} helperText={errors.fullName?.message} />
     )}
   />
   ```
5. **Context via custom hook** — always access context through `useBiodata()` hook, never directly
6. **Mobile first** — every component must work on 375px width screens
7. **No backend** — all logic runs in browser, no API calls except optional future features
8. **PDF generation** — always use the `pdfGenerator.ts` utility, never inline PDF logic
9. **Devanagari fonts** — always import Noto Sans Devanagari in index.html Google Fonts link
10. **Template components** are purely presentational — they only receive `BiodataFormData` as props

---

## 🏁 Build Order for Copilot

Ask Copilot to build in this exact order:

```
1.  src/types/biodata.types.ts
2.  src/schemas/biodata.schema.ts
3.  src/utils/dropdownOptions.ts
4.  src/utils/translations.ts
5.  src/theme/muiTheme.ts
6.  src/context/BiodataContext.tsx
7.  src/components/Navbar.tsx
8.  src/components/StepIndicator.tsx
9.  src/steps/Step1PersonalFamily.tsx
10. src/steps/Step2Education.tsx
11. src/steps/Step3Address.tsx
12. src/steps/Step4PhotoTemplate.tsx
13. src/templates/Template1Traditional.tsx
14. src/templates/Template2Religious.tsx
15. src/templates/Template3Modern.tsx
16. src/components/LivePreview.tsx
17. src/utils/pdfGenerator.ts
18. src/components/DownloadButton.tsx
19. src/pages/Create.tsx
20. src/pages/Home.tsx
21. src/App.tsx
22. index.html (add Google Fonts link)
23. vercel.json (routing fix)
```

---

## 🚀 Deployment

### vercel.json (required for React Router)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### index.html — Add Google Fonts
```html


```

### Deploy Steps
```bash
git add .
git commit -m "feat: complete biodata maker MVP"
git push
# Vercel auto-deploys from GitHub
```

*End of Specification — Version 1.0*
*Project: Vivah Biodata Maker | Stack: React + TypeScript + MUI + React Hook Form + Zod*

---

## 🎨 Phase 2 Features — Biodata Customization Engine

These features allow users to personalize their biodata layout, field names,
and religious header before downloading. All customization is stored in
BiodataContext and reflected in the live preview in real time.

---

### Feature 1 — Field Sequence Reordering

**What it does:**
Users can drag and drop form fields to change the order in which they appear
on the final printed biodata PDF. For example, a user may want "Occupation"
to appear before "Education", or "Gotra" before "Rashi".

**Where it appears:**
A dedicated "Customize Layout" panel inside Step 4 (Photo & Template step),
shown as a collapsible section below the template picker.

**Technical implementation:**
- Use the library `@hello-pangea/dnd` (free, maintained fork of react-beautiful-dnd,
  fully TypeScript compatible)
  Install: `npm install @hello-pangea/dnd @types/hello-pangea__dnd`
- Each section (Personal, Family, Education, Address) has its own independent
  drag-and-drop list
- Field order is stored as an array of field keys in BiodataContext:
  fieldOrder: { personal: string[], family: string[], education: string[], address: string[] }
- Default order matches the order fields are defined in biodata.types.ts
- Template components read fieldOrder from context and render fields in that order
- Add a "Reset Order" button to restore default sequence

**UI:**
- Each field row shows a drag handle icon (DragIndicatorIcon from MUI icons) on the left
- Field label shown in the center
- On drag: row lifts with subtle shadow, drop zone highlighted in gold color
- Section headers (Personal, Family etc.) are NOT draggable — only fields within
  each section can be reordered
- Works on both desktop and mobile (touch drag supported by @hello-pangea/dnd)

**Context additions needed:**
```typescript
fieldOrder: {
  personal: string[];   // e.g. ['fullName', 'dateOfBirth', 'rashi', ...]
  family: string[];
  education: string[];
  address: string[];
};
updateFieldOrder: (
  section: 'personal' | 'family' | 'education' | 'address',
  newOrder: string[]
) => void;
resetFieldOrder: () => void;
```

---

### Feature 2 — Custom Field Label Editing

**What it does:**
Users can rename any field label that appears on the printed biodata.
For example:
- "Full Name" → "संपूर्ण नाव" or "नाव व आडनाव"
- "Annual Income" → "वार्षिक उत्पन्न" or "Income"
- "Blood Group" → "रक्तगट"
Users type the UI language (Marathi/Hindi/English) but they can write
any text they want as the printed label.

**Where it appears:**
Same "Customize Layout" panel in Step 4. Each field row in the drag list
has an edit (pencil) icon button on the right. Clicking it opens an inline
MUI TextField to rename that field's printed label.

**Technical implementation:**
- Store custom labels as a flat key-value map in BiodataContext:
  customLabels: Record<string, string>
  Key = field key (e.g. 'fullName'), Value = user's custom label string
- Default value for each key = empty string '' (falls back to translation)
- Template components use this logic when rendering each label:
  const getLabel = (fieldKey: string) =>
    customLabels[fieldKey] || t(fieldKey as TranslationKey);
- Editing is inline — no modal. Click pencil → TextField appears in place
  of the label text. On blur or Enter → save to context.
- Add a "Reset Labels" button to clear all customLabels back to defaults
- Max character limit: 40 characters per label

**UI:**
- Default state: show field label as plain text + pencil icon button (small, grey)
- Edit state: MUI TextField (size small, autoFocus) replaces label text
  with a small checkmark IconButton to confirm
- If label has been customized: show label in primary color (maroon) to
  indicate it's been changed, with a small "×" button to reset just that field
- Works inline inside the same drag-and-drop row

**Context additions needed:**
```typescript
customLabels: Record<string, string>;
updateCustomLabel: (fieldKey: string, label: string) => void;
resetCustomLabels: () => void;
```

---

### Feature 3 — God / Deity Icon Selector

**What it does:**
Users can select a deity icon/symbol that appears centered at the very top
of their biodata PDF, above the "|| श्री गणेशाय नमः ||" line.
This is a culturally important feature — different communities prefer
different deities.

**Where it appears:**
Step 4 (Photo & Template step) — a dedicated card section above the
template picker, labelled "देवतेची प्रतिमा निवडा | Choose Deity Symbol".

**Available deity options (8 total):**
Stored as an array of objects with id, label, and SVG/emoji representation:
```typescript
export interface DeityOption {
  id: string;           // unique key e.g. 'ganesh'
  labelMarathi: string; // e.g. 'श्री गणेश'
  labelHindi: string;   // e.g. 'श्री गणेश'
  labelEnglish: string; // e.g. 'Shree Ganesh'
  symbol: string;       // Unicode symbol or emoji used as fallback
  svgPath?: string;     // optional path to SVG file in /public/deities/
}

export const deityOptions: DeityOption[] = [
  { id: 'ganesh',      labelMarathi: 'श्री गणेश',      symbol: '🕉️' },
  { id: 'laxmi',       labelMarathi: 'श्री लक्ष्मी',    symbol: '🪔' },
  { id: 'saraswati',   labelMarathi: 'श्री सरस्वती',    symbol: '🎵' },
  { id: 'balaji',      labelMarathi: 'श्री बालाजी',     symbol: '🙏' },
  { id: 'shiva',       labelMarathi: 'श्री शंकर',       symbol: '🔱' },
  { id: 'krishna',     labelMarathi: 'श्री कृष्ण',      symbol: '🦚' },
  { id: 'rama',        labelMarathi: 'श्री राम',         symbol: '🏹' },
  { id: 'none',        labelMarathi: 'देवता नको',        symbol: '✕'  },
];
```

Place SVG files in: `public/deities/ganesh.svg`, `laxmi.svg` etc.
Source free deity SVGs from OpenClipart or similar free SVG libraries.

**UI:**
- Grid of 8 clickable cards (4 per row on desktop, 2 per row on mobile)
- Each card shows: SVG icon (48x48) + deity name below in Marathi/Hindi/English
  based on current language setting
- Selected card: maroon border (3px solid primary.main) + gold checkmark
  overlay in top-right corner
- Hover: subtle gold border + scale(1.05) transform
- "None" option: removes deity icon from biodata entirely (for users who prefer
  a clean modern biodata)

**Template rendering:**
In all 3 template components, at the very top of the biodata layout:
```tsx
{formData.selectedDeity !== 'none' && (
  <Box sx={{ textAlign: 'center', mb: 1 }}>
    <img
      src={`/deities/${formData.selectedDeity}.svg`}
      alt={selectedDeityOption.labelMarathi}
      style={{ width: 64, height: 64 }}
    />
  </Box>
)}
```

**Context additions needed:**
```typescript
selectedDeity: string;   // default: 'ganesh'
updateDeity: (deityId: string) => void;
```

---

### Feature 4 — Custom Blessing / Shloka Line Editor

**What it does:**
Users can choose or write the auspicious text line that appears directly
below the deity icon at the top of their biodata.
Examples: "|| श्री गणेशाय नमः ||", "जय श्री राम", "ॐ नमः शिवाय"

**Where it appears:**
Step 4 — directly below the deity selector, in the same card section.
Labelled: "शुभ वचन निवडा | Choose Blessing Text"

**Preset options (12 total):**
```typescript
export const shlokaPresets: string[] = [
  '|| श्री गणेशाय नमः ||',
  '|| श्री लक्ष्मीनारायण प्रसन्न ||',
  'ॐ नमः शिवाय',
  '|| जय श्री राम ||',
  '|| राधे कृष्ण ||',
  'ॐ सर्वे भवन्तु सुखिनः',
  '|| श्री सरस्वत्यै नमः ||',
  '|| शुभ विवाह ||',
  '|| शुभ मंगल ||',
  '|| ईश्वर कृपा ||',
  '|| श्री बालाजी प्रसन्न ||',
  'कस्टम लिहा...',   // triggers custom input
];
```

**UI:**
- Show presets as MUI ToggleButtonGroup (scrollable row, wrapping)
- Each preset = one ToggleButton, small size, Devanagari text
- Last option "कस्टम लिहा..." = selecting it reveals a MUI TextField below
  for free-text input (max 60 chars, Devanagari keyboard friendly)
- Selected preset: maroon background + white text
- If user types custom text: the custom text is selected/highlighted
- Character counter shown below custom TextField: "XX / 60"
- Live preview updates instantly as user selects preset or types custom text

**Template rendering:**
Appears centered, below deity image, above the biodata title:
```tsx
{formData.shlokaText && (
  <Typography
    variant="body1"
    sx={{
      textAlign: 'center',
      fontFamily: '"Noto Sans Devanagari", sans-serif',
      color: template === 1 ? '#8B0000' : template === 2 ? '#FF6B00' : '#1A237E',
      fontWeight: 600,
      letterSpacing: '0.5px',
      mb: 1,
    }}
  >
    {formData.shlokaText}
  </Typography>
)}
```

**Context additions needed:**
```typescript
shlokaText: string;        // default: '|| श्री गणेशाय नमः ||'
updateShlokaText: (text: string) => void;
```

---

## 📦 New Packages Required for Phase 2 Features
```bash
npm install @hello-pangea/dnd
npm install -D @types/hello-pangea__dnd
```

No other new packages needed — deity icons use SVG files in /public,
shloka presets use MUI ToggleButtonGroup (already in @mui/material).

---

## 🗂️ New Files Required for Phase 2
```
src/
├── utils/
│   ├── deityOptions.ts        ← DeityOption interface + deityOptions array
│   └── shlokaPresets.ts       ← shlokaPresets string array
├── components/
│   ├── FieldReorderPanel.tsx  ← drag-and-drop reorder UI (@hello-pangea/dnd)
│   ├── DeitySelector.tsx      ← deity icon grid selector
│   └── ShlokaEditor.tsx       ← preset toggle + custom text input
public/
└── deities/
    ├── ganesh.svg
    ├── laxmi.svg
    ├── saraswati.svg
    ├── balaji.svg
    ├── shiva.svg
    ├── krishna.svg
    └── rama.svg
```

---

## 🔄 BiodataContext — Complete Updated Additions

Add these fields to BiodataFormData interface:
```typescript
// In biodata.types.ts — add to BiodataFormData:
selectedDeity: string;
shlokaText: string;
customLabels: Record<string, string>;
fieldOrder: {
  personal: string[];
  family: string[];
  education: string[];
  address: string[];
};
```

Add these to BiodataContextType interface and BiodataProvider:
```typescript
// Deity
updateDeity: (deityId: string) => void;

// Shloka
updateShlokaText: (text: string) => void;

// Custom Labels
updateCustomLabel: (fieldKey: string, label: string) => void;
resetCustomLabels: () => void;

// Field Order
updateFieldOrder: (
  section: 'personal' | 'family' | 'education' | 'address',
  newOrder: string[]
) => void;
resetFieldOrder: () => void;
```

Default values to add in defaultFormData:
```typescript
selectedDeity: 'ganesh',
shlokaText: '|| श्री गणेशाय नमः ||',
customLabels: {},
fieldOrder: {
  personal: ['fullName','dateOfBirth','timeOfBirth','placeOfBirth',
             'rashi','nakshatra','gotra','religion','caste',
             'subCaste','height','complexion','bloodGroup','manglik'],
  family:   ['fatherName','fatherOccupation','motherName',
             'motherOccupation','totalBrothers','marriedBrothers',
             'totalSisters','marriedSisters','familyType','nativePlace'],
  education:['qualification','university','additionalCertifications',
             'occupation','companyName','jobTitle','annualIncome'],
  address:  ['fullAddress','city','district','state','pincode',
             'mobile','whatsapp','email'],
},
```

