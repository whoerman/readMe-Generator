function generateMarkdown(finaldata) {
  return `# ${finaldata.projectTitle}

  This project was developed by ${finaldata.name} of ${finaldata.location}

  ![headshot](${finaldata.picture} "headshot")

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
  
  I would like the thank ${finaldata.CollabName} (Gitname: ${finaldata.CollabGit}) for help with this project.
  
  ## License
  
  ${finaldata.license}

  ---

  ## Badges
  
![followers badge](https://img.shields.io/badge/Followers-${finaldata.followers}-blue "followers badge")

![ID badge](https://img.shields.io/badge/Git%20ID-${finaldata.id}-red "IDbadge")





  
  ## Contributing
  
  ${finaldata.contribute}

  ## Tests
  
  ${finaldata.testing}
  
  `;
}

module.exports = generateMarkdown;
