import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, MenuRadioGroup } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { Box, Input } from "@chakra-ui/react";
import PageTemplate from "../PageTemplate";

export default function Filter() {
  const [company, setCompany] = useState("Select Company");

  return (
    <Menu menuButton={<MenuButton>{company}</MenuButton>}>
      <MenuRadioGroup
        value={company}
        onChange={(e) => {
          setCompany(e.value);
          e.keepOpen = true;
        }}
      >
        <MenuItem value="Group">Group</MenuItem>

        <MenuItem value="BC">BC</MenuItem>
        <MenuItem value="Alberta">Alberta</MenuItem>
        <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
        <MenuItem value="Ontario">Ontario</MenuItem>
        <MenuItem value="Environmental">Environmental</MenuItem>
      </MenuRadioGroup>
    </Menu>
  );
}
