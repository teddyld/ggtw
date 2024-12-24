import { FaDumbbell, FaChartLine, FaRegUser } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export const pageInfo = [
  {
    name: "Workout",
    route: "/workout",
    icon: FaDumbbell,
  },
  {
    name: "Statistics",
    route: "/statistics",
    icon: FaChartLine,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: FaRegUser,
  },
];

export type pageType = {
  name: string;
  route: string;
  icon: IconType;
};
