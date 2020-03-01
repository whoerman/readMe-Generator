function generateMarkdown(finaldata) {
  return `# ${finaldata.projectTitle}

  ## Description 
  
  ${finaldata.projectDescription}
  
  As a ${finaldata.position}, I developed this project because ${finaldata.projectBecause},
  
  
  ## Table of Contents 
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  
  
  ## Installation
  
  ${finaldata.projectInstallation}
  
  
  ## Usage 
  
  
  
  
  ## Credits
  
  ${finaldata.CollabName}
  ${finaldata.CollabGit}
  
  ## License
  
  ${finaldata.license}
  
  
  ---
  
  🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
  
  ## Badges
  
  ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
  
  
  
  
  ## Contributing
  
  If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.
  
  ## Tests
  
  ${finaldata.testing}
  
  `;
}

module.exports = generateMarkdown;
