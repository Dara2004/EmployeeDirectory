import axios, { Canceler } from "axios";

export interface Filter {
  filter: string;
  code: string;
  name: string;
  children: Filter[];
  open: boolean;
  selected: boolean;
}

export interface MainFilter {
  [name: string]: Filter[];
}

export interface FiltersObject {
  name: string;
  filters: FilterList[];
}

// format of filters retrieved from the backend
export interface FilterList {
  id: string;
  type: string;
  name: string;
  children: FilterList[];
}

export enum SelectedState {
  Complete = "Complete",
  Partial = "Partial",
  None = "None",
}

export interface COGS {
  companyCode: string;
  offices: { officeCode: string; groupCodes: string[] }[];
}

export interface skillCategories {
  skillCategoryId: string;
  skills: { skillId: string; skillLevels: string }[];
}

export interface SearchQuery {
  coGs: COGS[];
  physicalLocationIds: string[];
  skillCategories: skillCategories[];
  workerIds: string[];
  workerDetails: WorkerDetail[];
}

export interface WorkerDetail {
  workerNumber: string;
  employmentType: string;
  title: string;
  email: string;
  phone: string;
  type: string;
}

export enum WorkerDetailDisplays {
  workerNumber = "Worker ID",
  employmentType = "Employment Type",
  title = "Title",
  email = "Email",
  phone = "Phone Number",
  type = "Type",
}

export interface searchPageProps {
  searchBy: SearchBy;
  workerNumber?: string;
  employmentType?: string;
  title?: string;
  email?: string;
  phone?: string;
  type?: string;
  filterType?: string;
  name?: string;
  parent?: string;
  grandparent?: string;
  [key: string]: string;
}

export enum SearchBy {
  None = "none",
  Filter = "filter",
  StringMatch = "stringMatch"
}

export const getSearchFilters = async () => {
  await axios({
    method: "GET",
    url: "/api/Filters",
  })
    .then((res) => {
      console.log(<FiltersObject[]>res.data);
      console.log(combineAllFilters(res.data));
      return combineAllFilters(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

const createFilters = (filterList: FilterList[], filterName: string) => {
  if (filterName === "Skills" && filterList.length === 0) {
    return [
      {
        name: "Novice",
        children: [],
        open: false,
        selected: false,
        code: "Novice",
        ...(filterName && { filter: filterName }),
      },
      {
        name: "Intermediate",
        children: [],
        open: false,
        selected: false,
        code: "Intermediate",
        ...(filterName && { filter: filterName }),
      },
      {
        name: "Expert",
        children: [],
        open: false,
        selected: false,
        code: "Expert",
        ...(filterName && { filter: filterName }),
      },
    ];
  }

  if (filterList.length === 0) {
    return [];
  }

  const newFilters = filterList.reduce((acc, curr) => {
    const newFilter = {
      filter: filterName,
      code: curr.id,
      name: curr.name,
      children: createFilters(curr.children, filterName),
      open: false,
      selected: false,
    };
    acc.push(newFilter);
    return acc;
  }, [] as Filter[]);
  return newFilters;
};

// translates the filterobject to Filter[]
export const combineAllFilters = (filtersObj: FiltersObject[]): MainFilter => {
  const mainFilter = filtersObj.reduce<MainFilter>((acc, curr) => {
    acc[curr.name] = createFilters(curr.filters, curr.name);
    return acc;
  }, {});
  return mainFilter;
};
