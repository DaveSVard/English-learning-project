describe("template spec", () => {
  // it("check sidebar", () => {
  //   cy.visit("localhost:3000");
  //   cy.viewport(1450, 768);

  //   cy.get(".close-sidebar").should("exist").children("i").should("exist")
  //   cy.get(".sidebar__logo").should("exist").children("i").should("exist")
  //   cy.get(".sidebar__logo").should("exist").children("p").should("have.text", "Learn English")
  //   cy.get(".navbar").should("exist").within(() => {
  //     cy.get("a").eq(0).children("i").should("exist");
  //     cy.get("a").eq(1).children("i").should("exist");
  //     cy.get("a").eq(2).children("i").should("exist");
  //     cy.get("a").eq(3).children("i").should("exist");
  //     cy.get("a").eq(4).children("i").should("exist");
  //     cy.get("a").eq(0).children("span").should("have.text", "See words");
  //     cy.get("a").eq(1).children("span").should("have.text", "Add word");
  //     cy.get("a").eq(2).children("span").should("have.text", "Check yourself");
  //     cy.get("a").eq(3).children("span").should("have.text", "Answers history");
  //     cy.get("a").eq(4).children("span").should("have.text", "Settings");
  //   });

  //   cy.get('a[href="/seeWords"]').click();
  //   cy.location("pathname").should("equal", "/seeWords")
  //   cy.get('a[href="/addWord"]').click();
  //   cy.location("pathname").should("equal", "/addWord")
    // cy.get('a[href="/checkYourself"]').click();
    // cy.location("pathname").should("equal", "/checkYourself")
  //   cy.get('a[href="/answersHistory"]').click();
  //   cy.location("pathname").should("equal", "/answersHistory")
  //   cy.get('a[href="/settings"]').click();
  //   cy.location("pathname").should("equal", "/settings")

  //   cy.visit('http://localhost:3000/seeWords');
  // });

  // it("check header", () => {
  //   cy.visit("localhost:3000");
  //   cy.viewport(1450, 768);

  //   cy.get(".search__form").should("exist").children("input").should("exist")
  //   cy.get(".search__form").should("exist").children("button").should("exist")
  //   // cy.get(".search__form").should("exist").children("button").should("exist").type('E').should("have.value", "English")

  //   cy.get(".header__icons").should("exist")
  //   cy.viewport(768, 560);
  //   cy.get("#search-btn").should("exist").click()
  //   cy.get('input[type="text"][placeholder="Search words..."]').should("exist")
  //   cy.viewport(1450, 768);
  // })

  // it("check seeWords", () => {
  //   cy.visit("localhost:3000");
  //   cy.viewport(1450, 768);

    // cy.get(".seeWords__title")
    //   .should("exist")
    //   .children("h1")
    //   .should("have.text", "Words!");

    // cy.get(".seeWords__content").should("exist").then(($content) => {
    //   const wordsLength = $content.find(".seeWords__item").length;
    //   if (wordsLength > 0) {
    //     // cy.get(".seeWords__item-top").should("exist").children("p").should("exist")
    //     cy.contains('.seeWords__item-top p', '{elm.english}').should('be.visible').and('have.text', '{expectedText}')

    //   }
    // });

  // });
  
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

    cy.get(".check__question-answer").should("exist").children("input").type("word")
    cy.get(".check__question-answer").children("span").should("exist")
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Other").click();
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Stop").click()

    cy.get('input[type="radio"][id="english"]').check({force: true});
    cy.get('input[type="radio"][id="english"]').should('be.checked');

    cy.contains("Start").click()
    cy.get(".check__question-answer").children("input").type("translation")
    cy.get('button[type="submit"]').contains("Check").click();
    cy.contains("Stop").click()

    
  });

});
