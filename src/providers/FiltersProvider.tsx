import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiltersObject, Filter } from "../services/search";

export interface FiltersContextValues {
  filters: FiltersObject[];
  updateFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextValues>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFilters: () => {},
});

const sortFilters = (filtersObjectList: FiltersObject[]): FiltersObject[] => {
  const sortFunc = (filterA: Filter, filterB: Filter): number => {
    return filterA.name.toLowerCase().localeCompare(filterB.name.toLowerCase());
  };

  const recurFunc = ({ children, ...others }) => {
    let newChildren = children;
    if (children) {
      newChildren.sort(sortFunc);
      newChildren = newChildren.map(recurFunc);
    }
    return {
      children: newChildren,
      ...others,
    };
  };

  return filtersObjectList.map(({ name, filters }) => ({
    name,
    filters: recurFunc({ children: filters }).children,
  }));
};

interface FilterProvierProps {
  children?: React.ReactNode;
}

export const FiltersProvider: React.FC = ({ children }: FilterProvierProps) => {
  const [searchFilters, setSearchFilters] = useState([]);

  const updateFilters = () => {
    axios({
      method: "GET",
      url: "/api/Filters",
    }).then((res) => {
      setSearchFilters(sortFilters(res.data));
    });
  };

  useEffect(() => {
    if (searchFilters.length === 0) {
      updateFilters();
    }
  }, []);

  return (
    <FiltersContext.Provider value={{ filters: searchFilters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
