import React from "react";
import { Box, Text, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import { EmployeeCardTemplateProps, BasicInfoTitleBox } from "../index";

// template for experience section
export const ExperienceSection = (props: EmployeeCardTemplateProps) => {
  const showText = useBreakpointValue({ base: false, md: true });
  return (
    <SimpleGrid marginLeft={1} columns={1} spacing={5} backgroundColor="white">
      <Box height="180px" paddingTop={5} paddingRight={3}>
        <Box paddingLeft={20} paddingTop={1}>
          <Text color="#153E75" fontWeight="700" fontSize="s">
            Experience
          </Text>
        </Box>
        <Box paddingTop={2} paddingLeft={20}>
          <BasicInfoTitleBox title={props.SCprops.yearsPriorExperience} />
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default ExperienceSection;
