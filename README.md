# QA AUTOMATION CHALLENGE - E2E Tests

## Prerequisite

- Node v16+
- Cypress v13+

## Install

- `npm install` - install dependencies
- `npm install cypress --save-dev` - install cypress

## Environment

By default application will run on `https://www.sapfioneer.com/`

## Run Cypress with GUI

- `npx cypress open`

## Run Cypress headless in Electron

- `npm run cy:run`

## Run Cypress headless in other browsers than Electron

- `npm run cy:run:chrome`
- `npm run cy:run:firefox`
- `npm run cy:run:edge`

## Reports

Use any of the following commands:

- `npm run cy:run`
- `npm run cy:run:chrome`
- `npm run cy:run:firefox`
- `npm run cy:run:edge`

The command run complete set of tests and generate report with Mochawesome generator. It will be added to `/cypress/reports/` directory.
