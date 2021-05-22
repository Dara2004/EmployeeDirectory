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
  background: ${(props) => (props.isActive ? "cornflowerblue" : "white")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  border: ${(props) =>
    props.isActive ? "1px solid cornflowerblue" : "1px solid gray"};

  outline: none;
  display: flex;
  flex-direction: row;

  :hover {
    background: cornflowerblue;
    color: white;
    border: 1px solid cornflowerblue;
  }
`;

const MenuText = styled.div`
  margin: 4px 10px 0px 0px;
  font-size: 14px;
  font-weight: 700;
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

export interface SearchFilterDropDownProps {
  dropdownName: string;
  dropdownInputPlaceholder: string;
  dropdownList: [];
  dropdownListSelected: [];
}

export const SearchFilterDropDown = (props: SearchFilterDropDownProps) => {
  let tier1CheckBoxMap: Map<string, boolean> = new Map();
  let demoSelected = ["Google", "Tesla"];
  let demoData = ["Tesla", "Microsoft", "Google", "SAP", "Sapling"];

  const [allSelected, setAllSelected] = useState(false);
  const [tier1checkbox, setTier1Checkbox] = useState(tier1CheckBoxMap);
  const [showSelectedOnlyBox, setshowSelectedOnlyBox] = useState(false);
  const [menuName, setMenuName] = useState(props.dropdownName);
  const [input, setInput] = useState("");

  const creatingTierCheckbox = () => {
    for (let i = 0; i < demoData.length; i++) {
      let entry = demoSelected.find((dd) => dd === demoData[i]);
      if (entry) {
        tier1CheckBoxMap.set(demoData[i], true);
      } else {
        tier1CheckBoxMap.set(demoData[i], false);
      }
    }
  };

  useEffect(() => {
    creatingTierCheckbox();
  }, []);

  return (
    <Container>
      <StyledMenu
        menuButton={({ open }) => (
          <StyledMenuButton isActive={open}>
            <MenuText>{menuName}</MenuText>
            <IconsDiv>
              <ChevronUpIcon />
              <ChevronDownIcon />
            </IconsDiv>
          </StyledMenuButton>
        )}
        onClick={(e) => (e.keepOpen = true)}
      >
        <FocusableItem>
          {({ ref }) => (
            <StyledInput
              placeholder={props.dropdownInputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="Unstyled"
            />
          )}
        </FocusableItem>
        <MenuDivider />
        <FocusableItem className={"focusSelectOnlyCheckbox"}>
          {({ ref }) => (
            <StyledCheckbox
              isChecked={showSelectedOnlyBox}
              onChange={(e) => {
                setshowSelectedOnlyBox(!showSelectedOnlyBox);
              }}
            >
              Show selected only
            </StyledCheckbox>
          )}
        </FocusableItem>
        <MenuDivider />
        <MenuItem
          key={"allSelected"}
          type={"checkbox"}
          checked={allSelected}
          onClick={() => {
            let newMap = new Map(tier1checkbox);
            setAllSelected(!allSelected);
            for (const entry of demoData) {
              newMap.set(entry, !allSelected);
            }
            setTier1Checkbox(newMap);
          }}
        >
          Select all ()
        </MenuItem>
        <MenuHeader>{menuName}()</MenuHeader>
        {demoData
          .filter((dd) => dd.toUpperCase().includes(input.trim().toUpperCase()))
          .filter((dd) => (showSelectedOnlyBox ? tier1checkbox.get(dd) : true))
          .map((data, index) => {
            let checkedData =
              allSelected ||
              (tier1checkbox.get(data) == undefined
                ? !!demoSelected.find((ds) => ds === data)
                : tier1checkbox.get(data));
            let newMap = new Map(tier1checkbox).set(data, !checkedData);
            return (
              <MenuItem
                key={`Tier1Item-${index}`}
                type={"checkbox"}
                checked={checkedData}
                onClick={() => {
                  setTier1Checkbox(newMap);
                }}
              >
                {data}
              </MenuItem>
            );
          })}
      </StyledMenu>
    </Container>
  );
};
