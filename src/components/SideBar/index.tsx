import React from "react";
import {
  Box,
  Center,
  VStack,
  HStack,
  Text,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import Logo from "../../assets/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSitemap } from "@fortawesome/free-solid-svg-icons";

export interface SideBarProps {
  curPage: string;
}

interface SideBarMenuProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  selected?: boolean;
  test?: string;
}

const SideBarMenu = ({
  icon,
  text,
  link,
  selected,
  test,
}: SideBarMenuProps) => {
  const showText = useBreakpointValue({ base: false, md: true });
  return (
    <HStack spacing={{ base: 2, md: 5 }} paddingLeft={0}>
      <Box
        backgroundColor={selected ? "#2A69AC" : undefined}
        width="16px"
        height="30px"
      />
      <Box width="15px">
        <Center>{icon}</Center>
      </Box>
      {showText ? (
        <Text
          fontSize="12px"
          color={selected ? "#2A69AC" : undefined}
          fontWeight={selected ? "bold" : undefined}
        >
          {/* Breaks here if I used Link imported from react-outer-dom */}
          <Link test={test} href={link}>
            {text}
          </Link>
        </Text>
      ) : null}
    </HStack>
  );
};

const SideBar = ({ curPage }: SideBarProps) => {
  return (
    <VStack
      boxShadow="base"
      width={{ base: "50px", md: "200px" }}
      minHeight="100vh"
      spacing={5}
      backgroundColor="white"
    >
      <Center width="100%" my={{ base: "20px", md: "50px" }}>
        <Logo
          width={{ base: "30px", md: "100px" }}
          height={{ base: "30px", md: "100px" }}
        />
      </Center>
      <VStack spacing={5} align="left" width="100%" paddingRight={4}>
        <SideBarMenu
          icon={<FontAwesomeIcon color="#555555" icon={faHome} />}
          text="Dashboard"
          link="/"
          selected={curPage == "dashboard"}
        />
        <SideBarMenu
          icon={<FontAwesomeIcon color="#555555" icon={faUser} />}
          text="Employees"
          link="/search"
          test="search_page_link"
          selected={curPage == "search"}
        />
        <SideBarMenu
          icon={<FontAwesomeIcon color="#555555" icon={faSitemap} />}
          text="Org Chart"
          link="/orgchart"
        />
      </VStack>
    </VStack>
  );
};

export default SideBar;
