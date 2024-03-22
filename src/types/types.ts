export type DropdownData = {
  [key: string]: {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  }[];
};

export type FieldMappingInputs = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  multiple?: boolean;
  settings_str?: string;
}[];
