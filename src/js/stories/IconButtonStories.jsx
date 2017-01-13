/* eslint-disable */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { shapes } from '@jenkins-cd/react-material-icons';

import { Button, IconButton } from '../components';
import { CustomIcons } from './IconButtonStoryHelpers';

storiesOf('IconButton', module)
    .add('material', Material)
    .add('custom', Custom)
    .add('sizing', Sizing)
;

const style = {
    padding: 10,
};


function Material() {
    return (
        <div>
            <div style={style}>
                <p>using iconName (Material UI icons)</p>

                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    { Object.keys(shapes).slice(0, 25).sort().map(shape => (
                        <div key={shape}  style={{padding: 5}}>
                            <IconButton
                                label={shape}
                                iconName={shape}
                                style={{textTransform: 'capitalize'}}
                            />
                        </div>
                    ) )}
                </div>
            </div>
            <div style={style}>
                <p>with className=monochrome</p>

                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    { Object.keys(shapes).slice(0, 25).sort().map(shape => (
                        <div key={shape}  style={{padding: 5}}>
                            <IconButton
                                className="monochrome"
                                label={shape}
                                iconName={shape}
                                style={{textTransform: 'capitalize'}}
                            />
                        </div>
                    ) )}
                </div>
            </div>
        </div>
    );
}


function Custom() {
    return (
        <div>
            <div style={style}>
                <p>using custom icon, inlined svg</p>

                <IconButton label="Git">
                     <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <polygon id="path-1" points="0 24 24 24 24 0 0 0"></polygon>
                        </defs>
                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="social-git">
                                <g id="Fill-1">
                                    <mask id="mask-2" fill="white">
                                        <use xlinkHref="#path-1"></use>
                                    </mask>
                                    <g id="Mask"></g>
                                    <path d="M23.5471033,10.9311734 L13.0685777,0.452709449 C12.4654989,-0.15090315 11.4868346,-0.15090315 10.8827111,0.452709449 L8.7070308,2.62895358 L11.4669844,5.38922097 C12.1084575,5.17243237 12.8442188,5.3179158 13.35536,5.82906676 C13.8696355,6.3436132 14.013549,7.08539588 13.7915408,7.72923191 L16.4517214,10.3894631 C17.0955451,10.1674507 17.8378361,10.3108446 18.3521115,10.8259134 C19.0703733,11.5439277 19.0703733,12.7080564 18.3521115,13.4265931 C17.6333273,14.1453909 16.469482,14.1453909 15.7504367,13.4265931 C15.2100426,12.8859275 15.0765765,12.0919066 15.3502995,11.4263917 L12.8690315,8.9453376 L12.8690315,15.47407 C13.0440262,15.5607854 13.209357,15.6764931 13.35536,15.8219765 C14.0736218,16.540252 14.0736218,17.7041195 13.35536,18.4234397 C12.6370982,19.141454 11.4724694,19.141454 10.7547299,18.4234397 C10.0364681,17.7041195 10.0364681,16.540252 10.7547299,15.8219765 C10.9320753,15.6446278 11.1378899,15.5103755 11.3570251,15.4205258 L11.3570251,8.8311971 C11.1378899,8.74160856 10.9325977,8.6084011 10.7547299,8.43000759 C10.2106792,7.88620775 10.079825,7.08748541 10.3587718,6.41935861 L7.63773486,3.6977475 L0.452504938,10.8825919 C-0.150834979,11.4867269 -0.150834979,12.4654099 0.452504938,13.0690225 L10.9315529,23.5474864 C11.5348928,24.1508379 12.513296,24.1508379 13.1176807,23.5474864 L23.5471033,13.117604 C24.1509656,12.5139914 24.1509656,11.5345248 23.5471033,10.9311734" fill="#fff" mask="url(#mask-2)"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </IconButton>
            </div>
            <div style={style}>
                <p>using custom React components w/ inlined svg</p>

                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    { Object.keys(CustomIcons).map(iconName => {
                        const CustomIcon = CustomIcons[iconName];

                        return (
                            <div key={iconName} style={{marginRight: 10}}>
                                <IconButton
                                    label={iconName}
                                    iconFill={'#fff'}
                                    style={{textTransform: 'capitalize'}}>
                                    <CustomIcon />
                                </IconButton>
                            </div>
                        )
                    } )}
                </div>
            </div>
        </div>
    );
}

const buttonRow = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10
};

function Sizing() {
    const cellStyle = {...buttonRow, margin: 0};

    return (
        <div>
            { Object.keys(shapes).sort().slice(50, 60).map(shape => (
            <div style={buttonRow}>
                <div className="layout-small" style={cellStyle}>
                    <button>Small</button>
                    &nbsp;
                    <IconButton iconName={shape} label="Small" />
                </div>
                <div style={cellStyle}>
                    <button>Medium</button>
                    &nbsp;
                    <IconButton iconName={shape} label="Medium" />
                </div>
                <div className="layout-large" style={cellStyle}>
                    <button>Large</button>
                    &nbsp;
                    <IconButton iconName={shape} label="Large" />
                </div>
            </div>
            )) }
        </div>
    );
}

