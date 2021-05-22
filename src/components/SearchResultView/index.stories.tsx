import React from "react";
import type { Story, Meta } from "@storybook/react";
import SearchResultView, { SearchResultViewProps } from "./index";
import type { IEmployee } from "../../services/Workers";

export default {
  title: "Components/SearchResultView",
  component: SearchResultView,
} as Meta;

const Template: Story<SearchResultViewProps> = (args) => (
  <SearchResultView {...args} />
);

let props: IEmployee = {
  photoUrl: "https://tinyurl.com/v49cqgel",
  firstName: "John",
  lastName: "Snow",
  title: "Software Engineer",
  workPhone: "604-123-4567",
  workCell: "778-123-4321",
  email: "john@acme.ca",
  hireDate: "2019-2-10",
  employmentType: "Full-time",
  company: "Acme Seeds Inc.",
  office: "Vancouver",
  group: "GRP-CGY Water",
  physicalLocation: "Vancouver",
  supervisorWorker: "Supervisor A",
  yearsPriorExperience: 11,
  skills: [
    {
      skillCategory: "Some Category:",
      skill: "hm",
      skillLevel: "1",
    },
  ],
  terminationDate: "2010",
  type: "contractor",
  workerNumber: "1234",
};

let props2: IEmployee = {
  photoUrl: "https://tinyurl.com/175md5z4",
  firstName: "Cersei",
  lastName: "Lannister",
  title: "Software Engineer",
  workPhone: "604-123-4567",
  workCell: "778-123-4321",
  email: "john@acme.ca",
  hireDate: "2019-2-10",
  employmentType: "Full-time",
  company: "Acme Seeds Inc.",
  office: "Vancouver",
  group: "GRP-CGY Water",
  physicalLocation: "Vancouver",
  supervisorWorker: "Supervisor A",
  yearsPriorExperience: 11,
  skills: [
    {
      skillCategory: "Some Category:",
      skill: "hm",
      skillLevel: "1",
    },
  ],
  terminationDate: "2010",
  type: "contractor",
  workerNumber: "1234",
};

let props3: IEmployee = {
  photoUrl: "https://tinyurl.com/1pepj2b5",
  firstName: "Tyrion",
  lastName: "Lannister",
  title: "Software Engineer",
  workPhone: "604-123-4567",
  workCell: "778-123-4321",
  email: "john@acme.ca",
  hireDate: "2019-2-10",
  employmentType: "Full-time",
  company: "Acme Seeds Inc.",
  office: "Vancouver",
  group: "GRP-CGY Water",
  physicalLocation: "Vancouver",
  supervisorWorker: "Supervisor A",
  yearsPriorExperience: 11,
  skills: [
    {
      skillCategory: "Some Category:",
      skill: "hm",
      skillLevel: "1",
    },
  ],
  terminationDate: "2010",
  type: "contractor",
  workerNumber: "1234",
};

let DemoListOfEmployees: IEmployee[] = [
  props,
  props2,
  props2,
  props3,
  props,
  props3,
  props2,
  props3,
];

export const Default = Template.bind({});
Default.args = { employees: DemoListOfEmployees };
