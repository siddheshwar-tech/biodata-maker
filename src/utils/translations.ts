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
  | 'email'
  // gotra options (keys correspond to dropdownOptions.gotraOptions)
  | 'gotra_atri'
  | 'gotra_bhardwaj'
  | 'gotra_kaushik'
  | 'gotra_kashyap'
  | 'gotra_vasistha'
  | 'gotra_agastya'
  | 'gotra_vats'
  | 'gotra_bajaj'
  | 'gotra_chandra'
  | 'gotra_sharma'
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
  | 'customBlessing'
  | 'biodataTitle'
  | 'fieldName'
  | 'resetLabels'
  | 'rashi_mesh'
  | 'rashi_vrushabh'
  | 'rashi_mithun'
  | 'rashi_kark'
  | 'rashi_sinh'
  | 'rashi_kanya'
  | 'rashi_tula'
  | 'rashi_vrushchik'
  | 'rashi_dhanu'
  | 'rashi_makar'
  | 'rashi_kumbh'
  | 'rashi_meen'
  | 'nakshatra_ashwini'
  | 'nakshatra_bharani'
  | 'nakshatra_krittika'
  | 'nakshatra_rohini'
  | 'nakshatra_mrigashirsha'
  | 'nakshatra_ardra'
  | 'nakshatra_punarvasu'
  | 'nakshatra_pushya'
  | 'nakshatra_ashlesha'
  | 'nakshatra_magha'
  | 'nakshatra_purva_phalguni'
  | 'nakshatra_uttara_phalguni'
  | 'nakshatra_hasta'
  | 'nakshatra_chitra'
  | 'nakshatra_swati'
  | 'nakshatra_vishakha'
  | 'nakshatra_anuradha'
  | 'nakshatra_jyeshtha'
  | 'nakshatra_mula'
  | 'nakshatra_purva_ashadha'
  | 'nakshatra_uttara_ashadha'
  | 'nakshatra_shravana'
  | 'nakshatra_dhanishta'
  | 'nakshatra_shatabhisha'
  | 'nakshatra_purva_bhadrapada'
  | 'nakshatra_uttara_bhadrapada'
  | 'nakshatra_revati'
  | 'religion_hindu'
  | 'religion_muslim'
  | 'religion_christian'
  | 'religion_sikh'
  | 'religion_buddhist'
  | 'religion_jain'
  | 'religion_other'
  | 'complexion_fair'
  | 'complexion_wheatish'
  | 'complexion_dusky'
  | 'complexion_dark'
  ;

type Translations = Record<TranslationKey, string>;

