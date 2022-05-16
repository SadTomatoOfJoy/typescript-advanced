export class Particle {
    spin() {
        console.log(`I am spinning`)
    }
}

export class Wave {
    propagate(environment: string){
        console.log(`I am propagating through ${environment}`)
    }
}

// Declaration merging to have the correct typing.
interface Light extends Wave, Particle {}
class Light{
    constructor() {
    }
}

/**
 * A function that you can find in the typescript documentation that copies properties
 * of an array of class to another class.
 */
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

/**
 * The problem with this approach is that you have to apply the mixin manually at runtime.
 * Another problem is that there is no way to use the contructors of extended classes.
 */
applyMixins(Light, [Particle, Wave]);
const light = new Light();
light.spin();
light.propagate('air')
