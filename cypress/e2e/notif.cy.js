describe('Submit Enrollment Digest with Save and Custom Data', () => {
  Cypress.on('uncaught:exception', () => false);
    
  const digestData = `{
    "enrollees": 652,
    "music": 0,
    "gender": 652,
    "status": 652,
    "strads": 0,
    "dismissal": 0,
    "lunch_break": 0,
    "chinese_class": 0
  }`;

  it('logs in and submits the Enrollment Digest form', () => {
    // Step 1: Log in
    cy.visit('https://staging-90.wela-v2.dev/login#login');

    cy.get('#login_email', { timeout: 10000 }).type('Administrator');
    cy.get('#login_password').type('410ee539mcq5CxAS');
    cy.contains('Sign in').click();

    // Step 2: Go directly to the form after login
    cy.url({ timeout: 15000 }).should('include', '/desk');
    cy.visit('https://staging-90.wela-v2.dev/desk#Form/Email%20Digest/Enrollment%20Digest');

    // Step 3: Wait for form to load
    cy.get('input[data-fieldname="enable"][type="checkbox"]', { timeout: 20000 }).should('exist');

    // Step 4: Check Enable and Enable SMS
    cy.get('input[data-fieldname="enable"][type="checkbox"]').check({ force: true });
    cy.get('input[data-fieldname="enable_sms"][type="checkbox"]').check({ force: true });

    // Step 5: Set Auto Send By
    cy.get('select[data-fieldname="send_by"]').should('be.visible').select('Daily');

    // Step 6: Set Time
    cy.get('input[data-fieldname="sending_time"]').should('be.visible').clear().type('08:00').blur();

    // Step 7: Set Email Recipients
    cy.get('textarea[data-fieldname="recipients"]')
      .should('be.visible')
      .clear()
      .type('jayce.zioney@gmail.com');

    // Step 8: Set SMS Recipients
    cy.get('textarea[data-fieldname="sms_recipients"]')
      .should('be.visible')
      .clear()
      .type('09952384920');

    // Step 9: Set Digest Data
    cy.get('textarea[data-fieldname="data"]')
      .should('be.visible')
      .clear()
      .type(digestData, { parseSpecialCharSequences: false });

    // Step 10: Set SMS Content
    cy.get('textarea[data-fieldname="sms_content"]')
      .should('be.visible')
      .clear()
      .type('Good day! This is a test SMS digest.');

    // Step 11: Click Save button
    cy.get('button.btn-primary:contains("Save")', { timeout: 10000 }).click({ force: true });

    // Step 12: Click "Send Email Digest"
    cy.get('button[data-label="Send%20Email%20Digest"]')
      .should('be.visible')
      .click({ force: true });
  });
});
