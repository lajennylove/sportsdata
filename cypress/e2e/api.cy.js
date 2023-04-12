// Global variables
let token
let teams = []
let request
let sports = ['NFL', 'NBA', 'MLB', 'NHL', 'NCAAF', 'NCAAB']

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
      request = 'GetData?MethodName=WG_spGetLeagueTeams&MethodParams=leagueName=' + sport

      let teamInfo = {
        teamName: 0,
        teamFirstName: 0,
        teamNickName: 0,
        teamShortName: 0,
        teamConfName: 0,
        teamConfNameShort: 0,
        teamDivName: 0,
        teamDivNameShort: 0,
        teamLocationCountry: 0,
        teamThumbnail: 0,
        teamLogo: 0
      }
  
      cy.request({
        method: 'GET',
        url: encodeURI( request ),
        headers: {
          authorization: `Bearer ${token}` 
        },
        failOnStatusCode: false
      })
      .then(res => {
        
        // Loop through the teams and check if the team has all its fields filled
        res.body.data.forEach(team => {
          teamInfo.teamName           = team.teamName           != '' ? teamInfo.teamName          : teamInfo.teamName+1
          teamInfo.teamFirstName      = team.teamFirstName      != '' ? teamInfo.teamFirstName     : teamInfo.teamFirstName+1
          teamInfo.teamNickName       = team.teamNickName       != '' ? teamInfo.teamNickName      : teamInfo.teamNickName+1
          teamInfo.teamConfName       = team.teamConfName       != '' ? teamInfo.teamConfName      : teamInfo.teamConfName+1
          teamInfo.teamConfNameShort  = team.teamConfNameShort  != '' ? teamInfo.teamConfNameShort : teamInfo.teamConfNameShort+1
          teamInfo.teamDivName        = team.teamDivName        != '' ? teamInfo.teamDivName       : teamInfo.teamDivName+1
          teamInfo.teamDivNameShort   = team.teamDivNameShort   != '' ? teamInfo.teamDivNameShort  : teamInfo.teamDivNameShort+1
          teamInfo.teamLogo           = team.teamLogo           != '' ? teamInfo.teamLogo          : teamInfo.teamLogo+1
          teamInfo.teamThumbnail      = team.teamThumbnail      != '' ? teamInfo.teamThumbnail     : teamInfo.teamThumbnail+1
        })
        
        // Run the assertions
        expect(res.status, 'Connection successful').to.eq(200)
        expect(res.body.data.length, 'Number of teams').to.be.greaterThan(0)
        expect(teamInfo.teamName, 'Teams without name').to.be.lessThan(1)
        expect(teamInfo.teamFirstName, 'Teams without first name').to.be.lessThan(1)
        expect(teamInfo.teamNickName, 'Teams without nick name').to.be.lessThan(1)
        expect(teamInfo.teamConfName, 'Teams without conference name').to.be.lessThan(1)
        expect(teamInfo.teamConfNameShort, 'Teams without conference short name').to.be.lessThan(1)
        expect(teamInfo.teamDivName, 'Teams without division name').to.be.lessThan(1)
        expect(teamInfo.teamDivNameShort, 'Teams without division short name').to.be.lessThan(1)
        expect(teamInfo.teamLogo, 'Teams without logo').to.be.lessThan(1)
        expect(teamInfo.teamThumbnail, 'Teams without thumbnail').to.be.lessThan(1)
        
      })
    })

  })


})
