// @flow

import React, {Component, PropTypes} from 'react';
import { storiesOf } from '@kadira/storybook';
import {EditorPipelineGraph, defaultLayout} from '../components/editor/EditorPipelineGraph';
import {EditorSteps} from '../components/editor/EditorSteps';

import type {StepInfo} from '../components/editor/EditorSteps';

let __id = 1;

storiesOf('Pipeline Editor', module)
    .add('Graph - Basic', renderPiplineFlat)
    .add('Graph - Mixed', renderPipelineMixed)
    .add('Graph - Duplicate Names', renderPipelineDupNames)
    .add('Steps - Basic', renderStepsBasic)
    .add('Steps - Nesting', renderStepsNesting)
;

//--[ Steps List ]---------------------------------------------------------------

const stepsContainerStyle = {maxWidth: "50em", margin: "2em"};

function renderStepsBasic() {
    const steps = [
        makeStep("Echo"),
        makeStep("Run Script"),
        makeStep("Maven"),
        makeStep("NPM")
    ];

    function addStepClicked() {
        console.log("Add step");
    }

    function stepSelected(step) {
        console.log("Step Selected", step);
    }

    function deleteStepClicked(step) {
        console.log("Delete step", step);
    }

    return (
        <div style={stepsContainerStyle}>
            <EditorSteps steps={steps}
                         onAddStepClick={addStepClicked}
                         onStepSelected={stepSelected}
                         onDeleteStepClick={deleteStepClicked}/>
        </div>
    );
}

function renderStepsNesting() {
    const steps = [
        makeStep("Echo"),
        makeStep("Run Script"),
        makeStep("Retry", [
            makeStep("Echo"),
            makeStep("Run Script"),
            makeStep("Run Script"),
            makeStep("Run Script"),
            makeStep("Echo")
        ]),
        makeStep("NPM")
    ];

    return (
        <div style={stepsContainerStyle}>
            <EditorSteps steps={steps}/>
        </div>
    );
}

function makeStep(kind, nestedSteps?:Array<StepInfo>):StepInfo {
    const id = __id++;
    const children = nestedSteps || [];
    const isContainer = !!children.length;
    return {
        id,
        kind,
        isContainer,
        children
    };
}

//--[ Pipeline Graph ]-----------------------------------------------------------

function renderPiplineFlat() {

    const stages = [
        makeNode("Ken"),
        makeNode("Sagat"),
        makeNode("Ryu"),
        makeNode("Guile")
    ];

    // Reduce spacing just to make this graph smaller
    const layout = {nodeSpacingH: 90};

    function onNodeClick(a, b) {
        console.log("Node clicked", a, b);
    }

    return <div>
        <EditorPipelineGraph stages={stages} layout={layout} onNodeClick={onNodeClick}/>
    </div>;
}

function renderPipelineDupNames() {

    const stages = [
        makeNode("Build"),
        makeNode("Test"),
        makeNode("Browser Tests", [
            makeNode("Internet Explorer"),
            makeNode("Chrome")
        ]),
        makeNode("Test"),
        makeNode("Staging"),
        makeNode("Production")
    ];

    return (
        <div>
            <EditorPipelineGraph stages={stages}/>
        </div>
    );
}

function renderPipelineMixed() {

    const stages = [
        makeNode("Build"),
        makeNode("Test", [
            makeNode("JUnit"),
            makeNode("DBUnit"),
            makeNode("Jasmine")
        ]),
        makeNode("Browser Tests", [
            makeNode("Firefox"),
            makeNode("Edge"),
            makeNode("Safari"),
            makeNode("Chrome")
        ]),
        makeNode("Dev"),
        makeNode("Staging"),
        makeNode("Production", [
            makeNode("us-east-1"),
            makeNode("us-west-1 "),
            makeNode("us-west-2"),
            makeNode("ap-south-1")
        ])
    ];

    return <div>
        <EditorPipelineGraph stages={stages} selectedStage={stages[0]}/>
    </div>;
}


/// Simple helper for data generation
function makeNode(name, children = []) {
    const id = __id++;
    return {name, children, id};
}
