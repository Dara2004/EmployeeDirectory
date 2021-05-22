import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Spinner,
  Link,
} from "@chakra-ui/react";
import EmployeeCardEditDrawer from "./Drawer/EmployeeCardEditDrawer";
import TopPortion from "./Sections/Top";
import SkillsSection from "./Sections/Skills";
import JobSection from "./Sections/Job";
import ExperienceSection from "./Sections/Experience";
import type { IEmployee } from "../../services/Workers";
import axios, { Canceler } from "axios";

export interface EmployeeCardTemplateProps {
  SCprops: IEmployee;
  onOpen: () => void;
  onClose: () => void;
  btnRef: React.MutableRefObject<null>;
  isOpen: boolean;
  id: string;
}

function useOneEmployeeSearch(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [employee, setEmployee] = useState<IEmployee>();

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "GET",
      url: String("/api/Workers/" + id),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, []);
  return { loading, error, employee };
}

export const BasicInfoTitleBox = (props: any) => {
  return (
    <Box>
      <Text color="#718096" fontWeight="700" fontSize="xs">
        {props.link? (
          <Link href={props.link}>{props.title}</Link>
        ) : (
          props.title
        )}
      </Text>
    </Box>
  );
};

export const BasicInfoBox = (props: any) => {
  return (
    <Box>
      <Text color="#4A5568" fontWeight="500" fontSize="xs">
        {props.link? (
          <Link href={props.link}>{props.data}</Link>
        ) : (
          props.data
        )}
      </Text>
    </Box>
  );
};

const EmployeeCardTemplate = ({ id }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { employee, loading, error } = useOneEmployeeSearch(id);

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

  const Error = () => (
    <div>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            There was an error processing your request!
          </AlertTitle>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
    </div>
  );
  if (employee == undefined) {
    return (
      <>
        <ViewLoading />
        <Error />
      </>
    );
  }

  const employeeCardProps: EmployeeCardTemplateProps = {
    SCprops: employee!,
    onOpen: onOpen,
    onClose: onClose,
    btnRef: btnRef,
    isOpen: isOpen,
    id: id,
  };

  return (
    <>
      <TopPortion {...employeeCardProps} />
      <hr />
      <JobSection {...employeeCardProps} />
      <hr />
      {/* we do not have experience section */}
      {/* <ExperienceSection {...employeeCardProps} />
      <hr /> */}
      <SkillsSection {...employeeCardProps} />
      <EmployeeCardEditDrawer {...employeeCardProps} />
      <Error />
    </>
  );
};

export default EmployeeCardTemplate;
