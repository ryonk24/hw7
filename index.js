// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the usage information?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What are the contribution guidelines?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the test instructions?',
  },
];
const licenses = [
  'MIT',
  'Apache 2.0',
  'GPL 3.0',
  'BSD 3-Clause',
  'None',
];
const licensesQuestions = [
  {
    type: 'list',
    name: 'license',
    message: 'What license will you use?',
    choices: licenses,
  },
];
const contactQuestions = [
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
  },
];
// Removed duplicate declaration of confirmationQuestions
const tableOfContentsQuestions = [
  {
    type: 'checkbox',
    name: 'tableOfContents',
    message: 'Select the sections to include in the table of contents:',
    choices: [
      'Installation',
      'Usage',
      'Contributing',
      'Tests',
      'License',
      'Contact Information',
    ],
  },
];
const confirmationQuestions = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Would you like to add a table of contents?',
  },
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  return writeFileAsync(path.join(process.cwd(), fileName), data);
}

// TODO: Create a function to initialize app
async function init() {
  try {
    const answers = await inquirer.prompt(questions);
    const licenseAnswers = await inquirer.prompt(licensesQuestions);
    const contactAnswers = await inquirer.prompt(contactQuestions);
    const tableOfContentsAnswers = await inquirer.prompt(tableOfContentsQuestions);
    const confirmationAnswers = await inquirer.prompt(confirmationQuestions);

    // Combine all answers into one object
    const allAnswers = {
      ...answers,
      ...licenseAnswers,
      ...contactAnswers,
      ...tableOfContentsAnswers,
      ...confirmationAnswers,
    };

    // Generate markdown content
    const markdownContent = generateMarkdown(allAnswers);

    // Write to file
    await writeToFile('README.md', markdownContent);
    console.log('Successfully wrote to README.md');
  } catch (err) {
    console.error(err);
  }
}


// Function call to initialize app
init();
