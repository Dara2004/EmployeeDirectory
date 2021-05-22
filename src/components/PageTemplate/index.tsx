import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import SideBar from "../SideBar";
import NavBar from "../NavBar";

export interface PageTemplateProps {
  children?: React.ReactNode;
  curPage: string;
}

const PageTemplate = ({ children, curPage }: PageTemplateProps) => {
  return (
    <VStack
      spacing={0}
      height="100%"
      backgroundColor="#F6F6FA"
      width="100%"
      align="top"
    >
      {/* <SideBar curPage={curPage} /> */}
      <NavBar curPage={curPage} />
      <Box width="100%" height="100%">
        {children}
      </Box>
    </VStack>
  );
};

export default PageTemplate;
