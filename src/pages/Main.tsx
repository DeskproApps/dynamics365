import {
  useDeskproAppEvents,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { Stack } from "@deskpro/deskpro-ui";
import { useEffect, useState } from "react";
import { FieldMapping } from "../components/FieldMapping/FieldMapping";
import { LoadingSpinnerCenter } from "../components/LoadingSpinnerCenter/LoadingSpinnerCenter";

import { useNavigate } from "react-router-dom";
import {
  getContactsByEmail,
  getContactsById,
  getFirst5AppointmentsByContactId,
  getFirst5CallsByContactId,
  getFirst5LeadsByContactId,
  getFirst5OpportunitiesByContactId,
  getFirst5TasksByContactId,
} from "../api/api";
import { useLinkContact } from "../hooks/hooks";
import appointmentJson from "../mapping/appointment.json";
import callJson from "../mapping/call.json";
import contactJson from "../mapping/contact.json";
import leadJson from "../mapping/lead.json";
import opportunityJson from "../mapping/opportunity.json";
import taskJson from "../mapping/task.json";

export const Main = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext();
  const [contactId, setContactId] = useState<string | null | undefined>(
    undefined
  );

  const { getLinkedContact, unlinkContact, linkContact } = useLinkContact();

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Dynamics 365");

    client.registerElement("homeButton", {
      type: "home_button",
    });

    client.deregisterElement("menuButton");

    client.deregisterElement("link");

    client.deregisterElement("plusButton");

    client.registerElement("menuButton", {
      type: "menu",
      items: [
        {
          title: "Unlink Contact",
          payload: {
            type: "changePage",
            page: "/",
          },
        },
      ],
    });

    client.registerElement("editButton", {
      type: "edit_button",
    });

    client.registerElement("refreshButton", {
      type: "refresh_button",
    });
  }, []);

  useDeskproAppEvents(
    {
      async onElementEvent(id) {
        switch (id) {
          case "menuButton":
            unlinkContact().then(() => navigate("/findOrCreate"));

            break;
          case "homeButton":
            navigate("/redirect");
            break;

          case "editButton":
            navigate(`/edit/Contact/${contactId}`);

            break;
        }
      },
    },
    [unlinkContact, contactId]
  );

  useInitialisedDeskproAppClient(() => {
    (async () => {
      if (!context) return;

      const linkedContact = await getLinkedContact();

      if (!linkedContact || linkedContact.length === 0) {
        setContactId(null);

        return;
      }

      setContactId(linkedContact);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const contactQuery = useQueryWithClient(
    ["contact", contactId as string],
    (client) =>
      contactId === null
        ? getContactsByEmail(client, context?.data.user.primaryEmail)
        : getContactsById(client, contactId as string),
    {
      enabled: contactId !== undefined && !!context?.data.user.primaryEmail,
      onError: () => unlinkContact().then(() => navigate("/findOrCreate")),
      onSuccess(data) {
        if (data?.value.length === 0) {
          navigate("/findOrCreate");
        }
        linkContact(data?.value[0].contactid);
      },
    }
  );

  const contactIdFromQuery = contactQuery.data?.value[0]?.contactid;

  const leadsQuery = useQueryWithClient(
    ["first5Leads", contactIdFromQuery as string],
    (client) => getFirst5LeadsByContactId(client, contactIdFromQuery as string),
    {
      enabled: !!contactIdFromQuery,
    }
  );

  const opportunitiesQuery = useQueryWithClient(
    ["first5Opportunities", contactIdFromQuery as string],
    (client) =>
      getFirst5OpportunitiesByContactId(client, contactIdFromQuery as string),
    {
      enabled: !!contactIdFromQuery,
    }
  );

  const tasksQuery = useQueryWithClient(
    ["first5Tasks", contactIdFromQuery as string],
    (client) => getFirst5TasksByContactId(client, contactIdFromQuery as string),
    {
      enabled: !!contactIdFromQuery,
    }
  );

  const appointmentsQuery = useQueryWithClient(
    ["first5Appointments", contactIdFromQuery as string],
    (client) =>
      getFirst5AppointmentsByContactId(client, contactIdFromQuery as string),
    {
      enabled: !!contactIdFromQuery,
    }
  );

  const callsQuery = useQueryWithClient(
    ["first5Calls", contactIdFromQuery as string],
    (client) => getFirst5CallsByContactId(client, contactIdFromQuery as string),
    {
      enabled: !!contactIdFromQuery,
    }
  );

  if (!contactQuery.data && (contactQuery.isSuccess || contactQuery.isError))
    navigate("/findOrCreate");

  useEffect(() => {
    if (contactQuery.isError) {
      navigate("/findOrCreate");
    }
  }, [contactQuery, navigate]);

  if (
    [
      contactQuery,
      leadsQuery,
      opportunitiesQuery,
      tasksQuery,
      appointmentsQuery,
      callsQuery,
    ].some((e) => e.isLoading) ||
    !contactQuery.data?.value[0]
  ) {
    return <LoadingSpinnerCenter />;
  }

  if (
    [
      contactQuery,
      leadsQuery,
      opportunitiesQuery,
      tasksQuery,
      appointmentsQuery,
      callsQuery,
    ].some((e) => !e.isSuccess)
  )
    return <div></div>;

  const contact = contactQuery.data.value;

  return (
    <Stack style={{ width: "100%", padding: "8px" }} vertical gap={10}>
      <FieldMapping
        fields={contact}
        metadata={contactJson.single}
        internalChildUrl={contactJson.internalChildUrl}
        externalChildUrl={contactJson.externalChildUrl}
        childTitleAccessor={(e) => e[contactJson.titleKeyName]}
      />
      <FieldMapping
        fields={leadsQuery.data?.value ?? []}
        title={leadJson.title}
        metadata={leadJson.list}
        internalChildUrl={leadJson.internalChildUrl}
        internalUrl={`${leadJson.internalUrl}/${contactId}`}
        externalChildUrl={leadJson.externalChildUrl}
        childTitleAccessor={(e) => e[leadJson.titleKeyName]}
        createPage={"/create/Lead"}
      />
      <FieldMapping
        fields={opportunitiesQuery.data?.value ?? []}
        title={opportunityJson.title}
        metadata={opportunityJson.list}
        internalChildUrl={opportunityJson.internalChildUrl}
        internalUrl={`${opportunityJson.internalUrl}/${contactId}`}
        externalChildUrl={opportunityJson.externalChildUrl}
        childTitleAccessor={(e) => e[opportunityJson.titleKeyName]}
        createPage="/create/Opportunity"
      />
      <FieldMapping
        fields={tasksQuery.data?.value ?? []}
        title={taskJson.title}
        metadata={taskJson.list}
        internalChildUrl={taskJson.internalChildUrl}
        internalUrl={`${taskJson.internalUrl}/${contactId}`}
        externalChildUrl={taskJson.externalChildUrl}
        childTitleAccessor={(e) => e[taskJson.titleKeyName]}
        createPage="/create/Task"
      />
      <FieldMapping
        fields={appointmentsQuery.data?.value ?? []}
        title={appointmentJson.title}
        metadata={appointmentJson.list}
        internalChildUrl={appointmentJson.internalChildUrl}
        internalUrl={`${appointmentJson.internalUrl}/${contactId}`}
        externalChildUrl={appointmentJson.externalChildUrl}
        childTitleAccessor={(e) => e[appointmentJson.titleKeyName]}
        createPage="/create/Appointment"
      />
      <FieldMapping
        fields={callsQuery.data?.value ?? []}
        title={callJson.title}
        metadata={callJson.list}
        internalChildUrl={callJson.internalChildUrl}
        internalUrl={`${callJson.internalUrl}/${contactId}`}
        externalChildUrl={callJson.externalChildUrl}
        childTitleAccessor={(e) => e[callJson.titleKeyName]}
        createPage="/create/PhoneCall"
      />
    </Stack>
  );
};
