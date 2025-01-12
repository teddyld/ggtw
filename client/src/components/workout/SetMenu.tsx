import { Menu, ActionIcon } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

export default function SetMenu({
  deleteSet,
  addSetBelow,
}: {
  deleteSet: () => void;
  addSetBelow: () => void;
}) {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label="Edit set">
          <BsThreeDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Set</Menu.Label>
        <Menu.Item
          leftSection={<MdOutlineSubdirectoryArrowRight className="text-lg" />}
          onClick={addSetBelow}
        >
          Add set below
        </Menu.Item>
        <Menu.Item
          leftSection={<FaRegTrashAlt className="text-lg" />}
          color="red"
          onClick={deleteSet}
        >
          Delete set
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
