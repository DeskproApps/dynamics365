import {
  IDeskproClient,
  ProxyResponse,
  proxyFetch,
  V2ProxyRequestInit,
} from "@deskpro/app-sdk";
import { IContact, ICreateContact } from "../types/contact";
import { ICreateOpportunity, IOpportunity } from "../types/opportunity";
import { ICreateLead, ILead } from "../types/lead";
import { IActivity } from "../types/activity";
import { ICall, ICreateCall } from "../types/call";
import { IAppointment, ICreateAppointment } from "../types/appointment";
import { ICreateTask, ITask } from "../types/task";
import {
  getLeadSources,
  getPurchaseTimeFrames,
  parseJsonResponse,
} from "../utils/utils";

export const timeout = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const getCurrencies = async (client: IDeskproClient) => {
  const currenciesReq = await defaultRequest(
    client,
    `transactioncurrencies`,
    "GET"
  );

  await client.setState("currencies", JSON.stringify(currenciesReq.value));

  return currenciesReq.value;
};

export const getCurrencyById = async (
  client: IDeskproClient,
  currencyId: string
) => {
  const currencies = await client.getState("currencies");

  const JsonCurrencies = parseJsonResponse(currencies[0]?.data as string);

  if (JsonCurrencies) {
    const currency = JsonCurrencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid === currencyId
    );

    if (currency) {
      return currency;
    }
  }

  const currenciesReq = await defaultRequest(
    client,
    `transactioncurrencies`,
    "GET"
  );

  await client.setState("currencies", JSON.stringify(currenciesReq.value));

  return currenciesReq.value.find(
    (currency: { transactioncurrencyid: string }) =>
      currency.transactioncurrencyid === currencyId
  );
};

export const editContact = async (
  client: IDeskproClient,
  id: string,
  data: ICreateContact
): Promise<ProxyResponse> => {
  return defaultRequest(client, `contacts(${id})`, "PATCH", data);
};

export const createContact = async (
  client: IDeskproClient,
  data: ICreateContact
): Promise<ProxyResponse> => {
  return defaultRequest(client, `contacts`, "POST", data);
};

export const getContactsById = async (
  client: IDeskproClient,
  id: string
): Promise<{ value: IContact[] }> => {
  const contacts: { value: IContact[] } = await defaultRequest(
    client,
    `contacts?$filter=contactid eq '${id}'`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  contacts.value.forEach((contact) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid === contact._transactioncurrencyid_value
    );

    if (currency) {
      contact.currency = currency.isocurrencycode;
    }
  });

  return contacts;
};

export const getContactsByEmail = (
  client: IDeskproClient,
  email: string
): Promise<{ value: IContact[] }> =>
  defaultRequest(
    client,
    `contacts?$filter=contains(emailaddress1, '${email}')`,
    "GET"
  );

export const getFirst5ActivitiesByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IActivity[] }> =>
  defaultRequest(
    client,
    `activitypointers?$filter=_regardingobjectid_value eq '${id}'&$top=5`,
    "GET"
  );

export const getActivityById = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IActivity[] }> =>
  defaultRequest(
    client,
    `activitypointers?$filter=activityid eq '${id}'`,
    "GET"
  );

export const getActivitiesByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IActivity[] }> =>
  defaultRequest(
    client,
    `activitypointers?$filter=_regardingobjectid_value eq '${id}'`,
    "GET"
  );

export const editLead = async (
  client: IDeskproClient,
  id: string,
  data: ICreateLead
): Promise<ProxyResponse> => {
  return defaultRequest(client, `leads(${id})`, "PATCH", data);
};

export const createLead = async (
  client: IDeskproClient,
  data: ICreateLead
): Promise<ProxyResponse> => {
  return defaultRequest(client, `leads`, "POST", data);
};

export const getLeadById = async (client: IDeskproClient, id: string) => {
  const leads: { value: ILead[] } = await defaultRequest(
    client,
    `leads?$filter=leadid eq '${id}'`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  leads.value.forEach((lead) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid === lead._transactioncurrencyid_value
    );

    if (currency) {
      lead.currency = currency.isocurrencycode;
    }

    lead.leadsourcecode =
      getLeadSources().find((e) => e.value === lead.leadsourcecode)?.key ||
      lead.leadsourcecode;

    lead.purchasetimeframe =
      getPurchaseTimeFrames().find((e) => e.value === lead.purchasetimeframe)
        ?.key || lead.purchasetimeframe;
  });

  return leads;
};

export const getFirst5LeadsByContactId = async (
  client: IDeskproClient,
  id: string
) => {
  const leads: { value: ILead[] } = await defaultRequest(
    client,
    `leads?$filter=_customerid_value eq '${id}'&$top=5`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  leads.value.forEach((lead) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid === lead._transactioncurrencyid_value
    );

    if (currency) {
      lead.currency = currency.isocurrencycode;
    }
  });

  return leads;
};

export const getLeadsByContactId = async (
  client: IDeskproClient,
  id: string
) => {
  const leads: { value: ILead[] } = await defaultRequest(
    client,
    `leads?$filter=_customerid_value eq '${id}'`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  leads.value.forEach((lead) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid === lead._transactioncurrencyid_value
    );

    if (currency) {
      lead.currency = currency.isocurrencycode;
    }
  });

  return leads;
};

export const editOpportunity = async (
  client: IDeskproClient,
  id: string,
  data: ICreateOpportunity
): Promise<ProxyResponse> => {
  return defaultRequest(client, `opportunities(${id})`, "PATCH", data);
};

export const createOpportunity = async (
  client: IDeskproClient,
  data: ICreateOpportunity
): Promise<ProxyResponse> => {
  return defaultRequest(client, `opportunities`, "POST", data);
};

