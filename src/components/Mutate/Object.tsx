/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ProxyResponse,
  useDeskproAppEvents,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
  useMutationWithClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { Button, H1, Stack } from "@deskpro/deskpro-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodTypeAny } from "zod";

import { useLinkContact } from "../../hooks/hooks";

import {
  createAppointment,
  createCall,
  createContact,
  createLead,
  createOpportunity,
  createTask,
  editAppointment,
  editCall,
  editContact,
  editLead,
  editOpportunity,
  editTask,
  getAppointmentById,
  getCallById,
  getContactsById,
  getCurrencies,
  getLeadById,
  getOpportunityById,
} from "../../api/api";
import AppointmentJson from "../../mapping/appointment.json";
import PhoneCallJson from "../../mapping/call.json";
import ContactJson from "../../mapping/contact.json";
import LeadJson from "../../mapping/lead.json";
import OpportunityJson from "../../mapping/opportunity.json";
import TaskJson from "../../mapping/task.json";
import {
  getAppointmentSchema,
  getContactSchema,
  getLeadSchema,
  getOpportunitySSchema,
  getPhoneCallSchema,
  getTaskSchema,
} from "../../schemas";
import { ICreateAppointment } from "../../types/appointment";
import { ICreateCall } from "../../types/call";
import { IContact, ICreateContact } from "../../types/contact";
import { IJson } from "../../types/json";
import { ICreateLead } from "../../types/lead";
import { ICreateOpportunity } from "../../types/opportunity";
import { ICreateTask } from "../../types/task";
import {
  getLeadSources,
  getPurchaseTimeFrames,
  parseJsonErrorMessage,
} from "../../utils/utils";
import { FieldMappingInput } from "../FieldMappingInput/FieldMappingInput";
import { LoadingSpinnerCenter } from "../LoadingSpinnerCenter/LoadingSpinnerCenter";
type Props = {
  objectId?: string;
  objectName:
    | "Lead"
    | "Contact"
    | "Task"
    | "Opportunity"
    | "Appointment"
    | "PhoneCall";
};

