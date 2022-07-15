
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
        })
}) 

// Cypress function to store the league's team names into an let array using the league name as parameter
Cypress.Commands.add('getTeams', (leagueName) => { 
    cy.request({
        method: 'GET',
        url: 'GetLeagueTeams?leagueName=' + leagueName,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('Token')
        }
    })
    .then(res => {
        let teams = []
        
        teams = res.body.data;
        //console.log(teams)

        return teams
    }
    )
})

// Run the auth function before each test
before(() => {
  cy.auth()
})


// Testing the endpoint GetLeagueTeams
describe('Testing API: GetLeagueTeams', () => {
  it('League: NFL', () => {
    cy.request('GetLeagueTeams?leagueName=NFL',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(32)
    })
  })

  it('League: NCAAB', () => {
    cy.request('GetLeagueTeams?leagueName=NCAAB',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(950)
    })
  })

  it('League: NCAAF', () => {
    cy.request('GetLeagueTeams?leagueName=NCAAF',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(702)
    })
  })

  it('League: NBA', () => {
    cy.request('GetLeagueTeams?leagueName=NBA',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(30)
    })
  })

})

// Testing the endpoint GetLeaguePlayers
describe('Testing API: GetLeaguePlayers', () => {

  it('Players in: NFL', () => {
    cy.request('GetLeaguePlayers?leagueName=NFL',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(2923)
    })
  })

  it('Players in: NCAAB', () => {
    cy.request('GetLeaguePlayers?leagueName=NCAAB',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(7659)
    })
  })

  it('Players in: NCAAF', () => {
    cy.request('GetLeaguePlayers?leagueName=NCAAF',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.be.greaterThan(1)
    })
  })

  it('Players in: NBA', () => {
    cy.request('GetLeaguePlayers?leagueName=NBA',{
      headers: {
        authorization: `Bearer ${localStorage.getItem('Token')}` 
      }
    })
    .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.data.length).to.eq(501)
    })
  })

})

// Testing the endpoint GetLastGames
describe('Testing API: GetLastGames', () => { 
  it('League: NFL', () => {
    // Get the team names from method getTeams and store the returned array into variable teams then loop through the array and make a request for each team
    cy.getTeams('NFL').then(teams => {
      teams.forEach(team => {
        
        cy.request('GetLastGames?sportType=football&leagueName=NFL&teamName=' + team.Team_Nick,{
          headers: {
            authorization: `Bearer ${localStorage.getItem('Token')}` 
          }
        })
        .then(res => {
            console.log('GetLastGames?sportType=football&leagueName=NFL&teamName=' + team.Team_Nick)
            expect(res.status).to.eq(200)
            console.log(res)
            //expect(res.body.data.length).to.be.greaterThan(1)
        })
      })
    })
  })
})