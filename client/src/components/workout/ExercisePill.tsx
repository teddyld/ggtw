import React from "react";
import clsx from "clsx";
import { Pill, PillProps } from "@mantine/core";

import { useTheme } from "../../hooks/useTheme";

type ExercisePillType = PillProps & {
  children: React.ReactNode;
};

export default function ExercisePill({ children, ...rest }: ExercisePillType) {
  const { theme } = useTheme();
  return (
    <Pill
      radius="xs"
      className="min-w-fit text-[11px] font-bold"
      classNames={{
        root: clsx(
          theme === "light" ? "bg-[#ffebeb]" : "bg-[#fa2113]/15",
          "text-primary",
        ),
      }}
      {...rest}
    >
      {children}
    </Pill>
  );
}
