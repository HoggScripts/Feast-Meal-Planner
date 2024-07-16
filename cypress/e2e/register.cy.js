describe("Register Page", () => {
  const timestamp = new Date().getTime();
  const newUser = {
    username: `user${timestamp}`,
    email: `user${timestamp}@example.com`,
    password: "NewUserPassword123",
    firstName: "New",
    lastName: "User",
  };

  it("should load the register page", () => {
    cy.visit("/register");
    cy.contains("Register").should("be.visible");
  });

  it("should allow a user to register successfully", () => {
    cy.visit("/register");

    // Fill in the registration form
    cy.get('input[type="text"]').eq(0).type(newUser.username);
    cy.get('input[type="email"]').type(newUser.email);
    cy.get('input[type="password"]').type(newUser.password);
    cy.get('input[type="text"]').eq(1).type(newUser.firstName);
    cy.get('input[type="text"]').eq(2).type(newUser.lastName);
    cy.get('button[type="submit"]').click();

    // Check that the user is redirected to the login page
    cy.url().should("include", "/login");
  });

  it("should show an error message for existing user", () => {
    cy.visit("/register");

    // Fill in the registration form with existing user data
    cy.get('input[type="text"]').eq(0).type(newUser.username);
    cy.get('input[type="email"]').type(newUser.email);
    cy.get('input[type="password"]').type(newUser.password);
    cy.get('input[type="text"]').eq(1).type(newUser.firstName);
    cy.get('input[type="text"]').eq(2).type(newUser.lastName);
    cy.get('button[type="submit"]').click();

    // Check that an error message is displayed
    cy.contains("User already exists.").should("be.visible");
  });

  it("should show validation error messages", () => {
    cy.visit("/register");
    cy.get('button[type="submit"]').click();

    // Check that validation error messages are displayed
    cy.contains("Username is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("First Name is required").should("be.visible");
    cy.contains("Last Name is required").should("be.visible");
  });
});
