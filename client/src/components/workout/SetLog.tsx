import { ActionIcon } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function SetLog({
  logged,
  edit,
  handleLog,
}: {
  logged: boolean;
  edit: boolean;
  handleLog: () => void;
}) {
  return (
    <ActionIcon
      aria-label="Log set"
      mx="sm"
      variant={logged ? "filled" : "outline"}
      disabled={edit}
      color={!logged ? "gray" : "red"}
      onClick={handleLog}
      className="border-2 transition-all"
    >
      {logged && <FaCheck />}
      {edit && <MdOutlineClose />}
    </ActionIcon>
  );
}
