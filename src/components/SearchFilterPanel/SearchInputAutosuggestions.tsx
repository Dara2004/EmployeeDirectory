import React, { useState, useCallback, useMemo } from "react";
import Autosuggest from "react-autosuggest";
import type { MainFilter, Filter } from "../../services/search";
import { SelectedState } from "../../services/search";
import type { SearchFilterNodeProps } from "../../components/SearchFilterPanel/SearchFilterNode";
import styled from "@emotion/styled";
import { Divider, Box } from "@chakra-ui/react";

const StyledContainer = styled(Box)`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    width: 50%;
    height: 30px;
    padding: 25px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-radius: 1.5rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
      rgb(0 0 0 / 6%) 0px 2px 4px -1px;
  }

  .react-autosuggest__input:focus {
    outline: none;
  }

  .react-autosuggest__container--open .react-autosuggest__input {
  }

  react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__container--open
    .react-autosuggest__suggestions-container {
    display: block;
    position: absolute;
    width: 50%;
    height: 300px;
    overflow: auto;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    z-index: 2;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
      rgb(0 0 0 / 6%) 0px 2px 4px -1px;
  }

  .react-autosuggest__suggestion:hover {
    background-color: lightgray;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: lightgray;
  }
`;

const AutoSuggestionDiv = styled.div``;

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

export interface SearchInputAutosuggestionsProps {
  filterTree: MainFilter;
  tags: SearchFilterNodeProps[];
  handleAddTag: (tag: any) => any;
  handleFilterSelected: (
    name: string,
    parents: string[],
    type: string,
    oldSelectedState: SelectedState,
  ) => void;
  handleClickOpen: (name: string, parents: string[], type: string) => void;
  setAccordianIndex: (index: number) => any;
}

//modified for autosuggestions
const flattenFilters = (
  filters: Filter[] | null,
  searchQuery = "",
  level = 0,
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
      if (name === "Physical Locations") {
        acc = [...tree, ...acc];
      } else {
        acc = [...acc, ...tree];
      }
      return acc;
    },
    [] as Filter[],
  );
  return combineFilters;
};

export const SearchInputAutoSuggestions = (
  props: SearchInputAutosuggestionsProps,
) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(
    flattenFilters(autosuggestionCombineAllFilters(props.filterTree), ""),
  );

  const openAccordion = (filterName: string) => {
    switch (filterName.toLowerCase()) {
      case "companies":
        return props.setAccordianIndex(0);
      case "skills":
        return props.setAccordianIndex(1);
      case "physical location":
        return props.setAccordianIndex(2);
      case "workers":
        return props.setAccordianIndex(3);
    }
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? flattenFilters(autosuggestionCombineAllFilters(props.filterTree), "")
      : flattenFilters(
          autosuggestionCombineAllFilters(props.filterTree),
          inputValue,
        ).filter((suggestion, index) => index < 10);
  };

  const getSuggestionValue = (suggestion: SearchFilterNodeProps) => {
    return suggestion.name;
  };

  const renderSuggestion = (suggestion: SearchFilterNodeProps) => {
    const parents = suggestion.parents.reduce((acc, curr) => {
      acc = acc.concat(curr + " > ");
      return acc;
    }, `${suggestion.filter} > `);

    return (
      <AutoSuggestionDiv>
        <AutoSuggestionPath>
          {parents.trim().slice(0, -1).trim().concat(":")}
        </AutoSuggestionPath>
        <AutoSuggestion>{suggestion.name}</AutoSuggestion>
        <Divider />
      </AutoSuggestionDiv>
    );
  };

  const onSuggestionsFetchRequested = (input: any) => {
    setSuggestions(getSuggestions(input.value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(getSuggestions(""));
  };

  const onChange = (event: any, { newValue, method }: any) => {
    return setInput(newValue);
  };

  const inputProps = {
    placeholder: "Search",
    value: input,
    onChange: onChange,
  };

  const onSuggestionSelected = (event: any, { suggestion, method }: any) => {
    const alreadySelected =
      props.tags.slice().filter(
        (t) =>
          t.code === suggestion.code &&
          t.parents.every(function (element, index) {
            return element === suggestion.parents[index];
          }),
      ).length !== 0;

    if (!alreadySelected) {
      openAccordion(suggestion.filter);
      props.handleClickOpen(
        suggestion.name,
        suggestion.parents,
        suggestion.filter,
      );
      props.handleFilterSelected(
        suggestion.name,
        suggestion.parents,
        suggestion.filter,
        suggestion.selected,
      );
      props.handleAddTag(suggestion);
    }
  };

  return (
    <StyledContainer data-test="search_box">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </StyledContainer>
  );
};
