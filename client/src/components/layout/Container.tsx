import React from "react";
import { Paper, PaperProps } from "@mantine/core";

type ContainerType = PaperProps & {
  children: React.ReactNode;
};

export default function Container({ children, ...rest }: ContainerType) {
  return (
    <Paper
      shadow="md"
      p={{ base: "sm", sm: "xl" }}
      withBorder
      radius="md"
      className="w-full max-w-2xl"
      {...rest}
    >
      {children}
    </Paper>
  );
}
