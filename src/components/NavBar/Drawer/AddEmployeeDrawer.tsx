import React, {
  ChangeEvent,
  useRef,
  useReducer,
  useEffect,
  useState,
  useContext,
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
  Select,
  Switch,
  Spinner,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import type { NavBarProps } from "../index";
import axios from "axios";
import { v4 as uuid } from "uuid";
import FormData from "form-data";
import {
  FiltersContext,
  FiltersContextValues,
} from "../../../providers/FiltersProvider";
import DatePicker, { DateProps } from "../../DatePicker/date-picker";
import * as moment from "moment";

const BasicInfoTitleBox = ({ title }: any) => (
  <Box>
    <Text color="#718096" fontWeight="500" fontSize="13px">
      {title}
    </Text>
  </Box>
);

const S3Bucket = "https://ae-worker-photos.s3.amazonaws.com";

const BasicEditBox = ({ name, data, setEmployee, type }: any) => (
  <Box>
    <Input
      name={name}
      onChange={setEmployee}
      variant={data ? "filled" : "outline"}
      value={data}
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

const AddEmployeeDrawer = (props: NavBarProps) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [employeeData, setEmployeeData] = useReducer(formReducer, {});
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({});
  const [office, setOffice] = useState([]);
  const [group, setGroup] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [check, setCheck] = useState(false);
  const [employeeAdded, setEmployeeAdded] = useState(-1);
  const [supervisor, setSupervisor] = useState([]);

  const uploadRef = useRef(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(""); //used for photo preview
  const [imageFile, setImageFile] = useState(null); //used for photo preview//used for photo upload
  const [presignedURL, setPresignedURL] = useState("");
  const toast = useToast();
  const imageId = useRef(uuid());

  // DATEPICKER
  const [date, setDate] = useState(new Date());
  const dateprops: DateProps = {
    onChange: (date: Date) => setDate(date),
    selectedDate: date,
  };

  const { filters }: FiltersContextValues = useContext(FiltersContext);

  useEffect(() => {
    if (filters.length !== 0) {
      setLoading(false);
    }
    console.log(filters);
  }, [filters]);

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

  useEffect(() => {
    if (office.length != 0) {
      setGroup(office[0].children);
    }
  }, [office]);

  const handleCompanyChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const companyId: string = event.currentTarget.value;
    setOffice(filters[0].filters[companyId].children);
    // get the workers in the company to be used as supervisor
    // console.log(filters[0].filters[companyId].id);
    axios({
      method: "POST",
      url: "/api/Workers/filter",
      params: { take: 1000, sortBy: "name" },
      data: {
        coGs: [
          {
            companyCode: filters[0].filters[companyId].id,
            offices: [],
          },
        ],
        physicalLocationIds: [],
        skillCategories: [],
        workerIds: [],
        workerDetails: [],
      },
    })
      .then((res) => {
        setSupervisor(res.data.workers);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Error querying for supervisor list.",
          description: "An error has occured, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleOfficeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const officeId: string = event.currentTarget.value;
    setGroup(office[officeId].children);
  };

  const handleSkillCategoryChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ) => {
    const categoryId: string = event.currentTarget.value;
    setSkills(filters[1].filters[categoryId].children);
  };

  const handleSubmitSkill = (event) => {
    event.preventDefault();
    setSkillList((prevSkillList) => {
      return [
        ...prevSkillList,
        {
          SkillIndex: formData.Skill,
          SkillCategoryIndex: formData.SkillCategory,
          SkillLevel: formData.SkillLevel,
          SkillName: skills[formData.Skill].name,
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

    const newEmployee = {
      lastName: employeeData.lastname,
      firstName: employeeData.firstname,
      employmentType: employeeData.employmentType,
      title: employeeData.title,
      hireDate: moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z",
      terminationDate: moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z",
      supervisorWorkerNumber: employeeData.supervisor,
      yearsPriorExperience: parseInt(employeeData.yrsexp),
      email: employeeData.email,
      workPhone: employeeData.workphone,
      workCell: employeeData.cellphone,
      photoUrl: photoURL,
      companyCode: filters[0].filters[employeeData.company].id,
      officeCode: office[employeeData.office].id,
      groupCode: group[employeeData.group].id,
      skills: skillList.map((ea) => {
        return {
          skillCategoryId: filters[1].filters[ea.SkillCategoryIndex].id,
          skillId: skills[ea.SkillIndex].id,
          skillLevel: ea.SkillLevel,
        };
      }),
      physicalLocationId: filters[2].filters[employeeData.physicallocation].id,
      type: check ? "contractor" : "employee",
    };

    console.log("newEmployee: ", newEmployee);
    // PERFORM POST REQUEST HERE
    axios({
      method: "POST",
      url: "/api/Workers",
      data: newEmployee,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        window.location.href = `/worker/${res.data}`;
      })
      .catch((e) => {
        toast({
          title: "Error Creating Account.",
          description:
            "There is an error creating new employee, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        // if (axios.isCancel(e)) return;
      });
  };

  return (
    <>
      {/* <Center paddingTop={loading ? 10 : 0}>
        {loading && <LoadingSpinner />}
      </Center> */}
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
                    <Avatar size="xl" src={uploadedImageURL} />
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
                    <form id="employee-form" onSubmit={handleSubmitEmployee}>
                      <SimpleGrid paddingTop={2} columns={2} spacingY={1}>
                        <BasicInfoTitleBox title="First Name" />
                        <BasicEditBox
                          name="firstname"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Last Name" />
                        <BasicEditBox
                          name="lastname"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Work Phone" />
                        <BasicEditBox
                          name="workphone"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Cell Phone" />
                        <BasicEditBox
                          name="cellphone"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Email" />
                        <BasicEditBox
                          name="email"
                          setEmployee={setEmployeeData}
                          type="email"
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
                        />
                        <BasicInfoTitleBox title="Employment Type" />
                        <BasicEditBox
                          name="employmentType"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Contractor?" />
                        <Switch
                          name="contractor?"
                          onChange={handleSwitch}
                          size="md"
                          value="1"
                        />
                        <BasicInfoTitleBox title="Company" />
                        <Select
                          name="company"
                          placeholder="Company"
                          isRequired
                          onChange={(e) => {
                            setEmployeeData(e);
                            handleCompanyChange(e);
                          }}
                          size="xs"
                        >
                          {filters[0].filters.map((ea, i) => {
                            return (
                              <option key={ea.id} value={i}>
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select>
                        <BasicInfoTitleBox title="Office" />
                        <Select
                          name="office"
                          placeholder="Office"
                          onChange={(e) => {
                            setEmployeeData(e);
                            handleOfficeChange(e);
                          }}
                          size="xs"
                          isRequired
                        >
                          {office.length !== 0 &&
                            office.map((ea, i) => {
                              return (
                                <option key={ea.id} value={i}>
                                  {ea.name}
                                </option>
                              );
                            })}
                        </Select>
                        <BasicInfoTitleBox title="Group" />
                        <Select
                          name="group"
                          onChange={setEmployeeData}
                          placeholder="Group"
                          size="xs"
                          isRequired
                        >
                          {group.length !== 0 &&
                            group.map((ea, i) => {
                              return (
                                <option key={ea.id} value={i}>
                                  {ea.name}
                                </option>
                              );
                            })}
                        </Select>
                        <BasicInfoTitleBox title="Physical-Location" />
                        <Select
                          name="physicallocation"
                          placeholder="Physical-Location"
                          isRequired
                          size="xs"
                          onChange={setEmployeeData}
                        >
                          {filters[2].filters.map((ea, i) => {
                            return (
                              <option key={ea.id} value={i}>
                                {ea.name}
                              </option>
                            );
                          })}
                        </Select>
                        <BasicInfoTitleBox title="Supervisor" />
                        <Select
                          name="supervisor"
                          onChange={setEmployeeData}
                          placeholder="Supervisor"
                          size="xs"
                          isRequired
                        >
                          {supervisor.length !== 0 &&
                            supervisor.map((ea, i) => {
                              return (
                                <option value={ea.workerNumber} key={i}>
                                  {ea.firstName + " " + ea.lastName}
                                </option>
                              );
                            })}
                        </Select>
                        <BasicInfoTitleBox title="Years of Prior Experience" />
                        <BasicEditBox
                          name="yrsexp"
                          setEmployee={setEmployeeData}
                        />
                        <BasicInfoTitleBox title="Hired Date" />
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
                          name="SkillCategory"
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
                          name="Skill"
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
                          name="SkillLevel"
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
                                  ea.SkillLevel === "novice"
                                    ? "pink"
                                    : ea.SkillLevel === "intermediate"
                                    ? "twitter"
                                    : "green"
                                }
                              >
                                <TagLabel>{ea.SkillName}</TagLabel>
                                <TagCloseButton
                                  value={i}
                                  onClick={(e) => {
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
                <Button form="employee-form" type="submit" color="twitter">
                  Add Employee
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default AddEmployeeDrawer;
