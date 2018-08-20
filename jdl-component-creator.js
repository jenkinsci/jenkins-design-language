#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');

const TEMPLATE_CHOICE_NAME = 'template-choice';
const COMPONENT_NAME = 'component-name';
const configFiles = ['README', 'package', 'tsconfig'];

const templateChoices = fs.readdirSync(`${__dirname}/.templates`);
let outdir = 'components';

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
    outdir = templateChoice;
    const componentChoice = answers[COMPONENT_NAME];
    const templatePath = `${__dirname}/.templates/${templateChoice}`;

    fs.mkdirSync(`${__dirname}/${outdir}/${componentChoice}`);

    createDirectoryContents(templatePath, componentChoice);
});

function createDirectoryContents(templatePath, componentChoice) {
    try {
        const filesToCreate = fs.readdirSync(templatePath);
        filesToCreate.forEach(file => {
            const originalFilePath = `${templatePath}/${file}`;
            const stats = fs.statSync(originalFilePath);

            if (stats.isFile()) {
                let contents = fs.readFileSync(originalFilePath);
                const fileName = renameFileBasedOnComponent(file, componentChoice);
                const writePath = `${__dirname}/${outdir}/${componentChoice}/${fileName}`;
                contents = ('' + contents)
                    .replace(/\[componentName\]/g, componentChoice)
                    .replace(/\[componentVersion\]/g, require('./lerna').version)
                    .replace(/\[componentPath\]/g, componentChoice.toLowerCase())
                    .replace(/\[className\]/g, componentChoice)
                    .replace(/\[classVersion\]/g, require('./lerna').version)
                    .replace(/\[classPath\]/g, componentChoice.toLowerCase())
                    .replace(/\[cssUtilVersion\]/g, require('./utils/css/package').version)
                ;
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
    if (configFiles.includes(prefix)) {
        return originalFile;
    }
    return componentChoice + extension;
}
