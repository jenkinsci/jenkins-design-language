#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');

const templateChoices = fs.readdirSync(`${__dirname}/components/templates`);
const questions = [
    {
        name: 'component-choice',
        type: 'list',
        message: 'Which template would you like to generate?',
        choices: templateChoices,
    },
    {
        name: 'component-name',
        type: 'input',
        message: 'Name your component',
        validate: function(input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
];

inquirer.prompt(questions).then(answers => {
    console.log('answers ', answers);
});