export const translations: Record<Language, Translations> = {
  marathi: {
    fieldName: '',
    resetLabels: 'सर्व लेबले रीसेट करा',
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
    subCaste: 'उपजाती',
    height: 'उंची',
    complexion: 'वर्ण',
    bloodGroup: 'रक्त गट',
    fatherName: 'वडिलांचे नाव',
    fatherOccupation: 'वडिलांचा व्यवसाय',
    motherName: 'आईचे नाव',
    motherOccupation: 'आईचा व्यवसाय',
    brothers: 'भाऊ',
    sisters: 'बहिणी',
    married: 'विवाहित',
    unmarried: 'अविवाहित',
    familyType: 'कौटुंबिक प्रकार',
    nativePlace: 'मूळ स्थान',
    qualification: 'शैक्षणिक पात्रता',
    university: 'विश्वविद्यालय',
    certifications: 'प्रमाणपत्रे',
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
    email: 'ईमेल',
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
    universityPlaceholder: 'विद्यापीठ / बोर्डाचे नाव',
    certificationsPlaceholder: 'अतिरिक्त प्रमाणपत्र, अभ्यासक्रम...',
    occupationLabel: 'नोकरी / व्यवसाय प्रकार',
    mobileHelperText: '10 अंकी मोबाईल नंबर',
    addressPlaceholder: 'घर नंबर, बिल्डिंग, रस्त्याचे नाव...',
    optionalLabel: 'ऐच्छिक',
    uploadedPhoto: 'अपलोड केलेला फोटो',
    changePhoto: 'फोटो बदला',
    deletePhoto: 'फोटो हटवा',
    mostPopular: 'सर्वाधिक लोकप्रिय',
    traditional: 'पारंपारिक',
    professional: 'व्यावसायिक',
    cleanProfessional: 'स्वच्छ, व्यावसायिक डिझाईन',
    traditionMarathi: 'पारंपारिक',
    goldenDecor: 'मराठी परंपरा, सुवर्ण सजावट',
    religiousMarathi: 'धार्मिक',
    ganeshStyle: 'पारंपरिक शैली',
    modernMarathi: 'आधुनिक',
    addPhotoOptional: 'फोटो जोडा (ऐच्छिक)',
    chooseYourTemplate: 'तुमचा टेम्पलेट निवडा',
    beautyDesigns: '3 सुंदर डिझाईन उपलब्ध आहेत',
    customizeLayoutData: 'फील्ड्स चे क्रम बदलण्यासाठी ड्रॅग करा. विभागांचे स्वतंत्र क्रम आहेत.',
    chooseDeitySymbol: 'देवतेची प्रतिमा निवडा',
    chooseBlessingText: 'शुभ वचन निवडा',
    customBlessing: 'स्वतः लिहा...',
    biodataReady: 'बायोडेटा तयार आहे! 🎉',
    clickButtonBelow: 'खाली दिलेल्या बटनावर क्लिक करा',
    pdfDownloadFolder: 'PDF आपोआप डाउनलोड फोल्डरमध्ये सेव्ह होईल',
    biodataTitle: 'बायोडेटा',
    // gotra option labels
    gotra_atri: 'अत्री',
    gotra_bhardwaj: 'भरद्वाज',
    gotra_kaushik: 'कौशिक',
    gotra_kashyap: 'कश्यप',
    gotra_vasistha: 'वसिष्ठ',
    gotra_agastya: 'अगस्त्य',
    gotra_vats: 'वात्स',
    gotra_bajaj: 'बाजाज',
    gotra_chandra: 'चंद्र',
    gotra_sharma: 'शर्मा',
    rashi_mesh: 'मेष',
    rashi_vrushabh: 'वृषभ',
    rashi_mithun: 'मिथुन',
    rashi_kark: 'कर्क',
    rashi_sinh: 'सिंह',
    rashi_kanya: 'कन्या',
    rashi_tula: 'तुला',
    rashi_vrushchik: 'वृश्चिक',
    rashi_dhanu: 'धनु',
    rashi_makar: 'मकर',
    rashi_kumbh: 'कुंभ',
    rashi_meen: 'मीन',
    nakshatra_ashwini: 'अश्विनी',
    nakshatra_bharani: 'भरणी',
    nakshatra_krittika: 'कृत्तिका',
    nakshatra_rohini: 'रोहिणी',
    nakshatra_mrigashirsha: 'मृगशीर्ष',
    nakshatra_ardra: 'आर्द्रा',
    nakshatra_punarvasu: 'पुनर्वसु',
    nakshatra_pushya: 'पुष्य',
    nakshatra_ashlesha: 'आश्लेषा',
    nakshatra_magha: 'मघा',
    nakshatra_purva_phalguni: 'पूर्वाफाल्गुनी',
    nakshatra_uttara_phalguni: 'उत्तराफाल्गुनी',
    nakshatra_hasta: 'हस्त',
    nakshatra_chitra: 'चित्रा',
    nakshatra_swati: 'स्वाती',
    nakshatra_vishakha: 'विशाखा',
    nakshatra_anuradha: 'अनुराधा',
    nakshatra_jyeshtha: 'ज्येष्ठा',
    nakshatra_mula: 'मूळ',
    nakshatra_purva_ashadha: 'पूर्वाषाढा',
    nakshatra_uttara_ashadha: 'उत्तराषाढा',
    nakshatra_shravana: 'श्रवण',
    nakshatra_dhanishta: 'धनिष्ठा',
    nakshatra_shatabhisha: 'शतभिषा',
    nakshatra_purva_bhadrapada: 'पूर्वाभाद्रपदा',
    nakshatra_uttara_bhadrapada: 'उत्तराभाद्रपदा',
    nakshatra_revati: 'रेवती',
    religion_hindu: 'हिंदू',
    religion_muslim: 'मुस्लिम',
    religion_christian: 'ख्रिश्चन',
    religion_sikh: 'शीख',
    religion_buddhist: 'बौद्ध',
    religion_jain: 'जैन',
    religion_other: 'इतर',
    complexion_fair: 'गोरा',
    complexion_wheatish: 'गव्हाळ',
    complexion_dusky: 'सावळा',
    complexion_dark: 'काळा',

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
    complexion: 'वर्ण',
    bloodGroup: 'रक्त समूह',
    fatherName: 'पिता का नाम',
    fatherOccupation: 'पिता का पेशा',
    motherName: 'माता का नाम',
    motherOccupation: 'माता का पेशा',
    brothers: 'भाई',
    sisters: 'बहनें',
    married: 'विवाहित',
    unmarried: 'अविवाहित',
    familyType: 'परिवार का प्रकार',
    nativePlace: 'मूल निवास स्थान',
    qualification: 'शैक्षणिक योग्यता',
    university: 'विश्वविद्यालय',
    certifications: 'प्रमाणपत्रें',
    occupation: 'व्यवसाय',
    companyName: 'कंपनी का नाम',
    jobTitle: 'पद',
    annualIncome: 'वार्षिक आय',
    fullAddress: 'पूरा पता',
    city: 'शहर',
    district: 'जिला',
    state: 'राज्य',
    pincode: 'पिनकोड',
    mobile: 'मोबाइल नंबर',
    email: 'ईमेल',
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
    occupationLabel: 'नौकरी / व्यवसाय',
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
    chooseBlessingText: 'आशीर्वाद चुनें',
    customBlessing: 'कस्टम लिखें...',
    biodataReady: 'बायोडेटा तैयार है! 🎉',
    clickButtonBelow: 'नीचे दिए गए बटन पर क्लिक करें',
    pdfDownloadFolder: 'PDF अपने आप डाउनलोड फ़ोल्डर में सेव हो जाएगी',
    fieldName: 'फ़ील्ड का नाम',
    resetLabels: 'सभी लेबल रीसेट करें',
    biodataTitle: 'बायोडेटा',
    // gotra option labels
    gotra_atri: 'अत्री',
    gotra_bhardwaj: 'भरद्वाज',
    gotra_kaushik: 'कौशिक',
    gotra_kashyap: 'कश्यप',
    gotra_vasistha: 'वासिष्ठ',
    gotra_agastya: 'अगस्त्य',
    gotra_vats: 'वात्स',
    gotra_bajaj: 'बाजाज',
    gotra_chandra: 'चंद्र',
    gotra_sharma: 'शर्मा',
    rashi_mesh: 'मेष',
    rashi_vrushabh: 'वृषभ',
    rashi_mithun: 'मिथुन',
    rashi_kark: 'कर्क',
    rashi_sinh: 'सिंह',
    rashi_kanya: 'कन्या',
    rashi_tula: 'तुला',
    rashi_vrushchik: 'वृश्चिक',
    rashi_dhanu: 'धनु',
    rashi_makar: 'मकर',
    rashi_kumbh: 'कुंभ',
    rashi_meen: 'मीन',
    nakshatra_ashwini: 'अश्विनी',
    nakshatra_bharani: 'भरणी',
    nakshatra_krittika: 'कृत्तिका',
    nakshatra_rohini: 'रोहिणी',
    nakshatra_mrigashirsha: 'मृगशीर्ष',
    nakshatra_ardra: 'आर्द्रा',
    nakshatra_punarvasu: 'पुनर्वसु',
    nakshatra_pushya: 'पुष्य',
    nakshatra_ashlesha: 'आश्लेषा',
    nakshatra_magha: 'मघा',
    nakshatra_purva_phalguni: 'पूर्वाफाल्गुनी',
    nakshatra_uttara_phalguni: 'उत्तराफाल्गुनी',
    nakshatra_hasta: 'हस्त',
    nakshatra_chitra: 'चित्रा',
    nakshatra_swati: 'स्वाती',
    nakshatra_vishakha: 'विशाखा',
    nakshatra_anuradha: 'अनुराधा',
    nakshatra_jyeshtha: 'ज्येष्ठा',
    nakshatra_mula: 'मूल',
    nakshatra_purva_ashadha: 'पूर्वाषाढ़ा',
    nakshatra_uttara_ashadha: 'उत्तराषाढ़ा',
    nakshatra_shravana: 'श्रवण',
    nakshatra_dhanishta: 'धनिष्ठा',
    nakshatra_shatabhisha: 'शतभिषा',
    nakshatra_purva_bhadrapada: 'पूर्वाभाद्रपदा',
    nakshatra_uttara_bhadrapada: 'उत्तराभाद्रपदा',
    nakshatra_revati: 'रेवती',
    religion_hindu: 'हिंदू',
    religion_muslim: 'मुस्लिम',
    religion_christian: 'ईसाई',
    religion_sikh: 'सिख',
    religion_buddhist: 'बौद्ध',
    religion_jain: 'जैन',
    religion_other: 'अन्य',
    complexion_fair: 'गोरा',
    complexion_wheatish: 'गेहुआँ',
    complexion_dusky: 'सांवला',
    complexion_dark: 'काला',

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
    email: 'Email',
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
    biodataTitle: 'Biodata',
    fieldName: 'Field name',
    resetLabels: 'Reset labels',
    // gotra option labels
    gotra_atri: 'Atri',
    gotra_bhardwaj: 'Bhardwaj',
    gotra_kaushik: 'Kaushik',
    gotra_kashyap: 'Kashyap',
    gotra_vasistha: 'Vasistha',
    gotra_agastya: 'Agastya',
    gotra_vats: 'Vats',
    gotra_bajaj: 'Bajaj',
    gotra_chandra: 'Chandra',
    gotra_sharma: 'Sharma',
    rashi_mesh: 'Aries',
    rashi_vrushabh: 'Taurus',
    rashi_mithun: 'Gemini',
    rashi_kark: 'Cancer',
    rashi_sinh: 'Leo',
    rashi_kanya: 'Virgo',
    rashi_tula: 'Libra',
    rashi_vrushchik: 'Scorpio',
    rashi_dhanu: 'Sagittarius',
    rashi_makar: 'Capricorn',
    rashi_kumbh: 'Aquarius',
    rashi_meen: 'Pisces',
    nakshatra_ashwini: 'Ashwini',
    nakshatra_bharani: 'Bharani',
    nakshatra_krittika: 'Krittika',
    nakshatra_rohini: 'Rohini',
    nakshatra_mrigashirsha: 'Mrigashirsha',
    nakshatra_ardra: 'Ardra',
    nakshatra_punarvasu: 'Punarvasu',
    nakshatra_pushya: 'Pushya',
    nakshatra_ashlesha: 'Ashlesha',
    nakshatra_magha: 'Magha',
    nakshatra_purva_phalguni: 'Purva Phalguni',
    nakshatra_uttara_phalguni: 'Uttara Phalguni',
    nakshatra_hasta: 'Hasta',
    nakshatra_chitra: 'Chitra',
    nakshatra_swati: 'Swati',
    nakshatra_vishakha: 'Vishakha',
    nakshatra_anuradha: 'Anuradha',
    nakshatra_jyeshtha: 'Jyeshtha',
    nakshatra_mula: 'Mula',
    nakshatra_purva_ashadha: 'Purva Ashadha',
    nakshatra_uttara_ashadha: 'Uttara Ashadha',
    nakshatra_shravana: 'Shravana',
    nakshatra_dhanishta: 'Dhanishta',
    nakshatra_shatabhisha: 'Shatabhisha',
    nakshatra_purva_bhadrapada: 'Purva Bhadrapada',
    nakshatra_uttara_bhadrapada: 'Uttara Bhadrapada',
    nakshatra_revati: 'Revati',
    religion_hindu: 'Hindu',
    religion_muslim: 'Muslim',
    religion_christian: 'Christian',
    religion_sikh: 'Sikh',
    religion_buddhist: 'Buddhist',
    religion_jain: 'Jain',
    religion_other: 'Other',
    complexion_fair: 'Fair',
    complexion_wheatish: 'Wheatish',
    complexion_dusky: 'Dusky',
    complexion_dark: 'Dark',

  },
};

export const useTranslation = (language: Language) => {
  return (key: TranslationKey): string => {
    return translations[language][key];
  };
};
