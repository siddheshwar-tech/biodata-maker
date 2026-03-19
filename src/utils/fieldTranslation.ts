import { TranslationKey } from "./translations";

/* ---------- FIELD → PREFIX MAP ---------- */
/* THIS IS THE SINGLE SOURCE OF TRUTH */

const FIELD_PREFIX_MAP: Record<string, string> = {
  // personal
  rashi: "rashi",
  nakshatra: "nakshatra",
  gotra: "gotra",
  religion: "religion",
  manglik: "manglik",
  complexion: "complexion",

  // family
  familyType: "familyType",

  // education
  occupation: "occupation",
  annualIncome: "income",

  // (add more here if needed in future)
};

/* ---------- VALUE TRANSLATOR ---------- */

// export const getTranslatedValue = (
//   t: (key: TranslationKey) => string,
//   field: string,
//   value: any
// ): any => {
//   if (value === undefined || value === null || value === "") {
//     return value;
//   }
//   const prefix = FIELD_PREFIX_MAP[field];
//   if (!prefix) return value;
//   return t(`${prefix}_${value}` as TranslationKey);
// };
export const getTranslatedValue = (
  t: (key: any) => string,
  field: string,
  value: any
): any => {
  if (value === undefined || value === null || value === "") {
    return value;
  }
  const prefix = FIELD_PREFIX_MAP[field];
  if (!prefix) return value;
  const translated = t(`${prefix}_${value}`);
  // fallback if translation missing
  if (!translated || translated === `${prefix}_${value}`) {
    return value;
  }
  return translated;
};

/* ---------- LABEL TRANSLATOR ---------- */

// export const getTranslatedLabel = (
//   t: (key: TranslationKey) => string,
//   field: string,
//   customLabels?: Record<string, string>
// ): string => {
//   return customLabels?.[field] || t(field as TranslationKey);
// };

export const getTranslatedLabel = (
  t: (key: any) => string,
  field: string,
  customLabels?: Record<string, string>
): string => {
  if (customLabels?.[field]) return customLabels[field];
  const translated = t(field);
  // fallback if missing translation
  if (!translated || translated === field) {
    return field; // fallback to key instead of blank
  }
  return translated;
};

/* ---------- SPECIAL FORMATTERS ---------- */

export const formatReligionCaste = (
  t: (key: TranslationKey) => string,
  religion?: string,
  caste?: string
) => {
  if (religion && caste) {
    return `${getTranslatedValue(t, "religion", religion)} (${caste})`;
  }
  if (religion) return getTranslatedValue(t, "religion", religion);
  if (caste) return caste;
  return "";
};

export const formatParents = (name?: string, occupation?: string) => {
  if (name && occupation) return `${name} (${occupation})`;
  return name || occupation || "";
};

export const formatSiblings = (total?: number, married?: number) => {
  if (!total || total <= 0) return "";
  return `${total} (${married ?? 0})`;
};

export const formatAddress = (address: any) => {
  return [
    address?.fullAddress,
    address?.city,
    address?.state,
    address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");
};