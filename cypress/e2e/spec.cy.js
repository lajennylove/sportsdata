let Token, RefreshToken, ExpiresAt;

Cypress.Commands.add('auth', () => {
      cy.request({
        method: 'POST',
        url: 'Authentication/token',
        body: {
            "ClientId" : "BF9E7D5C-C4C3-4C5E-84CD-E746CDF39826",
            "ClientGivenName" : "PointSpreadUser",
            "ClientKey" : "F1980C48CC2E4FE19237B6C7D3F2B7C3",
            "Email" : "PointSpread@PacificDev.com",
            "Role" : "Report",
        },
        })
        .then(res => {
            Token = res.body.Token
            RefreshToken = res.body.RefreshToken
            ExpiresAt = res.body.ExpiresAt
            localStorage.setItem('Token', Token)
        })
}) 


before(() => {
  cy.auth()
})

describe('Read API', () => {
  it('Test 1', () => {
    cy.request('GetLatestOdds?sportType=football&sportSubType=nfl',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` //no se como sea tu autorización
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
      //expect(res.body.data.user.id).to.equal('1')
    })

  })

})