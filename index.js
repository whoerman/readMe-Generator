const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');



function checkName() {
  return inquirer.prompt([{
        type: "confirm",
        message: `
      Welcome to readMe Generator!
      Let me ask you a series of questions in order to generate
      a good readMe for your GitHub repository.

      enter Y to begin...
      
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
      let username = nameRes.username;
      async function getGitHub() {

        let result = await axios.get(`https://api.github.com/users/${username}`);
        let userGitName = result.data.name;
        let userCompany = result.data.company;
        let location = result.data.location;
        let userPicURL = result.data.avatar_url;
        let userBio = result.data.bio;
        let gitInfo = {
          "Name": userGitName,
          "Location": location,
          "Picture": userPicURL,
          "Company": userCompany,
          "Bio": userBio
        }

        let userEmail = result.data.email;
        if (userEmail === null) {
          return inquirer.prompt([{
            type: "input",
            message: `
            Due to privacy settings, you email was not available from GitHub.
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
        console.log("error")
      }

    })
}

function secondQuestions(prevResults) {
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
  return inquirer.prompt([{
    type: "confirm",
    message: `
  Did you have any collaborators on this project?
  (y/n) 
  `,
    name: "yesCol"
  }]).then(function (colQ) {
    let combineResults2 = {
      ...combineResults,
      ...colQ
    };
    console.log(combineResults2);
    if (colQ.yesCol) {
      addCollab(combineResults2);
    } else {
      thirdQuestions(combineResults2);
    }
  })
}

function addCollab(combineResults3) {
  console.log("abby helped");
  let combineResults4 = combineResults3;
  console.log(combineResults4);
}

function thirdQuestions(combineResults3) {
  console.log("no one helped");
  let combineResults4 = combineResults3;
  console.log(combineResults4);
}