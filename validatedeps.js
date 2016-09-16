#!/usr/bin/env node
/**
 * Created by cmeyers on 9/16/16.
 */
const fs = require('fs');
const start = new Date().getTime();

// match x, tilde, gt, lt, star, carat or whitespace in version
const IMPRECISE_VERSION_CHARS_PATTERN = /[x~><*|\^\s]+/;

try {
    fs.statSync('package.json');
} catch (error) {
    console.error('ERROR: Could not find package.json');
    process.exit(1);
}

try {
    fs.statSync('npm-shrinkwrap.json');
} catch (error) {
    console.error('ERROR: Could not find npm-shrinkwrap.json');
    process.exit(1);
}

const packages = require('./package.json');
const packageDeps = packages.dependencies;
const packageDevDeps = packages.devDependencies;

checkImpreciseDependencies(packageDeps);
checkImpreciseDependencies(packageDevDeps);
checkDuplicateDependencies(packageDeps, packageDevDeps);
const allDeps = Object.assign({}, packageDeps, packageDevDeps);

const shrinkwrap = require('./npm-shrinkwrap.json');
validateDepsAgainstShrinkwrap(allDeps, shrinkwrap);

const ellapsed = new Date().getTime() - start;
console.log(`dependencies look good! took ${ellapsed}ms`);
// done!



function checkImpreciseDependencies(dependencies) {
    const badDeps = [];

    Object.keys(dependencies).forEach(name => {
        const version = dependencies[name];

        if (IMPRECISE_VERSION_CHARS_PATTERN.test(version)) {
            badDeps.push(`${name}@${version}`);
        }
    });

    if (badDeps.length) {
        badDeps.forEach(dep => console.error(`${dep} must use precise version`));
        console.error(`did you use 'npm install dep --save/-dev -E' ?`)
        process.exit(1);
    }
}

function checkDuplicateDependencies(depList1, depList2) {
    const keys1 = Object.keys(depList1);
    const keys2 = Object.keys(depList2);
    const duplicates = keys1.concat(keys2).filter((name, index, allKeys) => index !== allKeys.indexOf(name));

    if (duplicates.length) {
        duplicates.forEach(name => console.error(`${name} is already defined in 'dependencies'; remove from 'devDependencies'`));
        process.exit(1);
    }
}

function validateDepsAgainstShrinkwrap(allDeps, shrinkwrap) {
    const badDeps = [];
    const shrinkDeps = shrinkwrap.dependencies;

    Object.keys(allDeps).forEach(name => {
        const version = allDeps[name];

        if (!shrinkDeps[name]) {
            badDeps.push(`${name}@${version} missing in shrinkwrap`);
        } else if (shrinkDeps[name].version !== version) {
            badDeps.push(`${name} should be ${version} but found ${shrinkDeps[name.version]}`);
        }
    });

    if (badDeps.length) {
        badDeps.forEach(message => console.error(message));
        process.exit(1);
    }
}
