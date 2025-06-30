Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Filter missing')) {
    return false;
  }
});

describe('SOA WC SHCCI Report - Filter Test (No Year Level)', () => {
  beforeEach(() => {
    cy.visit('https://staging-11.wela-py3.dev/login#login');

    cy.get('#login_email').type('Administrator');
    cy.get('#login_password').type('u4H5fpRGBXsLH8qT');
    cy.get('button[type="submit"]').first().click();

    cy.url().should('include', '/desk');
    cy.wait(3000);

    cy.visit('/desk#query-report/SOA%20WC%20SHCCI');
    cy.wait(3000);
  });

  it('Closes modal and fills SOA filters (without Year Level)', () => {
    // Close modal if visible
    cy.get('body').then(($body) => {
      if ($body.find('h4.modal-title:contains("Preparing Report")').length) {
        cy.get('button.btn-modal-close:visible').click({ force: true });
        cy.wait(1000);
      }
    });

    // Dropdown helper
    function selectFromDropdown(fieldname, value) {
      cy.get(`input[data-fieldname="${fieldname}"]`)
        .focus()
        .clear({ force: true })
        .type(value, { force: true });

      cy.wait(500);

      cy.get('.awesomplete > ul > li')
        .contains(value)
        .first()
        .click({ force: true });
    }

    // Apply filters
    selectFromDropdown('student', 'ABRINICA, MARY GRACE BARIMBAO');
    selectFromDropdown('school_year', 'SY2024-2025');
    selectFromDropdown('semester', '2nd Sem');
    // Year Level intentionally left blank

    // Check Summary
    cy.get('input[data-fieldname="summary"]').check({ force: true });

    // Optionally check Assessment
    // cy.get('input[data-fieldname="assessment"]').check({ force: true });

    cy.wait(2000);
  });
});
