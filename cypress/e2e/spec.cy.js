let Token, RefreshToken, ExpiresAt;

Cypress.Commands.add('auth', () => {
  describe('loginByAuth0Api', () => {
    it('passes', () => {
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
            Token = res.Token
            RefreshToken = res.RefreshToken
            ExpiresAt = res.ExpiresAt
        })
    })
  })
}) 


before(() => {
  cy.auth()
})

describe('Getting Data', () => {
  it.only('Service 1', () => {

    cy.intercept('https://api.sportsanddata.com/api/v1/GetLatestOdds?sportType=football&sportSubType=nfl', (req) => {
      req.headers['authorization'] = `token ${Token}`
    })
    .its('body')
    .then(res => {
        console.log(res)
    })

  })

})