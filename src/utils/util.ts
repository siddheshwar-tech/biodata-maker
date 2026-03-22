import { parseISO } from 'date-fns';
import { PersonalFamilyFormValues } from '../schemas/biodata.schema';

// export const mapToFormValues = (data: any): PersonalFamilyFormValues => ({
//   ...data,

//   dateOfBirth: data.dateOfBirth
//     ? parseISO(data.dateOfBirth)
//     : null,
    

//   timeOfBirth: data.timeOfBirth
//     ? parseISO(`1970-01-01T${data.timeOfBirth}`)
//     : null,
// });


import { parse, isValid } from 'date-fns';

export const mapToFormValues = (data: any): PersonalFamilyFormValues => {
  let parsedDate = null;

  if (data.dateOfBirth) {
    // Try dd/MM/yyyy
    const d1 = parse(data.dateOfBirth, 'dd/MM/yyyy', new Date());

    // Try ISO
    const d2 = parseISO(data.dateOfBirth);

    parsedDate = isValid(d1) ? d1 : isValid(d2) ? d2 : null;
  }

  return {
    ...data,
    dateOfBirth: parsedDate,

    timeOfBirth: data.timeOfBirth
      ? parseISO(`1970-01-01T${data.timeOfBirth}`)
      : null,
  };
};