import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

export const useTheme = () => {
  const { setColorScheme } = useMantineColorScheme();
  const theme = useComputedColorScheme("light");
  const toggleTheme = () => {
    setColorScheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    toggleTheme,
  };
};
