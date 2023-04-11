// Global variables
let token
let teams = []
let request
let sports = ['NFL', 'NBA', 'MLB', 'NHL']

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
  
  // Loop through the sports array and run the test for each sport
  sports.forEach(sport => {

    // Run the getTeams function to get the teams for the sport
    it('League: ' + sport, () => {

      // URL encode the request
      request = encodeURI( 'GetLeagueTeams?leagueName=' + sport )
      
      // Run the request
      cy.request(request, {
        headers: {
          authorization: `Bearer ${token}` 
        }
      })
      .then(res => {
        
        // Check if the request was successful
        expect(res.status, 'Connection successful').to.eq(200)
        
        // Check if the response has data
        if (res.body.data.length <= 0) {
          Cypress.log({
            name: 'Error:',
            message: 'No teams found in the league'
          })
        } 
        else {
          expect(res.body.data.length).to.be.greaterThan(0)
          Cypress.log({
            name: 'Info:',
            message: res.body.data.length + ' teams were found in the league'
          })
        }
        
      })
    })

  })
 
  

  it('League: NFL', () => {
    request = encodeURI( 'GetData?MethodName=WG_spGetLeagueTeams&MethodParams=leagueName:NFL' )

    cy.request(request, {
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
