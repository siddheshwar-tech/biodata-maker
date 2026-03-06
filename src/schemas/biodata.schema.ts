import { z } from 'zod';

// ─────────────────────────────────────────────
// STEP 1 — Personal + Family (Flat/Combined)
// ─────────────────────────────────────────────
export const personalFamilySchema = z.object({
  // ── Personal Details ──
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
  height: z.string().optional(),
  complexion: z.string().optional(),
  bloodGroup: z.string().optional(),
  manglik: z.string().optional(),

  // ── Family Details ──
  fatherName: z.string().min(2, "Father's name is required"),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(2, "Mother's name is required"),
  motherOccupation: z.string().optional(),

totalBrothers: z.number().min(0).max(10),
marriedBrothers: z.number().min(0).max(10),
totalSisters: z.number().min(0).max(10),
marriedSisters: z.number().min(0).max(10),

  familyType: z.string().optional(),
  nativePlace: z.string().optional(),
});

export type PersonalFamilyFormValues = z.infer<typeof personalFamilySchema>;


// ─────────────────────────────────────────────
// STEP 2 — Education & Career
// ─────────────────────────────────────────────
export const educationSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  university: z.string().optional().default(''),
  additionalCertifications: z.string().optional().default(''),
  occupation: z.string().min(1, 'Occupation is required'),
  companyName: z.string().optional().default(''),
  jobTitle: z.string().optional().default(''),
  annualIncome: z.string().optional().default(''),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

// ─────────────────────────────────────────────
// STEP 3 — Address & Contact
// ─────────────────────────────────────────────
export const addressSchema = z.object({
  fullAddress: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(1, 'City is required'),
  district: z.string().optional().default(''),
  state: z.string().min(1, 'State is required'),
  pincode: z.string()
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^[0-9]{6}$/, 'Pincode must contain only numbers'),
  mobile: z.string()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
});

export type AddressFormValues = z.infer<typeof addressSchema>;