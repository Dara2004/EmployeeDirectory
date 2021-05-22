import React from "react";
import type { Story, Meta } from "@storybook/react";
import type { SearchCardProps } from "../SearchCard";
import SearchCard from "./";

export default {
  title: "Components/SearchCard",
  component: SearchCard,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<SearchCardProps> = (args) => <SearchCard {...args} />;

export const SampleEmployee = Template.bind({});
SampleEmployee.args = {
  e: {
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
        skillCategory: "Some Category",
        skill: "hm",
        skillLevel: "1",
      },
    ],
    terminationDate: "2010",
    type: "contractor",
    workerNumber: "1234",
  },
};
