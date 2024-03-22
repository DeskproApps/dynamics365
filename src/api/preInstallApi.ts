import { adminGenericProxyFetch, IDeskproClient } from "@deskpro/app-sdk";
import { ISettings } from "../types/settings";

export const getAccessAndRefreshTokens = async (
  settings: ISettings,
  accessCode: string,
  callbackUrl: string,
  client: IDeskproClient
) => {
  if (!settings.client_id || !settings.client_secret) {
    throw new Error("Client ID and Client Secret are required.");
  }

  const fetch = await adminGenericProxyFetch(client);

  return await fetch(
    `https://login.microsoftonline.com/organizations/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: settings.client_id,
        client_secret: settings.client_secret,
        code: accessCode as string,
        redirect_uri: new URL(callbackUrl as string).toString(),
      }),
    }
  ).then((res) => res.json());
};
