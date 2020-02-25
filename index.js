const axios = require("axios");
const inquirer = require("inquirer");

console.log(`
Welcome to readMe Generator!
Let me ask you a series of questions in order to generate
a good readMe for your GitHub repository.

`);

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    {
      type: "input",
      message: "What is the Title of your Project?",
      name: "projectTitle"
    },
    {
      type: "input",
      message: "Please describe your project in a short sentence",
      name: "projectDescription"
    },
  ])
  .then(function(inquirerRes) {
    let username = inquirerRes.username;
    let projTitle = inquirerRes.projectTitle;
    let projDesc = inquirerRes.projectDescription;
    async function getGitHub() {
  
      let result = await axios.get(`https://api.github.com/users/${username}`);
      
      let userGitName = result.data.name;
      let userEmail = result.data.email;
      let location = result.data.location;

      console.log(`Name: ${userGitName}`);
      console.log(`Email: ${userEmail}`);
      console.log(`Location: ${location}`);
      console.log(`Your Project Tile: ${projTitle}`)
      console.log(`Summary: ${projDesc}`)
    };
    getGitHub();
  })
