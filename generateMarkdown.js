function generateMarkdown(finaldata) {
  return `# ${finaldata.projectTitle}

  This project was developed by ${finaldata.name} of ${finaldata.location}
  ${finaldata.picture}

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
  
  ${finaldata.projectUsage}
  
  ## Credits
  
  ${finaldata.CollabName}
  ${finaldata.CollabGit}
  
  ## License
  
  ${finaldata.license}
  
  ---

  ## Badges
  
  ${finaldata.badges}
  
  ## Contributing
  
  ${finaldata.contibuting}

  ## Tests
  
  ${finaldata.testing}
  
  `;
}

module.exports = generateMarkdown;
