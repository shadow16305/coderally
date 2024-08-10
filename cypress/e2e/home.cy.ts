describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("Home: Create post", () => {
    cy.getByData("home-dropdown-create").click;
    cy.getByData("home-dropdown-post").click();
    cy.getByData("post-title-input").type("Test by cypress");
    cy.getByData("post-content-input").type("Some randomg text for the test done by cypress...");
    cy.getByData("post-category-select").click();
    cy.getByData("category-select-item-2").click();
    cy.getByData("category-select-box").should("exist").and("contain", "random thoughts");
    cy.getByData("post-submit").click();
  });
});
