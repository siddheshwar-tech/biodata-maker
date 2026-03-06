import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import {
  BiodataFormData,
  BiodataContextType,
  PersonalDetails,
  FamilyDetails,
  EducationDetails,
  AddressDetails,
  TemplateId,
  Language,
} from '../types/biodata.types';

const LOCAL_STORAGE_KEY = 'vivah_biodata_draft';

const defaultFieldOrder = {
  personal: [
    'fullName',
    'dateOfBirth',
    'timeOfBirth',
    'placeOfBirth',
    'rashi',
    'nakshatra',
    'gotra',
    'religion',
    'caste',
    'subCaste',
    'height',
    'complexion',
    'bloodGroup',
    'manglik',
  ],
  family: [
    'fatherName',
    'fatherOccupation',
    'motherName',
    'motherOccupation',
    'totalBrothers',
    'marriedBrothers',
    'totalSisters',
    'marriedSisters',
    'familyType',
    'nativePlace',
  ],
  education: [
    'qualification',
    'additionalCertifications',
    'occupation',
    'companyName',
    'jobTitle',
    'annualIncome',
  ],
  address: [
    'fullAddress',
    'city',
    'district',
    'state',
    'pincode',
    'mobile',
    'email',
  ],
};

interface State {
  formData: BiodataFormData;
  currentStep: number;
  fieldOrder: typeof defaultFieldOrder;
}

type Action =
  | { type: 'updatePersonal'; payload: PersonalDetails }
  | { type: 'updateFamily'; payload: FamilyDetails }
  | { type: 'updateEducation'; payload: EducationDetails }
  | { type: 'updateAddress'; payload: AddressDetails }
  | { type: 'updatePhoto'; payload: string | null }
  | { type: 'updateTemplate'; payload: TemplateId }
  | { type: 'updateLanguage'; payload: Language }
  | { type: 'updateDeity'; payload: string }
  | { type: 'updateShlokaText'; payload: string }
  | { type: 'updateFieldOrder'; payload: { section: keyof typeof defaultFieldOrder; order: string[] } }
  | { type: 'resetFieldOrder' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

const defaultFormData: BiodataFormData = {
  personal: {
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    rashi: '',
    nakshatra: '',
    gotra: '',
    religion: '',
    caste: '',
    subCaste: '',
    height: '',
    complexion: '',
    bloodGroup: '',
    manglik: '',
  },
  family: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    totalBrothers: 0,
    marriedBrothers: 0,
    totalSisters: 0,
    marriedSisters: 0,
    familyType: '',
    nativePlace: '',
  },
  education: {
    qualification: '',
    university: '',
    additionalCertifications: '',
    occupation: '',
    companyName: '',
    jobTitle: '',
    annualIncome: '',
  },
  address: {
    fullAddress: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    mobile: '',
    email: '',
  },
  photo: null,
  selectedTemplate: 3,
  language: 'english',
  selectedDeity: 'ganesh_2',
  shlokaText: '|| श्री गणेशाय नमः ||',
};

const initialState: State = {
  formData: defaultFormData,
  // steps are zero-indexed; 0 corresponds to the first personal/family page
  currentStep: 0,
  fieldOrder: defaultFieldOrder,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'updatePersonal':
      return {
        ...state,
        formData: { ...state.formData, personal: action.payload },
      };
    case 'updateFamily':
      return {
        ...state,
        formData: { ...state.formData, family: action.payload },
      };
    case 'updateEducation':
      return {
        ...state,
        formData: { ...state.formData, education: action.payload },
      };
    case 'updateAddress':
      return {
        ...state,
        formData: { ...state.formData, address: action.payload },
      };
    case 'updatePhoto':
      return {
        ...state,
        formData: { ...state.formData, photo: action.payload },
      };
    case 'updateTemplate':
      return {
        ...state,
        formData: { ...state.formData, selectedTemplate: action.payload },
      };
    case 'updateLanguage':
      return {
        ...state,
        formData: { ...state.formData, language: action.payload },
      };
    case 'updateDeity':
      return {
        ...state,
        formData: { ...state.formData, selectedDeity: action.payload },
      };
    case 'updateShlokaText':
      return {
        ...state,
        formData: { ...state.formData, shlokaText: action.payload },
      };
    case 'setStep':
      return { ...state, currentStep: action.payload };
    case 'reset':
      return { ...initialState, fieldOrder: defaultFieldOrder };
    case 'updateFieldOrder':
      return {
        ...state,
        fieldOrder: {
          ...state.fieldOrder,
          [action.payload.section]: action.payload.order,
        },
      };
    case 'resetFieldOrder':
      return {
        ...state,
        fieldOrder: defaultFieldOrder,
      };
    default:
      return state;
  }
};

const loadFromStorage = (): State => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as State;
    }
  } catch (_e) {
    // ignore
  }
  return initialState;
};

const saveToStorage = (state: State) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (_e) {
    // ignore write errors
  }
};

const BiodataContext = createContext<BiodataContextType | undefined>(undefined);

export const BiodataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => loadFromStorage());

  // persist whenever state changes
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const value: BiodataContextType = {
    formData: state.formData,
    fieldOrder: state.fieldOrder,
    updatePersonal: (data) => dispatch({ type: 'updatePersonal', payload: data }),
    updateFamily: (data) => dispatch({ type: 'updateFamily', payload: data }),
    updateEducation: (data) => dispatch({ type: 'updateEducation', payload: data }),
    updateAddress: (data) => dispatch({ type: 'updateAddress', payload: data }),
    updatePhoto: (photo) => dispatch({ type: 'updatePhoto', payload: photo }),
    updateTemplate: (id) => dispatch({ type: 'updateTemplate', payload: id }),
    updateLanguage: (lang) => dispatch({ type: 'updateLanguage', payload: lang }),
    updateDeity: (deityId) => dispatch({ type: 'updateDeity', payload: deityId }),
    updateShlokaText: (text) => dispatch({ type: 'updateShlokaText', payload: text }),
    updateFieldOrder: (section, newOrder) =>
      dispatch({ type: 'updateFieldOrder', payload: { section, order: newOrder } }),
    resetFieldOrder: () => dispatch({ type: 'resetFieldOrder' }),
    currentStep: state.currentStep,
    setCurrentStep: (step) => dispatch({ type: 'setStep', payload: step }),
    resetForm: () => dispatch({ type: 'reset' }),
  };

  return <BiodataContext.Provider value={value}>{children}</BiodataContext.Provider>;
};

export const useBiodata = () => {
  const ctx = useContext(BiodataContext);
  if (!ctx) {
    throw new Error('useBiodata must be used within a BiodataProvider');
  }
  return ctx;
};
