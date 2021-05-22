import React, { useState } from "react";
import type { Story, Meta } from "@storybook/react";
import {
  SearchFilterDropDown,
  SearchFilterDropDownProps,
} from "./SearchFilterDropDown";

export default {
  title: "Components/SearchFilterDropDown",
  component: SearchFilterDropDown,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<SearchFilterDropDownProps> = (args) => (
  <SearchFilterDropDown {...args} />
);

export const Default = Template.bind({});
Default.args = {};
