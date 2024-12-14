import { createTheme, MantineColorsTuple } from "@mantine/core";

const redTheme: MantineColorsTuple = [
  "#ffebeb",
  "#f9d1d1",
  "#f89f9e",
  "#f86a68",
  "#f9403b",
  "#f92b20",
  "#fa2113",
  "#df1708",
  "#c70f04",
  "#ad0000",
];

// Modify default blue theme with redTheme
export const theme = createTheme({
  colors: {
    blue: redTheme,
  },
});
