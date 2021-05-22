import React, { useState, useEffect } from "react";
import { Checkbox, Input, Button } from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuItem,
  MenuButton,
  FocusableItem,
  MenuDivider,
  MenuHeader,
  MenuRadioGroup,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import styled from "@emotion/styled";
import { FilterList } from "../../services/search";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Container = styled.div`
  margin: 10px;
`;
const StyledMenu = styled(Menu)`
  padding-top: 0;
  font-size: 12px;
  li:first-child {
    padding-bottom: 0;
  }
  .focusSelectOnlyCheckbox {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 15px;
  }
  li:nth-child(6) {
    text-transform: capitalize !important;
    font-size: 12px;
  }
  .menuItem-tier1-container {
    padding: 0;
  }
`;
const StyledMenuButton = styled(MenuButton)<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? "cornflowerblue" : "#E1E9F1")};
  color: ${(props) => (props.isActive ? "#E1E9F1" : "black")};
  border: ${(props) =>
    props.isActive ? "1px solid cornflowerblue" : "#E1E9F1"};
  outline: none;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  height: 40px;
  :hover {
    background: cornflowerblue;
    color: white;
    border: 1px solid cornflowerblue;
  }
`;
const MenuText = styled.div`
  margin: 10px 10px 10px 10px;
  font-size: 12px;
`;
const IconsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled(Input)`
  padding: 0;
`;
const StyledCheckbox = styled(Checkbox)`
  align-items: right;
  .chakra-checkbox__label {
    font-size: 12px;
  }
`;
const StyledButton = styled(Button)`
  font-size: 12px;
  font-weight: normal;
  justify-content: left;
  :focus {
    box-shadow: none;
  }
`;
const HiddenCheckIcon = styled(CheckIcon)`
  visibility: hidden;
`;
const StyledChevronRightIcon = styled(ChevronRightIcon)`
  position: absolute;
  right: 20px;
  bottom: 13px;
`;

interface WorkerList {
  id: string;
  name: string;
}

interface InputDropDownProps {
  filterName: string;
  filterList: WorkerList[];
  handleWorkerSelected: (workerId: string) => void;
}

const sortWorkerByName = (a: WorkerList, b: WorkerList) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
};

const InputDropDown = (props: InputDropDownProps) => {
  const [input, setInput] = useState("");

  const onChangeRadioGroup = (e) => {
    props.handleWorkerSelected(e.value.id);
  };

  return (
    <Container>
      <StyledMenu
        menuButton={({ open }) => (
          <StyledMenuButton isActive={open}>
            <MenuText>{props.filterName}</MenuText>
            <IconsDiv>
              <ChevronDownIcon viewBox="0 0 24 24" w={5} h={5} />
            </IconsDiv>
          </StyledMenuButton>
        )}
        onClick={(e) => (e.keepOpen = true)}
      >
        <FocusableItem>
          {({ ref }) => (
            <StyledInput
              placeholder={`Search ${props.filterName}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="Unstyled"
            />
          )}
        </FocusableItem>
        <MenuRadioGroup value={""} onChange={(e) => onChangeRadioGroup(e)}>
          {props.filterList
            .sort(sortWorkerByName)
            .filter((w) =>
              w.name.toUpperCase().includes(input.trim().toUpperCase()),
            )
            .map((data, index) => {
              return (
                <MenuItem key={index + data.name} value={data}>
                  {data.name}
                </MenuItem>
              );
            })}
        </MenuRadioGroup>
      </StyledMenu>
    </Container>
  );
};

export default InputDropDown;
