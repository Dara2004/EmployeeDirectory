import React from "react";
import type { Story, Meta } from "@storybook/react";
import { Center, Text } from "@chakra-ui/react";
import EmployeeCardTemplate from "./index";

export default {
  title: "Components/EmployeeCardTemplate",
  component: EmployeeCardTemplate,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<any> = (args) => <EmployeeCardTemplate {...args} />;

export const SampleEmployee = Template.bind({});
SampleEmployee.args = { id: "10003" };
