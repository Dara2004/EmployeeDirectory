import React, { useState } from "react";
import type { Story, Meta } from "@storybook/react";
import {
  SearchSubMenuFilterDropDown,
  SearchSubMenuFilterDropDownProps,
} from "./SearchSubMenuFilterDropDown";

export default {
  title: "Components/SearchSubMenuFilterDropDown",
  component: SearchSubMenuFilterDropDown,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<SearchSubMenuFilterDropDownProps> = (args) => (
  <SearchSubMenuFilterDropDown {...args} />
);

export const Default = Template.bind({});
Default.args = {};
