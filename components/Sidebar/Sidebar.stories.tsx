import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { User as UserIcon } from '@jdl2/icons/User';
import { GitBranch } from '@jdl2/icons/GitBranch';
import { GitCommit } from '@jdl2/icons/GitCommit';

storiesOf('Sidebar', module)
    .add('expanded example', () => {
        return (
            <Sidebar
                collapse={false}
                main={
                    <>
                        <Sidebar.AppLogo
                            icon={<UserIcon size={32} />}
                            brand={'Jenkins'}
                            name={'Design Language'}
                            chevron
                        />
                        <Sidebar.Item icon={<GitBranch />} chevron>
                            Teams
                        </Sidebar.Item>
                        <Sidebar.Item icon={<GitBranch />}>Branches</Sidebar.Item>
                        <Sidebar.Item icon={<GitCommit />}>Commits</Sidebar.Item>
                    </>
                }
                footer={<Sidebar.Item icon={<UserIcon size={32} />}>Footer</Sidebar.Item>}
            />
        );
    })
    .add('collapsed example', () => {
        return (
            <Sidebar
                collapse={true}
                main={
                    <>
                        <Sidebar.AppLogo
                            icon={<UserIcon size={32} />}
                            brand={'Jenkins'}
                            name={'Design Language'}
                            chevron
                        />
                        <Sidebar.Item icon={<GitBranch />} chevron>
                            Teams
                        </Sidebar.Item>
                        <Sidebar.Item icon={<GitBranch />}>Branches</Sidebar.Item>
                        <Sidebar.Item icon={<GitCommit />}>Commits</Sidebar.Item>
                    </>
                }
                footer={<Sidebar.Item icon={<UserIcon size={32} />}>Footer</Sidebar.Item>}
            />
        );
    })
    .add('default example', () => {
        return (
            <Sidebar
                main={
                    <>
                        <Sidebar.AppLogo
                            icon={<UserIcon size={32} />}
                            brand={'Jenkins'}
                            name={'Design Language'}
                            chevron
                        />
                        <Sidebar.Item icon={<GitBranch />} chevron>
                            Teams
                        </Sidebar.Item>
                        <Sidebar.Item icon={<GitBranch />}>Branches</Sidebar.Item>
                        <Sidebar.Item icon={<GitCommit />}>Commits</Sidebar.Item>
                    </>
                }
                footer={<Sidebar.Item icon={<UserIcon size={32} />}>Footer</Sidebar.Item>}
            />
        );
    });
