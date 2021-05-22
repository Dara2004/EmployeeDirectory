import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Avatar,
  Text,
  useBreakpointValue,
  SimpleGrid,
  Button,
  Flex,
  Spacer,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  Link,
  useToast,
} from "@chakra-ui/react";
import {
  EmployeeCardTemplateProps,
  BasicInfoTitleBox,
  BasicInfoBox,
} from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faUserTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios, { Canceler } from "axios";
import { Redirect } from "react-router-dom";

// template for the top section
const TopPortion = (props: EmployeeCardTemplateProps) => {
  const showText = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // const [deleted, setDeleted] = useState(false);
  const canDelete = props.SCprops.numChildren === 0;
  // const [canDelete, setCanDelete] = useState(false);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: String("/api/Workers/checkHasChild/" + props.id),
  //     params: { workerId: props.id },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       // if the worker has 0 worker under them then we can safely delete
  //       if (res.data.result === 0) {
  //         setCanDelete(true);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  const handleDeleteWorker = (event) => {
    axios({
      method: "DELETE",
      url: String("/api/Workers/" + props.id),
      params: { id: props.id },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        // REDIRECT TO SEARCH PAGE
        // setDeleted(true);
        window.location.href = "/search";
      })
      .catch((e) => {
        toast({
          title: "Error Deleting Worker.",
          description:
            "There was an error deleting the worker, please try again.",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        return;
      });
  };
  // if (deleted) {
  //   return <Redirect to={{ pathname: "/search" }} />;
  // }
  return (
    <>
      <SimpleGrid marginLeft={1} columns={3} spacing={5} marginTop={2}>
        <Box paddingLeft={3} paddingTop={10} height="220px">
          <Box paddingLeft={3} paddingTop={3} height="70px">
            <Center>
              <Avatar
                size="lg"
                name={props.SCprops.firstName + " " + props.SCprops.lastName}
                src={props.SCprops.photoUrl}
              />
            </Center>
          </Box>
          <Box marginTop={3} height="20px">
            <Center>
              <Text fontWeight="bold">
                {props.SCprops.firstName + " " + props.SCprops.lastName}
              </Text>
            </Center>
          </Box>
          <Box marginTop={3} height="15px">
            <Center>
              <Link href={`/search?title=${props.SCprops.title.replace(" ", "%20")}`}>
                <Text color="#718096" fontWeight="700" fontSize="xs">
                  {props.SCprops.title}
                </Text>
              </Link>
            </Center>
          </Box>
          <Box paddingTop={2} height="13px">
            {props.SCprops.type == "contractor" ? (
              <Center>
                <Badge
                  fontSize="0.01em"
                  ml="1"
                  borderRadius="full"
                  px="1"
                  variant="subtle"
                >
                  <Link href={`/search?type=${props.SCprops.type.replace(" ", "%20")}`}>
                    Contractor
                  </Link>
                </Badge>
              </Center>
            ) : null}
          </Box>
        </Box>
        <Box height="220px">
          <SimpleGrid paddingTop={16} columns={2} spacing={1}>
            <BasicInfoTitleBox title={"Work Phone:"} />
            <BasicInfoBox data={props.SCprops.workPhone} />
            <BasicInfoTitleBox title={"Cell Phone:"} />
            <BasicInfoBox data={props.SCprops.workCell} />
            <BasicInfoTitleBox title={"Email:"} />
            <BasicInfoBox data={props.SCprops.email} />
            <BasicInfoTitleBox title={"Hired Since:"} />
            <BasicInfoBox
              data={new Date(props.SCprops.hireDate).toLocaleDateString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <BasicInfoTitleBox title={"Employment Type:"} />
            <BasicInfoBox data={props.SCprops.employmentType} link={`/search?employmentType=${props.SCprops.employmentType.replace(" ", "%20")}`} />
          </SimpleGrid>
        </Box>
        <Box height="220px" paddingTop={2} paddingRight={3}>
          <Flex>
            <Spacer />
            {localStorage.getItem("token") ? (
              <>
                <Button
                  leftIcon={
                    <FontAwesomeIcon color="#A0AEC0" icon={faEdit} size="sm" />
                  }
                  colorScheme="gray"
                  variant="outline"
                  size="xs"
                  aria-label="Edit Employee"
                  ref={props.btnRef}
                  onClick={props.onOpen}
                  marginRight={3}
                >
                  Edit Worker
                </Button>
                <Button
                  leftIcon={
                    <FontAwesomeIcon
                      color="#A0AEC0"
                      icon={faUserTimes}
                      size="sm"
                    />
                  }
                  colorScheme="gray"
                  variant="outline"
                  size="xs"
                  aria-label="Delete Employee"
                  // ref={props.btnRef}
                  // onClick={props.onOpen}
                  marginRight={1}
                  onClick={onOpen}
                >
                  Delete Worker
                </Button>
              </>
            ) : null}
          </Flex>
          <Box paddingTop={10}>
            <Center>
              <Button
                colorScheme="blue"
                as="a"
                href={"/orgchart/" + props.SCprops.workerNumber}
              >
                View Organization Chart
              </Button>
            </Center>
          </Box>
        </Box>
      </SimpleGrid>
      <Modal onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Worker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure to delete this worker?
            <Text fontSize="xs" marginTop={1}>
              * Please note you can only delete workers who are not supervisors.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              leftIcon={
                <FontAwesomeIcon color="white" icon={faTrashAlt} size="sm" />
              }
              onClick={handleDeleteWorker}
              isDisabled={canDelete ? false : true}
            >
              DELETE!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TopPortion;
