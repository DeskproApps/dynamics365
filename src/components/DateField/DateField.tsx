/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput, useDeskproAppTheme } from "@deskpro/app-sdk";
import { H1, Stack } from "@deskpro/deskpro-ui";
import { FC } from "react";
import { DateTimePickerProps } from "react-flatpickr";
import "./DateField.css";
import "flatpickr/dist/themes/light.css";
export type MappedFieldProps = DateTimePickerProps & {
  id?: string;
  label: string;
  error?: boolean;
  value: string;
  onChange: (date: Date[]) => void;
};

export const DateField: FC<MappedFieldProps> = ({
  label,
  error,
  onChange,
  required,
}: MappedFieldProps) => {
  const { theme } = useDeskproAppTheme();

  return (
    <Stack vertical gap={3} style={{ width: "100%" }}>
      <Stack align="center" style={{ color: theme?.colors.grey80 }}>
        <H1>{label}</H1>
        {required && (
          <Stack style={{ color: "red" }}>
            <H1>⠀*</H1>
          </Stack>
        )}
      </Stack>
      <DateInput
        enableTime
        id="date-input"
        placeholder="DD/MM/YYYY"
        error={!!error}
        onChange={onChange}
      />
    </Stack>
  );
};
