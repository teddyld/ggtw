import { useMediaQuery } from "@mantine/hooks";

export const useMedia = () => {
  const isMobile = useMediaQuery("(max-width: 48em)");
  return {
    isMobile,
  };
};
