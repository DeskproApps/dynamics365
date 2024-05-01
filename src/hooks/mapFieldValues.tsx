import { ReactElement } from "react";
import { CustomTag } from "../components/CustomTag/CustomTag";
import { IJson } from "../types/json";
import { getCurrentFormattedDateTime } from "../utils/dateUtils";
import { getObjectValue, makeFirstLetterUppercase } from "../utils/utils";

export const useMapFieldValues = () => {
  const mapFieldValues = (
    metadataFields: IJson["list"][0] | IJson["single"][0],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
    return metadataFields
      .map((metadataField) => {
        let value: string | ReactElement;

        switch (metadataField.type) {
          case "date":
          case "datetime":
            value = field[metadataField.name]
              ? getCurrentFormattedDateTime(
                  new Date(field[metadataField.name] as string)
                )
              : "-";

            break;

          case "key":
            value = getObjectValue(field, metadataField.name);

            break;

          case "html":
            value = (
              <div
                dangerouslySetInnerHTML={{
                  __html: field[metadataField.name],
                }}
              />
            );

            break;

          case "address":
            value = [
              field.address1_composite,
              field.ADDRESS_PROVINCE,
              field.ADDRESS_CITY,
              field.ADDRESS_POSTAL_CODE,
              field.ADDRESS_COUNTRY,
            ]
              .filter((e) => e)
              .reduce((a, c) => a + c + "\n", "");

            break;

          case "value_type":
            value = field[metadataField.name]?.[0].VALUE;

            break;

          case "percentage":
            value = `${Number(field[metadataField.name])}%`;

            break;

          case "tag":
            value = <CustomTag title={field[metadataField.name]} />;

            break;

          case "number":
            value = field[metadataField.name]?.toString();

            break;

          case "text":
            value = makeFirstLetterUppercase(
              field[metadataField.name] as string
            );

            break;

          case "label":
            value = <CustomTag title={field[metadataField.name]} />;

            break;

          case "currency":
            if (!field.currency) {
              value = "-";
              break;
            }

            value = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: field.currency,
            }).format(field[metadataField.name] ?? 0);
            break;

          case "product":
            value = "product";

            break;

          default:
            if (metadataField.name in field) {
              value = field[metadataField.name] as string;
            } else {
              value = "-";
            }
        }

        return {
          key: metadataField.label,
          value: value || "-",
        };
      })
      .filter((e) =>
        typeof e.value === "object" && !Object.keys(e.value).length
          ? false
          : true
      );
  };

  return { mapFieldValues };
};
