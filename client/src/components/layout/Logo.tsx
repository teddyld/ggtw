import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Group, Image, Text } from "@mantine/core";

import FlameLogo from "../../assets/logo.png";

export default function Logo({ opened }: { opened: boolean }) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <Group
      gap={5}
      wrap="nowrap"
      className="cursor-pointer overflow-hidden"
      component="a"
      onClick={() => navigate(isSignedIn ? "/workout" : "/")}
    >
      <Image src={FlameLogo} h={32} alt="ggtw logo" />
      <Text
        size="xl"
        variant="gradient"
        gradient={{ from: "red.9", to: "red.4", deg: 90 }}
        fw={700}
        className={!opened ? "hidden" : ""}
      >
        GGTW
      </Text>
    </Group>
  );
}
