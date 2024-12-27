import { Modal, Accordion, Text, Anchor } from "@mantine/core";

const privacyPolicy = [
  {
    value: "What personal information does GGTW collect?",
    content:
      "We may receive and store any information you submit to the Application (or otherwise authorize us to obtain). The types of personal information collected may include your full name, email address, and workout plans and statistics.",
  },
  {
    value: "How does GGTW use the information it collects?",
    content:
      "GGTW uses the information described in this Privacy Statement internally to provide the Application to you. We do not sell your personal information to third parties.",
  },
  {
    value: "Changes to this privacy statement.",
    content: `GGTW may amend this Privacy Statement from time to time. Use of information we collect now is subject to the Privacy Statement in effect at the time such information is used. If we make changes in the way we use personal information, we will notify you by posting an announcement on our Site or sending you an email. Users are bound by any changes to the Privacy Statement when he or she uses or otherwise accesses the Application after such changes have been first posted.`,
  },
  {
    value: "Questions or concerns.",
    content:
      "If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at ",
    email: true,
  },
];

export default function PrivacyModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const items = privacyPolicy.map((item, index) => {
    return (
      <Accordion.Item key={`privacy-policy-${index}`} value={item.value}>
        <Accordion.Control>{item.value}</Accordion.Control>
        <Accordion.Panel>
          {item.content}
          {item?.email ? (
            <Anchor href="mailto: ggtw.vincent@gmail.com">
              ggtw.vincent@gmail.com.
            </Anchor>
          ) : (
            ""
          )}
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <Modal
      title={<Text fw={700} size="xl">Application Privacy Policy</Text>}
      opened={opened}
      onClose={close}
      centered
      size="lg"
    >
      This privacy statement (“Privacy Statement”) applies to the treatment of
      personally identifiable information submitted by, or otherwise obtained
      from, you in connection with the associated application (“Application”).
      By using or otherwise accessing the Application, you acknowledge that you
      accept the practices and policies outlined in this Privacy Statement.
      <Accordion order={3} pt="md" variant="contained">
        {items}
      </Accordion>
    </Modal>
  );
}
