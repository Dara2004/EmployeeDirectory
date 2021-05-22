import React from "react";
import Search from "../Search";
import { useParams } from "react-router-dom";
import {
  searchPageProps,
  SearchBy,
} from "../../services/search";

const SearchWithProps = (props) => {
  const params: any = useParams();
  let searchProps: searchPageProps = { searchBy: SearchBy.None };
  if (params.filterType) {
    searchProps = { ...params, searchBy: SearchBy.Filter };
    return <Search {...searchProps} />;
  } else if (props.location.search === "") {
    return <Search searchBy="none"/>
  } else {
    searchProps.searchBy = SearchBy.StringMatch;
    let paramArray: string[] = props.location.search.replace("?", "").split("&");
    for (const param of paramArray) {
      const paramSplitArr = param.split("=");
      searchProps[paramSplitArr[0]] = paramSplitArr[1].replace("%20", " ");
    }
    return <Search {...searchProps} />
  }
};

export default SearchWithProps;
