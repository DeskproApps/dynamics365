# Dynamics 365 App Setup

To integrate your Dynamics 365 account with the Deskpro app, follow these simple steps:

## Register an Application in Microsoft Azure:

Go to Microsoft Azure Portal and navigate to Azure Active Directory: https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade/quickStartType~/null/sourceType/Microsoft_AAD_IAM
Click on App registrations and then New registration.
Provide a name for your application, select Accounts in this organizational directory only as the supported account type, and copy the redirect URI provided by Deskpro from the installation settings page and paste it into the Redirect URI field, selecting Web.

[![](/docs/assets/setup/register_app.png)](/docs/assets/setup/register_app.png)

Once done, click on register, copy the Client ID and paste it into the Client ID field in Deskpro.

[![](/docs/assets/setup/entra_details.png)](/docs/assets/setup/entra_details.png)

## Grant API Permissions:

In the Azure Portal, navigate to your registered application and go to API permissions -> Add a permission. Select Dynamics CRM, then user_impersonation. Now go back to Add a permission -> Microsoft Graph -> Delegated permissions -> User.Read. Click on Add permissions.
Enter https://admin.powerplatform.microsoft.com/ and click on your Dynamics365 Environment (hovering over it should show you the correct URL) -> Settings -> Users + Permissions -> Application Users -> New app user. Select Add an App and select the newly created app. Still on the same page, under business unit select the Dynamics365 account (or the dynamics365 subdomain) and click on Create.

[![](/docs/assets/setup/entra_permissions.png)](/docs/assets/setup/entra_permissions.png)

## Generate Client Secret:

In the Azure Portal, navigate to your registered application and g to Certificates & secrets.
Under Client secrets, click New client secret, set how long you'd like the secret to last (we recommend making it as long as possible), press add, copy the generated client secret and paste it under Client secret in Deskpro.

[![](/docs/assets/setup/client_secret.png)](/docs/assets/setup/client_secret.png)

## Retrieve Service Root URL:

Log in to your Dynamics 365 environment and Navigate to Settings (the gear icon on the top right) -> Advanced Settings -> Settings (on the top left) > Customizations > Developer Resources. Now please copy the Service Root URL provided and paste it in Client URL in deskpro.

[![](/docs/assets/setup/create_application_user.png)](/docs/assets/setup/create_application_user.png)

## Installation Completion:

Once all fields are prefilled, please click on Sign In, and once you see "Successfully signed in." message, click on Save to complete the installation.
