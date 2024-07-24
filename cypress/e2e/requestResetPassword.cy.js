describe("Request Password Reset Page", () => {
  const email = "test@example.com"; // Replace with your test email

  it("should load the request password reset page", () => {
    cy.visit("/request-reset-password");
    cy.contains("Request Password Reset").should("be.visible");
  });

  it("should allow a user to request a password reset", () => {
    cy.visit("/request-reset-password");

    // Fill in the email field
    cy.get('input[name="email"]').type(email);
    cy.get('button[type="submit"]').click();

    // Check that a success message is displayed
    cy.contains(
      "If an account with that email exists, a reset link has been sent."
    ).should("be.visible");
  });

  it("should show a generic success message for any email", () => {
    cy.visit("/request-reset-password");

    // Fill in the email field with an invalid email
    cy.get('input[name="email"]').type("invalidemail@example.com");
    cy.get('button[type="submit"]').click();

    // Check that the generic success message is displayed
    cy.contains(
      "If an account with that email exists, a reset link has been sent."
    ).should("be.visible");
  });

  it("should have a link to go back to the login page", () => {
    cy.visit("/request-reset-password");
    cy.contains("Back to Login").should("be.visible").click();

    // Check that the user is redirected to the login page
    cy.url().should("include", "/login");
  });
});
