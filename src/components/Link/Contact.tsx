import {
  useDeskproAppEvents,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { AnyIcon, Button, Checkbox, Input, Stack } from "@deskpro/deskpro-ui";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/debounce";
import { useLinkContact } from "../../hooks/hooks";
import ContactJson from "../../mapping/contact.json";
import { Title } from "../../styles";
import { FieldMapping } from "../FieldMapping/FieldMapping";
import { HorizontalDivider } from "../HorizontalDivider/HorizontalDivider";
import { LoadingSpinnerCenter } from "../LoadingSpinnerCenter/LoadingSpinnerCenter";
import { getContactsByEmail } from "../../api/api";

export const LinkContact = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const { linkContact } = useLinkContact();
  const navigate = useNavigate();

  const { debouncedValue: debouncedText } = useDebounce(prompt, 300);

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Link Contact");

    client.registerElement("homeButton", {
      type: "home_button",
    });

    client.deregisterElement("plusButton");

    client.deregisterElement("menuButton");
  }, []);

  useDeskproAppEvents({
    async onElementEvent(id) {
      switch (id) {
        case "homeButton":
          navigate("/redirect");
      }
    },
  });

  const contactsQuery = useQueryWithClient(
    ["getContactsByEmail", debouncedText],
    (client) => getContactsByEmail(client, debouncedText),
    {
      enabled: debouncedText.length > 2,
    }
  );

  const contacts = contactsQuery.data?.value;

  return (
    <Stack gap={10} style={{ width: "100%" }} vertical>
      <Stack vertical gap={6} style={{ width: "100%" }}>
        <Input
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPrompt(event.target.value)}
          value={prompt}
          placeholder="Enter Email Address"
          type="text"
          leftIcon={faMagnifyingGlass as AnyIcon}
        />
        <Stack vertical style={{ width: "100%" }} gap={5}>
          <Stack
            style={{ width: "100%", justifyContent: "space-between" }}
            gap={5}
          >
            <Button
              onClick={() => selectedContact && linkContact(selectedContact)}
              disabled={selectedContact == null}
              text="Link Contact"
            ></Button>
            <Button
              disabled={selectedContact == null}
              text="Cancel"
              intent="secondary"
              onClick={() => setSelectedContact(null)}
            ></Button>
          </Stack>
          <HorizontalDivider full />
        </Stack>
        {contactsQuery.isFetching ? (
          <LoadingSpinnerCenter />
        ) : contactsQuery.isSuccess && contacts?.length !== 0 ? (
          <Stack vertical gap={5} style={{ width: "100%" }}>
            {contacts?.map((contact, i) => {
              return (
                <Stack key={i} gap={6} style={{ width: "100%" }}>
                  <Stack style={{ marginTop: "2px" }}>
                    <Checkbox
                      checked={selectedContact === contact.contactid}
                      onChange={() => {
                        if (selectedContact == null) {
                          setSelectedContact(contact.contactid);
                        } else {
                          setSelectedContact(null);
                        }
                      }}
                    ></Checkbox>
                  </Stack>
                  <Stack style={{ width: "92%" }}>
                    <FieldMapping
                      fields={[contact]}
                      hasCheckbox={true}
                      metadata={ContactJson.list}
                      externalChildUrl={ContactJson.externalChildUrl}
                      childTitleAccessor={(e) => e[ContactJson.titleKeyName]}
                    />
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        ) : (
          contactsQuery.isSuccess && <Title>No Contacts Found.</Title>
        )}
      </Stack>
    </Stack>
  );
};
