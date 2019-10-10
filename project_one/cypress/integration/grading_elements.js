describe("Grading Elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Grading element one", () => {
    cy.get("#grading-element-one").click();
    cy.get("#grading-element-one-consequence").should("exist");
  });

  it("Grading element two", () => {
    cy.get("#grading-element-two").click();
    cy.url().should("include", "/about");
    cy.get("#grading-element-two-consequence").should("exist");
  });

  it("Grading element three", () => {
    cy.get("#grading-element-three").click();
    cy.get("#grading-element-three-consequence").should("exist");
  });

  it("Grading element four", () => {
    cy.get('form[name="grading-element-four"]').should("exist");
    checkInputValue("input[name=testOne]", "success");
    checkInputValue("input[name=testTwo]", "success baby");
    checkInputValue("input[name=testThree]", "I'm a programmer.");
  });

  it("Grading element five", () => {
    cy.get("#grading-element-five").then($element => {
      const originalColor = $element.css("color");
      cy.wrap($element)
        .trigger("mouseover")
        .then($hoveredElement => {
          const hoverColor = $hoveredElement.css("color");
          expect(hoverColor).to.not.equal(originalColor);
        });
    });
  });
});

function checkInputValue(selector, value) {
  cy.get(selector).then($input => {
    expect($input.val()).to.equal(value);
  });
}
