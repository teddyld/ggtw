import { Group, Image, Text } from "@mantine/core";
import FlameLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Group
      gap={5}
      wrap="nowrap"
      className="cursor-pointer overflow-hidden"
      component="a"
      onClick={() => navigate("/")}
    >
      <Image src={FlameLogo} h={32} alt="ggtw logo" />
      <Text
        size="xl"
        variant="gradient"
        gradient={{ from: "red.9", to: "red.4", deg: 90 }}
        fw={700}
      >
        GGTW
      </Text>
    </Group>
  );
}
