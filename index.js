const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');
const chalk = require('chalk');

const generateMarkdown = require("./generateMarkdown");

console.clear();
console.log("");
console.log(chalk.bold.bgGreen(`      Running the readMe Generator by Walter Hoerman...      `));

console.log("");
console.log(chalk.magenta.bold(`      A Good readMe is very important to tell your users what your project is all about.`));
console.log(chalk.magenta.bold(`      Running this program will generate a readMe in MarkDown and write it to a file.`));
console.log(chalk.magenta.bold(`      You can then edit the wording in your own editor for a final product.`));
console.log("");
console.log(chalk.red.bold(`      For many questions, a default answer has been provided for your convienience.`));
console.log(chalk.red.bold(`      Hit enter to use the defaualt - Start typing and it disappears!`));

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
      (Reminder: this ia a CLI so it has to be all on one line! You can edit it later yourself...)
      `,
      name: "projectInstallation"
    },
    {
      type: "input",
      message: `
      What is the process required to use your project? 
      Provide a description of how the user can interact with the program and the results.
      (Again, remember this has to be all one line!)
      `,
      name: "projectUsage"
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
    name: "testing",
    default: "A this time, no testing has been built for this application, either due to level of complexity or resources. If, in the future,  complexity or dependability warrants it, we would welcome help developing testing."
  },
  {
    type: "input",
    message: `
      Please describe any licensing you desire your application."
    `,
    name: "license",
    default: "No licensing is currently used for this application."
  },
  {
    type: "input",
    message: `
      Name any badges you have for your project."
    `,
    name: "badges",
    default: "there are currently no badges associated with this application."
  },
  {
    type: "input",
    message: `
      Are there any instructions for someone who would like to contribute to your project?"
    `,
    name: "contributing",
    dafault: "We would welcome help in developing this application. Please contact us if you are interested"
  },
]).then(function (thirdQinfo) {
    finaldata = { ...combineResults6, ...thirdQinfo };
    lastQuestion(finaldata);
  })
  
}

function lastQuestion(finaldata2) {
  console.log("");
  console.log(chalk.bold.green(`      Congratulations! i have all the information I need!`));
  console.log("");
  console.log(chalk.bold.green(`      I would now like to generate the readMe for you to view and edit.`));
  console.log(chalk.bold.green(`      I will save it to a file named readMe.md.`));
  console.log(chalk.bold.green(`      I will also display the markdown language on the screen.`));
return inquirer.prompt([
  {
    type: "confirm",
    message: `
      Would you like me to proceed?
    `,
    name: "yesFinal"
  }
]).then(function (lastQ) {
  console.clear();
  let finaldata2 = { ...finaldata, ...lastQ };
  console.clear();
  console.log("");
  console.log(chalk.bold.bgGreen(`      Here is your markdown page for ${finaldata.projectTitle}!         `));
  console.log("");
  let markDownPage = generateMarkdown(finaldata);
  console.log(markDownPage);

  fs.writeFile("readMe.md", markDownPage, function(err) {

    if (err) {
      return console.log(err);
    }
  
    console.log(chalk.bold.bgGreen(`      The readMe file for ${finaldata.projectTitle} should be in this folder!         `));
  
  });
})
}
