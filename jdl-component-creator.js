#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');

const TEMPLATE_CHOICE_NAME = 'template-choice';
const COMPONENT_NAME = 'component-name';
const filePrefixesToNotModify = ['README', 'package', 'tsconfig'];

const templateChoices = fs.readdirSync(`${__dirname}/templates`);

const questions = [
    {
        name: TEMPLATE_CHOICE_NAME,
        type: 'list',
        message: 'Which template would you like to generate?',
        choices: templateChoices,
    },
    {
        name: COMPONENT_NAME,
        type: 'input',
        message: 'Name your component',
        validate: function(input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
];

inquirer.prompt(questions).then(answers => {
    const templateChoice = answers[TEMPLATE_CHOICE_NAME];
    const componentChoice = answers[COMPONENT_NAME];
    const templatePath = `${__dirname}/templates/${templateChoice}`;

    fs.mkdirSync(`${__dirname}/components/${componentChoice}`);

    createDirectoryContents(templatePath, componentChoice);
});

function createDirectoryContents(templatePath, componentChoice) {
    try {
        const filesToCreate = fs.readdirSync(templatePath);
        filesToCreate.forEach(file => {
            const originalFilePath = `${templatePath}/${file}`;
            const stats = fs.statSync(originalFilePath);

            if (stats.isFile()) {
                const contents = fs.readFileSync(originalFilePath);
                const fileName = renameFileBasedOnComponent(file, componentChoice);
                const writePath = `${__dirname}/components/${componentChoice}/${fileName}`;
                fs.writeFileSync(writePath, contents);
            }
        });
    } catch (e) {
        console.log('Error in creating directory contents: ', e);
    }
}

function renameFileBasedOnComponent(originalFile, componentChoice) {
    const extension = originalFile.substring(originalFile.indexOf('.'), originalFile.length);
    const prefix = originalFile.substring(0, originalFile.indexOf('.'));
    if (filePrefixesToNotModify.includes(prefix)) {
        return originalFile;
    }
    return componentChoice + extension;
}
