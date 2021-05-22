import React from "react";
import {
  Box,
  Center,
  Avatar,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  DrawerFooter,
  Link,
} from "@chakra-ui/react";
import type { IEmployee } from "../../services/Workers";

const BasicInfoTitleBox = ({ title }: any) => {
  return (
    <Box>
      <Text color="#718096" fontWeight="500" fontSize="13px">
        {title}
      </Text>
    </Box>
  );
};

const BasicInfoBox = ({ data }: any) => {
  return (
    <Box>
      <Text color="#4A5568" fontWeight="500" fontSize="13px">
        {data}
      </Text>
    </Box>
  );
};

export interface EmployeeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
  SCprops: IEmployee;
}

const EmployeeDrawer = (props: EmployeeDrawerProps) => {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={props.btnRef}
      size="sm"
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={1}>
              <Box marginTop={4}>
                <Center>
                  <Avatar
                    size="2xl"
                    name={
                      props.SCprops.firstName + " " + props.SCprops.lastName
                    }
                    src={props.SCprops.photoUrl}
                  />
                </Center>
              </Box>
              <Box paddingTop={2}>
                <Center>
                  <Text color="#000000" fontWeight="700" fontSize="19px">
                    {props.SCprops.firstName + " " + props.SCprops.lastName}
                  </Text>
                </Center>
              </Box>
              <Box>
                <Center>
                  <Text color="#A0AEC0" fontWeight="700" fontSize="13px">
                    {props.SCprops.title}
                  </Text>
                  {props.SCprops.type == "contractor" ? (
                    <Badge
                      fontSize="0.01em"
                      ml="1"
                      borderRadius="full"
                      px="1"
                      variant="subtle"
                    >
                      Contractor
                    </Badge>
                  ) : null}
                </Center>
              </Box>
              <Box paddingTop={6}>
                <Center>
                  <Text color="#000000" fontWeight="700" fontSize="14px">
                    Contact Info:
                  </Text>
                </Center>
              </Box>
              <Box width="90%">
                <SimpleGrid columns={2}>
                  <BasicInfoTitleBox title="Work Phone" />
                  <BasicInfoBox data={props.SCprops.workPhone} />
                  <BasicInfoTitleBox title="Cell Phone" />
                  <BasicInfoBox data={props.SCprops.workCell} />
                  <BasicInfoTitleBox title="Email" />
                  <BasicInfoBox data={props.SCprops.email} />
                </SimpleGrid>
              </Box>
              <Box width="100%" paddingTop={5}>
                <hr></hr>
              </Box>
              <Box paddingTop={5}>
                <Center>
                  <Text color="#000000" fontWeight="700" fontSize="14px">
                    Work Info:
                  </Text>
                </Center>
              </Box>
              <Box width="90%">
                <SimpleGrid columns={2}>
                  <BasicInfoTitleBox title="Company" />
                  <BasicInfoBox data={props.SCprops.company} />
                  <BasicInfoTitleBox title="Office" />
                  <BasicInfoBox data={props.SCprops.office} />
                  <BasicInfoTitleBox title="Group" />
                  <BasicInfoBox data={props.SCprops.group} />
                  <BasicInfoTitleBox title="Physical Location" />
                  <BasicInfoBox data={props.SCprops.physicalLocation} />
                </SimpleGrid>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              width="50%"
              fontSize="11px"
              variant="outline"
              mr={3}
              as="a"
              href={"/worker/" + props.SCprops.workerNumber}
            >
              Full Profile
            </Button>
            <Button
              width="50%"
              fontSize="11px"
              variant="outline"
              mr={3}
              as="a"
              href={"/orgchart/" + props.SCprops.workerNumber}
            >
              Organizational Chart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default EmployeeDrawer;
