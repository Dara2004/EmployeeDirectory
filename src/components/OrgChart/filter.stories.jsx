import React from "react";
import Filter from "./filter";

export default {
  title: "Components/Filter",
  component: Filter,
  parameters: { layout: "fullscreen" },
};

const Template = (args) => <Filter {...args} />;

export const Default = Template.bind({});

Default.args = {};
