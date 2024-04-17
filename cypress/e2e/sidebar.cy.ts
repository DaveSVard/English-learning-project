describe("template spec", () => {
  it("check sidebar", () => {
    cy.visit("localhost:3000");
    cy.viewport(1450, 768);

    cy.get(".close-sidebar").should("exist").children("i").should("exist")
    cy.get(".sidebar__logo").should("exist").children("i").should("exist")
    cy.get(".sidebar__logo").should("exist").children("p").should("have.text", "Learn English")
    cy.get(".navbar").should("exist").within(() => {
      cy.get("a").eq(0).children("i").should("exist");
      cy.get("a").eq(1).children("i").should("exist");
      cy.get("a").eq(2).children("i").should("exist");
      cy.get("a").eq(3).children("i").should("exist");
      cy.get("a").eq(4).children("i").should("exist");
      cy.get("a").eq(0).children("span").should("have.text", "See words");
      cy.get("a").eq(1).children("span").should("have.text", "Add word");
      cy.get("a").eq(2).children("span").should("have.text", "Check yourself");
      cy.get("a").eq(3).children("span").should("have.text", "Answers history");
      cy.get("a").eq(4).children("span").should("have.text", "Settings");
    });

    cy.get('a[href="/seeWords"]').click();
    cy.location("pathname").should("equal", "/seeWords")
    cy.get('a[href="/addWord"]').click();
    cy.location("pathname").should("equal", "/addWord")
    cy.get('a[href="/checkYourself"]').click();
    cy.location("pathname").should("equal", "/checkYourself")
    cy.get('a[href="/answersHistory"]').click();
    cy.location("pathname").should("equal", "/answersHistory")
    cy.get('a[href="/settings"]').click();
    cy.location("pathname").should("equal", "/settings")
  });
});
