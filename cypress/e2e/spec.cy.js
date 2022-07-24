let token

// Function to auth to the application and store the token
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
  let teams = []
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
  cy.log('Auth0: Getting the token')
  cy.auth()
})

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

// Testing the endpoint GetLeaguePlayers
describe('Testing API: GetLeaguePlayers', () => {

  it('Players in: NFL', () => {
    cy.request('GetLeaguePlayers?leagueName=NFL',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'No Players',
          message: 'No players found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info: ',
          message: res.body.data.length + ' players were found in the league'
        })
      }
    })
  })

  it('Players in: NBA', () => {
    cy.request('GetLeaguePlayers?leagueName=NBA',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'No Players',
          message: 'No players found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info: ',
          message: res.body.data.length + ' players were found in the league'
        })
      }
    })
  })

  /* 
  it('Players in: NCAAB', () => {
    cy.request('GetLeaguePlayers?leagueName=NCAAB',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      expect(res.status, 'Connection successful').to.eq(200)
      if (res.body.data.length <= 0) {
        Cypress.log({
          name: 'No Players',
          message: 'No players found in the league'
        })
      } else {
        expect(res.body.data.length).to.be.greaterThan(0)
        Cypress.log({
          name: 'Info: ',
          message: res.body.data.length + ' players were found in the league'
        })
      }
    })
  })

  it('Players in: NCAAF', () => {
    cy.request('GetLeaguePlayers?leagueName=NCAAF',{
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
        expect(res.status, 'Connection successful').to.eq(200)
        if (res.body.data.length <= 0) {
          Cypress.log({
            name: 'No Players',
            message: 'No players found in the league'
          })
        } else {
          expect(res.body.data.length).to.be.greaterThan(0)
          Cypress.log({
            name: 'Info: ',
            message: res.body.data.length + ' players were found in the league'
          })
        }
    })
  })
  */

})

// Testing the endpoint GetLatestOdds
describe('Testing API: GetLatestOdds', () => {

  it('GetLatestOdds: NFL', () => {
      cy.request({
          method: 'GET',
          url: 'GetLatestOdds?sportType=football&sportSubType=nfl',
          headers: {
            authorization: `Bearer ${token}` 
          }
      })
      .then(res => {
        expect(res.status, 'Connection successful').to.eq(200)
        if (res.body.data.length <= 0) {
          Cypress.log({
            name: 'Error:',
            message: 'No odds found in the league'
          })
        } else {
          let seasons = 0
          let preseasons = 0
          expect(res.body.data.length).to.be.greaterThan(0)
          Cypress.log({
            name: 'Info:',
            message: res.body.data.length + ' odds were found in the league'
          })
          res.body.data.forEach(element => {
            if(element.sportsubtype === 'NFL         ') seasons++
            else preseasons++
          })
          Cypress.log({
            name: 'Info:',
            message: 'NFLPreseason: ' + preseasons + ', NFL : ' + seasons
          })
        }
      }
      )
  })

  it('GetLatestOdds: NBA', () => {
    cy.request({
        method: 'GET',
        url: 'GetLatestOdds?sportType=basketball&sportSubType=nba',
        headers: {
          authorization: `Bearer ${token}` 
        }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        //console.log(res)
    })
  })

  /*
  it('GetLatestOdds: NCAAF', () => {
    cy.request({
        method: 'GET',
        url: 'GetLatestOdds?sportType=football&sportSubType=NCAAF',
        headers: {
          authorization: `Bearer ${token}` 
        }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        //console.log(res)
    })
  })

  it('GetLatestOdds: NCAAB', () => {
    cy.request({
        method: 'GET',
        url: 'GetLatestOdds?sportType=basketball&sportSubType=NCAAB',
        headers: {
          authorization: `Bearer ${token}` 
        }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        //console.log(res)
    })
  })
  */

})

