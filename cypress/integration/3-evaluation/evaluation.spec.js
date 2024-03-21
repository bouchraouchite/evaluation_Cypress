const { timeout } = require("async");

context("evaluation", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager"
    );
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust"
    );
  });

  it("vérifie que le formulaire est présent", () => {
    cy.get("form[name='myForm']").should("exist");
  });

  it("remplit le formulaire et soumet les données", () => {
    cy.get(":nth-child(1) > .form-control").type("bouchra");
    cy.get(":nth-child(2) > .form-control").type("Ouchite");
    cy.get(":nth-child(3) > .form-control").type("12345");
    cy.get("form.ng-dirty > .btn", { timeout: 10000 }).click();
    cy.get('[ng-class="btnClass3"]').click();
    cy.get(`tbody > tr:last > :nth-child(1)`).contains("bouchra");
    cy.get(`tbody > tr:last > :nth-child(2)`).contains("Ouchite");

    cy.get('[ng-class="btnClass2"]').click();
    cy.get("#userSelect").select("bouchra Ouchite");
    cy.get("#currency").select("Dollar");
    cy.get("form.ng-dirty > button").click();
    cy.get('[ng-class="btnClass3"]').click();
    cy.get(`tbody > tr:last > :nth-child(1)`).contains("bouchra");
    cy.get(`tbody > tr:last > :nth-child(2)`).contains("Ouchite");

    cy.get("tbody > tr:last > :nth-child(4)").should("not.be.null");

    cy.get(".form-control").type("bouchra");
    cy.get(`tbody > tr:first > :nth-child(1)`).contains("bouchra");
    cy.get(`tbody > tr:first > :nth-child(2)`).contains("Ouchite");

    cy.get("tbody > tr:first > :nth-child(4)").should("not.be.null");
    cy.get(".home").click();
    cy.get(".borderM > :nth-child(1) > .btn").click();
    cy.get("#userSelect").select("bouchra Ouchite");
    cy.get("form.ng-valid > .btn").click();

    cy.get(".form-control").type(20000);

    cy.get(".logout").click();

    cy.get(".home").click();
    cy.get(".borderM > :nth-child(1) > .btn").click();
    cy.get("#userSelect").select("bouchra Ouchite");
    cy.get("form.ng-valid > .btn").click();

    cy.get('[ng-class="btnClass2"]').click();
    cy.get(".form-control").type(100000);
    cy.get("form.ng-dirty > .btn").click();
    cy.get('[ng-class="btnClass3"]').click();

    cy.get("form.ng-pristine > .btn").click();
    cy.get('[ng-class="btnClass3"]').click();
    cy.get(".form-control").type(5000);
    cy.get("form.ng-dirty > .btn").click();
    cy.get('[ng-class="btnClass1"]').click();
    cy.reload();
  });
});
