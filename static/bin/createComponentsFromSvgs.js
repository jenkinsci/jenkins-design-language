const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function walkDir(dir, eachFile) {
    fs.readdirSync(dir).forEach(file => {
        fs.statSync(path.join(dir, file)).isDirectory()
            ? walkDir(path.join(dir, file), eachFile)
            : eachFile(dir, file);
    });
}

function upperFirst(str) {
    if (!str || str.length < 2) {
        return str;
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function toCamelCase(str) {
    return str
        .split('-')
        .map((part, idx) => (idx === 0 ? part : upperFirst(part)))
        .join('');
}

function fileId(file, id) {
    return toCamelCase(file.replace('.svg', '').replace(/[^a-zA-Z0-9-]/g, '') + '-' + id);
}

function forEachAttribute(element, eachAttribute) {
    const attrs = [];
    if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
            attrs.push(element.attributes[i]);
        }
    }
    attrs.forEach(eachAttribute);
}

function forEachElement(elements, eachElement) {
    const attrs = [];
    if (elements) {
        for (let i = 0; i < elements.length; i++) {
            attrs.push(elements[i]);
        }
    }
    attrs.forEach(eachElement);
}

function fixIds(dir, file, document) {
    const idElements = document.querySelectorAll('*[id]');
    const allElements = document.querySelectorAll('*');
    if (idElements) {
        forEachElement(idElements, el => {
            const id = el.getAttribute('id');
            if (id) {
                const idRef = '#' + id;
                const newId = fileId(file, id);
                // console.log('found id:', id, 'replacing with:', newId, 'looking for idRef:', idRef);
                el.setAttribute('id', newId);
                forEachElement(allElements, element => {
                    forEachAttribute(element, attr => {
                        if (attr.value && attr.value.indexOf(idRef) > 0) {
                            // console.log('found attr with idRef:', attr.value);
                            element.setAttribute(attr.name, attr.value.replace(idRef, '#' + newId));
                        }
                    });
                });
            }
        });
    }
}

function fixDashedAttributes(document) {
    const allElements = document.querySelectorAll('*');
    forEachElement(allElements, element => {
        forEachAttribute(element, attr => {
            // console.log('found attr:', attr);
            if (attr.name && !attr.name.startsWith('data-') && attr.name.indexOf('-') > 0) {
                const fixed = toCamelCase(attr.name);
                // console.log('found attr with dash:', attr.name, 'replacing with:', fixed);
                element.removeAttribute(attr.name);
                element.setAttribute(fixed, attr.value);
            }
        });
    });
}

function createComponentsFromSvgs() {
    const outDir = path.join(__dirname, '..', '..', 'icons');

    fs.writeFileSync(
        path.join(outDir, 'IconProps.tsx'),
        `/**
 * All Icons share a common set of properties
 */
export interface IconProps {
    className?: string;
    size?: number;
    width?: number;
    height?: number;
}
`
    );

    const imagesDir = path.join(__dirname, '..', 'images');
    // console.log('__dirname:', __dirname, 'imagesDir:', imagesDir);
    walkDir(imagesDir, (dir, file) => {
        const dirParts = dir.substring(imagesDir.length).split(path.sep);
        // console.log('dir:', dir, 'file:', file, 'dirParts:', dirParts);
        if (file.endsWith('.svg')) {
            const svgText = fs.readFileSync(path.join(dir, file), 'utf8');

            // console.log('svg: ', svgText);

            var dom = new JSDOM(svgText);
            var document = dom.window.document;

            // we need to make unique IDs within each SVG or in-browser it has the possibility of referencing
            // other SVG's IDs, e.g. #clip0
            fixIds(dir, file, document);
            fixDashedAttributes(document);

            const svgElement = document.querySelector('svg'); // only want the first

            let defaultSize = 16;
            const simpleComponentName = file
                .replace('.svg', '')
                .split('-')
                .map(part => {
                    if (part === 'icon' || part === 'color') {
                        return null;
                    }
                    const val = parseInt(part, 10);
                    if (val) {
                        defaultSize = val;
                        return null;
                    }
                    return part;
                })
                .filter(s => s)
                .join('-');

            const componentName = upperFirst(toCamelCase(simpleComponentName));

            // Set up a viewBox attribute so the icon will auto-scale to the container
            if (!svgElement.getAttribute('viewBox')) {
                const width = svgElement.getAttribute('width') || defaultSize;
                const height = svgElement.getAttribute('height') || width;
                svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
            }

            // finally, replace the actual SVG size
            svgElement.setAttribute('className', 'REACT_className_REACT');
            forEachAttribute(svgElement, attr => {
                if ('width' == attr.name || 'height' == attr.name) {
                    svgElement.setAttribute(attr.name, 'REACT_' + attr.name + '_REACT');
                }
            });

            const newSvg = document.body.innerHTML.replace(/[\n]/g, '');
            // console.log('original svg:\n', svgText, '\ntransformed svg:\n', newSvg);

            let contents = `import * as React from 'react';
import { IconProps } from './IconProps';
export function ${componentName}({className, size = ${defaultSize}, width = size, height = size}: IconProps) {
    return (
        ${newSvg.replace(/"REACT_([a-zA-Z0-9]+)_REACT"/g, '{$1}')}
    );
}
`;
            const fileName = componentName + '.tsx';
            fs.writeFileSync(path.join(outDir, fileName), contents);

            // exec('git add ' + fileName);
        }
    });
}

// Go, go, go!
createComponentsFromSvgs();
