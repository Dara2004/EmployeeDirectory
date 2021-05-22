import React, { useState, useRef, useCallback } from "react";
import SearchCard from "../SearchCard";
import SearchCardListRow from "../SearchCard/ListView/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faTh, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  SimpleGrid,
  Flex,
  Spacer,
  Text,
  Select,
  HStack,
  Tabs,
  TabList,
  Tab,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Wrap,
} from "@chakra-ui/react";
import useEmployeeSearch, {
  IEmployee,
  SEARCH_OFFSET,
} from "../../services/Workers";

export interface SearchResultViewProps {
  employees: IEmployee[];
  lastEmployeeRef: (node: any) => void;
  showGrid: boolean;
}

const BasicInfoTitleBox = (props: any) => (
  <Box>
    <Text color="#A0AEC0" fontWeight="700" fontSize="xs">
      {props.title}
    </Text>
  </Box>
);

const GridView = ({
  employees,
  lastEmployeeRef,
  showGrid,
}: SearchResultViewProps) => (
  <Wrap paddingX={6} spacing={10} data-test={"search-results-grid-view"}>
    {employees.map((eachEmployee, index) => {
      if (employees.length === index + 1 && showGrid) {
        return (
          <SearchCard key={index} e={eachEmployee}>
            <div ref={lastEmployeeRef}></div>
          </SearchCard>
        );
      } else {
        return <SearchCard key={index} e={eachEmployee}></SearchCard>;
      }
    })}
  </Wrap>
);

const ListView = ({
  employees,
  lastEmployeeRef,
  showGrid,
}: SearchResultViewProps) => (
  <Box marginLeft={3} marginRight={3} backgroundColor="white" rounded="lg">
    <SimpleGrid paddingTop={2} columns={10} spacing={1}>
      <Box></Box>
      <BasicInfoTitleBox title="EMPLOYEE NAME" />
      <BasicInfoTitleBox title="TITLE" />
      <Box></Box>
      <BasicInfoTitleBox title="WORK PHONE" />
      <BasicInfoTitleBox title="EMAIL" />
      <BasicInfoTitleBox title="PHYSICAL LOCATION" />
      <BasicInfoTitleBox title="OFFICE" />
      <BasicInfoTitleBox title="GROUP" />
      <Box></Box>
    </SimpleGrid>
    <Center>
      <Box width="95%" paddingTop={2}>
        <hr></hr>
      </Box>
    </Center>
    {employees.map((eachEmployee, index) => {
      if (employees.length === index + 1 && !showGrid) {
        return (
          <div ref={lastEmployeeRef}>
            <SearchCardListRow {...eachEmployee}></SearchCardListRow>
          </div>
        );
      } else {
        return <SearchCardListRow {...eachEmployee}></SearchCardListRow>;
      }
    })}
  </Box>
);

const SearchResultView = ({ query }: any) => {
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [skipNumber, setSkipNumber] = useState<number>(0);
  const [resultCount, setResultCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("name");
  const observer = useRef<IntersectionObserver | null>(null);

  // should plug in the correct query here where null is
  const { employees, hasMore, loading, error } = useEmployeeSearch(
    query,
    skipNumber,
    setResultCount,
    sortBy,
    setSkipNumber,
  );

  const lastEmployeeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      // console.log(hasMore);
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkipNumber((prevSkipNumber) => prevSkipNumber + SEARCH_OFFSET);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const LoadingSpinner = () => (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
  const ViewLoading = () => (
    <Center paddingTop={10}>{loading && <LoadingSpinner />}</Center>
  );

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSortBy(event.currentTarget.value);
  };

  return (
    <>
      <Flex height="80px" width="100%">
        <HStack marginLeft={10} spacing="24px">
          <Box>
            <Text fontSize="13px" fontWeight="700">
              {resultCount} {resultCount === 1 ? "result" : "results"} found
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <HStack spacing="24px">
          <Box>
            <Text fontSize="13px" fontWeight="400">
              Sort by:
            </Text>
          </Box>
          <Box>
            <Select onChange={handleChange} size="xs">
              <option value="name">Name</option>
              <option value="physicalLocation">Physical Location</option>
              <option value="office">Office</option>
              <option value="group">Group</option>
            </Select>
          </Box>
          <Box
            rounded="lg"
            backgroundColor="rgba(115, 152, 186, 0.24)"
            marginRight={3}
          >
            <Tabs variant="soft-rounded" colorScheme="whiteAlpha">
              <TabList>
                <Tab onClick={() => setShowGrid(true)}>
                  <FontAwesomeIcon icon={faTh} />
                </Tab>
                <Tab onClick={() => setShowGrid(false)}>
                  <FontAwesomeIcon icon={faListUl} />
                </Tab>
              </TabList>
            </Tabs>
          </Box>
        </HStack>
      </Flex>
      {showGrid ? (
        <>
          <GridView
            employees={employees}
            lastEmployeeRef={lastEmployeeElementRef}
            showGrid={showGrid}
          />
          <ViewLoading />
        </>
      ) : (
        <>
          <ListView
            employees={employees}
            lastEmployeeRef={lastEmployeeElementRef}
            showGrid={showGrid}
          />
          <ViewLoading />
        </>
      )}
      {resultCount === 0 && !loading ? (
        <Box marginTop="130px">
          <Center>
            <FontAwesomeIcon icon={faSearch} size="lg" />
            <Text fontWeight="700" fontSize="lg">
              Sorry, we couldn't find any results.
            </Text>
          </Center>
        </Box>
      ) : null}
      <div>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>
              There was an error processing your request!
            </AlertTitle>
          </Alert>
        )}
      </div>
    </>
  );
};

export default SearchResultView;
