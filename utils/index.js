import inquirer from 'inquirer';
import generateMarkdown from './generateMarkdown.js';
import fs from 'fs';

function promptUser() {
    inquirer.prompt([
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
            message: 'Please provide installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide usage information:',
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Please provide contribution guidelines:',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please provide test instructions:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add another project?',
            default: false,
        },
    ]).then((answers) => {
        // Display the generated markdown
        // const fs = require('fs');
        const markdownContent = generateMarkdown(answers);
        console.log(markdownContent);
        // promptUser("Does this look correct?");
        fs.writeFile('README.md', markdownContent, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File written successfully');
            }
        });


        // Check if the user wants to add another project
        if (answers.addMore) {
            promptUser();
        } else {
            console.log('Thank you for using the README generator!');
            process.exit(0);
        }
    });
}

// Start the prompt
promptUser();
