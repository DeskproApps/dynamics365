import { z } from "zod";

export const getMetadataBasedSchema = (
  fields: {
    name: string;
  }[],
  customInputs: {
    [key: string]: z.ZodTypeAny;
  }
) => {
  const newObj: {
    [key: string]: z.ZodTypeAny;
  } = {};

  for (const field of fields) {
    newObj[field.name] = z.string().optional();
  }

  const schema = z
    .object({
      ...newObj,
      ...customInputs,
    })
    .passthrough()
    .transform((obj) => {
      for (const key of Object.keys(obj)) {
        if (obj[key as keyof typeof obj] === "") {
          delete obj[key as keyof typeof obj];
        }
      }
      return obj;
    });

  return schema;
};

export const getContactSchema = () => {
  const schema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    emailaddress1: z.string().email(),
    mobilephone: z.string().optional().nullable(),
    jobtitle: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    address1_line1: z.string().optional().nullable(),
    address1_city: z.string().optional().nullable(),
    address1_postalcode: z.string().optional().nullable(),
    address1_country: z.string().optional().nullable(),
    address1_stateorprovince: z.string().optional().nullable(),
    creditlimit: z.number().optional().nullable(),
    creditonhold: z.boolean().optional().nullable(),
  });

  return schema;
};

export const getLeadSchema = () => {
  const schema = z.object({
    "customerid_contact@odata.bind": z.string(),
    subject: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    leadsourcecode: z.number().optional().nullable(),
    purchasetimeframe: z.number().optional().nullable(),
    emailaddress1: z.string(),
    budgetamount_base: z.number(),
    companyname: z.string().optional().nullable(),
    jobtitle: z.string().optional().nullable(),
    telephone1: z.string().optional().nullable(),
  });

  return schema;
};

export const getTaskSchema = () => {
  const schema = z.object({
    "regardingobjectid_contact@odata.bind": z.string(),
    subject: z.string(),
    prioritycode: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
    scheduleddurationminutes: z.number().optional().nullable(),
    scheduledend: z.string().optional().nullable(),
  });

  return schema;
};

export const getOpportunitySSchema = () => {
  const schema = z.object({
    "customerid_contact@odata.bind": z.string(),
    name: z.string(),
    budgetamount: z.number(),
    estimatedvalue: z.number(),
    customerneed: z.string().optional().nullable(),
    estimatedclosedate: z.string().optional().nullable(),
  });

  return schema;
};

export const getAppointmentSchema = () => {
  const schema = z.object({
    "regardingobjectid_contact@odata.bind": z.string(),
    subject: z.string(),
    location: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    scheduledstart: z.string().optional().nullable(),
    scheduledend: z.string().optional().nullable(),
  });

  return schema;
};

export const getPhoneCallSchema = () => {
  const schema = z.object({
    "regardingobjectid_contact@odata.bind": z.string(),
    subject: z.string(),
    prioritycode: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
    scheduleddurationminutes: z.number().optional().nullable(),
    scheduledend: z.string().optional().nullable(),
    phonenumber: z.string().optional().nullable(),
  });

  return schema;
};
