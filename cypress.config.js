require('dotenv').config()
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:process.env.BASE_API_URL,
    env: {
      // environment variables
      MiddlewareUrl:process.env.BASE_MIDDLEWARE_URL,
      ClientID:process.env.CLIENT_ID,
      ClientGivenName:process.env.CLIENT_GIVEN_NAME,
      ClientKey:process.env.CLIENT_KEY,
      Email:process.env.EMAIL,
      Role:process.env.ROLE,
    }
  }
})
