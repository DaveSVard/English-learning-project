describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.viewport(1450, 768)

    cy.get('p').should('contain', "Learn English")
    cy.get('.navbar').each(a => {
      cy.wrap(a).within(() => {
        cy.get('i').should('exist')
        cy.get('span').should('exist')
        
        // cy.get('span').eq(1).should('contain', "See words")
        // cy.get('span').eq(2).should('contain', "Add word")
        // cy.get('span').eq(3).should('contain', "Check yourself")
        // cy.get('span').eq(4).should('contain', "Answers history")
        // cy.get('span').eq(5).should('contain', "Settings")
      })

      cy.get('.navbar')
      .parent('a')
      .within(() => {
        cy.get('span').eq(1).contains('See words')
        cy.get('span').eq(4).contains('Add word')
        cy.get('span').eq(2).contains('Check yourself')
        cy.get('span').eq(3).contains('Answers history')
        cy.get('span').eq(3).contains('Settings')
      })
    })
  })
})