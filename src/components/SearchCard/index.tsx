import React from "react";
import {
  Box,
  SimpleGrid,
  Avatar,
  Center,
  Text,
  Badge,
  VStack,
  useDisclosure,
  WrapItem,
  Tooltip,
} from "@chakra-ui/react";
import EmployeeDrawer from "../EmployeeDrawer";
import type { IEmployee } from "../../services/Workers";

export interface SearchCardProps {
  children?: React.ReactNode;
  e: IEmployee;
}

const DataRow = ({ data }: any) => {
  return (
    <Box height="20px">
      <Tooltip label={data}>
        <Text
          h="15px"
          color="#000000"
          fontWeight="400"
          fontSize="xs"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {data}
        </Text>
      </Tooltip>
    </Box>
  );
};

const SearchCard = ({ children, e }: SearchCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <WrapItem>
      <SimpleGrid
        as="button"
        boxShadow="lg"
        p="6"
        rounded="lg"
        columns={1}
        backgroundColor="white"
        width="200px"
        ref={btnRef}
        onClick={onOpen}
      >
        <Box paddingTop={3} height="100px">
          <Center>
            <Avatar
              size="lg"
              name={e.firstName + " " + e.lastName}
              src={e.photoUrl}
            />
          </Center>
        </Box>
        <Box height="20px">
          <Center>
            <Text color="#000000" fontWeight="700" fontSize="xs">
              {e.firstName + " " + e.lastName}
            </Text>
          </Center>
        </Box>
        <DataRow data={e.workPhone} />
        <DataRow data={e.email} />
        <DataRow data={e.physicalLocation} />
        <DataRow data={e.office} />
        <DataRow data={e.group} />
        <Box paddingTop={2} height="45px">
          <hr></hr>
          <VStack paddingTop={2} spacing={0}>
            <Box>
              <Center>
                <Tooltip label={e.title}>
                  <Text
                    color="#A0AEC0"
                    fontWeight="700"
                    fontSize="xs"
                    width="180px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {e.title}
                  </Text>
                </Tooltip>
              </Center>
            </Box>
            <Box height="5px">
              {e.type == "contractor" ? (
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
          </VStack>
        </Box>
      </SimpleGrid>
      <EmployeeDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        SCprops={e}
      />
      {children}
    </WrapItem>
  );
};

export default SearchCard;
