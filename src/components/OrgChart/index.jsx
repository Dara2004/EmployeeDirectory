import React from "react";
import d3 from "d3";
import OrgChart from "@xinyu910/react-org-chart";
import { tree } from "./Tree";
import PageTemplate from "../../components/PageTemplate";
import styled from "@emotion/styled";
import { Box, Button, HStack, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { Menu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import InputDropDown from "../../components/OrgChart/WorkersDropDown";

const StyledButton = styled(Button)`
  font-size: 12px;
  font-weight: normal;
  justify-content: left;
  background: #e1e9f1;

  :focus {
    box-shadow: none;
  }
`;
const IconsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPageBox = styled(Box)`
  #react-org-chart {
    cursor: move;
    height: calc(100vh - 60px);
    background-color: #f6f6fa;
  }

  .org-chart-entity-name {
    font-weight: 500;
  }
  .org-chart-entity-title {
    font-weight: 600;
  }
  .org-chart-entity-link:hover g {
    fill: #409cf9 !important;
  }
  .org-chart-node .org-chart-counts {
    fill: #409cf9 !important;
  }

  .org-chart-zoom-buttons {
    position: absolute;
    top: 0;
    left: 0;
  }

  .org-chart-download-buttons {
    position: absolute;
    top: 0;
    right: 0;
  }

  .org-chart-zoom-button {
    width: 100px;
    height: 40px;
    display: block !important;
    margin: 8px;
  }

  .btn {
    font-size: 0.875rem;
    text-transform: none;
    text-decoration-line: none;
    display: inline-block;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5rem;
    border-radius: 0.125rem;
    cursor: pointer;
    margin: 6px;
  }

  .btn-outline-primary {
    color: #374ea2;
    border-color: #374ea2;
  }

  .btn-outline-primary:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #374ea2;
    border-color: #374ea2;
  }

  .github-link {
    font-size: 16px;
    margin-left: 8px;
    margin-right: 16px;
  }
  .org-chart-entity-title {
    color: #a0aec0;
  }

  .box {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .rc-menu--open.rc-menu--dir-bottom {
    max-height: 450px;
    overflow: scroll;
  }
  .rc-menu-button .css-bokek7 {
    transform: translate(-5px, 10px);
  }
`;

const flattenWorkerTree = (workerTree) => {
  if (workerTree.length == 0) {
    return "";
  }
  const newWorkerTree = workerTree.reduce((acc, curr) => {
    const Worker = {
      id: curr.id,
      name: curr.entity.name,
    };
    if (curr.hasChild) {
      const flattenChildren = flattenWorkerTree(curr.children);
      acc = acc.concat(flattenChildren);
    }
    acc.push(Worker);
    return acc;
  }, []);
  return newWorkerTree;
};

export default class OrganChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: tree,
      searchedTree: tree,
      isLoading: true,
      downloadingChart: false,
      config: {},
      company: "Select Company",
      filters: [],
      companyObject: {},
      // eslint-disable-next-line react/prop-types
      workerSelected: props.id === "orgchart" ? "" : props.id,
      workerId: "",
      noWorkers: false,
      workerList: [],
      originalWorkList: [],
      selectedWorkerName: "Select Worker",
    };
  }

  componentDidMount() {
    axios.get("/api/Filters").then((res) => {
      let companies = res.data[0];
      let listobject = {};
      let list = [];
      let companyIdList = [];
      for (var i = 0; i < companies.filters.length; i++) {
        let id = companies.filters[i].id;
        let name = companies.filters[i].name;
        listobject[name] = id;
        list.push(name);
        companyIdList.push(id);
      }
      this.setState({
        filters: list,
        companyObject: listobject,
      });
    });
    axios.get("/api/OrgChart/singlefilteredtree/all").then((response) => {
      this.setState(
        {
          tree: response.data,
          noWorkers: false,
          searchedTree: response.data,
          isLoading: false,
          workerList: flattenWorkerTree([response.data]),
        },
        () => {
          this.setState({ originalWorkList: this.state.workerList });
          if (this.state.workerSelected !== undefined) {
            if (this.state.workerSelected != response.data.entity.id) {
              this.handleWorkerSelected(this.state.workerSelected);
            }
          }
        },
      );
    });
  }
  handleSearch = (e) => {
    e.children = e._children;
    d3.select("rect").attr("stroke", "blue");
    this.setState({ searchedTree: { ...e }, workerId: e.id, isLoading: false });
  };
  searchWorker = (e, id) => {
    if (e.id === id) {
      this.handleSearch(e);
    } else if (e.hasChild) {
      var i;
      var result = null;
      let children = e.children;
      if (children == undefined || children == null) {
        children = e._children;
      }
      for (i = 0; result == null && i < children.length; i++) {
        result = this.searchWorker(children[i], id);
      }
    }
  };
  getParent = (d) => {
    if (d.parent != undefined) {
      return d.parent;
    } else {
      return this.findParent(this.state.tree, this.state.tree, d);
    }
  };
  findParent = (p, c, d) => {
    if (c.id == d.id) {
      return p;
    } else if (c.hasChild) {
      var i;
      var result = null;
      if (c.children == undefined || c.children == null) {
        c.children = c._children;
      }
      for (i = 0; result == null && i < c.children.length; i++) {
        result = this.findParent(c, c.children[i], d);
      }
      return result;
    }
  };

  handleDownload = () => {
    this.setState({ downloadingChart: false });
  };

  handleOnChangeConfig = (config) => {
    this.setState({ config: config });
  };

  handleLoadConfig = () => {
    const { config } = this.state;
    return config;
  };

  handleWorkerSelected = (worker) => {
    this.setState({ workerSelected: worker.toString() });
    this.setState({ noWorkers: false });
    this.setState(
      {
        selectedWorkerName: this.state.workerList.filter(
          (w) => w.id === worker,
        )[0].name,
        isLoading: true,
      },
      () => {
        this.searchWorker(this.state.tree, worker);
      },
    );
    history.pushState("", "", "/orgchart/" + worker);
  };

  handleOnClick = () => {
    this.setState({ isLoading: true });
    this.setState(
      {
        searchedTree: this.state.tree,
      },
      () => {
        this.setState({
          isLoading: false,
          noWorkers: false,
          company: "Select Company",
          workerList: this.state.originalWorkList,
          selectedWorkerName: "Select Worker",
        });
      },
    );
    history.pushState("", "", "/orgchart/");
  };

  handleOnChangeFilter = (e) => {
    this.setState({ company: e.value, isLoading: true });
    let id = this.state.companyObject[e.value];
    history.pushState("", "", "/orgchart/");
    if (e.value != "Show All") {
      axios({
        method: "GET",
        url: "/api/OrgChart/singlefilteredtree/" + id,
      })
        .then((res) => {
          this.setState(
            {
              workerList: flattenWorkerTree([res.data]),
              selectedWorkerName: "Select Worker",
            },
            () => {
              console.log(this.state.workerList);
            },
          );
          if (res.status != "204") {
            this.setState(
              {
                searchedTree: res.data,
              },
              () => {
                this.setState({ isLoading: false, noWorkers: false });
              },
            );
          } else {
            this.setState(
              {
                searchedTree: res.data,
                workerList: [],
              },
              () => {
                this.setState({ isLoading: false, noWorkers: true });
              },
            );
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      this.setState(
        {
          searchedTree: this.state.tree,
          workerList: this.state.originalWorkList,
          selectedWorkerName: "Select Worker",
        },
        () => {
          this.setState({ isLoading: false, noWorkers: false });
        },
      );
    }
  };

  render() {
    let tree = this.state.searchedTree;
    let isLoading = this.state.isLoading;

    if (this.state.noWorkers) {
      return (
        <PageTemplate curPage="orgchart" position="fix">
          <HStack align="center">
            <Box>
              <Menu
                menuButton={
                  <StyledButton>
                    {this.state.company}
                    <IconsDiv>
                      <ChevronDownIcon viewBox="-5 -3 24 24" w={5} h={5} />
                    </IconsDiv>
                  </StyledButton>
                }
              >
                <MenuRadioGroup
                  position="fixed"
                  value={this.state.company}
                  onChange={(e) => this.handleOnChangeFilter(e)}
                >
                  {this.state.filters.map((data, index) => {
                    return (
                      <MenuItem position="fixed" value={data} key={index}>
                        {data}
                      </MenuItem>
                    );
                  })}
                  <MenuItem position="fixed" value={"Show All"}>
                    Show All
                  </MenuItem>
                </MenuRadioGroup>
              </Menu>
            </Box>
            <Box width={auto} paddingRight={50} paddingBottom={8} position>
              <InputDropDown
                filterName={this.state.selectedWorkerName}
                filterList={this.state.workerList}
                handleWorkerSelected={this.handleWorkerSelected}
              />
            </Box>
            <Box>
              <StyledButton onClick={() => this.handleOnClick()}>
                Clear Search and Filter
              </StyledButton>
            </Box>
          </HStack>
          <div className="App">No Workers...</div>
        </PageTemplate>
      );
    }
    if (isLoading) {
      return (
        <PageTemplate>
          <Center paddingTop={100}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        </PageTemplate>
      );
    } else {
      return (
        <PageTemplate curPage="orgchart" position="fix">
          <StyledPageBox position="relative">
            <HStack align="center" position="absolute" top="0" left="0">
              <Box marginLeft={4}>
                <Menu
                  menuButton={
                    <StyledButton>
                      {this.state.company}
                      <IconsDiv>
                        <ChevronDownIcon viewBox="-5 0 24 24" w={5} h={5} />
                      </IconsDiv>
                    </StyledButton>
                  }
                >
                  <MenuRadioGroup
                    position="fixed"
                    value={this.state.company}
                    onChange={(e) => this.handleOnChangeFilter(e)}
                  >
                    {this.state.filters.map((data, index) => {
                      return (
                        <MenuItem position="fixed" value={data} key={index}>
                          {data}
                        </MenuItem>
                      );
                    })}
                    <MenuItem position="fixed" value={"Show All"}>
                      Show All
                    </MenuItem>
                  </MenuRadioGroup>
                </Menu>
              </Box>
              <Box>
                <InputDropDown
                  filterName={this.state.selectedWorkerName}
                  filterList={this.state.workerList}
                  handleWorkerSelected={this.handleWorkerSelected}
                />
              </Box>
              <Box>
                <StyledButton onClick={() => this.handleOnClick()}>
                  Clear Search and Filter
                </StyledButton>
              </Box>
            </HStack>

            <OrgChart
              tree={tree}
              onConfigChange={(config) => this.setState({ config })}
              onEntityLinkClick={(entity) => {
                window.open("/worker/" + entity.id, "_blank");
              }}
              loadConfig={() => this.state.config}
              loadImage={(d) => {
                return Promise.resolve(d);
              }}
              loadParent={(d) => {
                const parentData = this.getParent(d);
                return parentData;
              }}
              loadChildren={(d) => {
                const childrenData = this.getChild(d.id);
                return childrenData;
              }}
            />
          </StyledPageBox>
        </PageTemplate>
      );
    }
  }
}
