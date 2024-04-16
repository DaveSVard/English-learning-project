describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.viewport(1920, 1080)

    cy.get('.navbar').find('a').should('exist').find("i.and.span").should("exist")
    cy.get('p').should('contain', "Learn English")
  })
})