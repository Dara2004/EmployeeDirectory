import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import {
  Box,
  Avatar,
  Text,
  SimpleGrid,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  DrawerFooter,
  Input,
  Center,
  Textarea,
  Switch,
  Spinner,
  useToast,
  Select,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import type { EmployeeCardTemplateProps } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  FiltersContext,
  FiltersContextValues,
} from "../../../providers/FiltersProvider";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import DatePicker, { DateProps } from "../../DatePicker/date-picker";
import * as moment from 'moment'

const BasicInfoTitleBox = ({ title }: any) => (
  <Box>
    <Text color="#718096" fontWeight="500" fontSize="13px">
      {title}
    </Text>
  </Box>
);

const BasicEditBox = ({ name, value, setEmployee, type }: any) => (
  <Box>
    <Input
      name={name}
      onChange={setEmployee}
      variant={value ? "filled" : "outline"}
      defaultValue={value}
      size="xs"
      required
      type={type}
    />
  </Box>
);

const LoadingSpinner = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
);

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const EmployeeCardEditDrawer = (props: EmployeeCardTemplateProps) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [employeeData, setEmployeeData] = useReducer(formReducer, {});
  const [loading, setLoading] = useState(true);
  // const [office, setOffice] = useState([]);
  // const [group, setGroup] = useState([]);
  const [skills, setSkills] = useState([]);
  const copySkills = props.SCprops.skills.slice();
  const [skillList, setSkillList] = useState(copySkills);
  const [check, setCheck] = useState(props.SCprops.type === "contractor");
  // const [companyIndex, setcompanyIndex] = useState("-1");
  // const [officeIndex, setofficeIndex] = useState("-1");
  // const [secondTimeLoad, setSecondTimeLoad] = useState(false);
  const [skillAdded, setSkillAdded] = useState(false);
  const toast = useToast();

  const uploadRef = useRef(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(""); //used for photo preview
  const [imageFile, setImageFile] = useState(null); //used for photo preview//used for photo upload
  const [presignedURL, setPresignedURL] = useState("");
  const imageId = useRef(uuid());

  // DATEPICKER
  const [date, setDate] = useState(new Date(props.SCprops.hireDate));
  const dateprops: DateProps = {
    onChange: (date: Date) => setDate(date),
    selectedDate: date,
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedImageURL(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
    imageId.current = uuid();

    //get presign URL from the backend (used to upload photo to S3)
    axios({
      method: "GET",
      url: `/api/PhotoUpload/${imageId.current}`,
    })
      .then((res) => {
        setPresignedURL(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const S3Bucket = "https://ae-worker-photos.s3.amazonaws.com";

  const uploadPhotoToS3 = async (): Promise<string> => {
    if (imageFile == null) {
      return "placeholder";
    }
    //upload new worker image to S3
    if (imageFile !== null) {
      try {
        const res = await axios.put<string>(presignedURL, imageFile, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        return `${S3Bucket}/${imageId.current}`;
      } catch (err) {
        console.log(err);
        return "";
      }
    }
  };

  const obj = {
    companyIndex: "",
    officeIndex: "",
    skills: [],
    companyId: "",
    officeId: "",
    groupId: "",
    supervisorId: "",
    physicalLocationId: "",
  };

  const { filters }: FiltersContextValues = useContext(FiltersContext);

  useEffect(() => {
    if (filters.length !== 0) {
      setLoading(false);
    }
  }, [filters]);

  const updateDefaultInfo = () => {
    filters[0].filters.map((ea, i) => {
      if (props.SCprops.company === ea.name) {
        obj.companyIndex = i.toString();
        obj.companyId = ea.id.toString();
      }
    });

    filters[0].filters[obj.companyIndex].children.map((ea, i) => {
      if (props.SCprops.office === ea.name) {
        obj.officeIndex = i.toString();
        obj.officeId = ea.id.toString();
      }
    });

    filters[0].filters[obj.companyIndex].children[obj.officeIndex].children.map(
      (ea, i) => {
        if (props.SCprops.group === ea.name) {
          obj.groupId = ea.id;
        }
      },
    );

    filters[3].filters.map((ea, i) => {
      if (props.SCprops.supervisorWorker === ea.name) {
        obj.supervisorId = ea.id;
      }
    });
    // console.log(obj);
  };

  // useEffect(() => {
  //   // manually deep compare here before updating state
  //   if (obj.companyIndex === companyIndex) return;
  //   if (secondTimeLoad) return;
  //   setcompanyIndex(obj.companyIndex);
  //   setOffice(filters[0].filters[obj.companyIndex].children);
  // }, [obj]);

  // useEffect(() => {
  //   // manually deep compare here before updating state
  //   if (obj.officeIndex === officeIndex) return;
  //   if (secondTimeLoad) return;
  //   setofficeIndex(obj.officeIndex);
  //   setGroup(
  //     filters[0].filters[obj.companyIndex].children[obj.officeIndex].children,
  //   );
  //   setSecondTimeLoad(true);
  // }, [obj]);

  // useEffect(() => {
  //   // manually deep compare here before updating state
  //   if (obj.skills.length === office.length) return;
  //   if (secondTimeLoad) return;
  //   setSecondTimeLoad(true);
  //   // setofficeIndex(obj.officeIndex);
  //   // setGroup(filters[0].filters[obj.companyIndex].children[obj.officeIndex].children);
  // }, [obj]);

  // useEffect(() => {
  //   if (office.length != 0 && secondTimeLoad) {
  //     setGroup(office[0].children);
  //   }
  // }, [office]);

  // const handleCompanyChange = (event: React.FormEvent<HTMLSelectElement>) => {
  //   const companyIndex: string = event.currentTarget.value;
  //   setOffice(filters[0].filters[companyIndex].children);
  //   employeeData["office"] = "0";
  //   employeeData["group"] = "0";
  // };

  // const handleOfficeChange = (event: React.FormEvent<HTMLSelectElement>) => {
  //   const officeIndex: string = event.currentTarget.value;
  //   setGroup(office[officeIndex].children);
  //   employeeData["group"] = "0";
  // };

  const handleSkillCategoryChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ) => {
    const categoryId: string = event.currentTarget.value;
    setSkills(filters[1].filters[categoryId].children);
  };

  const handleSubmitSkill = (event) => {
    event.preventDefault();
    setSkillAdded(true);
    setSkillList((prevSkillList) => {
      return [
        ...prevSkillList,
        {
          skillIndex: formData.skill,
          skillCategoryIndex: formData.skillCategory,
          skillLevel: formData.skillLevel,
          skill: skills[formData.skill].name,
        },
      ];
    });
  };

  const handleSwitch = () => {
    setCheck(!check);
  };

  const handleSubmitEmployee = async (event) => {
    event.preventDefault();

    //upload photo to S3
    const photoURL = await uploadPhotoToS3();

    if (
      Object.keys(employeeData).length === 0 &&
      check === (props.SCprops.type === "contractor") &&
      !skillAdded &&
      (photoURL === "" || photoURL === "placeholder") &&
      +date === +new Date(props.SCprops.hireDate)
    ) {
      toast({
        title: "Error Updating Worker.",
        description:
          "Nothing was updated for the worker, please make changes and try again.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // console.log(employeeData);
    updateDefaultInfo();

    // if (employeeData["company"] === undefined)
    //   employeeData["company"] = obj.companyIndex;
    // if (employeeData["office"] === undefined)
    //   employeeData["office"] = obj.officeIndex;

    // console.log(moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z");

    const newEmployee = {
      lastName:
        employeeData["lastname"] !== undefined
          ? employeeData.lastname
          : props.SCprops.lastName,
      firstName:
        employeeData["firstname"] !== undefined
          ? employeeData.firstname
          : props.SCprops.firstName,
      employmentType:
        employeeData["employmentType"] !== undefined
          ? employeeData.employmentType
          : props.SCprops.employmentType,
      title:
        employeeData["title"] !== undefined
          ? employeeData.title
          : props.SCprops.title,
      hireDate: moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z",
      terminationDate: moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z",
      supervisorWorkerNumber:
        // employeeData["supervisor"] !== undefined
        //   ? filters[3].filters[employeeData.supervisor].id
        //   :
        obj.supervisorId,
      yearsPriorExperience:
        employeeData["yrsexp"] !== undefined
          ? parseInt(employeeData.yrsexp)
          : props.SCprops.yearsPriorExperience,
      email:
        employeeData["email"] !== undefined
          ? employeeData.email
          : props.SCprops.email,
      workPhone:
        employeeData["workphone"] !== undefined
          ? employeeData.workphone
          : props.SCprops.workPhone,
      workCell:
        employeeData["cellphone"] !== undefined
          ? employeeData.cellphone
          : props.SCprops.workCell,
      photoUrl:
        photoURL === "placeholder" || photoURL === ""
          ? props.SCprops.photoUrl
          : photoURL,
      companyCode:
        // employeeData["company"] !== undefined
        //   ? filters[0].filters[employeeData.company].id
        //   :
        obj.companyId,
      officeCode:
        // employeeData["office"] !== undefined
        //   ? filters[0].filters[employeeData.company].children[
        //       employeeData.office
        //     ].id
        //   :
        obj.officeId,
      groupCode:
        // employeeData["group"] !== undefined
        //   ? filters[0].filters[employeeData.company].children[
        //       employeeData.office
        //     ].children[employeeData.group].id
        //   :
        obj.groupId,
      skills: skillList.map((ea) => {
        if (ea.skillId != undefined) {
          return {
            skillCategoryId: ea.skillCategoryId,
            skillId: ea.skillId,
            skillLevel: ea.skillLevel,
          };
        } else {
          return {
            skillCategoryId: filters[1].filters[ea.skillCategoryIndex].id,
            skillId: skills[ea.skillIndex].id,
            skillLevel: ea.skillLevel,
          };
        }
      }),
      physicalLocationId:
        employeeData["physicallocation"] !== undefined
          ? filters[2].filters[employeeData.physicallocation].id
          : obj.physicalLocationId,
      type: check ? "contractor" : "employee",
    };

    console.log(newEmployee);
    console.log(props.id);

    // PERFORM POST REQUEST HERE
    axios({
      method: "PUT",
      url: String("/api/Workers/" + props.id),
      data: newEmployee,
      params: { id: props.id },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => {
        toast({
          title: "Error Updating Account.",
          description:
            "There is an error updating the employee, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        // if (axios.isCancel(e)) return;
      });
  };

  return (
    <>
      {/* <Center paddingTop={10}>{loading && <LoadingSpinner />}</Center> */}
      {!loading && (
        <Drawer
          isOpen={props.isOpen}
          placement="right"
          onClose={props.onClose}
          finalFocusRef={props.btnRef}
          size="sm"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <VStack spacing={2}>
                  <Box paddingTop={3}>
                    <Avatar
                      size="xl"
                      name={
                        props.SCprops.firstName + " " + props.SCprops.lastName
                      }
                      src={
                        uploadedImageURL === ""
                          ? props.SCprops.photoUrl
                          : uploadedImageURL
                      }
                    />
                  </Box>
                  <Button
                    colorScheme="gray"
                    leftIcon={<FontAwesomeIcon icon={faImage} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      uploadRef.current.click();
                    }}
                  >
                    Upload Image
                  </Button>

                  {/* the input which triggers file upload */}
                  <input
                    ref={uploadRef}
                    onChange={handlePhotoUpload}
                    type="file"
                    accept="image/*"
                    style={{ visibility: "hidden", height: "0" }}
                  />

                  <Box paddingTop={2} width="90%">
                    <form
                      id="edit-employee-form"
                      onSubmit={handleSubmitEmployee}
                    >
                      <SimpleGrid paddingTop={2} columns={2} spacingY={1}>
                        <BasicInfoTitleBox title="First Name" />
                        <BasicEditBox
                          name="firstname"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.firstName}
                        />
                        <BasicInfoTitleBox title="Last Name" />
                        <BasicEditBox
                          name="lastname"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.lastName}
                        />
                        <BasicInfoTitleBox title="Work Phone" />
                        <BasicEditBox
                          name="workphone"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.workPhone}
                        />
                        <BasicInfoTitleBox title="Cell Phone" />
                        <BasicEditBox
                          name="cellphone"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.workCell}
                        />
                        <BasicInfoTitleBox title="Email" />
                        <BasicEditBox
                          name="email"
                          setEmployee={setEmployeeData}
                          type="email"
                          value={props.SCprops.email}
                        />
                      </SimpleGrid>
                      <Box width="100%" paddingTop={5}>
                        <hr></hr>
                      </Box>
                      <Box paddingTop={5}>
                        <Center>
                          <Text
                            color="#000000"
                            fontWeight="600"
                            fontSize="15px"
                          >
                            Work Info:
                          </Text>
                        </Center>
                      </Box>
                      <SimpleGrid paddingTop={2} columns={2} spacingY={1}>
                        <BasicInfoTitleBox title="Job Title" />
                        <BasicEditBox
                          name="title"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.title}
                        />
                        <BasicInfoTitleBox title="Employment Type" />
                        <BasicEditBox
                          name="employmentType"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.employmentType}
                        />
                        <BasicInfoTitleBox title="Contractor?" />
                        <Switch
                          name="contractor?"
                          onChange={handleSwitch}
                          size="md"
                          defaultChecked={props.SCprops.type == "contractor"}
                        />
                        {/* <BasicInfoTitleBox title="Company" />
                        <Select
                          name="company"
                          isRequired
                          onChange={(e) => {
                            setEmployeeData(e);
                            handleCompanyChange(e);
                          }}
                          size="xs"
                          // defaultValue={props.SCprops.company}
                        >
                          {filters[0].filters.map((ea, i) => {
                            if (props.SCprops.company === ea.name) {
                              obj.companyIndex = i.toString();
                              obj.companyId = ea.id.toString();
                            }
                            return (
                              <option
                                selected={props.SCprops.company === ea.name}
                                key={ea.id}
                                value={i}
                              >
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select>
                        <BasicInfoTitleBox title="Office" />
                        <Select
                          name="office"
                          onChange={(e) => {
                            setEmployeeData(e);
                            handleOfficeChange(e);
                          }}
                          size="xs"
                          isRequired
                          // defaultValue={props.SCprops.office}
                        >
                          {office.length !== 0 &&
                            office.map((ea, i) => {
                              if (props.SCprops.office === ea.name) {
                                obj.officeIndex = i.toString();
                                obj.officeId = ea.id.toString();
                              }
                              return (
                                <option
                                  selected={props.SCprops.office === ea.name}
                                  key={ea.id}
                                  value={i}
                                >
                                  {ea.name}
                                </option>
                              );
                            })}
                        </Select>
                        <BasicInfoTitleBox title="Group" />
                        <Select
                          // value={props.SCprops.group}
                          onChange={setEmployeeData}
                          size="xs"
                          isRequired
                          name="group"
                        >
                          {group.length !== 0 &&
                            group.map((ea, i) => {
                              if (props.SCprops.group === ea.name) {
                                obj.groupId = ea.id;
                              }
                              return (
                                <option
                                  selected={props.SCprops.group === ea.name}
                                  key={ea.id}
                                  value={i}
                                >
                                  {ea.name}
                                </option>
                              );
                            })}
                        </Select> */}
                        <BasicInfoTitleBox title="Physical-Location" />
                        <Select
                          name="physicallocation"
                          isRequired
                          size="xs"
                          onChange={setEmployeeData}
                          // value={props.SCprops.physicalLocation}
                        >
                          {filters[2].filters.map((ea, i) => {
                            if (props.SCprops.physicalLocation === ea.name) {
                              obj.physicalLocationId = ea.id;
                            }
                            return (
                              <option
                                selected={
                                  props.SCprops.physicalLocation === ea.name
                                }
                                key={ea.id}
                                value={i}
                              >
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select>
                        {/* <BasicInfoTitleBox title="Supervisor" />
                        <Select
                          onChange={setEmployeeData}
                          placeholder="Supervisor"
                          size="xs"
                          isRequired
                          name="supervisor"
                          // value={props.SCprops.supervisorWorker}
                        >
                          {filters[3].filters.map((ea, i) => {
                            if (props.SCprops.supervisorWorker === ea.name) {
                              obj.supervisorId = ea.id;
                            }
                            return (
                              <option
                                selected={
                                  props.SCprops.supervisorWorker === ea.name
                                }
                                key={ea.id}
                                value={i}
                              >
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select> */}
                        <BasicInfoTitleBox title="Years of Prior Experience" />
                        <BasicEditBox
                          name="yrsexp"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.yearsPriorExperience}
                        />
                        <BasicInfoTitleBox title="Hired Date" />
                        {/* <BasicEditBox
                          name="hireddate"
                          setEmployee={setEmployeeData}
                          value={props.SCprops.hireDate.split("T")[0]}
                        /> */}
                        <DatePicker {...dateprops} />
                      </SimpleGrid>
                    </form>
                    <Box width="100%" paddingTop={5}>
                      <hr></hr>
                    </Box>
                    <Box paddingTop={5}>
                      <Center>
                        <Text color="#000000" fontWeight="600" fontSize="15px">
                          Skills
                        </Text>
                      </Center>
                    </Box>
                    <form id="skills-form" onSubmit={handleSubmitSkill}>
                      <SimpleGrid paddingTop={2} columns={2} spacingY={1}>
                        <BasicInfoTitleBox title="Skills" />
                        <Select
                          placeholder="Skill Category"
                          name="skillCategory"
                          onChange={(e) => {
                            setFormData(e);
                            handleSkillCategoryChange(e);
                          }}
                          size="xs"
                          isRequired
                        >
                          {filters[1].filters.map((ea, i) => {
                            return (
                              <option key={ea.id} value={i}>
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select>
                        <Box />
                        <Select
                          placeholder="Skill"
                          isRequired
                          name="skill"
                          onChange={setFormData}
                          size="xs"
                        >
                          {skills.length !== 0 &&
                            skills.map((ea, i) => {
                              return (
                                <option key={ea.id} value={i}>
                                  {ea.name}
                                </option>
                              );
                            })}
                        </Select>
                        <Box />
                        <Select
                          placeholder="Skill Level"
                          isRequired
                          name="skillLevel"
                          onChange={setFormData}
                          size="xs"
                        >
                          <option value="novice">Novice</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                        </Select>
                        <Box />
                        <Button
                          form="skills-form"
                          type="submit"
                          color="twitter"
                          size="xs"
                        >
                          Add Skill
                        </Button>
                      </SimpleGrid>
                      <Wrap paddingTop={3} spacing={4}>
                        {skillList.length !== 0 &&
                          skillList.map((ea, i) => {
                            return (
                              <Tag
                                size="sm"
                                key={i}
                                borderRadius="full"
                                variant="solid"
                                colorScheme={
                                  ea.skillLevel === "novice"
                                    ? "pink"
                                    : ea.skillLevel === "intermediate"
                                    ? "twitter"
                                    : "green"
                                }
                              >
                                <TagLabel>{ea.skill}</TagLabel>
                                <TagCloseButton
                                  value={i}
                                  onClick={(e) => {
                                    setSkillAdded(true);
                                    setSkillList((prev) => {
                                      const copy = prev;
                                      copy.splice(i, 1);
                                      return copy;
                                    });
                                  }}
                                />
                              </Tag>
                            );
                          })}
                      </Wrap>
                    </form>
                  </Box>
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button form="edit-employee-form" type="submit" color="twitter">
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default EmployeeCardEditDrawer;
