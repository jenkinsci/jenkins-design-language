// @flow

import React, { Component, PropTypes } from 'react';
import { getAddIconGroup, getGrabIconGroup, getDeleteIconGroup } from './common';

export type StepInfo = {
    id: number,
    kind: string,
    isContainer: bool,
    children: Array<StepInfo>
}

type Props = {
    steps: Array<StepInfo>,
    selectedStep?: StepInfo,
    onAddStepClick?: () => any,
    onStepSelected?: (step:StepInfo) => any,
    onDeleteStepClick?: (step:StepInfo) => any
}

type State = {
    selectedStep: ?StepInfo
};

type DefaultProps = typeof EditorSteps.defaultProps;

export class EditorSteps extends Component<DefaultProps, Props, State> {

    static defaultProps = {
        steps: []
    };

    //static propTypes = {...}
    // TODO: React proptypes ^^^

    props:Props;
    state:State;

    constructor(props:Props) {
        super(props);
        this.state = {selectedStep: props.selectedStep};
    }

    renderStep(step:StepInfo, selectedStep:?StepInfo) {

        let classNames = ["editor-step"];

        if (step === selectedStep) {
            classNames.push("selected");
        }

        let children = null;

        if (step.isContainer && step.children && step.children.length) {
            children = (
                <div className="editor-nested-steps">
                    { step.children.map(step => this.renderStep(step, selectedStep)) }
                </div>
            );
        }

        return (
            <div className={classNames.join(' ')} key={'s_' + step.id}>
                <div className="editor-step-grab">
                    <svg width="24" height="24">
                        <g transform="translate(12,12)">{ getGrabIconGroup() }</g>
                    </svg>
                </div>
                <div className="editor-step-main" onClick={(e) => this.stepClicked(step, e)}>
                    <div className="editor-step-content">
                        <div className="editor-step-title">
                            {step.kind} ({step.id})
                        </div>
                        {children}
                    </div>
                    <svg width="24"
                         height="24"
                         className="delete-step-button"
                         onClick={() => this.deleteStepClicked(step)}>
                        <g transform="translate(12,12)">{ getDeleteIconGroup(12) }</g>
                    </svg>
                </div>
            </div>
        );
    }

    deleteStepClicked(step:StepInfo) {
        const {onDeleteStepClick} = this.props;

        if (onDeleteStepClick) {
            onDeleteStepClick(step);
        }
    }

    stepClicked(step:StepInfo, e) {
        e.preventDefault();
        e.stopPropagation(); // Don't bubble up to parent

        console.log("clicked", step.kind, step.id); // TODO: RM


        const {onStepSelected} = this.props;

        if (step !== this.state.selectedStep) {
            this.setState({selectedStep: step});
            if (onStepSelected) {
                onStepSelected(step);
            }
        }
    }

    addStepClicked() {
        const {onAddStepClick} = this.props;
        if (onAddStepClick) {
            onAddStepClick();
        }
    }

    render() {

        const {steps} = this.props;
        const {selectedStep} = this.state;

        return (
            <div className="editor-steps">
                { steps.map(step => this.renderStep(step, selectedStep)) }
                <span className="add-step-button" onClick={() => this.addStepClicked()}>
                    <svg width="24" height="24">
                        <g transform="translate(12,12)">{ getAddIconGroup(12) }</g>
                    </svg>
                    Add step
                </span>
            </div>
        );
    }
}

