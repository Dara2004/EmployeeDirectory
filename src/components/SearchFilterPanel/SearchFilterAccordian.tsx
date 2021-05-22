import React, { useState, useCallback, useMemo } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerCloseButton,
  Input,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import SearchFilterNode, {
  SearchFilterNodeProps,
  SelectedState,
} from "./SearchFilterNode";
import { AutoSizer, List } from "react-virtualized";
import type { Filter, MainFilter } from "../../services/search";

const StyledInput = styled(Input)`
  padding: 20px;
  width: 90%;
  margin-bottom: 25px;
`;

const StyledAccordionButton = styled(AccordionButton)`
  width: 300px;
`;

export interface SearchFilterAccordionProps {
  key?: string;
  filterName: string;
  filterList: Filter[];
  handleFilterSelected?: (
    name: string,
    parents: string[],
    type: string,
    oldSelectedState: SelectedState,
  ) => void;
  handleClickOpen: (name: string, parents: string[], type: string) => void;
  handleDeleteTag?: (tag: SearchFilterNodeProps) => void;
  handleAddTag?: (tag: SearchFilterNodeProps) => void;
}

const flattenFilters = (
  filters: Filter[] | null,
  searchQuery = "",
  level = 0,
  parents: string[] = [],
  overrideOpen = false,
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
        leaf: filter.children.length === 0,
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
        searchMatched || overrideOpen,
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
      if (
        searchMatched ||
        searchQuery === "" ||
        overrideOpen ||
        filteredChildren.length
      ) {
        newFilter.selected = selectedState;
        acc.push(newFilter);
        if (filter.open || searchQuery) {
          acc.push(...filteredChildren);
        }
      }
      return acc;
    },
    [] as SearchFilterNodeProps[],
  );
  return newFilters;
};

export const SearchFilterAccordion = ({
  filterList,
  filterName,
  handleClickOpen,
  handleFilterSelected,
  handleDeleteTag,
  handleAddTag,
}: SearchFilterAccordionProps) => {
  const [input, setInput] = useState("");
  const flattenedFilters = useMemo(() => flattenFilters(filterList, input), [
    filterList,
    input,
  ]);

  const rowRenderer = useCallback(
    ({ key, index, style }) => {
      const filter = flattenedFilters[index];
      const handlingAddTag = () => {
        handleAddTag(filter);
      };
      const handlingDeleteTag = () => {
        handleDeleteTag(filter);
      };
      const filterId =
        filter.parents.reduce((acc, parent) => `${acc} > ${parent}`, "") +
        `> ${filter.name}`;
      return (
        <Box key={key} style={style}>
          <SearchFilterNode
            key={filterId}
            filter={filter.filter}
            name={filter.name}
            open={filter.open}
            level={filter.level}
            parents={filter.parents}
            leaf={filter.leaf}
            selected={filter.selected}
            onFilterSelected={handleFilterSelected}
            onClickOpen={handleClickOpen}
            searchQuery={input}
            code={filter.code}
            handleDeleteTag={handlingDeleteTag}
            handleAddTag={handlingAddTag}
          />
        </Box>
      );
    },
    [flattenedFilters],
  );
  return (
    <AccordionItem>
      <h2>
        <StyledAccordionButton data-test={"search_accordion_filters"}>
          <Box flex="1" textAlign="left">
            {filterName}
          </Box>
          <AccordionIcon />
        </StyledAccordionButton>
      </h2>
      <AccordionPanel pb={350}>
        <StyledInput
          placeholder={`Search ${filterName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outline"
        />
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={300}
              width={265}
              rowRenderer={rowRenderer}
              rowHeight={20}
              rowCount={flattenedFilters.length}
            />
          )}
        </AutoSizer>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SearchFilterAccordion;
