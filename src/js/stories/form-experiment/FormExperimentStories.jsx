import React from 'react';
import { storiesOf } from '@kadira/storybook';

import TextInputClassic from './TextInputClassic';
import TextInputStateless from './TextInputStateless';
import TextInputHybrid from './TextInputHybrid';


storiesOf('FormExperiments', module)
    .add('TextInputClassic', () => <TextInputClassic/>)
    .add('TextInputStateless', () => <TextInputStateless/>)
    .add('TextInputHybrid', () => <TextInputHybrid/>)
;
