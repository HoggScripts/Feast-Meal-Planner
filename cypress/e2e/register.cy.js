describe("Registration", () => {
  const timestamp = new Date().getTime();
  const newUser = {
    username: `testuser_${timestamp}`,
    email: `testuser_${timestamp}@example.com`,
    password: "Password123", // Updated to include an uppercase letter
    firstName: "John",
    lastName: "Doe",
  };

  it("should allow a user to register successfully", () => {
    cy.visit("/register");

    // Fill in the registration form
    cy.get('input[name="username"]').type(newUser.username);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('input[name="firstName"]').type(newUser.firstName);
    cy.get('input[name="lastName"]').type(newUser.lastName);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the login page
    cy.url().should("include", "/login");
    cy.contains("Login").should("be.visible");
  });

  it("should show an error message for existing user", () => {
    // Use the same newUser object as above to simulate an existing user scenario
    cy.visit("/register");

    // Fill in the registration form with existing user data
    cy.get('input[name="username"]').type(newUser.username);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('input[name="firstName"]').type(newUser.firstName);
    cy.get('input[name="lastName"]').type(newUser.lastName);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that an error message is shown
    cy.contains("User already exists.").should("be.visible");
  });

  it("should show validation error messages", () => {
    cy.visit("/register");
    cy.get('button[type="submit"]').click();

    // Check that validation error messages are displayed
    cy.contains("Username must be at least 2 characters.").should("be.visible");
    cy.contains("Invalid email address").should("be.visible");
    cy.contains("Password must be at least 6 characters.").should("be.visible");
    cy.contains("First Name is required.").should("be.visible");
    cy.contains("Last Name is required.").should("be.visible");
  });
});
