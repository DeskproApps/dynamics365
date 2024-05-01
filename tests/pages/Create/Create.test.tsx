import { lightTheme, ThemeProvider } from "@deskpro/deskpro-ui";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react/";
import * as Api from "../../../src/api/api";
import React from "react";
import { CreateObject } from "../../../src/pages/Create/Object";

const renderPage = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <CreateObject />
    </ThemeProvider>
  );
};

jest.mock("../../../src/hooks/hooks", () => {
  return {
    useLinkContact: () => ({
      getLinkedContact: async () => {},
      setLinkedContact: () => {},
    }),
  };
});

jest.mock("../../../src/api/api", () => {
  return {
    createContact: jest.fn(),
    getCurrencies: () => [
      {
        "@odata.etag": 'W/"4395615"',
        _organizationid_value: "f82701d9-74a9-ee11-be32-000d3a45fb59",
        currencyname: "Euro",
        currencysymbol: "€",
        _createdonbehalfby_value: "80c5cd80-b1d6-4269-838f-b201cf187868",
        statecode: 0,
        statuscode: 1,
        _modifiedonbehalfby_value: "80c5cd80-b1d6-4269-838f-b201cf187868",
        _createdby_value: "80c5cd80-b1d6-4269-838f-b201cf187868",
        isocurrencycode: "EUR",
        _modifiedby_value: "80c5cd80-b1d6-4269-838f-b201cf187868",
        createdon: "2023-12-17T09:53:24Z",
        versionnumber: 4395615,
        exchangerate: 1,
        modifiedon: "2023-12-17T09:53:24Z",
        currencyprecision: 2,
        transactioncurrencyid: "dbce9d1c-c29c-ee11-be36-000d3abf077e",
        entityimage_url: null,
        overriddencreatedon: null,
        importsequencenumber: null,
        entityimage_timestamp: null,
        entityimageid: null,
        entityimage: null,
      },
    ],
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    objectName: "Contact",
  }),
}));

describe("Create Contact", () => {
  test("Creating a contact should work correctly", async () => {
    const { getByTestId } = renderPage();

    fireEvent.change(getByTestId("input-firstname"), {
      target: { value: "David" },
    });

    fireEvent.change(getByTestId("input-lastname"), {
      target: { value: "Something" },
    });

    fireEvent.change(getByTestId("input-emailaddress1"), {
      target: { value: "something@something.com" },
    });

    fireEvent.click(getByTestId("button-submit"));

    await waitFor(() => {
      expect(Api.createContact).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });
});
