Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Filter missing')) {
    return false;
  }
});

describe('Accounts Receivable WC - Minimal Filter Test', () => {
  beforeEach(() => {
    cy.visit('https://staging-11.wela-py3.dev/login#login');

    cy.get('#login_email').type('Administrator');
    cy.get('#login_password').type('u4H5fpRGBXsLH8qT');
    cy.get('button[type="submit"]').first().click();

    cy.url().should('include', '/desk');
    cy.wait(3000);

    cy.visit('/desk#query-report/Accounts%20Receivable%20WC');
    cy.wait(3000);
  });

  it('Closes modal and selects filter values', () => {
    // Close the modal if it appears
    cy.get('body').then(($body) => {
      if ($body.find('h4.modal-title:contains("Preparing Report")').length) {
        cy.get('button.btn-modal-close:visible').click({ force: true });
        cy.wait(1000);
      }
    });

    // Helper to select from autocomplete dropdown
    function selectFromDropdown(fieldname, value) {
      cy.get(`input[data-fieldname="${fieldname}"]`)
        .focus()
        .clear({ force: true })
        .type(value, { force: true });

      cy.wait(500); // wait for dropdown suggestions

      cy.get('.awesomplete ul:visible > li')
        .contains(value)
        .first()
        .click({ force: true });
    }

    // Apply filters (excluding year_level)
    selectFromDropdown('school_year', '2024-2025');
    selectFromDropdown('semester', '2nd Sem');

    // Handle 'term' (select dropdown)
    cy.get('[data-fieldname="term"] select')
      .select('Final', { force: true });

    // Continue with course only
    selectFromDropdown('course', 'Bachelor of Secondary Education Major in English');
  });
});
