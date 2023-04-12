// Global variables
let token
let request

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

// Testing the endpoint GetBetByGame
describe('Testing API: GetBetByGame', () => {

  // Run the getTeams function to get the teams for the sport
  it('League: MLB', () => {
    request = 'GetData?MethodName=WG_spGetBetByGame&MethodParams=leagueName=mlb,sportName=baseball,homeTeamShortName=SF,awayTeamShortName=LAD'

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
        expect(res.body.data.length, 'Number of rows found for that game').to.be.greaterThan(0)
        
        // Loop through the teams and check if the fields match the expected values
        res.body.data.forEach(team => {

          Cypress.log({
            name: 'Asserts for Team: ',
            message: team.chosenTeamShortName,
          })

         Cypress.log({
            name: 'Info: ',
            message: team,
         })

      })
    })
  })
})

// Testing the endpoint GetBetByGame whit persistance
describe('Testing API: GetBetByGame with persistance', () => {

  // Run the getTeams function to get the teams for the sport
  it('League: MLB', () => {
    request = 'GetData?MethodName=WG_spGetBetByGame&MethodParams=leagueName=mlb,sportName=baseball,homeTeamShortName=KC,awayTeamShortName=TOR,gameDateTime=2023-04-06'

    // Object with the expected team values
    let away = {
      chosenTeamShortName: "TOR",
      betPercentage: 81.556,
      moneyPercentage: 89.252,
      consensus: 7.697,
      mlBetPercentage: 79.821,
      mlMoneyPercentage: 93.684,
      mlConsensus: 13.863,
      atsBetPercentage: 83.26,
      atsMoneyPercentage: 86.399,
      atsConsensus: 3.139,
      overBetPercentage: 30.667,
      overMoneyPercentage: 42.386,
      overConsensus: 11.719,
      underBetPercentage: 69.333,
      underMoneyPercentage: 57.614,
      underConsensus: 11.719,
    }

    let home = {
      chosenTeamShortName: "KC",
      betPercentage: 18.444,
      moneyPercentage: 10.748,
      consensus: 7.697,
      mlBetPercentage: 20.179,
      mlMoneyPercentage: 6.316,
      mlConsensus: 13.863,
      atsBetPercentage: 16.74,
      atsMoneyPercentage: 13.601,
      atsConsensus: 3.139,
      overBetPercentage: 30.667,
      overMoneyPercentage: 42.386,
      overConsensus: 11.719,
      underBetPercentage: 69.333,
      underMoneyPercentage: 57.614,
      underConsensus: 11.719,
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
        expect(res.body.data.length, 'Number of rows found for that game').to.be.greaterThan(0)
        
        // Loop through the teams and check if the fields match the expected values
        res.body.data.forEach(team => {

          Cypress.log({
            name: 'Asserts for Team: ',
            message: team.chosenTeamShortName,
          })

          if ( team.chosenTeamShortName == away.chosenTeamShortName ) {
            expect(team.chosenTeamShortName, 'Chosen team name').to.eq(away.chosenTeamShortName)
            expect(team.betPercentage, 'Bet percentage').to.eq(away.betPercentage)
            expect(team.moneyPercentage, 'Money percentage').to.eq(away.moneyPercentage)
            expect(team.consensus, 'Consensus').to.eq(away.consensus)
            expect(team.mlBetPercentage, 'Money line bet percentage').to.eq(away.mlBetPercentage)
            expect(team.mlMoneyPercentage, 'Money line money percentage').to.eq(away.mlMoneyPercentage)
            expect(team.mlConsensus, 'Money line consensus').to.eq(away.mlConsensus)
            expect(team.atsBetPercentage, 'ATS bet percentage').to.eq(away.atsBetPercentage)
            expect(team.atsMoneyPercentage, 'ATS money percentage').to.eq(away.atsMoneyPercentage)
            expect(team.atsConsensus, 'ATS consensus').to.eq(away.atsConsensus)
            expect(team.overBetPercentage, 'Over bet percentage').to.eq(away.overBetPercentage)
            expect(team.overMoneyPercentage, 'Over money percentage').to.eq(away.overMoneyPercentage)
            expect(team.overConsensus, 'Over consensus').to.eq(away.overConsensus)
            expect(team.underBetPercentage, 'Under bet percentage').to.eq(away.underBetPercentage)
            expect(team.underMoneyPercentage, 'Under money percentage').to.eq(away.underMoneyPercentage)
            expect(team.underConsensus, 'Under consensus').to.eq(away.underConsensus)
          }
          else {
            expect(team.chosenTeamShortName, 'Chosen team name').to.eq(home.chosenTeamShortName)
            expect(team.betPercentage, 'Bet percentage').to.eq(home.betPercentage)  
            expect(team.moneyPercentage, 'Money percentage').to.eq(home.moneyPercentage)
            expect(team.consensus, 'Consensus').to.eq(home.consensus)
            expect(team.mlBetPercentage, 'Money line bet percentage').to.eq(home.mlBetPercentage)
            expect(team.mlMoneyPercentage, 'Money line money percentage').to.eq(home.mlMoneyPercentage)
            expect(team.mlConsensus, 'Money line consensus').to.eq(home.mlConsensus)
            expect(team.atsBetPercentage, 'ATS bet percentage').to.eq(home.atsBetPercentage)
            expect(team.atsMoneyPercentage, 'ATS money percentage').to.eq(home.atsMoneyPercentage)
            expect(team.atsConsensus, 'ATS consensus').to.eq(home.atsConsensus)
            expect(team.overBetPercentage, 'Over bet percentage').to.eq(home.overBetPercentage)
            expect(team.overMoneyPercentage, 'Over money percentage').to.eq(home.overMoneyPercentage)
            expect(team.overConsensus, 'Over consensus').to.eq(home.overConsensus)
            expect(team.underBetPercentage, 'Under bet percentage').to.eq(home.underBetPercentage)
            expect(team.underMoneyPercentage, 'Under money percentage').to.eq(home.underMoneyPercentage)
            expect(team.underConsensus, 'Under consensus').to.eq(home.underConsensus)
          }

      })
    })
  })
})