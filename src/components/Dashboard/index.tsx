import React, { useEffect, useState } from "react";
import {
  Wrap,
  WrapItem,
  Box,
  HStack,
  Text,
  VStack,
  Circle,
  Button,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBriefcase,
  faBuilding,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios, { Canceler } from "axios";
import { PieChart } from "react-minimal-pie-chart";

export interface DashboardProps {
  onOpen: () => void;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
  isOpen: boolean;
}

interface dashObject {
  numberOfContractors: number;
  numberOfEmployees: number;
  numberOfOffices: number;
}

const LoadingSpinner = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
);

const DashComponent = (props: any) => (
  <WrapItem w="400px" h="200px" p="6" rounded="xl" boxShadow="lg" bg="white">
    <HStack>
      <Box>
        <VStack>
          <Box w="240px" paddingTop={3}>
            <Text color="#A0AEC0" fontWeight="700" fontSize="lg">
              {props.title}
            </Text>
          </Box>
          <Box paddingTop={2} w="240px" h="100px">
            <Text
              test={props.test}
              color="#111111"
              fontWeight="700"
              fontSize="4xl"
            >
              {props.data}
            </Text>
            {props.employee ? (
              <Button
                size="xs"
                leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                colorScheme="linkedin"
                variant="solid"
                ref={props.btnRef}
                onClick={props.onOpen}
              >
                New Employee
              </Button>
            ) : null}
          </Box>
        </VStack>
      </Box>
      <Box w="120px" h="90%" paddingTop={2}>
        <Circle size="70px" bg={props.iconColor} color="white">
          <FontAwesomeIcon icon={props.icon} size="lg" />
        </Circle>
      </Box>
    </HStack>
  </WrapItem>
);

const ChartComponent = (props: any) => (
  <WrapItem w="400px" h="200px" p="6" rounded="xl" boxShadow="lg" bg="white">
    <HStack>
      <Box>
        <VStack>
          <Box w="240px" paddingTop={3}>
            <Text color="#A0AEC0" fontWeight="700" fontSize="lg">
              Regular Worker vs. Contractor Ratio
            </Text>
          </Box>
          <Box paddingTop={2} w="240px" h="100px"></Box>
        </VStack>
      </Box>
      <Box w="130px" h="90%" paddingTop={2}>
        {props.children}
      </Box>
    </HStack>
  </WrapItem>
);

const Dashboard = ({}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [dashData, setDashData] = useState<dashObject>({
    numberOfContractors: 0,
    numberOfEmployees: 0,
    numberOfOffices: 0,
  });
  const [loading, setLoading] = useState(true);

  let addEmployeeProps: DashboardProps = {
    onOpen: onOpen,
    onClose: onClose,
    btnRef: btnRef,
    isOpen: isOpen,
  };

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

  // query for num offices
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/dashboard",
    })
      .then((res) => {
        setDashData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, []);

  return (
    <>
      <ViewLoading />
      {!loading && (
        <Wrap paddingLeft={9} paddingTop={9} spacing="70px">
          <DashComponent
            title="TOTAL WORKERS"
            data={dashData.numberOfEmployees - dashData.numberOfContractors}
            iconColor="#2A69AC"
            icon={faUsers}
            onOpen={onOpen}
            btnRef={btnRef}
            test="total_employees_count"
          />

          <DashComponent
            title="TOTAL CONTRACTORS"
            data={dashData.numberOfContractors}
            iconColor="#A0AEC0"
            icon={faBriefcase}
            test="total_contractor_count"
          />
          <DashComponent
            title="TOTAL OFFICES"
            data={dashData.numberOfOffices}
            iconColor="#20B2AA"
            icon={faBuilding}
            test="total_office_count"
          />
          <ChartComponent>
            <PieChart
              animate
              animationDuration={500}
              radius={40}
              center={[40, 40]}
              data={[
                {
                  title: "",
                  value:
                    dashData.numberOfEmployees - dashData.numberOfContractors,
                  color: "#AADEA7",
                },
                {
                  title: "Contractor",
                  value: dashData.numberOfContractors,
                  color: "#E6F69D",
                },
              ]}
              label={({ dataEntry }) =>
                dataEntry.title + ` ${Math.round(dataEntry.percentage)}%`
              }
              labelStyle={{
                fontSize: "10px",
                color: "#FFFFFA",
                fontWeight: 500,
              }}
            />
          </ChartComponent>
        </Wrap>
      )}
    </>
  );
};

export default Dashboard;
