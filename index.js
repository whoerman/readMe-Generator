const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');
const chalk = require('chalk');

console.clear();
console.log("");
console.log(chalk.bold.yellow(`      Running the readMe Generator by Walter Hoerman...`));

console.log("");
console.log(chalk.magenta.bold(`      A Good readMe is very important to tell your users what your project is all about.`));
console.log(chalk.magenta.bold(`      Running this program will generate a readMe in MarkDown and write it to a file.`));
console.log(chalk.magenta.bold(`      You can then edit the wording in your own editor for a final product.`));

function checkName() {
  return inquirer.prompt([{
        type: "confirm",
        message: `
      Welcome to readMe Generator!
      Let me ask you a series of questions in order to generate
      a good readMe for your GitHub repository.
      Are you ready to begin?      
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
      }
    ])
    .then(function (nameRes) {
      console.log("");
      console.log(chalk.bold.green(`      Getting your public information from GitHub...`));
      console.log("");
      console.log(chalk.bold.yellow(`      I found your information...`));
      let username = nameRes.username;
      async function getGitHub() {

        let result = await axios.get(`https://api.github.com/users/${username}`);
        let userGitName = result.data.name;
        let userCompany = result.data.company;
        let location = result.data.location;
        let userPicURL = result.data.avatar_url;
        let userBio = result.data.bio;
        let gitInfo = {
          "name": userGitName,
          "location": location,
          "picture": userPicURL,
          "company": userCompany,
          "bio": userBio
        }

        let userEmail = result.data.email;
        if (userEmail === null) {
          return inquirer.prompt([{
            type: "input",
            message: `
            Your name is ${userGitName} and you are from ${location}!

            Due to privacy settings, your email was not available from GitHub.
            So we can include it on your readMe, what is your email?
            `,
            name: "userEmail"
          }]).then(function (backUpResult) {
            return secondQuestions({
              ...gitInfo,
              ...nameRes,
              ...backUpResult
            });
          })
        } else {
          return secondQuestions(nameRes);
        }
      }

      try {
        return getGitHub();
      } catch (err) {
        console.log("I can't find your Github. Please try a new name.")
        checkName();
      }

    })
}

function secondQuestions(prevResults) {
  console.log("");
  console.log(chalk.bold.yellow(`      I need to ask you a lot of questions to write a good readMe...`));
  return inquirer.prompt([{
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
      Please describe your project in a short sentence:
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
  ]).then(function (newResults) {
    let combineResults = {
      ...prevResults,
      ...newResults
    };
    return Promise.resolve(combineResults);
  });
};

checkName().then(function (combineResults) {
  checkCol(combineResults);
})

function checkCol(combineResults) {
    console.log("");
    console.log(chalk.bold.yellow(`      This sounds like a big project to serve an important need...`));
  return inquirer.prompt([{
    type: "confirm",
    message: `
      Did you have any collaborators on this project?
    `,
    name: "yesCol"
  }]).then(function (colQ) {
    let combineResults2 = {
      ...combineResults,
      ...colQ
    };
    if (colQ.yesCol) {
      addCollab(combineResults2);
    } else {
      thirdQuestions(combineResults2);
    }
  })
}

function addCollab(combineResults3) {
  console.log("");
  console.log(chalk.bold.yellow(`      A good team is vital for every project! Please give me their info so we can credit them.`));
  let combineResults4 = combineResults3;
  return inquirer.prompt([{
    type: "input",
    message: `
      What is the name of your collaborator?
    `,
    name: "newColName"
  },
  {
    type: "input",
    message: `
      What is their GitHub profile name?
    `,
    name: "newColGit"
  },

]).then(function (newCollab) {
  let newCollabObj = {"CollabName": newCollab.newColName, "CollabGit": newCollab.newColGit};
  let combineResults4 = { ...combineResults3, ...newCollabObj };
  thirdQuestions(combineResults4);
})
}

function thirdQuestions(combineResults5) {
  console.log("");
  console.log(chalk.bold.yellow(`      Just a few more questions then we will be done....`));
  let combineResults6 = combineResults5;
  return inquirer.prompt([
    {
    type: "input",
    message: `
      Please describe any testing that you have developed for your application."
    `,
    name: "testing"
  },
  {
    type: "input",
    message: `
      Please describe any licensing you desire your application."
    `,
    name: "license"
  },
]).then(function (thirdQinfo) {
    let finalData = { ...combineResults6, ...thirdQinfo };
    console.log(finalData);
  })
  
}
