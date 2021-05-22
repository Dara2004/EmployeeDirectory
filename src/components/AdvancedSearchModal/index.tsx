import React, {
  useState,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { WorkerDetail } from "../../services/search";

const StyledFormControl = styled(FormControl)`
  margin: 10px 0 0 0;
`;

export interface AdvancedSearchModalProps {
  handleCancel: () => void;
  handleApplyFilters: (applyFilters: WorkerDetail) => void;
  isOpen: boolean;
  advancedFilters: WorkerDetail;
}

const AdvancedSearchModal = ({handleCancel, handleApplyFilters, isOpen, advancedFilters}: AdvancedSearchModalProps) => {
  const [formFilters, setFormFilters] = useState<WorkerDetail>(advancedFilters);

  useEffect(() => {
    setFormFilters(advancedFilters);
    console.log("HELLO");
    console.log(advancedFilters);
  }, [advancedFilters]);

  const handleInput = (event) => {
    setFormFilters({...formFilters, [event.target.id]: event.target.value});
  };

  const handleFormCancel = () => {
    setFormFilters(advancedFilters);
    handleCancel();
  };

  return (
    <Modal onClose={handleFormCancel} size="md" isOpen={isOpen} > 
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Advanced Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StyledFormControl>
            <FormLabel>Worker ID</FormLabel>
            <Input id="workerNumber" placeholder="Worker ID" value={formFilters.workerNumber} onChange={handleInput} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel>Employment Type</FormLabel>
            <Input id="employmentType" placeholder="Salary" value={formFilters.employmentType} onChange={handleInput} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel>Title</FormLabel>
            <Input id="title" placeholder="Software Developer" value={formFilters.title} onChange={handleInput} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel>Email</FormLabel>
            <Input id="email" placeholder="worker@example.com" value={formFilters.email} onChange={handleInput} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input id="phone" placeholder="111-222-3344" value={formFilters.phone} onChange={handleInput} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel>Type</FormLabel>
            <Input id="type" placeholder="Employee" value={formFilters.type} onChange={handleInput} />
          </StyledFormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleFormCancel}>
            Close
          </Button>
          <Button colorScheme="green" onClick={() => handleApplyFilters(formFilters)}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdvancedSearchModal;
