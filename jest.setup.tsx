/* eslint-disable @typescript-eslint/no-explicit-any */
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import "intersection-observer";
import ResizeObserver from "resize-observer-polyfill";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TextDecoder, TextEncoder } from "util";
import * as React from "react";
import { mockTheme } from "./tests/__mocks__/themeMock";

global.TextEncoder = TextEncoder;
//for some reason the types are wrong, but this works
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.TextDecoder = TextDecoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.React = React;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.ResizeObserver = ResizeObserver;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
  useParams: () => ({
    objectName: "Lead",
    objectView: "single",
  }),
}));

jest.mock("./src/styles.ts", () => ({
  ...jest.requireActual("./src/styles.ts"),
  StyledLink: () => <div>StyledLink</div>,
}));

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useMutationWithClient: (queryFn: () => any) => {
    let data;

    return {
      mutate: () => {
        data = queryFn();
      },
      isSuccess: false,
      isLoading: false,
      isIdle: true,
      data,
    };
  },
  Link: () => <div>Link</div>,
  useDeskproAppClient: () => ({
    client: {
      setHeight: () => {},
    },
  }),
  useDeskproLatestAppContext: () => ({
    context: {
      settings: {},
      data: {
        user: { primaryEmail: "a@b.com", firstname: "asd", lastname: "def" },
      },
    },
  }),
  useDeskproAppEvents: (
    hooks: { [key: string]: (param: Record<string, unknown>) => void },
    deps: [] = []
  ) => {
    const deskproAppEventsObj = {
      data: {
        ticket: {
          id: 1,
          subject: "Test Ticket",
        },
      },
    };
    React.useEffect(() => {
      !!hooks.onChange && hooks.onChange(deskproAppEventsObj);
      !!hooks.onShow && hooks.onShow(deskproAppEventsObj);
      !!hooks.onReady && hooks.onReady(deskproAppEventsObj);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, deps);
  },
  useInitialisedDeskproAppClient: (
    callback: (param: Record<string, unknown>) => void
  ) => {
    callback({
      registerElement: () => {},
      deregisterElement: () => {},
      setHeight: () => {},
      setTitle: () => {},
      setBadgeCount: () => {},
    });
  },
  useDeskproAppTheme: () => ({ mockTheme }),
  proxyFetch: async () => fetch,
  HorizontalDivider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),

  useQueryWithClient: (queryKey: string, queryFn: () => any, options: any) => {
    queryKey;
    options;
    if (!options || options?.enabled == null || options?.enabled == true) {
      return {
        isSuccess: true,
        data: queryFn(),
        isLoading: false,
      };
    }
    return {
      isSuccess: false,
      data: null,
      isLoading: false,
    };
  },
}));

jest.mock("./src/hooks/hooks.ts", () => ({
  ...jest.requireActual("./src/hooks/hooks.ts"),
  useLinkContact: () => ({
    getLinkedContact: () => ["1"],
  }),
}));
