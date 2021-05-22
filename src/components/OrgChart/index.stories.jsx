import React from "react";
import OrgChart from "./index";

export default {
  title: "Components/OrgChart",
  component: OrgChart,
  parameters: { layout: "fullscreen" },
};

const Template = (args) => <OrgChart {...args} />;

export const Default = Template.bind({});
Default.args = {};
