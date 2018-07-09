import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { User as UserIcon } from '@jdl2/icons/User';
import { GitBranch } from '@jdl2/icons/GitBranch';
import { GitCommit } from '@jdl2/icons/GitCommit';

storiesOf('Sidebar', module).add('example', () => {
    return (
        <Sidebar
            main={
                <>
                    <Sidebar.AppLogo
                        icon={<UserIcon size={24} />}
                        brand={'Jenkins'}
                        name={'Design Language'}
                    />
                    <Sidebar.Item icon={<GitBranch />}>Branches</Sidebar.Item>
                    <Sidebar.Item icon={<GitCommit />}>Commits</Sidebar.Item>
                </>
            }
            footer={<Sidebar.Item icon={<GitCommit />}>Commits</Sidebar.Item>}
        />
    );
});
