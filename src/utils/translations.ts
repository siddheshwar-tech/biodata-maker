// src/utils/translations.ts

import { Language } from '../types/biodata.types';

export type TranslationKey =
  | 'appName'
  | 'tagline'
  | 'createBiodata'
  | 'personalDetails'
  | 'familyDetails'
  | 'educationCareer'
  | 'addressContact'
  | 'photoTemplate'
  | 'fullName'
  | 'dateOfBirth'
  | 'timeOfBirth'
  | 'placeOfBirth'
  | 'rashi'
  | 'nakshatra'
  | 'gotra'
  | 'religion'
  | 'caste'
  | 'subCaste'
  | 'height'
  | 'complexion'
  | 'bloodGroup'
  | 'fatherName'
  | 'fatherOccupation'
  | 'motherName'
  | 'motherOccupation'
  | 'brothers'
  | 'sisters'
  | 'married'
  | 'unmarried'
  | 'familyType'
  | 'nativePlace'
  | 'qualification'
  | 'university'
  | 'certifications'
  | 'occupation'
  | 'companyName'
  | 'jobTitle'
  | 'annualIncome'
  | 'fullAddress'
  | 'city'
  | 'district'
  | 'state'
  | 'pincode'
  | 'mobile'
  | 'whatsapp'
  | 'email'
  | 'sameAsMobile'
  | 'uploadPhoto'
  | 'chooseTemplate'
  | 'downloadPDF'
  | 'next'
  | 'back'
  | 'preview'
  | 'step'
  | 'of'
  | 'personalFamily'
  | 'manglik'
  | 'universityPlaceholder'
  | 'certificationsPlaceholder'
  | 'occupationLabel'
  | 'mobileHelperText'
  | 'addressPlaceholder'
  | 'optionalLabel'
  | 'uploadedPhoto'
  | 'changePhoto'
  | 'deletePhoto'
  | 'mostPopular'
  | 'traditional'
  | 'professional'
  | 'cleanProfessional'
  | 'traditionMarathi'
  | 'goldenDecor'
  | 'religiousMarathi'
  | 'ganeshStyle'
  | 'modernMarathi'
  | 'addPhotoOptional'
  | 'chooseYourTemplate'
  | 'beautyDesigns'
  | 'customizeLayoutData'
  | 'biodataReady'
  | 'clickButtonBelow'
  | 'pdfDownloadFolder'
  | 'chooseDeitySymbol'
  | 'chooseBlessingText'
  | 'customBlessing';

type Translations = Record<TranslationKey, string>;

