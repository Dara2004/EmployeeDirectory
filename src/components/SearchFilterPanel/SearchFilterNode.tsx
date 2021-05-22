import React from "react";
import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import reactStringReplace from "react-string-replace";

const StyledCheckbox = styled(Checkbox)`
  align-items: right;
  .chakra-checkbox__label {
    font-size: 12px;
  }
`;

export enum SelectedState {
  Complete = "Complete",
  Partial = "Partial",
  None = "None",
}

export interface SearchFilterNodeProps {
  onFilterSelected?: (
    name: string,
    parents: string[],
    type: string,
    oldSelectedState: SelectedState,
  ) => void;
  onClickOpen?: (name: string, parents: string[], type: string) => void;
  filter: string;
  name: string;
  parents: string[];
  level: number;
  leaf: boolean;
  open: boolean;
  selected: SelectedState;
  searchQuery: string;
  code: string;
  handleDeleteTag?: () => any;
  handleAddTag?: () => any;
}

const SearchFilterNode = ({
  level,
  selected,
  name,
  leaf,
  open,
  searchQuery,
  parents,
  onFilterSelected,
  onClickOpen,
  filter,
  handleDeleteTag,
  handleAddTag,
}: SearchFilterNodeProps) => {
  const IconRotation = open ? ChevronDownIcon : ChevronRightIcon;

  const filterName = searchQuery
    ? reactStringReplace(
        name,
        new RegExp(`(${searchQuery})`, "i"),
        (match, _) => <b>{match}</b>,
      )
    : name;
  return (
    <HStack pl={level === 2 ? 50 : level * 3} mt={1} spacing={1}>
      {leaf ? (
        <Box width="16px" height="16px" />
      ) : (
        <IconRotation
          data-test={`search_accordion_open_${filterName}`}
          as="button"
          role="button"
          onClick={
            onClickOpen ? () => onClickOpen(name, parents, filter) : undefined
          }
        />
      )}
      <StyledCheckbox
        data-test={"search_accordion_checkbox"}
        isChecked={selected === SelectedState.Complete}
        isIndeterminate={selected === SelectedState.Partial}
        onChange={
          onFilterSelected && handleDeleteTag && handleAddTag
            ? () => {
                onFilterSelected(name, parents, filter, selected);
                if (selected === SelectedState.None) {
                  handleAddTag();
                } else {
                  handleDeleteTag();
                }
              }
            : undefined
        }
      >
        <Box
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          width="210px"
        >
          {filterName}
        </Box>
      </StyledCheckbox>
    </HStack>
  );
};

export default SearchFilterNode;
