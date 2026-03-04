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
  manglik: string;            // Manglik status
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
  selectedDeity: string;       // default: 'ganesh'
  shlokaText: string;          // default: '|| श्री गणेशाय नमः ||'
}

// Context type used by BiodataContext
export interface BiodataContextType {
  formData: BiodataFormData;
  fieldOrder: {
    personal: string[];
    family: string[];
    education: string[];
    address: string[];
  };
  updatePersonal: (data: PersonalDetails) => void;
  updateFamily: (data: FamilyDetails) => void;
  updateEducation: (data: EducationDetails) => void;
  updateAddress: (data: AddressDetails) => void;
  updatePhoto: (photo: string | null) => void;
  updateTemplate: (id: TemplateId) => void;
  updateLanguage: (lang: Language) => void;
  updateDeity: (deityId: string) => void;
  updateShlokaText: (text: string) => void;
  updateFieldOrder: (
    section: 'personal' | 'family' | 'education' | 'address',
    newOrder: string[]
  ) => void;
  resetFieldOrder: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}