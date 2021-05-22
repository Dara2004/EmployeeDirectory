import React, { useState, useEffect, useRef } from "react";
import { Checkbox, Input, Button } from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuItem,
  MenuButton,
  FocusableItem,
  MenuDivider,
  MenuHeader,
  ControlledMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import styled from "@emotion/styled";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Container = styled.body`
  margin: 10px;

  li.menuItem-tier1-container {
    padding: 0;
  }
`;

const StyledMenu = styled(ControlledMenu)`
  padding-top: 0;
  font-size: 12px;
  max-height: 300px;
  min-width: 225px;
  overflow: auto;

  ul {
    max-height: 300px;
  }

  li:first-child {
    padding-bottom: 0;
  }

  .focusSelectOnlyCheckbox {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 15px;
  }

  li:nth-child(6) {
    text-transform: capitalize !important;
  }
`;

const StyledMenuButton = styled(MenuButton)<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? "cornflowerblue" : "white")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  border: ${(props) =>
    props.isActive ? "1px solid cornflowerblue" : "1px solid gray"};

  outline: none;
  display: flex;
  flex-direction: row;

  :hover {
    background: cornflowerblue;
    color: white;
    border: 1px solid cornflowerblue;
  }
`;

const MenuText = styled.div`
  margin: 4px 10px 0px 0px;
  font-size: 14px;
  font-weight: 700;
`;

const IconsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  padding: 20px;
`;

const StyledCheckbox = styled(Checkbox)`
  align-items: right;
  .chakra-checkbox__label {
    font-size: 12px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  font-weight: normal;
  justify-content: left;

  :focus {
    box-shadow: none;
  }
`;

const HiddenCheckIcon = styled(CheckIcon)`
  visibility: hidden;
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  position: absolute;
  right: 20px;
  bottom: 13px;
`;

export interface tier3InnerList {
  Skill: string;
  Level: string[];
}

export interface tier3List {
  SkillCategory: string;
  Skills: tier3InnerList[];
}

export interface SearchSubMenuFilterDropDownProps {
  dropdownName: string;
  dropdownInputPlaceholder: string;
  dropdownListAndSublist: [];
  dropdownListSelected: [];
  tier3DropdownList: [];
}

