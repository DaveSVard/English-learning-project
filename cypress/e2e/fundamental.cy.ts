describe('template spec', () => {
  it("check addWords", () => {
    cy.viewport(1450, 768);
    cy.visit("localhost:3000");

    cy.get('a[href="/addWord"]').click();
    cy.location("pathname").should("equal", "/addWord");

    cy.get(".addWord__title")
      .should("exist")
      .children("h1")
      .should("have.text", "Add new word!");

    cy.get(".animatedGif__box-img").should("exist").children("img").should("exist")
    cy.get(".animated__box-content").should("exist").children("p").should("have.text", "Here you can add the words you want!")

    cy.get('input[name="english"]').should("exist").type("word");
    cy.get('input[name="english"]').invoke('val').then((value) => {
      expect(typeof value).to.equal('string'); 
    });
    cy.get('input[name="translate"]').should("exist").type("translation");
    cy.get('input[name="translate"]').invoke('val').then((value) => {
      expect(typeof value).to.equal('string'); 
    });
    cy.get('textarea[name="sentences.0"]').should("exist").type("This is an example sentence.");
    cy.get('textarea[name="sentences.0"]').invoke('val').then((value) => {
      expect(typeof value).to.equal('string'); 
    });
    cy.get('button[type="submit"]').click();

    cy.get('input[name="english"]').should('have.value', '');
    cy.get('input[name="translate"]').should('have.value', '');
    cy.get('textarea[name="sentences.0"]').should('have.value', '');

    cy.get('a[href="/seeWords"]').click();
    cy.location("pathname").should("equal", "/seeWords");

    cy.get(".seeWords__title").should("exist").children("h1").should("have.text", "Words!");

    cy.get(".seeWords__content").should("exist").then(($content) => {
      const wordsLength = $content.find(".seeWords__item").length;
      if (wordsLength > 0) {
        cy.get('.seeWords__item-top').should('exist').children("p").should("exist").should("have.text", "word")
        cy.get(".seeWords__item-icons").should('exist').children("button").should("exist")
        cy.get(".seeWords__item-icons").children("i").should("exist").click()

        cy.get(".seeWord__item-bottom").should("exist").children("p").should("exist").should("have.text", "translation")
        cy.get('.seeWord__sentences-items').should("exist").find('p').eq(0).should("have.text", "Sentences")
        

        cy.get(".animatedGif__box-img").should("exist").children("img").should("exist")
        cy.get(".animated__box-content").should("exist").within(() => {
          cy.get('p').eq(0).should("exist").contains('You added 1 words')
          cy.get('p').eq(1).should("exist").contains('Here you can add any words and test your knowledge')
        })
      }
    });

    cy.get('a[href="/checkYourself"]').click();
    cy.location("pathname").should("equal", "/checkYourself")

    cy.get(".check__title").should("exist").children("h1").should("have.text", "Check Yourself!");

    cy.get('input[type="radio"][id="english"]').should('exist');
    cy.get('input[type="radio"][id="armenian"]').should('exist');

    cy.get('input[type="radio"][id="armenian"]').check({force: true});
    cy.get('input[type="radio"][id="armenian"]').should('be.checked');

    cy.get(".check__choices-btns").should("exist").find("button").eq(0).should("exist").contains("Start").click()

    cy.get(".check__question-top").should("exist")
    cy.get(".check__question-top").children("i").should("exist")

    cy.get(".check__question-answer").should("exist").children("input").type("word").invoke('val').then((value) => {
      expect(typeof value).to.equal('string'); 
    });
    cy.get(".check__question-answer").children("span").should("exist")
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Other").click();
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Stop").click()

    cy.get('input[type="radio"][id="english"]').check({force: true});
    cy.get('input[type="radio"][id="english"]').should('be.checked');

    cy.contains("Start").click()
    cy.get(".check__question-answer").children("input").type("translation").invoke('val').then((value) => {
      expect(typeof value).to.equal('string'); 
    });
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Stop").click()

    cy.get('a[href="/answersHistory"]').click();
    cy.location("pathname").should("equal", "/answersHistory")

    cy.get(".history__title").should("exist").children("h1").should("have.text", "Answers History!");

    cy.get(".history__inner-wrapper").should("exist").then(($content) => {
      const historyLength = $content.find(".history__content").length;
      if(historyLength >= 1) {
        cy.get(".history__info").should("exist").find("p").eq(0).should("have.text", "1)")
        cy.get(".history__info").find("p").eq(1).should("have.text", "Score: 1")
      }
    })

    cy.get(".history__content-item__top").children("i").should("exist").click()
    cy.get(".history__content-item__bottom").should("have.length", 2).each(() => {
      cy.get(".answers__history-item").eq(0).within(() => {
        cy.get('p').eq(0).should("exist").should("have.text",'Your answer: translation')
        cy.get('p').eq(1).should("exist").should("have.text",'Right answer: translation')
      })
      cy.get(".answers__history-item").eq(1).within(() => {
      cy.get('p').eq(0).should("exist").invoke('text').should('match', /Your answer:\s*/)
      cy.get('p').eq(1).should("exist").should('have.text', "Right answer: word")
    })
      cy.get(".answers__history-item").eq(2).within(() => {
        cy.get('p').eq(0).should("exist").should("have.text",'Your answer: word')
        cy.get('p').eq(1).should("exist").should("have.text",'Right answer: word')
      })
    })

    cy.get(".animatedGif__box-img").should("exist").children("img").should("exist")
    cy.get(".animated__box-content").should("exist").children('p').should("exist").contains('Here you can see your tests history')
    
    cy.get('a[href="/settings"]').click();
    cy.location("pathname").should("equal", "/settings")
    cy.get(".settings__title").should("exist").children("h1").should("have.text", "Settings");
    cy.get(".speech").should("exist").and("have.length", 1).each(() => {
      cy.get(".range").eq(0).within(() => {
        cy.get("p").should("exist").should("have.text", "Pitch")
        cy.get("input").should("exist").type("2").invoke('val').then((value) => {
          expect(typeof value).to.equal('string'); 
        });
        cy.get("span").should("exist")
      })
      cy.get(".range").eq(1).within(() => {
        cy.get("p").should("exist").should("have.text", "Rate")
        cy.get("input").should("exist").type("2").invoke('val').then((value) => {
          expect(typeof value).to.equal('string'); 
        });
        cy.get("span").should("exist")
      })
      cy.get(".range").eq(2).within(() => {
        cy.get("p").should("exist").should("have.text", "Volume")
        cy.get("input").should("exist").type("2").invoke('val').then((value) => {
          expect(typeof value).to.equal('string'); 
        });
        cy.get("span").should("exist")
      })
        
      cy.get('.dropdown__options-item').should('have.length', 5).each(() => {
        cy.get('.dropdown__options-item').eq(0).should('have.text', 'Microsoft Irina - Russian (Russia)');
        cy.get('.dropdown__options-item').eq(1).should('have.text', 'Microsoft Mark - English (United States)');
        cy.get('.dropdown__options-item').eq(2).should('have.text', 'Microsoft Zira - English (United States)');
        cy.get('.dropdown__options-item').eq(3).should('have.text', 'Microsoft David - English (United States)');
        cy.get('.dropdown__options-item').eq(4).should('have.text', 'Microsoft Pavel - Russian (Russia)');
      })
    })

  });
})