// Testing the endpoint GetLastGames
describe('Testing API: GetLastGames', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetLastGames?sportType=football&sportSubType=nfl&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}`,
            accept: `application/json`
          }
        })
        .then(res => {
            //console.log('GetLastGames?sportType=football&sportSubType=nfl&team_name=' + team_name)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetLastGames?sportType=basketball&leagueName=NBA&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetLastGames?sportType=football&leagueName=NBA&team_name=' + team_name)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetLastGames?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetLastGames?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetLastGames?sportType=basketball&leagueName=NCAAB&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetLastGames?sportType=football&leagueName=NCAAB&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */

})

// Testing the endpoint GetInjuries
describe('Testing API: GetInjuries', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetInjuries?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetInjuries?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetInjuries?sportType=basketball&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetInjuries?sportType=footbbasketballall&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetInjuries?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetInjuries?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetInjuries?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetInjuries?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */

})

// Testing the endpoint GetTeamStandings
describe('Testing API: GetTeamStandings', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStandings?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetTeamStandings?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStandings?sportType=basketball&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetTeamStandings?sportType=footbbasketballall&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStandings?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamStandings?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStandings?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamStandings?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */
})

// Testing the endpoint GetTeamStats
describe('Testing API: GetTeamStats', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetTeamStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStats?sportType=basketball&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetTeamStats?sportType=footbbasketballall&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */
})

// Testing the endpoint GetTreads
describe('Testing API: GetTreads', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetTreads?sportType=football&sportSubType=nfl&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}`,
            accept: `application/json`
          }
        })
        .then(res => {
            //console.log('GetTreads?sportType=football&sportSubType=nfl&team_name=' + team_name)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetTreads?sportType=basketball&leagueName=NBA&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTreads?sportType=football&leagueName=NBA&team_name=' + team_name)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetTreads?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTreads?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetTreads?sportType=basketball&leagueName=NCAAB&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTreads?sportType=football&leagueName=NCAAB&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */

})

// Testing the endpoint GetWagerOfLastNGames
describe('Testing API: GetWagerOfLastNGames', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetWagerOfLastNGames?sportType=football&sportSubType=nfl&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}`,
            accept: `application/json`
          }
        })
        .then(res => {
            //console.log('GetWagerOfLastNGames?sportType=football&sportSubType=nfl&team_name=' + team_name)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        let team_name = encodeURIComponent(team.Team_First+' '+team.Team_Nick)
        cy.request('GetWagerOfLastNGames?sportType=basketball&leagueName=NBA&team_name=' + team_name,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetWagerOfLastNGames?sportType=football&leagueName=NBA&team_name=' + team_name)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetWagerOfLastNGames?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetWagerOfLastNGames?sportType=football&leagueName=NCAAF&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetWagerOfLastNGames?sportType=basketball&leagueName=NCAAB&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetWagerOfLastNGames?sportType=football&leagueName=NCAAB&teamName=' + team.Team_Nick)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */

})

// Testing the endpoint GetPlayerStats
describe('Testing API: GetPlayerStats', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetPlayerStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetPlayerStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetPlayerStats?sportType=basketball&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetPlayerStats?sportType=footbbasketballall&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetPlayerStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetPlayerStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetPlayerStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetPlayerStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */
})

// Testing the endpoint GetTeamBetStats
describe('Testing API: GetTeamBetStats', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetTeamBetStats?sportType=football&sportSubType=nfl&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=basketball&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetTeamBetStats?sportType=footbbasketballall&sportSubType=nba&seasonName=2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamBetStats?sportType=football&sportSubType=NCAAF&2022-2023&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamBetStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */
})

// Testing the endpoint GetTeamBetStats
describe('Testing API: GetTeamBetStats', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=football&sportSubType=nfl&seasonName=2021-2022&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
            //console.log('GetTeamBetStats?sportType=football&sportSubType=nfl&seasonName=2021-2022&teamNameShort=' + team.Team_Short)
            expect(res.status).to.eq(200)
            //console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NBA', () => { 
    cy.getTeams('NBA').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=basketball&sportSubType=nba&seasonName=2021-2022&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log(GetTeamBetStats?sportType=footbbasketballall&sportSubType=nba&seasonName=2021-2022&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  /*
  it('League: NCAAF', () => { 
    cy.getTeams('NCAAF').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=football&sportSubType=NCAAF&seasonName=2021-2022&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamBetStats?sportType=football&sportSubType=NCAAF&seasonName=2021-2022&teamNameShort=' + team.Team_Short)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })

  it('League: NCAAB', () => { 
    cy.getTeams('NCAAB').then(teams => {
      teams.forEach(team => {
        cy.request('GetTeamBetStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,{
          headers: {
            authorization: `Bearer ${token}` 
          }
        })
        .then(res => {
          //console.log('GetTeamBetStats?sportType=basketball&sportSubType=NCAAB&2022-2023&teamNameShort=' + team.Team_Short,)
          expect(res.status).to.eq(200)
          //console.log(res)
          //expect(res.body.data.length).to.be.greaterThan(0)
        })
      })
    })
  })
  */
})