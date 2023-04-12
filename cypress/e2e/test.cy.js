let url = 'https://pointspreads.com/sd-qa/'
let password = 'WidgetsReview@PS23'

describe('Go to Pointspreads and login into SD-QA', () => {

  // Go to Points Spreads SD QA 
  it('successfully loads', () => {

    // Set the viewport size
    cy.viewport('iphone-6')

    // Go to the URL
    cy.visit(url)

    // Fill the password field and press enter
    cy.get('input[name="post_password"]')
      .type(password)
      .type('{enter}')
    
    // Wait for 3 seconds the page to reload
    cy.wait(11000)

    // Close the pop-up
    cy.get('.boxzilla-close-icon',  { timeout: 1000 }).click()
    
    // Click on the SD-2 switch button to open the menu
    cy.get('#content .switchbutton').click()

    // Click on the NBA switch button
    cy.get('#content .switchbutton').contains('NBA').click()

  })

})