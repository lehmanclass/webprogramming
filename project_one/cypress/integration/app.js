const INPUT = "#hex-input";
const CONVERT_BUTTON = "#grading-element-three";
const FIELDS_TO_BE_DISPLAYED = [
  "Result",
  "IP Class",
  "Network ID",
  "Host ID",
  "Dotted Decimal Notation"
];
const EXPECTED_RESULTS = ["C", "d87f2a", "fc", "216.127.42.252"];

describe("App functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Checks the right information is being display when valid input", () => {
    cy.get(INPUT).type("D87F2AFC");
    cy.get(CONVERT_BUTTON).click();
    checkIfArrayValuesAreDisplayed(FIELDS_TO_BE_DISPLAYED);
    checkIfArrayValuesAreDisplayed(EXPECTED_RESULTS);
  });

  it("Checks the right information is being display when invalid input", () => {
    cy.get(INPUT).type("ABFBNMFF");
    cy.get(CONVERT_BUTTON).click();
    cy.contains("Input Error");
    cy.get("#grading-element-three-consequence").then($errorContainer => {
      expect($errorContainer.css("visibility")).to.equal("visible");
    });
  });
});

function checkIfArrayValuesAreDisplayed(values) {
  values.forEach(value => {
    checkIfDisplayed(value);
  });
}

function checkIfDisplayed(text) {
  cy.contains(text).should("exist");
}
