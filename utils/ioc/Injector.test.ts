import { inject, Injector, newInstance, postConstruct, singleton } from './Injector';
import { ProductionLogger } from '@jdl2/log';

// tslint:disable

it('basically works', () => {
    class C1 {
        name = 'C1';
    }

    class C2 {
        @inject(C1) c1: C1;
        name = 'C2';
    }

    const i = new Injector(new ProductionLogger());
    const c2 = i.getInstance(C2);

    expect(c2.c1).toBeInstanceOf(C1);
});

it('works with singleton provider', () => {
    @singleton
    class SingletonType {
        static num = 1;
        name = 'A singleton: ' + SingletonType.num++;
    }

    class SingletonUser {
        @inject(SingletonType) inst: SingletonType;
    }

    class SingletonUser2 {
        @inject(SingletonType) inst: SingletonType;
    }

    const i = new Injector(new ProductionLogger());
    const o = i.getInstance(SingletonUser);

    expect(o.inst).toBeInstanceOf(SingletonType);

    const o2 = i.getInstance(SingletonUser2);

    expect(o2.inst).toBe(o.inst);
});

it('works with newInstance provider', () => {
    @newInstance
    class NewInstanceType {
        static num = 1;
        name = 'A new instance: ' + NewInstanceType.num++;
    }

    class NewInstanceUser {
        @inject(NewInstanceType) inst: NewInstanceType;
    }

    class NewInstanceUser2 {
        @inject(NewInstanceType) inst: NewInstanceType;
    }

    const i = new Injector(new ProductionLogger());
    const o = i.getInstance(NewInstanceUser);

    expect(o.inst).toBeInstanceOf(NewInstanceType);

    const o2 = i.getInstance(NewInstanceUser2);

    expect(o2.inst).not.toBe(o.inst);
    expect(o2.inst.name).not.toBe(o.inst.name);
});

it('works with bind.to(class)', () => {
    @singleton
    class NewInstanceType {
        static num = 1;
        name = 'A new instance: ' + NewInstanceType.num++;
    }

    @singleton
    class AlternateImplementation extends NewInstanceType {}

    class NewInstanceUser {
        @inject(NewInstanceType) inst: NewInstanceType;
    }

    class NewInstanceUser2 {
        @inject(NewInstanceType) inst: NewInstanceType;
    }

    const i = new Injector(new ProductionLogger());
    i.bind(NewInstanceType).to(AlternateImplementation);
    const o = i.getInstance(NewInstanceUser);

    expect(o.inst).toBeInstanceOf(NewInstanceType);
    expect(o.inst).toBeInstanceOf(AlternateImplementation);

    const o2 = i.getInstance(NewInstanceUser2);

    expect(o2.inst).toBe(o.inst);
    expect(o2.inst.name).toBe(o.inst.name);
});

it('works with inheritance', () => {
    @newInstance
    class NewInstanceType {
        static num = 1;
        name = 'A new instance: ' + NewInstanceType.num++;
    }

    @singleton
    class SingletonType {
        static num = 1;
        name = 'A singleton: ' + SingletonType.num++;
    }

    abstract class NewInstanceAbstractUser {
        @inject(SingletonType) s: SingletonType;
        @inject(NewInstanceType) inst: NewInstanceType;
    }

    class NewInstanceUser3 extends NewInstanceAbstractUser {}

    const i = new Injector(new ProductionLogger());
    const o = i.getInstance(NewInstanceUser3);

    expect(o.s).toBeInstanceOf(SingletonType);
    expect(o.inst).toBeInstanceOf(NewInstanceType);
});

it('handles postConstruct', () => {
    @singleton
    class SingletonType {
        postConstructCalled = false;

        @postConstruct
        init() {
            this.postConstructCalled = true;
        }
    }

    class NewInstanceUser2 {
        @inject(SingletonType) inst: SingletonType;
        postConstructCalled = false;

        @postConstruct
        init() {
            this.postConstructCalled = true;
        }
    }

    const i = new Injector(new ProductionLogger());
    const o = i.getInstance(NewInstanceUser2);

    expect(o.postConstructCalled).toBeTruthy();
    expect(o.inst.postConstructCalled).toBeTruthy();
});

it('gives the right errors', () => {
    try {
        class C1 {
            @inject(null as any)
            prop: C1;
            name = 'C1';
        }
        expect(new C1()).toBeNull();
    } catch (e) {
        expect(e.toString()).toContain('C1.prop');
    }

    try {
        class C1 {
            name = 'C1';
        }

        class C2 {
            @inject(C1) prop: C1;
            name = 'C2';
        }

        const c1 = new C2();
        // should throw:
        expect(c1.prop).toBe('not this');
    } catch (e) {
        expect(e.toString()).toContain('@ C2.prop');
    }
});
