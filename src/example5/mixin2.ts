export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * In this example, the classes that will be extended are actually functions that returns
 * a class extending the given class in the function parameter.
 */
export function Particle<T extends Constructor>(Base: T = (class {} as any)) {
    return class extends Base {
        private weight: number;
        constructor(...args: any[]) {
            // This is a way to use constructor argument of mixin classes
            const [weight, ...restOfArgs] = args;
            super(restOfArgs);
            this.weight = weight;
        }

        spin() {
            console.log(`I am spinning with weight ${this.weight}`)
        }
    }
}

export function Wave<TBase extends Constructor>(Base: TBase = (class {} as any)) {
    return class extends Base {
        private wavelength: number;
        constructor(...args: any[]) {
            const [wavelength, ...restOfArgs] = args;
            super(restOfArgs);
            this.wavelength = wavelength;
        }
        propagate(environment: string) {
            console.log(`I am propagating through ${environment} with wavelength ${this.wavelength}`)
        }
    }
}

class Light extends Wave(Particle()){
    constructor(wavelength: number, weight: number) {
        super(wavelength, weight);
    }
}

/**
 * Two problems with this approach: We have to explicitly define mixin classes and 
 * the constructor arguments are dependent of the order of the extended mixins
 */
const light = new Light(5, 3);
light.spin();
light.propagate('air')
