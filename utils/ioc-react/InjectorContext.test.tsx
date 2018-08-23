import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import { inject, Injector, newInstance, postConstruct, singleton } from '@jdl2/ioc';
import { InjectorContext, injectProperties } from './InjectorContext';
import { ProductionLogger } from '@jdl2/log';

// tslint:disable

it('works with React', () => {
    class C1 {
        name = 'C1';
    }

    class C2 {
        @inject(C1) c1: C1;
        name = 'C2';
    }

    @injectProperties
    class InjectedComponent extends React.Component {
        @inject(C2) c2: C2;
        render() {
            return <div>{this.c2.name}</div>;
        }
    }

    const i = new Injector(new ProductionLogger());
    const reactElement: any = ReactTestUtils.renderIntoDocument(
        <InjectorContext injector={i}>
            <InjectedComponent />
        </InjectorContext>
    );

    const rendered = ReactDOM.findDOMNode(reactElement);

    expect(rendered.innerHTML).toBe('C2');
});

it('can override context', () => {
    class C1 {
        name = 'C1';
    }

    class C2 {
        @inject(C1) c1: C1;
        name = 'C2';
    }

    class C2Mock extends C2 {
        name = 'C2Mock';
    }

    @injectProperties
    class InjectedComponent extends React.Component {
        @inject(C2) c2: C2;
        render() {
            return <div>{this.c2.name}</div>;
        }
    }

    const i = new Injector(new ProductionLogger());

    const reactElement1: any = ReactTestUtils.renderIntoDocument(
        <InjectorContext injector={i}>
            <InjectedComponent />
        </InjectorContext>
    );

    const rendered1 = ReactDOM.findDOMNode(reactElement1);

    expect(rendered1.innerHTML).toBe('C2');

    const override = new Injector(i);
    override.bind(C2).toInstance(new C2Mock());

    const reactElement2: any = ReactTestUtils.renderIntoDocument(
        <InjectorContext injector={override}>
            <InjectedComponent />
        </InjectorContext>
    );

    const rendered2 = ReactDOM.findDOMNode(reactElement2);

    expect(rendered2.innerHTML).toBe('C2Mock');
});
