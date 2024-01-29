import { lightTheme, ThemeProvider } from "@deskpro/deskpro-ui";
import { cleanup, render, waitFor } from "@testing-library/react/";
import React from "react";
import { ViewObject } from "../../../src/pages/View/Object";

const renderPage = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <ViewObject />
    </ThemeProvider>
  );
};

jest.mock("../../../src/api/api", () => {
  return {
    getLeadById: () => ({
      "@odata.context":
        "https://orgefaf8628.api.crm4.dynamics.com/api/data/v9.2/$metadata#leads",
      value: [
        {
          "@odata.etag": 'W/"4850431"',
          prioritycode: 1,
          mobilephone: "123456778",
          merged: false,
          confirminterest: false,
          exchangerate: 1,
          _parentcontactid_value: "80ac35a0-01af-ea11-a812-000d3a8b3ec6",
          decisionmaker: false,
          modifiedon: "2024-01-09T02:06:15Z",
          _owninguser_value: "29c3a361-4b9c-ee11-be36-000d3abf077e",
          address1_shippingmethodcode: 1,
          address1_composite: "Casa do Patrimonio Largo Padre Americo\r\n232",
          lastname: "Pinto",
          donotpostalmail: false,
          donotphone: false,
          preferredcontactmethodcode: 1,
          _ownerid_value: "29c3a361-4b9c-ee11-be36-000d3abf077e",
          firstname: "David",
          jobtitle: "Developer",
          donotemail: false,
          evaluatefit: false,
          yomifullname: "David Pinto",
          address2_addresstypecode: 1,
          address2_shippingmethodcode: 1,
          fullname: "David Pinto",
          address1_addressid: "fb6fb48b-fa35-46b4-8e93-b1d29084d269",
          msdyn_gdproptout: false,
          processid: "00000000-0000-0000-0000-000000000000",
          statuscode: 1,
          createdon: "2024-01-07T23:25:00Z",
          companyname: "Deskpro",
          donotfax: false,
          leadsourcecode: "Partner",
          versionnumber: 4850431,
          address1_line1: "Casa do Patrimonio Largo Padre Americo",
          address1_line2: "232",
          donotsendmm: false,
          leadqualitycode: 2,
          _transactioncurrencyid_value: "dbce9d1c-c29c-ee11-be36-000d3abf077e",
          subject: "Formula1",
          address1_addresstypecode: 1,
          donotbulkemail: false,
          budgetamount_base: 5000000,
          _modifiedby_value: "29c3a361-4b9c-ee11-be36-000d3abf077e",
          followemail: true,
          leadid: "0d14e658-25fb-4ccd-a51c-6263832c72fe",
          _createdby_value: "29c3a361-4b9c-ee11-be36-000d3abf077e",
          websiteurl: "https://a.b.com",
          budgetamount: 5000000,
          salesstagecode: 1,
          purchasetimeframe: "This Quarter",
          participatesinworkflow: false,
          statecode: 0,
          _owningbusinessunit_value: "37bca361-4b9c-ee11-be36-000d3abf077e",
          address2_addressid: "ed11d670-ebaf-45a7-a129-aaded1cf058b",
          _customerid_value: "80ac35a0-01af-ea11-a812-000d3a8b3ec6",
          telephone3: null,
          businesscardattributes: null,
          address1_upszone: null,
          address2_city: null,
          _slainvokedid_value: null,
          address1_postofficebox: null,
          importsequencenumber: null,
          utcconversiontimezonecode: null,
          schedulefollowup_qualify: null,
          overriddencreatedon: null,
          stageid: null,
          msdyn_leadscore: null,
          address1_latitude: null,
          address1_utcoffset: null,
          yomifirstname: null,
          estimatedclosedate: null,
          _masterid_value: null,
          lastonholdtime: null,
          address2_fax: null,
          address2_line1: null,
          address1_telephone3: null,
          address1_telephone2: null,
          address1_telephone1: null,
          address2_postofficebox: null,
          emailaddress1: null,
          emailaddress2: null,
          address2_latitude: null,
          emailaddress3: null,
          address2_composite: null,
          salesstage: null,
          traversedpath: null,
          address1_city: null,
          qualificationcomments: null,
          address2_line2: null,
          _msdyn_predictivescoreid_value: null,
          numberofemployees: null,
          teamsfollowed: null,
          address2_stateorprovince: null,
          address2_postalcode: null,
          estimatedamount: null,
          entityimage_url: null,
          initialcommunication: null,
          msdyn_scorehistory: null,
          timezoneruleversionnumber: null,
          estimatedamount_base: null,
          need: null,
          address2_telephone3: null,
          address2_telephone2: null,
          address2_telephone1: null,
          address1_postalcode: null,
          address2_upszone: null,
          _owningteam_value: null,
          budgetstatus: null,
          address2_line3: null,
          timespentbymeonemailandmeetings: null,
          address1_country: null,
          businesscard: null,
          address2_longitude: null,
          _modifiedonbehalfby_value: null,
          revenue_base: null,
          address1_county: null,
          schedulefollowup_prospect: null,
          msdyn_leadscoretrend: null,
          address1_fax: null,
          _createdonbehalfby_value: null,
          _accountid_value: null,
          address2_name: null,
          msdyn_leadgrade: null,
          msdyn_scorereasons: null,
          address2_utcoffset: null,
          _campaignid_value: null,
          sic: null,
          _slaid_value: null,
          fax: null,
          _msdyn_leadkpiid_value: null,
          address2_county: null,
          _qualifyingopportunityid_value: null,
          msdyn_salesassignmentresult: null,
          address1_line3: null,
          industrycode: null,
          address1_stateorprovince: null,
          purchaseprocess: null,
          onholdtime: null,
          entityimage_timestamp: null,
          entityimageid: null,
          _parentaccountid_value: null,
          lastusedincampaign: null,
          _msdyn_segmentid_value: null,
          _originatingcaseid_value: null,
          telephone2: null,
          yomilastname: null,
          revenue: null,
          description: null,
          _relatedobjectid_value: null,
          _contactid_value: null,
          yomimiddlename: null,
          address1_name: null,
          telephone1: null,
          yomicompanyname: null,
          address1_longitude: null,
          entityimage: null,
          middlename: null,
          estimatedvalue: null,
          salutation: null,
          pager: null,
          address2_country: null,
          currency: "EUR",
        },
      ],
    }),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    objectName: "Lead",
    objectId: "123",
    objectView: "single",
  }),
}));

describe("View", () => {
  test("View page should show a lead correctly", async () => {
    const { getByText } = renderPage();

    const budget = await waitFor(() => getByText(/€5,000,000.00/i));

    const purchaseTimeframe = await waitFor(() => getByText(/This Quarter/i));

    const jobTitle = await waitFor(() => getByText(/Developer/i));

    await waitFor(() => {
      [budget, purchaseTimeframe, jobTitle].forEach((el) => {
        expect(el).toBeInTheDocument();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });
});
