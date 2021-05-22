import React, { useState, useEffect, useContext } from "react";
import Autosuggest from "react-autosuggest";
import styled from "@emotion/styled";
import { Divider, Box } from "@chakra-ui/react";
import type { FilterList, FiltersObject } from "../../services/search";
import {
  FiltersContext,
  FiltersContextValues,
} from "../../providers/FiltersProvider";

const StyledContainer = styled(Box)`
  .react-autosuggest__container {
    position: relative;
  }
  .react-autosuggest__input {
    width: 100%;
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

const filterSuggestions = (
  input: string,
  filterList: FilterList[],
): FilterList[] => {
  if (input === "") {
    return filterList;
  } else
    return filterList.reduce((acc, curr) => {
      if (curr.name.trim().toLowerCase().includes(input)) {
        acc.push(curr);
      }
      return acc;
    }, [] as FilterList[]);
};

export interface WorkersInputAutosuggestionProps {
  handleWorkerSelected: (worker: string) => any;
}

export const WorkersInputAutosuggestion = (
  props: WorkersInputAutosuggestionProps,
) => {
  const [workers, setWorkers] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<FilterList[]>([]);

  const { filters }: FiltersContextValues = useContext(FiltersContext);

  useEffect(() => {
    setWorkers(filters[3].filters);
    setSuggestions(filters[3].filters);
  }, [filters]);

  const getSuggestions = (value: string): FilterList[] => {
    const inputValue = value.trim().toLowerCase();
    return filterSuggestions(inputValue, workers);
  };

  const getSuggestionValue = (suggestion: FilterList) => {
    return suggestion.name;
  };

  const renderSuggestion = (suggestion: FilterList) => {
    const parents = "Workers:";
    return (
      <AutoSuggestionDiv>
        <AutoSuggestionPath>{parents}</AutoSuggestionPath>
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

  const onSuggestionSelected = (event: any, { suggestion, method }: any) => {
    history.pushState(
      "data to be passed",
      "Title of the page",
      "/orgchart/" + suggestion.id,
    );
    props.handleWorkerSelected(suggestion.id);
  };

  const inputProps = {
    placeholder: "Search Workers",
    value: input,
    onChange: onChange,
  };

  return (
    <StyledContainer data-test="search_box">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
    </StyledContainer>
  );
};

export default WorkersInputAutosuggestion;
