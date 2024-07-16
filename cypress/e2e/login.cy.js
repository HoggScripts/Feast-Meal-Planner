describe("Login Page", () => {
  const username = "feastuser"; // Replace with your test username
  const password = "Madison123"; // Replace with your test password

  it("should load the login page", () => {
    cy.visit("/login");
    cy.contains("Login").should("be.visible");
  });

  it("should allow a user to log in", () => {
    cy.visit("/login");

    // Fill in the login form
    cy.get('input[name="identifier"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Check that the user is redirected to the user info page
    cy.url().should("include", "/user-info");
  });

  it("should show an error message with invalid credentials", () => {
    cy.visit("/login");

    // Fill in the login form with invalid credentials
    cy.get('input[name="identifier"]').type("invaliduser");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get('button[type="submit"]').click();

    // Check that an error message is displayed
    cy.contains("Login failed. Please try again.").should("be.visible");
  });

  it("should show validation error messages", () => {
    cy.visit("/login");
    cy.get('button[type="submit"]').click();

    // Check that validation error messages are displayed
    cy.contains("Identifier is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});