export const translations: Record<Language, Translations> = {
  marathi: {
    appName: 'विवाह बायोडेटा मेकर',
    tagline: 'एक क्लिकमध्ये तुमचा बायोडेटा तयार करा',
    createBiodata: 'बायोडेटा बनवा',
    personalDetails: 'वैयक्तिक माहिती',
    familyDetails: 'कौटुंबिक माहिती',
    educationCareer: 'शिक्षण व करिअर',
    addressContact: 'पत्ता व संपर्क',
    photoTemplate: 'फोटो व डिझाईन',
    fullName: 'पूर्ण नाव',
    dateOfBirth: 'जन्म तारीख',
    timeOfBirth: 'जन्म वेळ',
    placeOfBirth: 'जन्म स्थान',
    rashi: 'राशी',
    nakshatra: 'नक्षत्र',
    gotra: 'गोत्र',
    religion: 'धर्म',
    caste: 'जाती',
    subCaste: 'उप जाती',
    height: 'उंची',
    complexion: 'रंग',
    bloodGroup: 'रक्त गट',
    fatherName: 'पितांचे नाव',
    fatherOccupation: 'पितांचा व्यवसाय',
    motherName: 'मातांचे नाव',
    motherOccupation: 'मातांचा व्यवसाय',
    brothers: 'भाई',
    sisters: 'बहिणी',
    married: 'विवाहित',
    unmarried: 'अविवाहित',
    familyType: 'कौटुंबिक प्रकार',
    nativePlace: 'मूळ स्थान',
    qualification: 'शैक्षणिक पात्रता',
    university: 'विश्वविद्यालय',
    certifications: 'प्रमाणपत्र',
    occupation: 'व्यवसाय',
    companyName: 'कंपनीचे नाव',
    jobTitle: 'पदाचे नाव',
    annualIncome: 'वार्षिक उत्पन्न',
    fullAddress: 'संपूर्ण पत्ता',
    city: 'शहर',
    district: 'जिल्हा',
    state: 'राज्य',
    pincode: 'पिनकोड',
    mobile: 'मोबाईल नं.',
    whatsapp: 'व्हाट्सअँप नं.',
    email: 'ईमेल',
    sameAsMobile: 'हे मोबाईल नंबरसारखेच आहे',
    uploadPhoto: 'फोटो अपलोड करा',
    chooseTemplate: 'डिझाईन निवडा',
    downloadPDF: 'PDF डाऊनलोड करा',
    next: 'पुढे जा',
    back: 'मागे जा',
    preview: 'पूर्वावलोकन',
    step: 'पायरी',
    of: 'पैकी',
    personalFamily: 'वैयक्तिक व कौटुंबिक',
    manglik: 'मांगलिक',
    universityPlaceholder: 'विश्वविद्यालय / बोर्डाचे नाव',
    certificationsPlaceholder: 'अतिरिक्त प्रमाणपत्र, अभ्यासक्रम...',
    occupationLabel: 'नोकरी / व्यवसाय प्रकार',
    mobileHelperText: '10 अंकी मोबाईल नंबर',
    addressPlaceholder: 'घर नंबर, बिल्डिंग, रस्त्याचे नाव...',
    optionalLabel: 'ऐच्छिक',
    uploadedPhoto: 'अपलोड केलेली फोटो',
    changePhoto: 'फोटो बदला',
    deletePhoto: 'फोटो हटवा',
    mostPopular: 'सर्वाधिक लोकप्रिय',
    traditional: 'पारंपारिक',
    professional: 'व्यावसायिक',
    cleanProfessional: 'स्वच्छ, व्यावसायिक डिझाईन',
    traditionMarathi: 'पारंपारिक',
    goldenDecor: 'मराठी परंपरा, सुवर्ण सजावट',
    religiousMarathi: 'धार्मिक',
    ganeshStyle: 'गणेश वंदना, सनातन शैली',
    modernMarathi: 'आधुनिक',
    addPhotoOptional: 'फोटो जोडा (ऐच्छिक)',
    chooseYourTemplate: 'तुमचा टेम्पलेट निवडा',
    beautyDesigns: '3 सुंदर डिझाईन उपलब्ध आहेत',
    customizeLayoutData: 'फील्ड्स चे क्रम बदलण्यासाठी ड्रॅग करा. विभागांचे स्वतंत्र क्रम आहेत.',
    chooseDeitySymbol: 'देवतेची प्रतिमा निवडा',
    chooseBlessingText: 'शुभ वचन निवडा',
    customBlessing: 'कस्टम लिहा...',
    biodataReady: 'बायोडेटा तयार आहे! 🎉',
    clickButtonBelow: 'खाली दिलेल्या बटनावर क्लिक करा',
    pdfDownloadFolder: 'PDF आपोआप download folder मध्ये जाईल',
  },
  hindi: {
    appName: 'विवाह बायोडेटा मेकर',
    tagline: 'एक क्लिक में अपना बायोडेटा बनाएं',
    createBiodata: 'बायोडेटा बनाएं',
    personalDetails: 'व्यक्तिगत जानकारी',
    familyDetails: 'पारिवारिक जानकारी',
    educationCareer: 'शिक्षा और करियर',
    addressContact: 'पता और संपर्क',
    photoTemplate: 'फोटो और डिज़ाइन',
    fullName: 'पूरा नाम',
    dateOfBirth: 'जन्म तिथि',
    timeOfBirth: 'जन्म का समय',
    placeOfBirth: 'जन्म का स्थान',
    rashi: 'राशि',
    nakshatra: 'नक्षत्र',
    gotra: 'गोत्र',
    religion: 'धर्म',
    caste: 'जाति',
    subCaste: 'उप जाति',
    height: 'ऊंचाई',
    complexion: 'रंग',
    bloodGroup: 'रक्त समूह',
    fatherName: 'पिता का नाम',
    fatherOccupation: 'पिता का पेशा',
    motherName: 'माता का नाम',
    motherOccupation: 'माता का पेशा',
    brothers: 'भाई',
    sisters: 'बहन',
    married: 'विवाहित',
    unmarried: 'अविवाहित',
    familyType: 'परिवार का प्रकार',
    nativePlace: 'मूल निवास स्थान',
    qualification: 'शैक्षणिक योग्यता',
    university: 'विश्वविद्यालय',
    certifications: 'प्रमाण पत्र',
    occupation: 'व्यवसाय',
    companyName: 'कंपनी का नाम',
    jobTitle: 'नौकरी का शीर्षक',
    annualIncome: 'वार्षिक आय',
    fullAddress: 'पूरा पता',
    city: 'शहर',
    district: 'जिला',
    state: 'राज्य',
    pincode: 'पिनकोड',
    mobile: 'मोबाइल नंबर',
    whatsapp: 'व्हाट्सएप नंबर',
    email: 'ईमेल',
    sameAsMobile: 'यह मोबाइल नंबर के समान है',
    uploadPhoto: 'फोटो अपलोड करें',
    chooseTemplate: 'डिज़ाइन चुनें',
    downloadPDF: 'PDF डाउनलोड करें',
    next: 'आगे जाएं',
    back: 'पीछे जाएं',
    preview: 'पूर्वावलोकन',
    step: 'चरण',
    of: 'का',
    personalFamily: 'व्यक्तिगत और पारिवारिक',
    manglik: 'मांगलिक',
    universityPlaceholder: 'विश्वविद्यालय / बोर्ड का नाम',
    certificationsPlaceholder: 'अतिरिक्त प्रमाणपत्र, पाठ्यक्रम...',
    occupationLabel: 'व्यवसाय का प्रकार',
    mobileHelperText: '10 अंकों का मोबाइल नंबर',
    addressPlaceholder: 'घर नंबर, बिल्डिंग, सड़क का नाम...',
    optionalLabel: 'वैकल्पिक',
    uploadedPhoto: 'अपलोड की गई फोटो',
    changePhoto: 'फोटो बदलें',
    deletePhoto: 'फोटो हटाएं',
    mostPopular: 'सबसे लोकप्रिय',
    traditional: 'पारंपरिक',
    professional: 'व्यावसायिक',
    cleanProfessional: 'स्वच्छ, व्यावसायिक डिज़ाइन',
    traditionMarathi: 'पारंपरिक',
    goldenDecor: 'परंपरा, सोने की सजावट',
    religiousMarathi: 'धार्मिक',
    ganeshStyle: 'गणेश वंदना, शाश्वत शैली',
    modernMarathi: 'आधुनिक',
    addPhotoOptional: 'फोटो जोड़ें (वैकल्पिक)',
    chooseYourTemplate: 'अपना टेम्पलेट चुनें',
    beautyDesigns: '3 सुंदर डिज़ाइन उपलब्ध हैं',
    customizeLayoutData: 'अंतिम पीडीएफ में क्रम बदलने के लिए फील्ड्स को ड्रैग करें। अनुभागों का अपना क्रम है।',
    chooseDeitySymbol: 'देवता प्रतीक चुनें',
    chooseBlessingText: 'आशीर्वाद पाठ चुनें',
    customBlessing: 'कस्टम लिखें...',
    biodataReady: 'बायोडेटा तैयार है! 🎉',
    clickButtonBelow: 'नीचे दिए गए बटन पर क्लिक करें',
    pdfDownloadFolder: 'पीडीएफ स्वचालित रूप से डाउनलोड फ़ोल्डर में जाएगी',
  
  },
  english: {
    appName: 'Vivah Biodata Maker',
    tagline: 'Create your biodata in one click',
    createBiodata: 'Create Biodata',
    personalDetails: 'Personal Details',
    familyDetails: 'Family Details',
    educationCareer: 'Education & Career',
    addressContact: 'Address & Contact',
    photoTemplate: 'Photo & Template',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    timeOfBirth: 'Time of Birth',
    placeOfBirth: 'Place of Birth',
    rashi: 'Rashi',
    nakshatra: 'Nakshatra',
    gotra: 'Gotra',
    religion: 'Religion',
    caste: 'Caste',
    subCaste: 'Sub Caste',
    height: 'Height',
    complexion: 'Complexion',
    bloodGroup: 'Blood Group',
    fatherName: "Father's Name",
    fatherOccupation: "Father's Occupation",
    motherName: "Mother's Name",
    motherOccupation: "Mother's Occupation",
    brothers: 'Brothers',
    sisters: 'Sisters',
    married: 'Married',
    unmarried: 'Unmarried',
    familyType: 'Family Type',
    nativePlace: 'Native Place',
    qualification: 'Qualification',
    university: 'University',
    certifications: 'Certifications',
    occupation: 'Occupation',
    companyName: 'Company Name',
    jobTitle: 'Job Title',
    annualIncome: 'Annual Income',
    fullAddress: 'Full Address',
    city: 'City',
    district: 'District',
    state: 'State',
    pincode: 'Pincode',
    mobile: 'Mobile Number',
    whatsapp: 'WhatsApp Number',
    email: 'Email',
    sameAsMobile: 'Same as Mobile',
    uploadPhoto: 'Upload Photo',
    chooseTemplate: 'Choose Template',
    downloadPDF: 'Download PDF',
    next: 'Next',
    back: 'Back',
    preview: 'Preview',
    step: 'Step',
    of: 'of',
    personalFamily: 'Personal & Family',
    manglik: 'Manglik',
    universityPlaceholder: 'University / Board name',
    certificationsPlaceholder: 'Any extra certificates, courses...',
    occupationLabel: 'Type of Occupation',
    mobileHelperText: '10-digit mobile number',
    addressPlaceholder: 'House number, Building, Street name...',
    optionalLabel: 'Optional',
    uploadedPhoto: 'Uploaded Photo',
    changePhoto: 'Change Photo',
    deletePhoto: 'Delete Photo',
    mostPopular: 'Most Popular',
    traditional: 'Traditional',
    professional: 'Professional',
    cleanProfessional: 'Clean, professional design',
    traditionMarathi: 'Traditional',
    goldenDecor: 'Marathi tradition, golden decor',
    religiousMarathi: 'Religious',
    ganeshStyle: 'Ganesh prayer, eternal style',
    modernMarathi: 'Modern',
    addPhotoOptional: 'Add Photo (Optional)',
    chooseYourTemplate: 'Choose Your Template',
    beautyDesigns: '3 beautiful designs available',
    customizeLayoutData: 'Drag fields to change their order in the final PDF. Sections have independent orders.',
    chooseDeitySymbol: 'Choose Deity Symbol',
    chooseBlessingText: 'Choose Blessing Text',
    customBlessing: 'Custom text...',
    biodataReady: 'Biodata is Ready! 🎉',
    clickButtonBelow: 'Click the button below',
    pdfDownloadFolder: 'PDF will automatically go to download folder',
  },
};

export const useTranslation = (language: Language) => {
  return (key: TranslationKey): string => {
    return translations[language][key];
  };
};
