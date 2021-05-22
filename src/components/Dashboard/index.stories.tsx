import React from "react";
import type { Story, Meta } from "@storybook/react";
import { Center, Text } from "@chakra-ui/react";
import Dashboard, { DashboardProps } from "./index";

export default {
  title: "Components/Dashboard",
  component: Dashboard,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<any> = (args) => <Dashboard {...args} />;

export const SampleEmployee = Template.bind({});
SampleEmployee.args = { id: "10003" };
