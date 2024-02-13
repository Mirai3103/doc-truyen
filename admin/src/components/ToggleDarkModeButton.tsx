import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ToggleDarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? <MdDarkMode /> : <MdLightMode />;
  return (
    <IconButton
      aria-label="Search database"
      icon={Icon}
      onClick={toggleColorMode}
    />
  );
}
