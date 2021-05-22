import React, { useState, useCallback, useMemo } from "react";
import {
  Accordion,
  Button,
  VStack,
  Input,
  Box,
  Container,
  Divider,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import SearchFilterAccordian from "./SearchFilterAccordian";
import type { MainFilter, Filter } from "../../services/search";
import { SelectedState } from "../../services/search";
import type { SearchFilterNodeProps } from "../../components/SearchFilterPanel/SearchFilterNode";

const Title = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const StyledVStack = styled(VStack)`
  overflow: auto;
  min-height: 100%;
`;

const StyledInputBox = styled(Box)`
  position: absolute;
  overflow: scroll;
  margin: 0 !important;
  outline: 1px gray solid;
  z-index: 10;
  display: none;

  :focus {
    display: block;
  }

  :active {
    display: block;
  }
`;

const StyledInput = styled(Input)`
  padding: 20px;
  width: 90%;
  margin: 25px 0 5px 0;
  :focus + div {
    display: block;
  }

  :active + div {
    display: block;
  }
`;

const StyledBox = styled(Box)`
  width: 100%;
  padding: 20px;
  margin-top: 0 !important;
`;

const ContainerForInput = styled.div`
  position: relative;
  margin: 0;
`;
const AutoSuggestionDiv = styled.div`
  &:hover {
    background-color: lightgray;
  }
`;
const AutoSuggestion = styled.div`
  padding: 0 20px;
`;

const AutoSuggestionPath = styled.div`
  font-size: 10px;
  color: gray;
  font-weight: bold;
  padding: 0 10px;
  text-transform: capitalize;
`;

export interface SearchFilterPanelProps {
  filterTree: MainFilter;
  handleFilterSelected: (
    name: string,
    parents: string[],
    type: string,
    oldSelectedState: SelectedState,
  ) => void;
  handleClickOpen: (name: string, parents: string[], type: string) => void;
}

//modified for autosuggestions
const flattenFilters = (
  filters: Filter[] | null,
  searchQuery: string = "",
  level: number = 0,
  parents: string[] = [],
): SearchFilterNodeProps[] => {
  if (filters === null) {
    return [];
  }
  const newFilters: SearchFilterNodeProps[] = filters.reduce(
    (acc: SearchFilterNodeProps[], filter: Filter): SearchFilterNodeProps[] => {
      const newFilter = {
        filter: filter.filter,
        name: filter.name,
        code: filter.code,
        parents,
        level,
        leaf: filter.children === null,
        open: Boolean(filter.open || searchQuery),
        selected: SelectedState.None,
        searchQuery,
      };

      const searchMatched = Boolean(
        searchQuery &&
          filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      const filteredChildren = flattenFilters(
        filter.children,
        searchQuery,
        level + 1,
        [...parents, filter.name],
      );
      let selectedState = filter.selected
        ? SelectedState.Complete
        : SelectedState.None;

      selectedState =
        filteredChildren.length === 0
          ? selectedState
          : (filteredChildren.reduce((acc, child): SelectedState => {
              if (child.selected === SelectedState.Partial) {
                return SelectedState.Partial;
              } else if (
                child.selected === SelectedState.Complete &&
                (!acc || acc === SelectedState.Complete)
              ) {
                return SelectedState.Complete;
              } else if (child.selected === SelectedState.None) {
                if (!acc || acc === SelectedState.None) {
                  return SelectedState.None;
                } else {
                  return SelectedState.Partial;
                }
              }
              return SelectedState.Partial;
            }, null as SelectedState | null) as SelectedState);
      if (searchMatched || searchQuery === "") {
        newFilter.selected = selectedState;
        acc.push(newFilter);
      }
      if (searchQuery) {
        acc.push(...filteredChildren);
      }
      return acc;
    },
    [] as SearchFilterNodeProps[],
  );
  return newFilters;
};

const autosuggestionCombineAllFilters = (filterTree: MainFilter) => {
  const combineFilters = Object.entries(filterTree).reduce(
    (acc, [name, tree]) => {
      acc = acc.concat(tree);
      return acc;
    },
    [] as Filter[],
  );
  return combineFilters;
};

export const SearchFilterPanel = (props: SearchFilterPanelProps) => {
  const [input, setInput] = useState("");
  const [accordianIndex, setAccordianIndex] = useState<number | number[]>(0);

  return (
    <StyledVStack
      boxShadow="base"
      width={{ base: "50px", md: "100%" }}
      height="100%"
      spacing={5}
      backgroundColor="white"
    >
      <Title>Search</Title>
      <ContainerForInput>
        <StyledInput
          placeholder={`Search ...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outline"
        />
        <StyledInputBox bg="white" w="90%" h="300px" color="black">
          {flattenFilters(
            autosuggestionCombineAllFilters(props.filterTree),
            input,
          ).map((filter) => {
            const parents = filter.parents.reduce((acc, curr) => {
              acc = acc.concat(curr + " > ");
              return acc;
            }, `${filter.filter} > `);
            return (
              <AutoSuggestionDiv
                onClick={() => {
                  props.handleClickOpen(
                    filter.name,
                    filter.parents,
                    filter.filter,
                  );
                  props.handleFilterSelected(
                    filter.name,
                    filter.parents,
                    filter.filter,
                    filter.selected,
                  );
                }}
              >
                <AutoSuggestionPath>
                  {parents.trim().slice(0, -1).trim().concat(":")}
                </AutoSuggestionPath>
                <AutoSuggestion>{filter.name}</AutoSuggestion>
                <Divider />
              </AutoSuggestionDiv>
            );
          })}
        </StyledInputBox>
      </ContainerForInput>
      <StyledBox flex="1" textAlign="left">
        <Accordion
          allowToggle
          allowMultiple
          index={accordianIndex}
          onChange={setAccordianIndex}
        >
          {Object.entries(props.filterTree).map(([name, filter]) => {
            return (
              <SearchFilterAccordian
                filterName={name}
                filterList={filter}
                handleClickOpen={props.handleClickOpen}
                handleFilterSelected={props.handleFilterSelected}
              />
            );
          })}
        </Accordion>
      </StyledBox>
    </StyledVStack>
  );
};

export default SearchFilterPanel;
