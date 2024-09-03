describe("Login Modal", () => {
  const username = "feastuser"; // Replace with your test username
  const password = "Madison123"; // Replace with your test password

  beforeEach(() => {
    // Set the viewport to a standard desktop size
    cy.viewport(1280, 720); // You can adjust this resolution based on your design

    // Visit the homepage or any page where the navigation bar is present
    cy.visit("/landing-page");
  });

  it("should open the login modal from the navigation bar", () => {
    // Open the login modal
    cy.contains("Login").click();

    // Check that the login modal is visible
    cy.get("h2").contains("Login").should("be.visible");
    cy.contains("Enter your email below to login to your account.").should(
      "be.visible"
    );

    // Take a screenshot after the test
    cy.screenshot("login-modal-opened");
  });

  it("should allow a user to log in through the modal", () => {
    // Open the login modal
    cy.contains("Login").click();

    // Fill in the login form within the modal
    cy.get('input[id="identifier"]').type(username);
    cy.get('input[id="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Check that the user is redirected to the landing page or any page post-login
    cy.url().should("include", "/landing-page");

    // Take a screenshot after the test
    cy.screenshot("successful-login");
  });

  it("should show an error message with invalid credentials", () => {
    // Open the login modal
    cy.contains("Login").click();

    // Fill in the login form with invalid credentials
    cy.get('input[id="identifier"]').type("invaliduser");
    cy.get('input[id="password"]').type("invalidpassword");
    cy.get('button[type="submit"]').click();

    // Check that an error message is displayed in the modal
    cy.contains("Login failed. Please try again.").should("be.visible");

    // Take a screenshot after the test
    cy.screenshot("invalid-credentials-error");
  });

  it("should show validation error messages", () => {
    // Open the login modal
    cy.contains("Login").click();
    cy.get('button[type="submit"]').click();

    // Check that validation error messages are displayed
    cy.contains("Identifier is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    // Take a screenshot after the test
    cy.screenshot("validation-errors");
  });
});