export const getOpportunityById = async (
  client: IDeskproClient,
  id: string
) => {
  const opportunities: { value: IOpportunity[] } = await defaultRequest(
    client,
    `opportunities?$filter=opportunityid eq '${id}'`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  opportunities.value.forEach((opportunity) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid ===
        opportunity._transactioncurrencyid_value
    );

    if (currency) {
      opportunity.currency = currency.isocurrencycode;
    }
  });

  return opportunities;
};

export const getFirst5OpportunitiesByContactId = async (
  client: IDeskproClient,
  id: string
): Promise<{ value: IOpportunity[] }> => {
  const opportunities: { value: IOpportunity[] } = await defaultRequest(
    client,
    `opportunities?$filter=_customerid_value eq '${id}'&$top=5`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  opportunities.value.forEach((opportunity) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid ===
        opportunity._transactioncurrencyid_value
    );

    if (currency) {
      opportunity.currency = currency.isocurrencycode;
    }
  });

  return opportunities;
};

export const getOpportunitiesByContactId = async (
  client: IDeskproClient,
  id: string
): Promise<{ value: IOpportunity[] }> => {
  const opportunities: { value: IOpportunity[] } = await defaultRequest(
    client,
    `opportunities?$filter=_customerid_value eq '${id}'`,
    "GET"
  );

  const currencies = await getCurrencies(client);

  opportunities.value.forEach((opportunity) => {
    const currency = currencies.find(
      (currency: { transactioncurrencyid: string }) =>
        currency.transactioncurrencyid ===
        opportunity._transactioncurrencyid_value
    );

    if (currency) {
      opportunity.currency = currency.isocurrencycode;
    }
  });

  return opportunities;
};

export const editTask = async (
  client: IDeskproClient,
  id: string,
  data: ICreateTask
): Promise<ProxyResponse> => {
  return defaultRequest(client, `tasks(${id})`, "PATCH", data);
};

export const createTask = async (
  client: IDeskproClient,
  data: ICreateTask
): Promise<ProxyResponse> => {
  return defaultRequest(client, `tasks`, "POST", data);
};

export const getTaskById = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ITask[] }> =>
  defaultRequest(client, `tasks?$filter=activityid eq '${id}'`, "GET");

export const getFirst5TasksByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ITask[] }> =>
  defaultRequest(
    client,
    `tasks?$filter=_regardingobjectid_value eq '${id}'&$top=5`,
    "GET"
  );

export const getTasksByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ITask[] }> =>
  defaultRequest(
    client,
    `tasks?$filter=_regardingobjectid_value eq '${id}'`,
    "GET"
  );

export const editCall = async (
  client: IDeskproClient,
  id: string,
  data: ICreateCall
): Promise<ProxyResponse> => {
  return defaultRequest(client, `phonecalls(${id})`, "PATCH", data);
};

export const createCall = async (
  client: IDeskproClient,
  data: ICreateCall
): Promise<ProxyResponse> => {
  return defaultRequest(client, `phonecalls`, "POST", data);
};

export const getCallById = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ICall[] }> =>
  defaultRequest(client, `phonecalls?$filter=activityid eq '${id}'`, "GET");

export const getFirst5CallsByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ICall[] }> =>
  defaultRequest(
    client,
    `phonecalls?$filter=_regardingobjectid_value eq '${id}'&$top=5`,
    "GET"
  );

export const getCallsByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: ICall[] }> =>
  defaultRequest(
    client,
    `phonecalls?$filter=_regardingobjectid_value eq '${id}'`,
    "GET"
  );

export const editAppointment = async (
  client: IDeskproClient,
  id: string,
  data: ICreateAppointment
): Promise<ProxyResponse> => {
  return defaultRequest(client, `appointments(${id})`, "PATCH", data);
};

export const createAppointment = async (
  client: IDeskproClient,
  data: ICreateAppointment
): Promise<ProxyResponse> => {
  return defaultRequest(client, `appointments`, "POST", data);
};

export const getAppointmentById = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IAppointment[] }> =>
  defaultRequest(client, `appointments?$filter=activityid eq '${id}'`, "GET");

export const getFirst5AppointmentsByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IAppointment[] }> =>
  defaultRequest(
    client,
    `appointments?$filter=_regardingobjectid_value eq '${id}'&$top=5`,
    "GET"
  );

export const getAppointmentsByContactId = (
  client: IDeskproClient,
  id: string
): Promise<{ value: IAppointment[] }> =>
  defaultRequest(
    client,
    `appointments?$filter=_regardingobjectid_value eq '${id}'`,
    "GET"
  );

const isResponseError = (response: ProxyResponse) =>
  response.status < 200 || response.status >= 400;

const defaultRequest = async (
  client: IDeskproClient,
  endpoint: string,
  method: RequestMethod,
  data?: unknown
) => {
  const fetch = await proxyFetch(client);

  const options: V2ProxyRequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer [[oauth/global/access_token]]`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const url = `__client_url__${endpoint}`;

  let response = await fetch(url, options);

  if ([400, 401, 203, 500, 403].includes(response.status)) {
    const refreshRequestOptions: V2ProxyRequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=__global_access_token.json("[refresh_token]")__&client_id=__client_id__&client_secret=__client_secret__`,
    };

    const refreshRes = await fetch(
      "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
      refreshRequestOptions
    );
    const refreshData = await refreshRes.json();

    await client.setState<string>(
      "oauth/global/access_token",
      refreshData.access_token,
      {
        backend: true,
      }
    );

    response = await fetch(`__client_url__${endpoint}`, options);
  }

  if (isResponseError(response)) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: await response.text(),
      })
    );
  }

  if (method === "POST" || method === "PATCH" || method === "DELETE") {
    return response;
  }

  return response.json();
};

export { defaultRequest };
