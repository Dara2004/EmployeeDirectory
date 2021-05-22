import React from "react";
import PageTemplate from "../../components/PageTemplate";
import EmployeeCard from "../../components/EmployeeCard";
import { useParams } from "react-router-dom";

const Employee = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PageTemplate curPage={"search"}>
      <EmployeeCard id={id} />
    </PageTemplate>
  );
};

export default Employee;
