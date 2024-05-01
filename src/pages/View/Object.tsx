import {
  useDeskproAppEvents,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getActivitiesByContactId,
  getTasksByContactId,
  getLeadsByContactId,
  getOpportunitiesByContactId,
  getAppointmentsByContactId,
  getCallsByContactId,
  getActivityById,
  getAppointmentById,
  getCallById,
  getLeadById,
  getOpportunityById,
  getTaskById,
} from "../../api/api";
import { FieldMapping } from "../../components/FieldMapping/FieldMapping";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinnerCenter/LoadingSpinnerCenter";
import activityJson from "../../mapping/activity.json";
import appointmentJson from "../../mapping/appointment.json";
import callJson from "../../mapping/call.json";
import leadJson from "../../mapping/lead.json";
import opportunityJson from "../../mapping/opportunity.json";
import taskJson from "../../mapping/task.json";

import { H2, Stack } from "@deskpro/deskpro-ui";
import { makeFirstLetterUppercase } from "../../utils/utils";

type Awaited<T> =
  T extends null | undefined ? T :
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ?
      F extends ((value: infer V, ...args: infer _) => any) ?
        Awaited<V> :
        never :
      T;

type AcceptedFunctions =
  | typeof getActivitiesByContactId
  | typeof getTasksByContactId
  | typeof getLeadsByContactId
  | typeof getOpportunitiesByContactId
  | typeof getAppointmentsByContactId
  | typeof getCallsByContactId;

export const ViewObject = () => {
  const navigate = useNavigate();
  const { objectName, objectId, objectView } = useParams();

  const correctJson = useMemo(() => {
    switch (objectName) {
      case "Appointment":
        return appointmentJson;

      case "PhoneCall":
        return callJson;

      case "Lead":
        return leadJson;

      case "Opportunity":
        return opportunityJson;

      case "Task":
        return taskJson;

      case "Activity":
        return activityJson;

      default:
        return taskJson;
    }
  }, [objectName]);

  const objectQuery = useQueryWithClient<
    unknown,
    unknown,
    Awaited<ReturnType<AcceptedFunctions>>
  >(
    [objectName as string, objectId as string, objectView as string],
    (client) => {
      switch (
        objectName as
          | "Lead"
          | "Activity"
          | "Task"
          | "Opportunity"
          | "PhoneCall"
          | "Appointment"
      ) {
        case "Lead":
          return objectView === "single"
            ? getLeadById(client, objectId as string)
            : getLeadsByContactId(client, objectId as never);

        case "Activity":
          return objectView === "single"
            ? getActivityById(client, objectId as string)
            : getActivitiesByContactId(client, objectId as never);

        case "Task":
          return objectView === "single"
            ? getTaskById(client, objectId as string)
            : getTasksByContactId(client, objectId as never);

        case "Opportunity":
          return objectView === "single"
            ? getOpportunityById(client, objectId as string)
            : getOpportunitiesByContactId(client, objectId as never);

        case "PhoneCall":
          return objectView === "single"
            ? getCallById(client, objectId as string)
            : getCallsByContactId(client, objectId as never);

        case "Appointment":
          return objectView === "single"
            ? getAppointmentById(client, objectId as string)
            : getAppointmentsByContactId(client, objectId as never);
      }
    },
    {
      enabled: !!objectName && !!objectId,
    }
  );
  useInitialisedDeskproAppClient(
    (client) => {
      if (!objectQuery.isSuccess || !objectName) return;

      if (objectView === "list") {
        client.setTitle(
          `${correctJson?.title}s ${makeFirstLetterUppercase(objectView)}`
        );
        client.deregisterElement("menuButton");

        return;
      }

      client.deregisterElement("plusButton");

      client.registerElement("editButton", {
        type: "edit_button",
      });

      client.deregisterElement("menuButton");

      client.setTitle(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        (objectQuery.data.value[0]?.[correctJson.titleKeyName] as string) ||
          "View"
      );
    },
    [objectQuery.isSuccess, objectView, objectName]
  );

  useDeskproAppEvents({
    async onElementEvent(id) {
      switch (id) {
        case "homeButton":
          navigate("/redirect");

          break;

        case "editButton":
          navigate(`/edit/${objectName}/${objectId}`);

          break;

        case "plusButton":
          navigate(`/create/${objectName}`);

          break;
      }
    },
  });

  if (!objectView || (objectView !== "list" && objectView !== "single"))
    return <H2>Please use a accepted Object View</H2>;

  if (
    objectName !== "Contact" &&
    objectName !== "Lead" &&
    objectName !== "Activity" &&
    objectName !== "Opportunity" &&
    objectName !== "Task" &&
    objectName !== "Appointment" &&
    objectName !== "PhoneCall"
  )
    return <H2>Please use an accepted Object</H2>;

  if (!correctJson || !objectQuery.isSuccess) {
    return <LoadingSpinnerCenter />;
  }

  const data = objectQuery.data?.value;

  return (
    <Stack style={{ width: "100%", padding: "8px" }} vertical gap={10}>
      <FieldMapping
        fields={data}
        metadata={correctJson[objectView]}
        childTitleAccessor={
          objectView === "list" ? (e) => e[correctJson.titleKeyName] : undefined
        }
        externalChildUrl={
          objectView === "single" ? undefined : correctJson.externalChildUrl
        }
        internalChildUrl={
          objectView === "single" ? undefined : correctJson.internalChildUrl
        }
      />
    </Stack>
  );
};
