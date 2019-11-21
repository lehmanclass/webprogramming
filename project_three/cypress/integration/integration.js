describe("Giphy App Integration test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Checks that .gif-result-display is working as expected", () => {
    cy.get(".gif-result-display").should("not.exist");

    cy.get("#gif-search-input").type("cats");
    cy.get("#gif-search-submit").click();

    cy.get(".gif-result-display")
      .its("length")
      .should("greaterThan", 4);
  });

  it("Checks that .gif-focus-display is working as expected", () => {
    cy.get("#gif-search-input").type("cats");
    cy.get("#gif-search-submit").click();
    cy.get(".gif-focus-display").should("not.exist");
    cy.get('.gif-result-display').first().click();
    cy.get(".gif-focus-display").its('length').should("eq", 1);
  });
});
