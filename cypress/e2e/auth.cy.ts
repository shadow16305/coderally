describe("User Authentication", () => {
  const getEmail = () => `john${Date.now()}@email.com`;

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("Auth: Sign up", () => {
    it("should navigate to the sign-up page and sign up a new user", () => {
      const email = getEmail();

      cy.getByData("login-link").click();
      cy.location("pathname").should("eq", "/login");
      cy.getByData("signup-link").click();
      cy.location("pathname").should("eq", "/signup");

      cy.getByData("signup-name-input").type("John Smith");
      cy.getByData("signup-email-input").type(email);
      cy.getByData("signup-password-input").type("freepass1");
      cy.getByData("signup-submit").click();

      cy.location("pathname").should("eq", "/");
    });

    it("should not allow signing up with an already existing user", () => {
      cy.getByData("login-link").click();
      cy.location("pathname").should("eq", "/login");
      cy.getByData("signup-link").click();
      cy.location("pathname").should("eq", "/signup");

      cy.getByData("signup-name-input").type("John Smith");
      cy.getByData("signup-email-input").type("john@email.com");
      cy.getByData("signup-password-input").type("freepass1");
      cy.getByData("signup-submit").click();

      cy.getByData("signup-error-message").should("exist").and("contain", "User already exists!");
    });
  });

  context("Auth: Log in", () => {
    it("should navigate to home page after succesfull login", () => {
      cy.getByData("login-link").click();
      cy.location("pathname").should("eq", "/login");

      cy.getByData("login-email-input").type("john@email.com");
      cy.getByData("login-password-input").type("freepass1");
      cy.getByData("login-submit").click();
      cy.location("pathname").should("eq", "/");
    });

    it("should display error message if credentials are invalid", () => {
      const email = getEmail();

      cy.getByData("login-link").click();
      cy.location("pathname").should("eq", "/login");

      cy.getByData("login-email-input").type(email);
      cy.getByData("login-password-input").type("freepass1");
      cy.getByData("login-submit").click();
      cy.getByData("login-credential-error").should("exist").and("contain", "Invalid credentials");
    });
  });
});
