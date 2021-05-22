const { expect } = require('chai');
const { createJsxText } = require('typescript');

const filters = [
  {
    name: 'Companies',
    filters: [
      {
        id: '01',
        name: 'Acme Seeds Inc.',
        type: 'company',
        children: [
          {
            id: '01',
            type: 'office',
            name: 'Corporate',
            children: [
              {
                id: '01',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '02',
                type: 'group',
                name: 'Marketing',
                children: [],
              },
              {
                id: '03',
                type: 'group',
                name: 'Sales',
                children: [],
              },
              {
                id: '04',
                type: 'group',
                name: 'Accounting',
                children: [],
              },
              {
                id: '05',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '06',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '07',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '08',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '09',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '15',
                type: 'group',
                name: 'Human Resources',
                children: [],
              },
            ],
          },
          {
            id: '02',
            type: 'office',
            name: 'Vancouver',
            children: [
              {
                id: '01',
                type: 'group',
                name: 'Human Resources',
                children: [],
              },
              {
                id: '02',
                type: 'group',
                name: 'Human Resources B',
                children: [],
              },
            ],
          },
          {
            id: '15',
            type: 'office',
            name: 'Vancouver B',
            children: [],
          },
        ],
      },
      {
        id: '02',
        type: 'company',
        name: 'Acme Planting Ltd.',
        children: [
          {
            id: '01',
            type: 'office',
            name: 'Vancouver',
            children: [
              {
                id: '02',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '03',
                type: 'group',
                name: 'Marketing',
                children: [],
              },
            ],
          },
          {
            id: '02',
            type: 'office',
            name: 'Victoria',
            children: [
              {
                id: '04',
                type: 'group',
                name: 'Sales',
                children: [],
              },
              {
                id: '05',
                type: 'group',
                name: 'Service',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '03',
        type: 'company',
        name: 'Acme Harvesting Ltd.',
        children: [
          {
            id: '03',
            type: 'office',
            name: 'Kelowna',
            children: [
              {
                id: '03',
                type: 'group',
                name: 'Administration',
                children: [],
              },
              {
                id: '04',
                type: 'group',
                name: 'Marketing & Sales',
                children: [],
              },
              {
                id: '05',
                type: 'group',
                name: 'Distribution',
                children: [],
              },
            ],
          },
          {
            id: '04',
            type: 'office',
            name: 'Prince George',
            children: [
              {
                id: '08',
                type: 'group',
                name: 'Operations',
                children: [],
              },
            ],
          },
          {
            id: '05',
            type: 'office',
            name: 'Vancouver',
            children: [],
          },
        ],
      },
      {
        id: '04',
        type: 'company',
        name: 'Acme Logistics Ltd.',
        children: [
          {
            id: 'A',
            type: 'office',
            name: 'Vancouver',
            children: [],
          },
        ],
      },
      {
        id: '05',
        type: 'company',
        name: 'Acme Ltd.',
        children: [],
      },
    ],
  },
  {
    name: 'Skills',
    filters: [
      {
        id: '1',
        type: 'skill category',
        name: 'Agriculture',
        children: [
          { id: '1', type: 'skill', name: 'Planting', children: [] },
          { id: '2', type: 'skill', name: 'Harvesting', children: [] },
          {
            id: '3',
            type: 'skill',
            name: 'Fertilizing',
            children: [],
          },
          {
            id: '4',
            type: 'skill',
            name: 'Irrigating',
            children: [],
          },
          {
            id: '5',
            type: 'skill',
            name: 'Soil Preparation',
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Physical Locations',
    filters: [
      {
        id: '1',
        type: 'physical location',
        name: 'Vancouver D',
        children: [],
      },
    ],
  },
  {
    name: 'Workers',
    filters: [
      { id: '10001', type: 'workers', name: 'Susan Acme', children: [] },
      {
        id: '10002',
        type: 'workers',
        name: 'Jill Johnson',
        children: [],
      },
      {
        id: '10003',
        type: 'workers',
        name: 'Saul Sampson',
        children: [],
      },
      {
        id: '10004',
        type: 'workers',
        name: 'Gregore Da Silva',
        children: [],
      },
      {
        id: '10005',
        type: 'workers',
        name: 'Connie Conner',
        children: [],
      },
    ],
  },
];

describe('SearchPage tests - Autocomplete', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/Filters', {
      statusCode: 200,
      body: JSON.stringify(filters),
    }).as('GetFilters');
    cy.visit('http://localhost:3000');
    cy.get('[test="search_page_link"]').click();
    cy.wait('@GetFilters');
  });

  it('Testing autocomplete - contains acme', () => {
    cy.get('[data-test="search_box"] input').type('Acme');
    cy.get('[data-test="search_box"]').contains('Acme Seeds Inc.');
    cy.get('[data-test="search_box"] ul > li').should('have.length', 6);
  });

  it('Testing autocomplete - no autocomplete item available', () => {
    cy.get('[data-test="search_box"] input').type('Jessica');
    cy.get('[data-test="search_box"] ul > li').should('have.length', 0);
  });

  it('Testing autocomplete - using Enter Key', () => {
    cy.get('[data-test="search_box"] input').type('Acme');
    cy.get('[data-test="search_box"] ul > li')
      .contains('Acme Seeds Inc.')
      .type('{enter}');
    // cy.get('[data-test="search_accordion_checkbox"]')
    //   .contains('Acme Seeds Inc.')
    //   .should('be.checked');
  });
});

describe('SearchPage tests - Filter Search', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/Filters', {
      statusCode: 200,
      body: JSON.stringify(filters),
    }).as('GetFilters');
    cy.visit('http://localhost:3000');
    cy.get('[test="search_page_link"]').click();
    cy.wait('@GetFilters');
  });

  it('Testing Filter Search - physical location', () => {
    const physLocFilter = 'Vancouver D';
    const query = {
      coGs: [],
      physicalLocationIds: ['1'],
      skillCategories: [],
      workerIds: [],
    };
    cy.get('[data-test="search_accordion_filters"] div')
      .contains('Physical Locations')
      .click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(physLocFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.physicalLocation === physLocFilter).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - companies', () => {
    const companyFilter = 'Acme Seeds Inc.';
    const query = {
      coGs: [
        {
          companyCode: '01',
          offices: [
            {
              officeCode: '01',
              groupCodes: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '15',
              ],
            },
            {
              officeCode: '02',
              groupCodes: ['01', '02'],
            },
            {
              officeCode: '15',
              groupCodes: [],
            },
          ],
        },
      ],
      physicalLocationIds: [],
      skillCategories: [],
      workerIds: [],
    };
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(companyFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.company === companyFilter).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - Office', () => {
    const companyFilter = 'Acme Seeds Inc.';
    const companyOpen = `search_accordion_open_${companyFilter}`;
    const officeFilter = 'Corporate';
    const query = {
      coGs: [
        {
          companyCode: '01',
          offices: [
            {
              officeCode: '01',
              groupCodes: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '15',
              ],
            },
          ],
        },
      ],
      physicalLocationIds: [],
      skillCategories: [],
      workerIds: [],
    };
    cy.get(`[data-test="${companyOpen}"]`).click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(officeFilter)
      .click();

    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.company === companyFilter).to.be.true;
          expect(worker.office === officeFilter).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - group', () => {
    const companyFilter = 'Acme Seeds Inc.';
    const companyOpen = `search_accordion_open_${companyFilter}`;
    const officeFilter = 'Corporate';
    const officeOpen = `search_accordion_open_${officeFilter}`;
    const groupFilter = 'Marketing';
    const query = {
      coGs: [
        {
          companyCode: '01',
          offices: [
            {
              officeCode: '01',
              groupCodes: ['02'],
            },
          ],
        },
      ],
      physicalLocationIds: [],
      skillCategories: [],
      workerIds: [],
    };
    cy.get(`[data-test="${companyOpen}"]`).click();
    cy.get(`[data-test="${officeOpen}"]`).click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(groupFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.company === companyFilter).to.be.true;
          expect(worker.office === officeFilter).to.be.true;
          expect(worker.group === groupFilter).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - Skill Category', () => {
    const SCFilter = 'Agriculture';
    const query = {
      coGs: [],
      physicalLocationIds: [],
      skillCategories: [
        {
          skillCategoryId: '1',
          skills: [
            {
              skillId: '1',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '2',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '3',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '4',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '5',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
          ],
        },
      ],
      workerIds: [],
    };
    cy.get('[data-test="search_accordion_filters"] div')
      .contains('Skills')
      .click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(SCFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.skills.length > 0).to.be.true;
          const hasSC = worker.skills.reduce((acc, curr) => {
            if (curr.skillCategory === SCFilter) {
              acc = true;
              return true;
            }
            return acc;
          }, false);
          expect(hasSC).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - Skills', () => {
    const SCFilter = 'Agriculture';
    const SCOpen = `search_accordion_open_${SCFilter}`;
    const skillFilter = 'Soil Preparation';
    const query = {
      coGs: [],
      physicalLocationIds: [],
      skillCategories: [
        {
          skillCategoryId: '1',
          skills: [
            {
              skillId: '5',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
          ],
        },
      ],
      workerIds: [],
    };
    cy.get('[data-test="search_accordion_filters"] div')
      .contains('Skills')
      .click();
    cy.get(`[data-test="${SCOpen}"]`).click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(skillFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.skills.length > 0).to.be.true;
          const hasSkill = worker.skills.reduce((acc, curr) => {
            if (curr.skillCategory === SCFilter && curr.skill === skillFilter) {
              acc = true;
              return true;
            }
            return acc;
          }, false);
          expect(hasSkill).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - Skill level', () => {
    const SCFilter = 'Agriculture';
    const SCOpen = `search_accordion_open_${SCFilter}`;
    const skillFilter = 'Soil Preparation';
    const skillOpen = `search_accordion_open_${skillFilter}`;
    const skillLevelFilter = 'Intermediate';
    const query = {
      coGs: [],
      physicalLocationIds: [],
      skillCategories: [
        {
          skillCategoryId: '1',
          skills: [
            {
              skillId: '5',
              skillLevels: ['Intermediate'],
            },
          ],
        },
      ],
      workerIds: [],
    };
    cy.get('[data-test="search_accordion_filters"] div')
      .contains('Skills')
      .click();
    cy.get(`[data-test="${SCOpen}"]`).click();
    cy.get(`[data-test="${skillOpen}"]`).click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(skillLevelFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.skills.length > 0).to.be.true;
          const hasSkill = worker.skills.reduce((acc, curr) => {
            if (
              curr.skillCategory === SCFilter &&
              curr.skill === skillFilter &&
              curr.skillLevel === skillLevelFilter
            ) {
              acc = true;
              return true;
            }
            return acc;
          }, false);
          expect(hasSkill).to.be.true;
        }
      }
    });
  });

  it('Testing Filter Search - Skill Category + Company', () => {
    const companyFilter = 'Acme Harvesting Ltd.';
    const SCFilter = 'Agriculture';
    const query = {
      coGs: [
        {
          companyCode: '03',
          offices: [
            {
              officeCode: '03',
              groupCodes: ['03', '04', '05'],
            },
            {
              officeCode: '04',
              groupCodes: ['08'],
            },
            {
              officeCode: '05',
              groupCodes: [],
            },
          ],
        },
      ],
      physicalLocationIds: [],
      skillCategories: [
        {
          skillCategoryId: '1',
          skills: [
            {
              skillId: '1',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '2',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '3',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '4',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
            {
              skillId: '5',
              skillLevels: ['Novice', 'Intermediate', 'Expert'],
            },
          ],
        },
      ],
      workerIds: [],
    };
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(companyFilter)
      .click();
    cy.get('[data-test="search_accordion_filters"] div')
      .contains('Skills')
      .click();
    cy.intercept(
      'POST',
      'http://localhost:3000/api/Workers/filter?take=16&skip=0&sortBy=name',
      (req) => {
        expect(req.body).to.deep.equals(query);
      },
    ).as('PostFilters');
    cy.get('[data-test="search_accordion_checkbox"]')
      .contains(SCFilter)
      .click();
    cy.wait('@PostFilters').then((res) => {
      const response = res.response.body;
      if (response.workers.length > 0) {
        for (let worker of response.workers) {
          expect(worker.company === companyFilter).to.be.true;
          expect(worker.skills.length > 0).to.be.true;
          const hasSC = worker.skills.reduce((acc, curr) => {
            if (curr.skillCategory === SCFilter) {
              acc = true;
              return true;
            }
            return acc;
          }, false);
          expect(hasSC).to.be.true;
        }
      }
    });
  });
});
