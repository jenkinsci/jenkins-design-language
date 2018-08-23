import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Injector } from '@jdl2/ioc';

// tslint:disable

declare var __injector: Injector;

interface Props {
    injector: Injector;
    children: JSX.Element | JSX.Element[];
}

export class InjectorContext extends React.Component<Props> {
    static childContextTypes = {
        __injector: PropTypes.object,
    };
    getChildContext() {
        return {
            __injector: this.props.injector,
        };
    }
    render() {
        return this.props.children;
    }
}

export function injectProperties<T extends { new (...args: any[]): {} }>(type: T) {
    if (!(typeof type === 'string')) {
        Object.defineProperty(type.prototype, '__injector', {
            get() {
                return ((this as any).context && (this as any).context.__injector) || __injector;
            },
        });
        (type as any).contextTypes = {
            __injector: PropTypes.object,
        };
    }
    return type;
}
