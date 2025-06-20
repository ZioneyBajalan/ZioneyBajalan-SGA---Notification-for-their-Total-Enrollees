describe('Submit a multi-step form using Cypress', () => {
  Cypress.on('uncaught:exception', () => false);

  const firstNames = ['Zioney', 'Harvey', 'Leandro', 'Erwin', 'Jayce', 'Angela', 'Sofia', 'Miguel'];
  const middleNames = ['Almo', 'Reyes', 'Santos', 'Dela', 'Lopez', 'Cruz', 'Garcia'];
  const lastNames = ['Bajalan', 'Yarra', 'Gica', 'Magarin', 'Lopez', 'Torres', 'Mendoza'];

  const guardianFirstNames = ['Pedro', 'Lucia', 'Manuel', 'Carla', 'Eduardo'];
  const guardianLastNames = ['Santos', 'Ramirez', 'Reyes', 'Navarro', 'Cabrera'];
  const relationships = ['Father', 'Mother', 'Uncle', 'Aunt', 'Sibling'];

  // Utility to pick random item from array
  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Randomized names for each role
  const studentFirstName = randomFrom(firstNames);
  const studentMiddleName = randomFrom(middleNames);
  const studentLastName = randomFrom(lastNames);
  const studentEmail = `${studentFirstName.toLowerCase()}${studentLastName.toLowerCase()}@example.com`;

  const fatherFirstName = randomFrom(['Juan', 'Jose', 'Carlos', 'Miguel', 'Andres']);
  const fatherMiddleName = randomFrom(middleNames);
  const fatherLastName = randomFrom(lastNames);

  const motherFirstName = randomFrom(['Maria', 'Ana', 'Carmen', 'Isabel', 'Teresa']);
  const motherMiddleName = randomFrom(middleNames);
  const motherLastName = randomFrom(lastNames);

  const guardianFirstName = randomFrom(guardianFirstNames);
  const guardianMiddleName = randomFrom(middleNames);
  const guardianLastName = randomFrom(guardianLastNames);
  const guardianRelationship = randomFrom(relationships);
  const guardianEmail = `${guardianFirstName.toLowerCase()}${guardianLastName.toLowerCase()}@example.com`;

  it('fills and submits the multi-step form', () => {
    const path = 'https://staging-5.wela-v15.dev/jpit-santa-maria-campus/new';
    cy.visit(path);

    // Page 1
    cy.get('.web-form-body').within(() => {
      cy.get('select[data-fieldname="custom_branch"]').select('SANTA MARIA CAMPUS');
      cy.get('select[data-fieldname="status"]').select('New');
      cy.get('input[data-fieldname="school_year"]').clear().type('SY2025-2026');
      cy.get('select[data-fieldname="custom_enrollment_type"]').select('Walk-in');
      cy.get('select[data-fieldname="incoming_level"]').select('Grade 12');
      cy.get('input[data-fieldname="lrn"]').type('0987654321');
      cy.get('select[data-fieldname="custom_student_type"]').select('Private');
      cy.get('select[data-fieldname="strand_name"]').select('STEM');
      cy.get('input[data-fieldname="last_name"]').type(studentLastName);
      cy.get('input[data-fieldname="first_name"]').type(studentFirstName);
      cy.get('input[data-fieldname="middle_name"]').type(studentMiddleName);
      cy.get('input[data-fieldname="extension_name"]').type('n/a');
      cy.get('select[data-fieldname="gender"]').select('Male');
      cy.get('input[data-fieldname="student_email"]').type(studentEmail);
      cy.get('input[data-fieldname="student_phone_number"]').type('0987654321');
      cy.get('input[data-fieldname="birthdate"]').type('04-01-2002');
      cy.get('input[data-fieldname="birthplace"]').type('Ozamiz City');
      cy.get('input[data-fieldname="age"]').type('21');
      cy.get('input[data-fieldname="home_address"]').type('St.Michael Piit Apartments');
      cy.get('input[data-fieldname="religion_1"]').type('Christian');
      cy.get('select[data-fieldname="custom_civil_status"]').select('Single');
      cy.get('input[data-fieldname="nationality"]').type('Filipino');
      cy.get('input[data-fieldname="custom_name_of_junior_high_school"]').type('MOGCHS');
    });

    // Go to Page 2
    cy.get('.web-form-footer').within(() => {
      cy.contains('Next').click({ force: true });
    });

    // Wait for second page
    cy.get('input[data-fieldname="father_name"]', { timeout: 10000 }).should('be.visible');

    // Page 2
    cy.get('input[data-fieldname="father_name"]').type(fatherFirstName);
    cy.get('input[data-fieldname="father_last_name"]').type(fatherLastName);
    cy.get('input[data-fieldname="father_middle_name"]').type(fatherMiddleName);

    cy.get('input[data-fieldname="mother_name"]').type(motherFirstName);
    cy.get('input[data-fieldname="mother_last_name"]').type(motherLastName);
    cy.get('input[data-fieldname="mother_middle_name"]').type(motherMiddleName);

    cy.get('input[data-fieldname="guardian_first_name"]').type(guardianFirstName);
    cy.get('input[data-fieldname="guardian_last_name"]').type(guardianLastName);
    cy.get('input[data-fieldname="guardian_middle_name"]').type(guardianMiddleName);
    cy.get('input[data-fieldname="guardian_relationship"]').type(guardianRelationship);
    cy.get('input[data-fieldname="guardian_phone_number"]').type('0987654321');
    cy.get('input[data-fieldname="guardian_email"]').type(guardianEmail);
    cy.get('select[data-fieldname="in_case_of_emergency"]').select('Guardian');

    // Submit
    cy.get('.web-form-footer').within(() => {
      cy.get('button[type="submit"]').click({ force: true });
    });

    cy.contains('Thank you').should('exist');
  });
});
