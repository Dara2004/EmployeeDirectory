import React from "react";
import OrganChart from "../../components/OrgChart";
import { useParams } from "react-router-dom";

const WorkerChart = () => {
  const param: any = useParams();
  /*const org = new OrganChart();
    org.handleWorkerSelected(id);
    return org.render();*/
  return <OrganChart id={param.id} />;
};

export default WorkerChart;
