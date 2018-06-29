#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');

const templateChoices = fs.readdirSync(`${__dirname}/components/templates`);
const questions = [
    {
        name: 'template-choice',
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
    const templateChoice = answers['template-choice'];
    const componentChoice = answers['component-name'];
    const templatePath = `${__dirname}/templates/${templateChoice}`;

    fs.mkdirSync(`${__dirname}/components/${componentChoice}`);

    createDirectoryContents(templatePath, componentChoice);
});

function createDirectoryContents(templatePath, componentChoice) {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const originalFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(originalFilePath);

        if (stats.isFile()) {
            const contents = fs.readdirSync(originalFilePath, 'utf8');
            const writePath = `${__dirname}/${componentChoice}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        }
    });
}