export const SearchSubMenuFilterDropDown = (
  props: SearchSubMenuFilterDropDownProps,
) => {
  let tier3InitialList: tier3List[] = [];
  let tier3DropdownList1 = ["Novice", "Intermediate", "Expert"];

  let demoSelected = [{ SkillCategory: "genshin", Skills: ["diluc"] }];
  let demoData = [
    { SkillCategory: "genshin", Skills: ["klee", "diluc", "razor"] },
    { SkillCategory: "sailormoon", Skills: ["jupitor", "venus", "mars"] },
    {
      SkillCategory: "dancing",
      Skills: ["hiphop", "jazz", "ballet", "karate"],
    },
    {
      SkillCategory: "language",
      Skills: ["english", "cantonese", "french", "spanish", "Mandarin"],
    },
    {
      SkillCategory: "computer science languages",
      Skills: ["javascript", "c#", "ruby", "C++"],
    },
    { SkillCategory: "Names", Skills: ["Jessica", "Jessika", "Jass"] },
  ];
  const [topLevelMenuIsOpen, setTopLevelMenuIsOpen] = useState(false);
  const [tier3Checkbox, setTier3Checkbox] = useState(tier3InitialList);
  const [showSelectedOnlyBox, setshowSelectedOnlyBox] = useState(false);
  const [menuName, setMenuName] = useState(props.dropdownName);
  const [input, setInput] = useState("");

  //Initial conversion of dropdownListAndSublist and dropdownListSelected into specific formatted list of Objects. Runs in useEffect once.
  const creatingTierCheckboxes = () => {
    for (let i = 0; i < demoData.length; i++) {
      let entry = demoSelected.find(
        (dd) => dd.SkillCategory === demoData[i].SkillCategory,
      );
      let tier3InnerList: tier3InnerList[] = [];
      for (let j = 0; j < demoData[i].Skills?.length; j++) {
        let skillEntry = entry?.Skills.find(
          (skill) => skill === demoData[i].Skills[j],
        );

        if (!!skillEntry) {
          tier3InnerList.push({
            Skill: demoData[i].Skills[j],
            Level: tier3DropdownList1,
          });
        } else {
          tier3InnerList.push({ Skill: demoData[i].Skills[j], Level: [] });
        }
      }
      tier3InitialList.push({
        SkillCategory: demoData[i].SkillCategory,
        Skills: tier3InnerList,
      });
    }
  };

  const allSelected = (): boolean => {
    for (const obj of tier3Checkbox) {
      for (const skill of obj.Skills) {
        if (skill.Level.length < 3) {
          return false;
        }
      }
    }
    return true;
  };

  // below method is called when selectAll Tier1 checkbox is clicked.
  // It returns a list that is changed to indicate if all is selected or unselected depending on previous state
  const selectedAllFunction = (newSelectAllList: tier3List[]) => {
    if (allSelected()) {
      newSelectAllList = tier3Checkbox.reduce((accSC, currSC) => {
        let skillslist = currSC.Skills.reduce((accS, currS) => {
          let levelList: string[] = [];
          let objSkill = {
            Skill: currS.Skill,
            Level: levelList,
          };
          return [...accS, objSkill];
        }, [] as tier3InnerList[]);
        let objSkillCategory = {
          SkillCategory: currSC.SkillCategory,
          Skills: skillslist,
        };
        return [...accSC, objSkillCategory];
      }, [] as tier3List[]);
    } else {
      newSelectAllList = tier3Checkbox.reduce((accSC, currSC) => {
        let skillslist = currSC.Skills.reduce((accS, currS) => {
          let levelList: string[] = tier3DropdownList1;
          let objSkill = {
            Skill: currS.Skill,
            Level: levelList,
          };
          return [...accS, objSkill];
        }, [] as tier3InnerList[]);
        let objSkillCategory = {
          SkillCategory: currSC.SkillCategory,
          Skills: skillslist,
        };
        return [...accSC, objSkillCategory];
      }, [] as tier3List[]);
    }
    return newSelectAllList;
  };

  useEffect(() => {
    creatingTierCheckboxes();
    console.log(tier3Checkbox);
  });

  return (
    <Container>
      <StyledMenuButton
        isActive={topLevelMenuIsOpen}
        onClick={() => setTopLevelMenuIsOpen(!topLevelMenuIsOpen)}
      >
        <MenuText>{menuName}</MenuText>
        <IconsDiv>
          <ChevronUpIcon />
          <ChevronDownIcon />
        </IconsDiv>
      </StyledMenuButton>
      <StyledMenu
        isOpen={topLevelMenuIsOpen}
        onClick={(e) => (e.keepOpen = true)}
      >
        <FocusableItem>
          {({ ref }) => (
            <StyledInput
              placeholder={props.dropdownInputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="Unstyled"
            />
          )}
        </FocusableItem>
        <MenuDivider />
        <FocusableItem className={"focusSelectOnlyCheckbox"}>
          {({ ref }) => (
            <StyledCheckbox
              isChecked={showSelectedOnlyBox}
              onChange={(e) => setshowSelectedOnlyBox(!showSelectedOnlyBox)}
            >
              Show selected only
            </StyledCheckbox>
          )}
        </FocusableItem>
        <MenuDivider />
        <MenuItem
          key={"allSelected"}
          type={"checkbox"}
          checked={allSelected() && tier3Checkbox.length > 0}
          onClick={() => {
            setTier3Checkbox(selectedAllFunction([]));
          }}
        >
          Select all ()
        </MenuItem>
        <MenuHeader>{menuName}()</MenuHeader>
        {demoData
          // filter for Input
          .filter(
            (skillc) =>
              skillc.SkillCategory.toUpperCase().includes(
                input.trim().toUpperCase(),
              ) ||
              skillc.Skills.filter((sk) =>
                sk.toUpperCase().includes(input.trim().toUpperCase()),
              ).length > 0,
          )
          // filter for SelectedOnly checkbox
          .filter((skillcatObj) =>
            showSelectedOnlyBox
              ? tier3Checkbox.filter(
                  (skillCategory) =>
                    skillCategory.SkillCategory === skillcatObj.SkillCategory &&
                    skillCategory.Skills.filter(
                      (skill) => skill.Level.length > 0,
                    ).length > 0,
                ).length > 0
              : true,
          )
          .map((sc, index) => {
            let anySkillChecked = () => {
              let SkillCategorySkillsList = tier3Checkbox.filter(
                (objsc) => objsc.SkillCategory === sc.SkillCategory,
              )[0].Skills;
              for (const Skill of SkillCategorySkillsList) {
                if (Skill.Level.length > 0) {
                  return true;
                }
              }
              return false;
            };
            return (
              <FocusableItem
                key={`menuItemTier1-${sc.SkillCategory}`}
                className={"menuItem-tier1-container"}
              >
                {({ ref }) => (
                  <Menu
                    className={"tier-1-menus"}
                    overflow="auto"
                    portal={true}
                    key={`Tier1Item-${index}`}
                    menuButton={(e) => {
                      let checkIconPresent = allSelected() || anySkillChecked();
                      return (
                        <StyledButton
                          key={`Tier1ButtonItem-${index}`}
                          leftIcon={
                            !!checkIconPresent ? (
                              <CheckIcon />
                            ) : (
                              <HiddenCheckIcon />
                            )
                          }
                          rightIcon={<StyledChevronRightIcon />}
                          variant="ghost"
                          isFullWidth={true}
                        >
                          {sc.SkillCategory}
                        </StyledButton>
                      );
                    }}
                    align="start"
                    direction="right"
                    arrow={true}
                    onClick={(e) => {
                      e.keepOpen = true;
                    }}
                  >
                    {sc.Skills
                      //filter for input
                      .filter((s) =>
                        s.toUpperCase().includes(input.trim().toUpperCase())
                          ? s.toUpperCase().includes(input.trim().toUpperCase())
                          : sc.SkillCategory.toUpperCase().includes(
                              input.trim().toUpperCase(),
                            ),
                      ) // filter for SelectedOnly checkbox
                      .filter((ss) =>
                        showSelectedOnlyBox
                          ? tier3Checkbox
                              .filter(
                                (skillCat) =>
                                  skillCat.SkillCategory == sc.SkillCategory,
                              )[0]
                              .Skills.filter(
                                (skil) =>
                                  skil.Skill === ss && skil.Level.length > 0,
                              ).length > 0
                          : true,
                      )
                      .map((skill, index) => {
                        let Tier3ClickedList: {
                          SkillCategory: string;
                          Skills: { Skill: string; Level: string[] }[];
                        }[] = [];
                        const checkedDataTier2 =
                          allSelected() ||
                          tier3Checkbox
                            .filter(
                              (objsc) =>
                                objsc.SkillCategory === sc.SkillCategory,
                            )[0]
                            .Skills.filter((objs) => objs.Skill === skill)[0]
                            .Level.length > 0;
                        const Tier3AllSelected =
                          tier3Checkbox.filter(
                            (objsc) => objsc.SkillCategory === sc.SkillCategory,
                          ).length > 0
                            ? tier3Checkbox
                                .filter(
                                  (objsc) =>
                                    objsc.SkillCategory === sc.SkillCategory,
                                )[0]
                                .Skills.filter(
                                  (objs) => objs.Skill === skill,
                                )[0].Level.length === 3
                            : false;
                        // below method is called when tier3 Submenu is clicked, similar to selectAllFunction.
                        // It returns a list that is changed to indicate if item is selected or unselected depending on previous state
                        // This function is also used for the Select all box in Tier3 which passes in an empty string into level.
                        const selectedDataTier3 = (
                          checked: boolean,
                          level: string,
                          newTier3List: tier3List[],
                        ) => {
                          if (checked) {
                            newTier3List = tier3Checkbox.reduce(
                              (accSC, currSC) => {
                                if (currSC.SkillCategory === sc.SkillCategory) {
                                  let skillslist = currSC.Skills.reduce(
                                    (accS, currS) => {
                                      if (currS.Skill === skill) {
                                        let levelList = !!level
                                          ? currS.Level.filter(
                                              (lvl) => lvl !== level,
                                            )
                                          : [];
                                        let objSkill = {
                                          Skill: currS.Skill,
                                          Level: levelList,
                                        };
                                        return [...accS, objSkill];
                                      } else return [...accS, currS];
                                    },
                                    [] as tier3InnerList[],
                                  );
                                  let objSkillCategory = {
                                    SkillCategory: currSC.SkillCategory,
                                    Skills: skillslist,
                                  };
                                  return [...accSC, objSkillCategory];
                                } else return [...accSC, currSC];
                              },
                              [] as tier3List[],
                            );
                          } else {
                            newTier3List = tier3Checkbox.reduce(
                              (accSC, currSC) => {
                                if (currSC.SkillCategory === sc.SkillCategory) {
                                  let skillslist = currSC.Skills.reduce(
                                    (accS, currS) => {
                                      if (currS.Skill === skill) {
                                        let levelList = !!level
                                          ? currS.Level.concat(level)
                                          : tier3DropdownList1;
                                        let objSkill = {
                                          Skill: currS.Skill,
                                          Level: levelList,
                                        };
                                        return [...accS, objSkill];
                                      } else return [...accS, currS];
                                    },
                                    [] as tier3InnerList[],
                                  );
                                  let objSkillCategory = {
                                    SkillCategory: currSC.SkillCategory,
                                    Skills: skillslist,
                                  };
                                  return [...accSC, objSkillCategory];
                                } else return [...accSC, currSC];
                              },
                              [] as tier3List[],
                            );
                          }
                          return newTier3List;
                        };
                        return (
                          <FocusableItem
                            key={`menuItemTier2-${sc.SkillCategory}-${skill}`}
                            className={"menuItem-tier1-container"}
                          >
                            {({ ref }) => (
                              <Menu
                                overflow="auto"
                                key={`Tier2Item-${index}`}
                                menuButton={() => {
                                  let checkIconPresent =
                                    allSelected() || !!checkedDataTier2;
                                  return (
                                    <StyledButton
                                      key={`Tier2ButtonItem-${index}`}
                                      leftIcon={
                                        !!checkIconPresent ? (
                                          <CheckIcon />
                                        ) : (
                                          <HiddenCheckIcon />
                                        )
                                      }
                                      rightIcon={<StyledChevronRightIcon />}
                                      variant="ghost"
                                      isFullWidth={true}
                                    >
                                      {skill}
                                    </StyledButton>
                                  );
                                }}
                                align="start"
                                direction="right"
                                arrow={true}
                                onClick={(e) => {
                                  e.keepOpen = true;
                                }}
                              >
                                <MenuItem
                                  key={`Tier3AllSelected-${skill}-${index}`}
                                  type={"checkbox"}
                                  checked={Tier3AllSelected}
                                  onClick={(e) => {
                                    e.keepOpen = true;
                                    setTier3Checkbox(
                                      selectedDataTier3(
                                        Tier3AllSelected,
                                        "",
                                        [],
                                      ),
                                    );
                                  }}
                                >
                                  Select all
                                </MenuItem>
                                {tier3DropdownList1.map((level, index) => {
                                  const checkedDataTier3 = tier3Checkbox
                                    .filter(
                                      (objsc) =>
                                        objsc.SkillCategory ===
                                        sc.SkillCategory,
                                    )[0]
                                    .Skills.filter(
                                      (objs) => objs.Skill === skill,
                                    )[0]
                                    .Level.find((lvl) => lvl === level);
                                  return (
                                    <MenuItem
                                      key={`Tier3Item-${skill}-${index}`}
                                      type={"checkbox"}
                                      checked={!!checkedDataTier3}
                                      onClick={(e) => {
                                        e.keepOpen = true;
                                        setTier3Checkbox(
                                          selectedDataTier3(
                                            !!checkedDataTier3,
                                            level,
                                            [],
                                          ),
                                        );
                                      }}
                                    >
                                      {level}
                                    </MenuItem>
                                  );
                                })}
                              </Menu>
                            )}
                          </FocusableItem>
                        );
                      })}
                  </Menu>
                )}
              </FocusableItem>
            );
          })}
      </StyledMenu>
    </Container>
  );
};
