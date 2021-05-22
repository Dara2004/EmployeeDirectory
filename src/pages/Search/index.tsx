import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import PageTemplate from "../../components/PageTemplate";
import SearchResultView from "../../components/SearchResultView";
import AdvancedSearchModal from "../../components/AdvancedSearchModal";
import styled from "@emotion/styled";
import {
  MainFilter,
  Filter,
  SelectedState,
  SearchQuery,
  WorkerDetail,
  WorkerDetailDisplays,
  COGS,
  skillCategories,
  combineAllFilters,
  FiltersObject,
  searchPageProps,
  SearchBy,
} from "../../services/search";
import {
  FiltersContext,
  FiltersContextValues,
} from "../../providers/FiltersProvider";
import {
  Text,
  Accordion,
  VStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import SearchFilterAccordian from "../../components/SearchFilterPanel/SearchFilterAccordian";
import { SearchInputAutoSuggestions } from "../../components/SearchFilterPanel/SearchInputAutosuggestions";
import type { SearchFilterNodeProps } from "../../components/SearchFilterPanel/SearchFilterNode";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const StylingSearchInput = styled.div`
  margin: 20px 0px 0px 35px;
`;

const LeftPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
`;

const RightPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TagsContainer = styled.div`
  margin: 10px;
`;

const StyledTag = styled(Tag)`
  margin: 5px;
`;

const StyledButton = styled(Button)`
  margin: 10px 0 0 10px;
`;

interface recurseFuntionProps {
  name: string;
  parents: string[];
  oldSelectedState?: SelectedState;
  filtersTree: Filter[];
}

interface searchFilterProps {
  filterType: string;
  name: string;
  parent: string;
  grandparent: string;
}

interface searchProps {
  filterTypeInt: number;
  filterTypeStr: string;
  nameCode: string;
  nameStr: string;
  parentCode: string;
  parentStr: string;
  grandparentCode: string;
  grandparentStr: string;
  leaf: boolean;
  level: number;
  parents: string[];
}

const setChildrenSelectedState = (
  children: Filter[],
  selectedState: boolean,
): Filter[] => {
  if (children) {
    return children.map((child) => ({
      ...child,
      selected: selectedState,
      children: setChildrenSelectedState(child.children, selectedState),
    }));
  }
  return [];
};

const LoadingSpinner = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
);

const recurseAndApplyFunction = (
  { name, parents, oldSelectedState, filtersTree }: recurseFuntionProps,
  callback: (args: recurseFuntionProps) => Filter[],
): Filter[] => {
  if (parents.length === 0) {
    return callback({ name, parents, filtersTree, oldSelectedState });
  } else {
    const [parent, ...otherParents] = parents;
    return filtersTree.map((filter) => {
      if (filter.name === parent) {
        return {
          ...filter,
          children: recurseAndApplyFunction(
            {
              name,
              parents: otherParents,
              filtersTree: filter.children as Filter[],
              oldSelectedState,
            },
            callback,
          ),
        };
      }
      return filter;
    });
  }
};

const handleFilterSelectedHelper = ({
  name,
  parents,
  oldSelectedState,
  filtersTree,
}: recurseFuntionProps): Filter[] => {
  const newSelectedState = oldSelectedState === SelectedState.None;
  return filtersTree.map((filter) => {
    if (filter.name === name) {
      return {
        ...filter,
        selected: newSelectedState,
        children: setChildrenSelectedState(filter.children, newSelectedState),
      };
    }
    return filter;
  });
};

const handleClickOpenHelper = ({
  name,
  filtersTree,
}: recurseFuntionProps): Filter[] => {
  return filtersTree.map((filter) => {
    if (filter.name === name) {
      return {
        ...filter,
        open: !filter.open,
      };
    }
    return filter;
  });
};

const transformingChildren = (name: string, filterList: Filter[]): any[] => {
  if (name === "offices") {
    return filterList.reduce((acc, curr) => {
      const groupCodes: any[] = transformingChildren(
        "groupCodes",
        curr.children,
      );
      const office = {
        officeCode: curr.code,
        groupCodes: groupCodes,
      };
      curr.selected || groupCodes.length > 0 ? acc.push(office) : acc;
      return acc;
    }, [] as any[]);
  } else if (name === "groupCodes") {
    return filterList.reduce((acc, curr) => {
      if (curr.selected) {
        acc.push(curr.code);
      }
      return acc;
    }, [] as any[]);
  } else if (name === "skills") {
    return filterList.reduce((acc, curr) => {
      const skillLevel: any = transformingChildren(
        "skillLevels",
        curr.children,
      );
      const skill = {
        skillId: curr.code,
        skillLevels: skillLevel,
      };
      curr.selected || skillLevel.length > 0 ? acc.push(skill) : acc;
      return acc;
    }, [] as any[]);
  } else if (name === "skillLevels") {
    return filterList.reduce((acc, curr) => {
      if (curr.selected) {
        acc.push(curr.code);
      }
      return acc;
    }, [] as any[]);
  }
  return [];
};

const transformToSearchQuery = (
  filterTree: MainFilter,
  workerDetail: WorkerDetail,
): SearchQuery => {
  const searchQuery: SearchQuery = {
    coGs: [],
    physicalLocationIds: [],
    skillCategories: [],
    workerIds: [],
    workerDetails: [workerDetail],
  };

  Object.entries(filterTree).map(([name, filter]) => {
    if (name === "Companies") {
      const companies: COGS[] = filter.reduce((acc, curr) => {
        const officesArray: any[] = transformingChildren(
          "offices",
          curr.children,
        );
        const companyQuery: COGS = {
          companyCode: curr.code,
          offices: officesArray,
        };
        curr.selected || officesArray.length > 0 ? acc.push(companyQuery) : acc;
        return acc;
      }, [] as COGS[]);
      searchQuery.coGs = companies;
    } else if (name === "Skills") {
      const skillCategories: any[] = filter.reduce((acc, curr) => {
        const skills: any[] = transformingChildren("skills", curr.children);
        const SC = {
          skillCategoryId: curr.code,
          skills: skills,
        };
        skills.length > 0 ? acc.push(SC) : acc;
        return acc;
      }, [] as skillCategories[]);
      searchQuery.skillCategories = skillCategories;
    } else if (name === "Physical Locations" || name === "Workers") {
      const PL: string[] = filter.reduce((acc, curr) => {
        if (curr.selected) {
          acc.push(curr.code);
        }
        return acc;
      }, [] as string[]);
      name === "Physical Locations"
        ? (searchQuery.physicalLocationIds = PL)
        : (searchQuery.workerIds = PL);
    }
    return;
  });
  return searchQuery;
};

const getNameFromCode = (props: searchPageProps, searchFilters: MainFilter) => {
  let newProps: searchProps = {
    filterTypeInt: -1,
    filterTypeStr: "",
    nameCode: props.name,
    nameStr: "",
    parentCode: props.parent,
    parentStr: "",
    grandparentCode: props.grandparent,
    grandparentStr: "",
    leaf: false,
    level: -1,
    parents: [],
  };

  let filterTypeUrl: string = props.filterType.toLowerCase();
  let filters: Filter[];

  if (filterTypeUrl === "companies") {
    newProps.filterTypeInt = 0;
    newProps.filterTypeStr = "Companies";
  } else if (filterTypeUrl === "skills") {
    newProps.filterTypeInt = 1;
    newProps.filterTypeStr = "Skills";
  } else if (filterTypeUrl === "physicallocations") {
    newProps.filterTypeInt = 2;
    newProps.filterTypeStr = "Physical Locations";
  } else {
    newProps.filterTypeInt = 3;
    newProps.filterTypeStr = "Workers";
  }

  filters = searchFilters[newProps.filterTypeStr];

  if (props.grandparent) {
    newProps.grandparentStr = filters.filter(
      (f) => f.code === props.grandparent,
    )[0].name;
    newProps.leaf = false;
    newProps.level = 2;
    newProps.parents.push(newProps.grandparentStr);
    filters = filters.filter((f) => f.code === props.grandparent)[0].children;
  }
  if (props.parent) {
    newProps.parentStr = filters.filter((f) => f.code === props.parent)[0].name;
    if (!props.grandparent) {
      newProps.leaf = false;
      newProps.level = 1;
    }
    newProps.parents.push(newProps.parentStr);
    filters = filters.filter((f) => f.code === props.parent)[0].children;
  }
  if (!props.parent) {
    newProps.leaf = true;
    newProps.level = 0;
  }
  newProps.nameStr = filters.filter((f) => f.code === props.name)[0].name;
  return newProps;
};

const SearchPage: React.FC<any> = (props: searchPageProps) => {
  const [searchFilters, setSearchFilters] = useState<MainFilter>({});
  const [advancedFilters, setAdvancedFilters] = useState<WorkerDetail>({
    workerNumber: props.workerNumber ? props.workerNumber : "",
    employmentType: props.employmentType ? props.employmentType : "",
    title: props.title ? props.title : "",
    email: props.email ? props.email : "",
    phone: props.phone ? props.phone : "",
    type: props.type ? props.type : "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accordianIndex, setAccordianIndex] = useState<number | number[]>(0);
  const [tags, setTags] = useState<SearchFilterNodeProps[]>([]);
  const [query, setQuery] = useState(
    transformToSearchQuery(searchFilters, advancedFilters),
  );
  const [clearFiltersState, setClearFiltersState] = useState({});
  const [propsEntered, setPropsEntered] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const { filters }: FiltersContextValues = useContext(FiltersContext);

  useEffect(() => {
    if (
      Object.keys(searchFilters).length !== 0 &&
      !propsEntered &&
      props.searchBy === SearchBy.Filter
    ) {
      console.log("hello!");
      console.log(searchFilters);
      console.log(props);
      const newProps: searchProps = getNameFromCode(props, searchFilters);
      const node: SearchFilterNodeProps = {
        code: newProps.nameCode,
        filter: newProps.filterTypeStr,
        leaf: newProps.leaf,
        level: newProps.level,
        name: newProps.nameStr,
        open: false,
        parents: newProps.parents,
        searchQuery: "",
        selected: SelectedState.None,
      };
      setAccordianIndex(newProps.filterTypeInt);
      handleAddTag(node);
      handleFilterSelected(
        newProps.nameStr,
        newProps.parents,
        newProps.filterTypeStr,
        SelectedState.None,
      );
      if (newProps.grandparentStr) {
        handleClickOpen(newProps.grandparentStr, [], newProps.filterTypeStr);
        handleClickOpen(
          newProps.parentStr,
          [newProps.grandparentStr],
          newProps.filterTypeStr,
        );
      } else if (newProps.parentStr) {
        handleClickOpen(newProps.parentStr, [], newProps.filterTypeStr);
      }
      setPropsEntered(true);
    }
  }, [searchFilters]);

  useEffect(() => {
    setSearchFilters(combineAllFilters(filters));
    setClearFiltersState(combineAllFilters(filters));
  }, [filters]);

  useEffect(() => {
    const transformedQuery = transformToSearchQuery(
      searchFilters,
      advancedFilters,
    );
    if (JSON.stringify(transformedQuery) !== JSON.stringify(query)) {
      setQuery(transformedQuery);
    }
  }, [searchFilters, advancedFilters]);

  // Helper function to handleFilterSelected - checks if current node is the last remaining child selected
  const checkifLastRemainingChild = (
    name: string,
    parents: string[],
    filterTree: Filter[],
  ): boolean => {
    if (parents.length === 0) {
      return filterTree.reduce((acc, curr) => {
        if (curr.selected && curr.name !== name) {
          return false;
        }
        return acc;
      }, true as boolean);
    } else {
      const [parent, ...otherparents] = parents;
      const node = filterTree.filter((t) => t.name === parent)[0];
      return checkifLastRemainingChild(name, otherparents, node.children);
    }
  };

  const handleRemoveParentTagsFilter = (
    tag: SearchFilterNodeProps,
    targetName: string,
    targetParents: string[],
  ): boolean => {
    if (tag.name !== targetName) {
      return true;
    } else {
      const everyParent =
        tag.parents.length > 0
          ? tag.parents.every(function (element, index) {
              return element !== targetParents[index];
            })
          : false;
      return everyParent;
    }
  };

  const handleRemoveParentTags = (parent: string, grandparents: string[]) => {
    setTags((tags) =>
      tags.filter((t) => handleRemoveParentTagsFilter(t, parent, grandparents)),
    );
  };

  const handleFilterSelected = (
    name: string,
    parents: string[],
    type: string,
    oldSelectedState: SelectedState,
  ) => {
    // Checks to see if user is unselecting the last remaining child of a parent. If so, unselect the parent instead.
    if (parents.length > 0 && oldSelectedState !== SelectedState.None) {
      const grandparents = parents.slice(0, -1);
      const currentNodeLastRemainingChild = checkifLastRemainingChild(
        name,
        parents,
        searchFilters[type],
      );
      if (currentNodeLastRemainingChild) {
        // removes the immediate parents tag
        handleRemoveParentTags(parents[parents.length - 1], grandparents);
        handleFilterSelected(
          parents[parents.length - 1],
          grandparents,
          type,
          SelectedState.Partial,
        );
        return;
      }
    }
    setSearchFilters((tree) => ({
      ...tree,
      [type]: recurseAndApplyFunction(
        { name, parents, oldSelectedState, filtersTree: tree[type] },
        handleFilterSelectedHelper,
      ),
    }));
  };

  const handleClickOpen = useCallback(
    (name: string, parents: string[], type: string) => {
      setSearchFilters((tree) => ({
        ...tree,
        [type]: recurseAndApplyFunction(
          { name, parents, filtersTree: tree[type] },
          handleClickOpenHelper,
        ),
      }));
    },
    [],
  );

  const handleDeleteTagSelfFilter = (
    tag: SearchFilterNodeProps,
    targetTag: SearchFilterNodeProps,
  ): boolean => {
    if (tag.code !== targetTag.code) {
      return true;
    } else if (tag.name !== targetTag.name) {
      return true;
    } else {
      const everyParent =
        tag.parents.length > 0
          ? tag.parents.every(function (element, index) {
              return element !== targetTag.parents[index];
            })
          : false;
      return everyParent;
    }
  };

  const handleDeleteTagChildrenFilter = (
    tag: SearchFilterNodeProps,
    targetTag: SearchFilterNodeProps,
  ): boolean => {
    if (targetTag.parents.length === 1) {
      return tag.parents.length === 2
        ? tag.parents[0] !== targetTag.parents[0] ||
            tag.parents[1] !== targetTag.name
        : true;
    } else {
      return tag.parents.length > 0 ? tag.parents[0] !== targetTag.name : true;
    }
  };

  const handleDeleteTag = (tag: SearchFilterNodeProps) => {
    setTags((tags) =>
      tags
        .slice()
        .filter((t) => handleDeleteTagSelfFilter(t, tag))
        .filter((t) => handleDeleteTagChildrenFilter(t, tag)),
    );
  };

  const handleAddTagFilter = (
    tag: SearchFilterNodeProps,
    targetTag: SearchFilterNodeProps,
  ): boolean => {
    const filterSelf =
      tag.code === targetTag.code &&
      tag.name === targetTag.name &&
      tag.parents.every(function (element, index) {
        return element === targetTag.parents[index];
      });
    if (filterSelf) {
      return true;
    }
    if (targetTag.parents.length > 0) {
      if (targetTag.parents.length === 2) {
        if (
          (tag.name === targetTag.parents[0] && tag.parents.length === 0) ||
          (tag.name === targetTag.parents[1] && tag.parents.length === 1)
        ) {
          return true;
        } else return false;
      } else {
        if (tag.name === targetTag.parents[0] && tag.parents.length === 0) {
          return true;
        }
        return false;
      }
    } else return false;
  };

  const handleAddTag = (tag: SearchFilterNodeProps) => {
    console.log(tag);
    const hasDuplicate =
      tags.filter((t) => handleAddTagFilter(t, tag)).length > 0;

    if (!hasDuplicate) {
      setTags((tags) => tags.concat(tag));
    }
  };

  const clearAllTagsAndFilters = () => {
    setSearchFilters(clearFiltersState);
    setTags([]);
    setAdvancedFilters({
      workerNumber: "",
      employmentType: "",
      title: "",
      email: "",
      phone: "",
      type: "",
    });
  };

  const handleFormCancel = () => {
    onClose();
  };

  const handleApplyFilters = (newFilters: WorkerDetail) => {
    setAdvancedFilters(newFilters);
    onClose();
  };

  return (
    <PageTemplate curPage="search">
      {Object.keys(searchFilters).length !== 0 ? (
        <BottomPage>
          <VStack
            boxShadow="base"
            width={{ base: "50px", md: "300px" }}
            minHeight="100vh"
            spacing={5}
            bgColor="white"
          >
            <VStack spacing={5} align="left" width="100%" paddingRight={4}>
              <LeftPanel>
                <Text m={4}>Filters</Text>
                <Accordion
                  allowMultiple={true}
                  allowToggle={true}
                  index={accordianIndex}
                  onChange={(e) => setAccordianIndex(e)}
                >
                  {Object.entries(searchFilters).map(([name, filter]) => {
                    return (
                      <SearchFilterAccordian
                        key={"filter-" + name}
                        filterName={name}
                        filterList={filter}
                        handleClickOpen={handleClickOpen}
                        handleFilterSelected={handleFilterSelected}
                        handleAddTag={handleAddTag}
                        handleDeleteTag={handleDeleteTag}
                      />
                    );
                  })}
                </Accordion>
              </LeftPanel>
            </VStack>
          </VStack>
          <RightPage>
            <StylingSearchInput>
              <SearchInputAutoSuggestions
                tags={tags}
                filterTree={searchFilters}
                handleAddTag={handleAddTag}
                handleFilterSelected={handleFilterSelected}
                handleClickOpen={handleClickOpen}
                setAccordianIndex={setAccordianIndex}
              />
              <StyledButton
                colorScheme="blue"
                size="sm"
                onClick={() => clearAllTagsAndFilters()}
              >
                Clear all Filters
              </StyledButton>
              <StyledButton colorScheme="green" size="sm" onClick={onOpen}>
                Advanced Search
              </StyledButton>
              <TagsContainer>
                {tags.map((tag, index) => {
                  const path = tag.parents.slice().reduce((acc, curr) => {
                    acc = acc.concat(curr + " > ");
                    return acc;
                  }, `${tag.filter} > `);
                  return (
                    <StyledTag
                      size={"lg"}
                      key={tag.name + path + index}
                      variant="outline"
                      colorScheme="blue"
                    >
                      <TagLabel>{path.concat(tag.name)}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          handleFilterSelected(
                            tag.name,
                            tag.parents,
                            tag.filter,
                            SelectedState.Complete,
                          );
                          handleDeleteTag(tag);
                        }}
                      />
                    </StyledTag>
                  );
                })}
                {Object.entries(advancedFilters)
                  .filter(([k, v]) => v.trim() !== "")
                  .map(([k, v]) => {
                    return (
                      <StyledTag
                        size={"lg"}
                        key={k}
                        variant="outline"
                        colorScheme="green"
                      >
                        <TagLabel>
                          {WorkerDetailDisplays[k] +
                            " contains " +
                            `"${v.trim()}"`}
                        </TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            setAdvancedFilters({
                              ...advancedFilters,
                              [k]: "",
                            });
                          }}
                        />
                      </StyledTag>
                    );
                  })}
              </TagsContainer>
            </StylingSearchInput>
            <SearchResultView query={query} />
          </RightPage>
        </BottomPage>
      ) : null}
      <AdvancedSearchModal
        handleCancel={handleFormCancel}
        handleApplyFilters={handleApplyFilters}
        isOpen={isOpen}
        advancedFilters={advancedFilters}
      />
    </PageTemplate>
  );
};

export default SearchPage;