export const MutateObject = ({ objectId, objectName }: Props) => {
  const navigate = useNavigate();
  const [linkedContact, setLinkedContact] = useState<string | undefined>();
  const [schema, setSchema] = useState<ZodTypeAny | null>(null);
  const { linkContact, getLinkedContact } = useLinkContact();
  const { context } = useDeskproLatestAppContext();

  const correctJson = useMemo<IJson>(() => {
    switch (objectName) {
      case "Contact":
        return ContactJson;
      case "Appointment":
        return AppointmentJson;
      case "PhoneCall":
        return PhoneCallJson;
      case "Lead":
        return LeadJson;
      case "Task":
        return TaskJson;
      case "Opportunity":
        return OpportunityJson;
    }
  }, [objectName]);

  const isEditMode = !!objectId;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<any>({
    resolver: zodResolver(schema as ZodTypeAny),
  });

  const objectByIdQuery = useQueryWithClient<{
    value: any;
  }>(
    ["objectByIdQuery", objectId as string],
    (client) => {
      switch (objectName) {
        case "Contact":
          return getContactsById(client, objectId as string);
        case "Lead":
          return getLeadById(client, objectId as string);
        case "Opportunity":
          return getOpportunityById(client, objectId as string);
        case "Task":
          return getOpportunityById(client, objectId as string);
        case "Appointment":
          return getAppointmentById(client, objectId as string);
        case "PhoneCall":
          return getCallById(client, objectId as string);
      }
    },
    {
      enabled: isEditMode && !!objectId,
    }
  );

  const currencyQuery = useQueryWithClient(
    ["currencyQuery"],
    (client) => {
      return getCurrencies(client);
    },
    {
      enabled: true,
    }
  );

  const submitMutation = useMutationWithClient<
    | ICreateCall
    | ICreateLead
    | ICreateAppointment
    | ICreateContact
    | ICreateTask
    | ICreateOpportunity
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (client, data: any) => {
      switch (`${objectName}-${isEditMode}`) {
        case "Contact-false":
          return createContact(client, data as IContact);
        case "Contact-true":
          return editContact(client, objectId as string, data as IContact);

        case "Lead-false":
          return createLead(client, data as ICreateLead);
        case "Lead-true":
          return editLead(client, objectId as string, data as ICreateLead);

        case "Opportunity-false":
          return createOpportunity(client, data as ICreateOpportunity);
        case "Opportunity-true":
          return editOpportunity(
            client,
            objectId as string,
            data as ICreateOpportunity
          );

        case "Task-false":
          return createTask(client, data as ICreateTask);
        case "Task-true":
          return editTask(client, objectId as string, data as ICreateTask);

        case "Appointment-false":
          return createAppointment(client, data as ICreateAppointment);
        case "Appointment-true":
          return editAppointment(
            client,
            objectId as string,
            data as ICreateAppointment
          );

        case "PhoneCall-false":
          return createCall(client, data as ICreateCall);
        case "PhoneCall-true":
          return editCall(client, objectId as string, data as ICreateCall);
      }
    },
    {
      onError: (error) => {
        throw new Error(error as string);
      },
    }
  );

  useEffect(() => {
    getLinkedContact().then((linkedContact) => {
      setLinkedContact(linkedContact);
    });
  }, [getLinkedContact]);

  useEffect(() => {
    if (
      (!objectByIdQuery.isSuccess && isEditMode) ||
      (!isEditMode && !linkedContact)
    )
      return;

    const objectData = objectByIdQuery.data?.value[0];

    switch (objectName) {
      case "Contact":
        isEditMode && reset(objectData);
        break;

      case "Opportunity":
      case "Lead":
        //do something with products
        isEditMode
          ? reset(objectData)
          : reset({
              "customerid_contact@odata.bind": `/contacts(${linkedContact})`,
            });
        break;

      case "PhoneCall":
      case "Task":
      case "Appointment":
        isEditMode
          ? reset(objectData)
          : reset({
              "regardingobjectid_contact@odata.bind": `/contacts(${linkedContact})`,
            });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    objectName,
    objectId,
    objectByIdQuery.isSuccess,
    isEditMode,
    linkedContact,
  ]);

  useEffect(() => {
    const [firstname, lastname, emailaddress1] = watch([
      "firstname",
      "lastname",
      "emailaddress1",
    ]);

    if (
      isEditMode ||
      objectName !== "Contact" ||
      !context ||
      firstname ||
      lastname ||
      emailaddress1
    )
      return;

    reset({
      firstname: context.data.user.firstsName,
      lastname: context.data.user.lastName,
      emailaddress1: context.data.user.primaryEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, objectName, context]);

  useEffect(() => {
    if (!submitMutation.isSuccess) return;

    if (isEditMode) {
      navigate(-1);
    }

    const id = (submitMutation.data as ProxyResponse).headers.location[0].match(
      /\((.*)\)/
    )?.[1];

    if (objectName !== "Contact") {
      navigate(`/view/single/${objectName}/${id}`);

      return;
    }

    if (!id) {
      navigate(`/redirect`);

      return;
    }

    linkContact(id.toString()).then(() => {
      navigate(`/redirect`);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submitMutation.isSuccess,
    navigate,
    objectId,
    isEditMode,
    linkContact,
    objectName,
  ]);

  useEffect(() => {
    if (!correctJson || !objectName) return;

    switch (objectName) {
      case "Contact":
        setSchema(getContactSchema());
        break;
      case "Appointment":
        setSchema(getAppointmentSchema());
        break;
      case "PhoneCall":
        setSchema(getPhoneCallSchema());
        break;
      case "Lead":
        setSchema(getLeadSchema());
        break;
      case "Task":
        setSchema(getTaskSchema());
        break;
      case "Opportunity":
        setSchema(getOpportunitySSchema());
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, objectName]);

  useDeskproAppEvents({
    async onElementEvent(id) {
      switch (id) {
        case "homeButton":
          navigate("/redirect");

          break;
      }
    },
  });

  useInitialisedDeskproAppClient(
    (client) => {
      if (!objectName) return;

      client.deregisterElement("plusButton");

      client.deregisterElement("menuButton");

      client.setTitle(`${isEditMode ? "Edit" : "Create"} ${objectName}`);

      client.deregisterElement("editButton");
    },
    [objectName, isEditMode]
  );

  const dropdownData = useMemo(() => {
    if (!currencyQuery.isSuccess)
      return {
        _transactioncurrencyid_value: [],
        prioritycode: [],
        purchasetimeframe: [],
        leadsourcecode: [],
      };

    return {
      prioritycode: [
        {
          key: "High",
          value: 0,
        },
        {
          key: "Normal",
          value: 1,
        },
        {
          key: "Low",
          value: 2,
        },
      ],
      _transactioncurrencyid_value:
        currencyQuery.data.map(
          (currency: {
            currencysymbol: string;
            transactioncurrencyid: string;
          }) => ({
            key: currency.currencysymbol,
            value: currency.transactioncurrencyid,
          })
        ) ?? [],
      purchasetimeframe: getPurchaseTimeFrames(),
      leadsourcecode: getLeadSources(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyQuery.isSuccess]);

  if (isEditMode && !objectByIdQuery.isSuccess) return <LoadingSpinnerCenter />;
  return (
    <form
      onSubmit={handleSubmit((data) => submitMutation.mutate(data))}
      style={{ width: "100%" }}
    >
      <Stack vertical style={{ width: "100%" }} gap={6}>
        <FieldMappingInput
          errors={errors}
          dropdownData={{
            ...dropdownData,
          }}
          fields={correctJson.create}
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <Stack style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            type="submit"
            data-testid="button-submit"
            text={objectId ? "Save" : "Create"}
            loading={submitMutation.isLoading}
            disabled={submitMutation.isLoading}
            intent="primary"
          ></Button>
          {isEditMode && (
            <Button
              text="Cancel"
              onClick={() => navigate(-1)}
              intent="secondary"
            ></Button>
          )}
        </Stack>
      </Stack>
      <H1>
        {!!submitMutation.error &&
          parseJsonErrorMessage(
            (submitMutation.error as { message: string }).message
          )}
      </H1>
    </form>
  );
};
