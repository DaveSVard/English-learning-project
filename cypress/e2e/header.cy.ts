describe('template spec', () => {
  it("check header", () => {
    cy.visit("localhost:3000");
    cy.viewport(1450, 768);

    cy.get(".search__form").should("exist").children("input").should("exist")
    cy.get(".search__form").should("exist").children("button").should("exist")
  
    cy.get(".header__icons").should("exist")
    cy.viewport(768, 560);
    cy.get("#search-btn").should("exist").click()
    cy.get('input[type="text"][placeholder="Search words..."]').should("exist")
    cy.viewport(1450, 768);

    cy.get("#menu-btn").should("exist").click()
    cy.get("#menu-btn").should("exist").click()
    cy.get("#theme-btn").should("exist").click()
    cy.window().its('localStorage.dark-mode').should('eq', 'enabled');
    cy.get("#theme-btn").should("exist").click()
    cy.window().its('localStorage.dark-mode').should('eq', 'disabled');
  })
})