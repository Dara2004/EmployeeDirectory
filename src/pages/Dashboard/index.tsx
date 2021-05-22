import React from "react";
import PageTemplate from "../../components/PageTemplate";
import Dashboard from "../../components/Dashboard";

const Dash = () => {
  return (
    <PageTemplate curPage={"dashboard"}>
      <Dashboard />
    </PageTemplate>
  );
};

export default Dash;
