<p align="center">
  <a href="https://www.cypress.io">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="./assets/cypress-logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="./assets/cypress-logo-light.png">
      <img alt="Cypress Logo" src="./assets/cypress-logo-light.png">
    </picture>    
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/lajennylove/sportsdata" alt="License">
  <img src="https://img.shields.io/github/repo-size/lajennylove/sportsdata" alt="Repo Size">
  <img src="https://img.shields.io/github/stars/lajennylove/sportsdata?style=social" alt="Stars">
</p>
---

# Sports and Data API testing with Cypress IO.

benefits to using Cypress to automate your API tests:

1. Faster and more reliable testing: With Cypress, you can run your API tests quickly and reliably, without the need for manual intervention. This allows you to catch issues earlier in the development cycle and improve the quality of your code
2. Consistent results: Automated tests are more consistent than manual tests, which means that you can trust the results to be accurate and reliable.
3. Improved testing coverage: With automated tests, you can test a wider range of scenarios and edge cases than would be practical with manual testing. This means that you can ensure that your API endpoints and data are working as expected in a variety of situations.
4. Faster feedback: Automated tests can provide feedback on the quality of your code much faster than manual testing. This allows you to address issues more quickly and keep your development cycle moving smoothly.
5. Cost savings: Automated testing can be less expensive in the long run than manual testing, as it requires less human labor and can be run more frequently.

Overall, using Cypress to automate your API tests can help you ensure the quality and reliability of your API endpoints and data, while also saving time and money.

## HOW TO USE:

1. clone the repo `git clone https://github.com/lajennylove/sportsdata.git`
2. `cd sportsdata` to enter the project's folder
3. `npm install` or `yarn` to install all your npm node_modules
4. Then to start the project in your `npm cy:open` or `yarn cy:open` to start the live server
5. A new window is going to popup there click on the E2E Testing
6. Now, select Electron and then click on Start E2E Testing in Electron
7. Another window is going to popup, go to E2E specs, select the one called api.cy.js click on the text api in blue.
8. There you will see the tests already included running.
9. To add new tests edit the cypress/e2e/api.cy.js file and add your custo functions with cypress running, this way you will be seeing your changes in hot-reload.

## DIRECTORY STRUCTURE:

```
sportsdata/             # Base directory for your installation
├── cypress/            # Cypress Folder
│ ├── e2e/              # Tests codes folder
│ ├── fixtures/         # Load a fixed set of data located in a file
│ └── support/          # Folder for commands or imports
├── .env.examle         # Rename as .env and fill with the real credentials
├── .gitignore          # Gitignore
├── cypress.config.js   # Cypress config file
├── package.json        # Your Node package admin file
└── README.md           # This file
```

## Author comments

✨ Happy Testing! ✨

For any questions contact @lajennylove at github
