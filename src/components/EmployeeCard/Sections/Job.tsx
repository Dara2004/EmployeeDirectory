import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Text, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import {
  EmployeeCardTemplateProps,
  BasicInfoTitleBox,
  BasicInfoBox,
} from "../index";

// template for job info section
export const JobSection = (props: EmployeeCardTemplateProps) => {
  const showText = useBreakpointValue({ base: false, md: true });
  
  const history = useHistory();

  const handleOnClick = (m) => {
    let path = '/search';
    history.push(path);
  }

  return (
    <SimpleGrid marginLeft={1} columns={1} spacing={5}>
      <Box height="180px" paddingTop={5} paddingRight={3}>
        <Box paddingLeft={20} paddingTop={1}>
          <Text color="#153E75" fontWeight="700" fontSize="s">
            Job Information
          </Text>
        </Box>
        <Box>
          <SimpleGrid paddingTop={1} columns={2} spacing={1}>
            <Box>
              <SimpleGrid paddingLeft={20} paddingTop={1} columns={2}>
                <BasicInfoTitleBox title={"Company:"} />
                <BasicInfoBox data={props.SCprops.company} link={`/search/companies/${props.SCprops.companyCode}`} />
                <BasicInfoTitleBox title={"Office:"} />
                <BasicInfoBox data={props.SCprops.office} link={`/search/companies/${props.SCprops.officeCode}/${props.SCprops.companyCode}`} />
                <BasicInfoTitleBox title={"Group:"} />
                <BasicInfoBox data={props.SCprops.group} link={`/search/companies/${props.SCprops.groupCode}/${props.SCprops.officeCode}/${props.SCprops.companyCode}`} />
              </SimpleGrid>
            </Box>
            <Box>
              <SimpleGrid paddingLeft={20} paddingTop={1} columns={2}>
                <BasicInfoTitleBox title={"Physical-Location:"} />
                <BasicInfoBox data={props.SCprops.physicalLocation} link={`/search/physicallocations/${props.SCprops.physicalLocationId}`} />
                <BasicInfoTitleBox title={"Supervisor:"} />
                <BasicInfoBox data={props.SCprops.supervisorWorker} link={`/search/workers/${props.SCprops.supervisorWorkerNumber}`} />
                <BasicInfoTitleBox title={"Years of Prior Experience:"} />
                <BasicInfoBox data={props.SCprops.yearsPriorExperience} />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default JobSection;
