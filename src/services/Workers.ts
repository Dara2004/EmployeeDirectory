import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

export const SEARCH_OFFSET = 16;

export interface IEmployee {
  company: string;
  email: any;
  employmentType: string;
  firstName: string;
  group: string;
  hireDate: string;
  lastName: string;
  office: string;
  photoUrl: string;
  physicalLocation: string;
  skills: [
    {
      skillCategory: string;
      skillCategoryId: string;
      skill: string;
      skillId: string;
      skillLevel: string;
    },
  ];
  supervisorWorker: string;
  terminationDate: string;
  title: string;
  type: string;
  workCell: string;
  workPhone: string;
  workerNumber: string;
  yearsPriorExperience: number;
  companyCode: string;
  officeCode: string;
  groupCode: string;
  physicalLocationId: string;
  supervisorWorkerNumber: string;
  numChildren: number;
}

export default function useEmployeeSearch(
  query: any,
  skipNumber: number,
  setResultCount: React.Dispatch<React.SetStateAction<number>>,
  sortBy: string,
  setSkipNumber: React.Dispatch<React.SetStateAction<number>>,
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [makeChanges, setMakeChanges] = useState(true);

  useEffect(() => {
    setEmployees([]);
    setSkipNumber(0);
    setMakeChanges(makeChanges ? false : true);
  }, [query, sortBy]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "POST",
      url: "/api/Workers/filter",
      params: { take: SEARCH_OFFSET, skip: skipNumber, sortBy: sortBy },
      data: query,
      // to prevent multiple query from happening at the same time could just cancel previous
      // query if a new one is performed
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log(res);
        setHasMore(
          employees.length + res.data.workers.length >= res.data.total
            ? false
            : true,
        );
        // console.log(employees.length + res.data.workers.length);
        // console.log(res.data.total);
        setEmployees((prevEmployees) => {
          return [...prevEmployees, ...res.data.workers];
        });
        setResultCount(res.data.total);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [skipNumber, makeChanges]);
  return { loading, error, employees, hasMore };
}
