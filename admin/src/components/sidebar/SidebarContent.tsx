import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import NavItem from "./NavItem";
import Logo from "../Logo";
import { appNavItems } from "../../configs/nav.config";
import { Link } from "@tanstack/react-router";
interface Props extends BoxProps {}
export default function SidebarContent({ ...props }: Props) {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border={""}
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          <Logo />
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {appNavItems.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props: any = {
            as: Link,
            to: item.href || undefined,
            icon: item.icon,
          };
          return (
            <NavItem {...props} key={item.label}>
              {item.label}
            </NavItem>
          );
        })}

        {/* <NavItem icon={HiCode} onClick={onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={isOpen ? "rotate(90deg)" : ""}
          />
        </NavItem> */}
        {/* <Collapse in={isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse> */}
      </Flex>
    </Box>
  );
}
