const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');

inquirer
  .prompt([
    {
      type: "confirm",
      message: `
      Welcome to readMe Generator!
      Let me ask you a series of questions in order to generate
      a good readMe for your GitHub repository.

      enter y to begin...
      
      `,
      name: "yesStart"
    },
    {
      type: "input",
      message: `
      What is your GitHub user name?
      (we are going to get some information from your public profile)
      `,
      name: "username"
    },
    {
      type: "input",
      message: `
      We will try to get your email from your GitHub, 
      but if the privacy settings do not allow access, what is your email?
      `,
      name: "backupEmail"
    },
    {
      type: "input",
      message: `
      What is your position on this project? (developer, coder, etc)
      `,
      name: "position"
    },
    {
      type: "input",
      message: `
      What is the Title of your Project?
      `,
      name: "projectTitle"
    },
    {
      type: "input",
      message: `
      Please describe your project in a short sentence
      `,
      name: "projectDescription"
    },
    {
      type: "input",
      message: `
      Why did you want to develop this project?
      `,
      name: "projectBecause"
    },
    {
      type: "input",
      message: `
      What are the steps required to install your project? 
      Provide a step-by-step description of how to get the development environment running.
      `,
      name: "projectInstallation"
    },
    {
      type: "confirm",
      message: `
      Did you have any collaborators on this project? (y/n)
      `,
      name: "projectInstallation"
    },
    {
      type: "input",
      name: 'collab',
      message: `
      What was their names?
      `
      },
  ])
  .then(function (inquirerRes) {
    let username = inquirerRes.username;
    let projTitle = inquirerRes.projectTitle;
    let projDesc = inquirerRes.projectDescription;
    async function getGitHub() {

      let result = await axios.get(`https://api.github.com/users/${username}`);

      let userGitName = result.data.name;
      let userEmail = result.data.email;
      if (userEmail === null) {
        userEmail = inquirerRes.backupEmail;
      }
      let location = result.data.location;

      console.log(`Name: ${userGitName}`);
      console.log(`Email: ${userEmail}`);
      console.log(`Location: ${location}`);
      console.log(`Your Project Tile: ${projTitle}`);
      console.log(`Summary: ${projDesc}`);
      console.log(result.data.avatar_url);
      
    };
    getGitHub();
  })