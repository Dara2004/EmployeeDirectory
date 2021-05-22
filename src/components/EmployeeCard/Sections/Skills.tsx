import React from "react";
import {
  Box,
  Text,
  useBreakpointValue,
  SimpleGrid,
  Button,
  Badge,
  Stack,
} from "@chakra-ui/react";
import {
  EmployeeCardTemplateProps,
  BasicInfoTitleBox,
  BasicInfoBox,
} from "../index";

enum SkillLevel {
  Novice,
  Intermediate,
  Expert,
}

interface skillCategoriesObject {
  [key: string]: {name: string, skills: any[]} 
}

export type Skill = {
  skillName: string;
  skillLevel: SkillLevel;
};

export type SkillsClass = {
  category: string;
  skills: Skill[];
};

// template for skills section
export const SkillsSection = (props: EmployeeCardTemplateProps) => {
  const obj: skillCategoriesObject = {};
  for (let ea of props.SCprops.skills) {
    if (obj[ea.skillCategoryId] === undefined) {
      obj[ea.skillCategoryId] = {name: ea.skillCategory, skills: []};
    }
    obj[ea.skillCategoryId].skills.push(ea);
  }
  // const showText = useBreakpointValue({ base: false, md: true });
  const listSkill = [];
  for (const [key, value] of Object.entries(obj)) {
    listSkill.push(
      <Box paddingBottom={1} key={key}>
        <BasicInfoTitleBox title={value.name} link={`/search/skills/${key}`} />
        <Stack marginTop={1} direction="row" spacing={2}>
          {(value.skills as any).map(
            (
              eachSkill: {
                skillLevel: string;
                skill:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                skillCategoryId: string;
                skillId: string;
              },
              index,
            ) => (
              <Button
                colorScheme={
                  eachSkill.skillLevel === "novice"
                    ? "pink"
                    : eachSkill.skillLevel === "intermediate"
                    ? "twitter"
                    : "green"
                }
                variant="solid"
                size="xs"
                marginRight={2}
                key={index}
                as="a"
                href={`/search/skills/${eachSkill.skillId}/${eachSkill.skillCategoryId}`}
              >
                {eachSkill.skill}
              </Button>
            ),
          )}
        </Stack>
      </Box>,
    );
  }
  return (
    <SimpleGrid marginLeft={1} columns={1} spacing={5}>
      <Box height="100hv" paddingTop={5} paddingRight={3} marginBottom={2}>
        <Box paddingLeft={20} paddingTop={1}>
          <Text color="#153E75" fontWeight="700" fontSize="s">
            Skills
          </Text>
        </Box>
        <Box paddingLeft={20} paddingTop={1}>
          <Badge marginRight={2} borderRadius="full" px="1" colorScheme="pink">
            Novice
          </Badge>
          <Badge
            marginRight={2}
            borderRadius="full"
            px="1"
            colorScheme="twitter"
          >
            Intermediate
          </Badge>
          <Badge marginRight={2} borderRadius="full" px="1" colorScheme="green">
            Expert
          </Badge>
        </Box>
        <Box paddingTop={2} paddingLeft={20}>
          {listSkill}
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default SkillsSection;
