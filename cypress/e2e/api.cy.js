// Global variables
let token
let teams = []

// Function to auth to the application and store the token
Cypress.Commands.add('auth', () => {
  cy.request({
    method: 'POST',
    url: 'Authentication/token',
    body: {
      "ClientId" :        Cypress.env('ClientID'),
      "ClientGivenName" : Cypress.env('ClientGivenName'),
      "ClientKey" :       Cypress.env('ClientKey'),
      "Email" :           Cypress.env('Email'),
      "Role" :            Cypress.env('Role')
    },
  })
  .then(res => {
    localStorage.setItem('Token', res.body.Token)
    token = res.body.Token
    Cypress.log({
      name: 'Token received: ',
      message: res.body.Token
    })
  })
}) 

// Cypress function to store the league's team names into an let array using the league name as parameter
Cypress.Commands.add('getTeams', (leagueName) => {
  cy.request({
    method: 'GET',
    url: 'GetLeagueTeams?leagueName=' + leagueName,
    headers: {
      authorization: `Bearer ${token}` 
    }
  })
  .then(res => {       
    teams = res.body.data;
    Cypress.log({
      name: 'Number or teams to check: ',
      message: res.body.data.length
    })
    return teams
  })
})

// Run the auth function before all the tests
before(() => {
  cy.log('Auth: Getting the token')
  cy.auth()
})

// Run the auth function before each test
beforeEach(() => {
})

// Testing the endpoint GetLeagueTeams
describe('Testing API: GetLeagueTeams', () => {
  it('League: NFL', () => {
    cy.request('GetLeagueTeams?leagueName=NFL',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'Error:',
          message: 'No teams found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info:',
          message: res.body.data.length + ' teams were found in the league'
        })
      }
    })
  })

  it('League: NCAAB', () => {
    cy.request('GetLeagueTeams?leagueName=NCAAB',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'Error:',
          message: 'No teams found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info:',
          message: res.body.data.length + ' teams were found in the league'
        })
      }
    })
  })

  it('League: NCAAF', () => {
    cy.request('GetLeagueTeams?leagueName=NCAAF',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'Error:',
          message: 'No teams found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info:',
          message: res.body.data.length + ' teams were found in the league'
        })
      }
    })
  })

  it('League: NBA', () => {
    cy.request('GetLeagueTeams?leagueName=NBA',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'Error:',
          message: 'No teams found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info:',
          message: res.body.data.length + ' teams were found in the league'
        })
      }
    })
  })

})
