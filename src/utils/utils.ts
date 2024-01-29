export const parseJsonErrorMessage = (error: string) => {
  try {
    const parsedError = JSON.parse(error);

    return `Status: ${parsedError.status} \n Message: ${parsedError.message}`;
  } catch {
    return error;
  }
};

export const parseJsonResponse = (response?: string) => {
  try {
    if (!response) return undefined;
    return JSON.parse(response);
  } catch {
    return undefined;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObjectValue = (obj: any, keyString: string) => {
  const keys = keyString.split(".");

  let value = obj;

  for (const key of keys) {
    value = value[key];

    if (value === undefined) {
      return undefined;
    }
  }

  return value;
};

export const makeFirstLetterUppercase = (str: string) => {
  if (!str) return str;

  if (typeof str === "object") return "-";

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const substitutePlaceholders = (
  string: string,
  obj: Record<string, string>
) => {
  if (!obj) return string;

  for (const [key, value] of Object.entries(obj)) {
    string = string.replace(`__${key}__`, value);
  }
  return string;
};

export const deleteRegexGroups = (string: string, regex: RegExp) => {
  return string.replace(regex, function (match, group1, group2) {
    // Return the match without the capture groups
    return match.replace(group1, "").replace(group2, "");
  });
};

export const getLeadSources = () => [
  {
    key: "Advertisement",
    value: 1,
  },
  {
    key: "Employee Referral",
    value: 2,
  },
  {
    key: "External Referral",
    value: 3,
  },
  {
    key: "Partner",
    value: 4,
  },
  {
    key: "Public Relations",
    value: 5,
  },
  {
    key: "Seminar - Internal",
    value: 6,
  },
  {
    key: "Seminar - Partner",
    value: 7,
  },
  {
    key: "Trade Show",
    value: 8,
  },
  {
    key: "Web",
    value: 9,
  },
  {
    key: "Word of mouth",
    value: 10,
  },
  {
    key: "Other",
    value: 11,
  },
];

export const getPurchaseTimeFrames = () => [
  {
    key: "Immediate",
    value: 0,
  },
  {
    key: "This Quarter",
    value: 1,
  },
  {
    key: "Next Quarter",
    value: 2,
  },
  {
    key: "This Year",
    value: 3,
  },
  {
    key: "Unknown",
    value: 4,
  },
];
