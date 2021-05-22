import React from "react";
import {
  Box,
  SimpleGrid,
  Avatar,
  Center,
  Text,
  Badge,
  HStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import EmployeeDrawer from "../../EmployeeDrawer";
import type { IEmployee } from "../../../services/Workers";

const BasicInfoBox = (props: any) => {
  return (
    <Box>
      <Text color="#000000" fontWeight="400" fontSize="xs">
        {props.data}
      </Text>
    </Box>
  );
};

const SearchCardListRow = (props: IEmployee) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      <SimpleGrid paddingTop={2} columns={10} spacing={1}>
        <Box>
          <Center>
            <Avatar
              size="sm"
              name={props.firstName + " " + props.lastName}
              src={props.photoUrl}
            />
          </Center>
        </Box>
        <BasicInfoBox data={props.firstName + " " + props.lastName} />
        <Box>
          <BasicInfoBox data={props.title} />
        </Box>
        <Box>
          {props.type == "contractor" ? (
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
        </Box>
        <BasicInfoBox data={props.workPhone} />
        <BasicInfoBox data={props.email} />
        <BasicInfoBox data={props.physicalLocation} />
        <BasicInfoBox data={props.office} />
        <BasicInfoBox data={props.group} />
        <Box>
          <Button
            colorScheme="blackAlpha"
            variant="outline"
            size="sm"
            ref={btnRef}
            onClick={onOpen}
          >
            View More
          </Button>
        </Box>
      </SimpleGrid>
      <Center>
        <Box width="95%" paddingTop={2}>
          <hr></hr>
        </Box>
      </Center>
      <EmployeeDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        SCprops={props}
      />
    </>
  );
};

export default SearchCardListRow;
