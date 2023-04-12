// Global variables
let token
let request
let sports = [
              ['nfl', 'football', 0],
              ['ncaaf', 'football', 0], 
              ['nba' , 'basketball', 1],
              ['ncaab', 'basketball', 0],
              ['mlb' , 'baseball', 1],
              ['nhl' , 'hockey', 1]
            ];

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

// Run the auth function before all the tests
before(() => {
    cy.log('Auth: Getting the token')
    cy.auth()
})

// Run the auth function before each test
beforeEach(() => {
})

// Testing the endpoint LatestOdds
describe('Testing API: LatestOdds', () => {
  
    // Loop through the sports array and run the test for each sport
    sports.forEach(sport => {

        // Run the getTeams function to get the teams for the sport
        it('League: ' + sport[0], () => {
            request = 'GetData?MethodName=WG_spGetLatestOdds&MethodParams=leagueName=' + sport[0] + ',sportName=' + sport[1]

            // Create an object to store the team info
            let teamInfo = {
              homeSpread: 0,
              homeSpreadAmount: 0,
              homeMoneyLine: 0,
              awaySpread: 0,
              awaySpreadAmount: 0,
              awayMoneyLine: 0,
              totalPoints: 0,
              underTotalPointsAmount: 0,
              overTotalPointsAmount: 0,
            }

            // Make the request
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
                    teamInfo.homeSpread           = team.homeSpread           != '' ? teamInfo.homeSpread          : teamInfo.homeSpread+1
                    teamInfo.homeSpreadAmount     = team.homeSpreadAmount     != '' ? teamInfo.homeSpreadAmount    : teamInfo.homeSpreadAmount+1
                    teamInfo.homeMoneyLine        = team.homeMoneyLine        != '' ? teamInfo.homeMoneyLine       : teamInfo.homeMoneyLine+1
                    teamInfo.awaySpread           = team.awaySpread           != '' ? teamInfo.awaySpread          : teamInfo.awaySpread+1
                    teamInfo.awaySpreadAmount     = team.awaySpreadAmount     != '' ? teamInfo.awaySpreadAmount    : teamInfo.awaySpreadAmount+1
                    teamInfo.awayMoneyLine        = team.awayMoneyLine        != '' ? teamInfo.awayMoneyLine       : teamInfo.awayMoneyLine+1
                    teamInfo.totalPoints          = team.totalPoints          != '' ? teamInfo.totalPoints         : teamInfo.totalPoints+1
                    teamInfo.underTotalPointsAmount = team.underTotalPointsAmount != '' ? teamInfo.underTotalPointsAmount : teamInfo.underTotalPointsAmount+1
                    teamInfo.overTotalPointsAmount  = team.overTotalPointsAmount  != '' ? teamInfo.overTotalPointsAmount  : teamInfo.overTotalPointsAmount+1
                })
                // Run the assertions
                expect(res.status, 'Connection successful').to.eq(200)
                expect(res.body.data.length, 'Number of teams').to.be.greaterThan(0)

                expect(teamInfo.homeSpread, 'Teams without homeSpread').to.be.lessThan(1)
                expect(teamInfo.homeSpreadAmount, 'Teams without homeSpreadAmount').to.be.lessThan(1)
                expect(teamInfo.homeMoneyLine, 'Teams without homeMoneyLine').to.be.lessThan(1)
                expect(teamInfo.awaySpread, 'Teams without awaySpread').to.be.lessThan(1)
                expect(teamInfo.awaySpreadAmount, 'Teams without awaySpreadAmount').to.be.lessThan(1)
                expect(teamInfo.awayMoneyLine, 'Teams without awayMoneyLine').to.be.lessThan(1)
                expect(teamInfo.totalPoints, 'Teams without totalPoints').to.be.lessThan(1)
                expect(teamInfo.underTotalPointsAmount, 'Teams without underTotalPointsAmount').to.be.lessThan(1)
                expect(teamInfo.overTotalPointsAmount, 'Teams without overTotalPointsAmount').to.be.lessThan(1)
            })
        })
    })
})


// Testing the endpoint LatestOdds with persistence
describe('Testing API: LatestOdds with persistence', () => {

  // Run the getTeams function to get the teams for the sport
  it('League: NFL', () => {
      request = 'GetData?MethodName=WG_spGetLatestOdds&MethodParams=leagueName=nfl,sportName=football,gameDateTime=2022-12-04'

      // Object with the expected team values
      let teamInfo = {
        homeTeamShortName: 'PHI',
        homeSpread: -4.5,
        homeSpreadAmount: -110,
        homeMoneyLine: -200,
        awayTeamShortName: 'TEN',
        awaySpread: 4.5,
        awaySpreadAmount: -110,
        awayMoneyLine: 170,
        totalPoints: 44.5,
        underTotalPointsAmount: -110,
        overTotalPointsAmount: -110,
    }

      // Make the request
      cy.request({
          method: 'GET',
          url: encodeURI( request ),
          headers: {
              authorization: `Bearer ${token}` 
          },
          failOnStatusCode: false
      })
      .then(res => {
          expect(res.status, 'Connection successful').to.eq(200)
          expect(res.body.data.length, 'Number of games found on that day ').to.be.greaterThan(0)
          
          // Loop through the teams and check if the team has all its fields filled
          res.body.data.forEach(team => {

            // Filter the team by the one we want to test
            if ( team.awayTeamShortName == teamInfo.awayTeamShortName && team.homeTeamShortName == teamInfo.homeTeamShortName ) {
              // Show assertions header with team names
              Cypress.log({
                name: 'Assertions for the game between: ',
                message: team.awayTeamShortName + ' vs ' + team.homeTeamShortName,
              })
              // Run the assertions
              expect(team.homeSpread, 'Value for this exact match').to.be.eq(teamInfo.homeSpread)
              expect(team.homeSpreadAmount, 'Value for this exact match').to.be.eq(teamInfo.homeSpreadAmount)
              expect(team.homeMoneyLine, 'Value for this exact match').to.be.eq(teamInfo.homeMoneyLine)
              expect(team.awaySpread, 'Value for this exact match').to.be.eq(teamInfo.awaySpread)
              expect(team.awaySpreadAmount, 'Value for this exact match').to.be.eq(teamInfo.awaySpreadAmount)
              expect(team.awayMoneyLine, 'Value for this exact match').to.be.eq(teamInfo.awayMoneyLine)
              expect(team.totalPoints, 'Value for this exact match').to.be.eq(teamInfo.totalPoints)
              expect(team.underTotalPointsAmount, 'Value for this exact match').to.be.eq(teamInfo.underTotalPointsAmount)
              expect(team.overTotalPointsAmount, 'Value for this exact match').to.be.eq(teamInfo.overTotalPointsAmount)
            }
            else {
              Cypress.log({
                name: 'Game doesn\'t match: ',
                message: team.homeTeamShortName + ' vs ' + team.awayTeamShortName
            })
          }
        })
      })
  })
})