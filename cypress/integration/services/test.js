import 'cypress-localstorage-commands'
let user

Cypress.Commands.add('postToken', () => {
    cy.request({
    method: 'POST',
    url: 'https://api.sportsanddata.com/api/v1/Authentication/token',
    body: {
        "ClientId" : "BF9E7D5C-C4C3-4C5E-84CD-E746CDF39826",
        "ClientGivenName" : "PointSpreadUser",
        "ClientKey" : "F1980C48CC2E4FE19237B6C7D3F2B7C3",
        "Email" : "PointSpread@PacificDev.com",
        "Role" : "Report",
    },
    })
    .its('body')
    .then(res => {
        console.log(res)
        user = res.user
        cy.setLocalStorage('identity_token', res.jwt)
    })
})

before(() => {
    cy.postToken()
    cy.saveLocalStorage()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  after(() => {
    // quit and close browser
  })

  describe('Authentication', () => {
    it.only('should login', () => {
      cy.getLocalStorage('identity_token').should('exist')
      cy.getLocalStorage('identity_token').then(token => {
        console.log('Identity token', token)
      })

      cy.visit(siteUrl)

    })

  })