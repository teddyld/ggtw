import { ActionIcon } from "@mantine/core";
import { FaCheck } from "react-icons/fa";

export default function SetLog({
  logged,
  handleLog,
}: {
  logged: boolean;
  handleLog: () => void;
}) {
  return (
    <ActionIcon
      aria-label="Log set"
      mx="sm"
      variant={logged ? "filled" : "outline"}
      color={!logged ? "gray" : "red"}
      onClick={handleLog}
      className="border-2 transition-all"
    >
      {logged && <FaCheck />}
    </ActionIcon>
  );
}
