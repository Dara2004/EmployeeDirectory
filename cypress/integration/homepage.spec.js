describe('Homepage tests', () => {
  beforeEach(() => {});

  it('Testing office count', () => {
    cy.intercept('GET', 'http://localhost:3000/api/dashboard', {
      statusCode: 200,
      body: `{"numberOfEmployees":600,"numberOfContractors":400,"numberOfOffices":500}`,
    });
    cy.visit('http://localhost:3000');
    cy.get('[test="total_office_count"]').contains(500);
    cy.get('[test="total_contractor_count"]').contains(400);
    cy.debug();
    cy.get('[test="total_employees_count"]').contains(600);
  });

  it('Testing api structure', () => {
    cy.request('GET', 'http://localhost:3000/api/dashboard').then((res) => {
      const json = res.body;
      expect(typeof json.numberOfEmployees === 'number');
      expect(typeof json.numberOfOffices === 'number');
      expect(typeof json.numberOfContractors === 'number');
    });
  });
});
